jQuery(document).ready(function ($) {
	$(".custom-form").on("submit", function (e) {
		e.preventDefault();
		var formId = $(this).attr("id");
		var formFields = {};
		var isValid = true;
		var errorMessage = "This field is required";

		$(".form-control input, .form-control select").each(function () {
			var $field = $(this);
			var value = $field.val().trim();
			var fieldName = $field.attr("name");
			// Remove previous error message
			$field.next(".error-message").remove();

			if (value === "") {
				isValid = false;
				$field.after(
					'<div class="error-message" style="color: red;font-size: 10px;">' +
						errorMessage +
						"</div>",
				);
			} else {
				$field.after(
					'<div class="error-message" style="color: green;font-size: 10px;">' +
						"This field is correct." +
						"</div>",
				);
			}

			// Ensure field has a name attribute
			if (fieldName) {
				formFields[fieldName] = value;
			} else {
				console.error("Field is missing name attribute:", $field);
			}
		});

		if (!isValid) {
			return;
		}

		var amount = $("#service_select").val();
		var description = $("#service_select").find("option:selected").text();

		// Odczytanie wartości wszystkich pól formularza
		var formFields = {};
		$(".form-control input, .form-control select").each(function () {
			formFields[$(this).attr("name")] = $(this).val();
		});
		if (formId === "your-form-id") {
			var formData = {
				action: "form_creator_payment",
				buyer_first_name: $("#buyer_first_name").val(),
				buyer_last_name: $("#buyer_last_name").val(),
				amount: amount,
				description: description,
				_ajax_nonce: formCreatorAjax.nonce_your_form,
				form_fields: formFields, // Przekazanie dodatkowych danych
			};
		} else {
			var formData = {
				action: "my_custom_action",
				_ajax_nonce: formCreatorAjax.nonce_other_form,
				form_fields: formFields, // Przekazanie dodatkowych danych
			};
		}

		console.log("Form Data:", formData);

		$.post(formCreatorAjax.ajax_url, formData, function (response) {
			console.log("Response:", response);
			if (response.success) {
				window.location.href = response.data.redirectUrl; // Przekierowanie po sukcesie
			} else {
				alert(response.data.message); // Wyświetlenie komunikatu o błędzie
			}
		})
			.fail(function (xhr, status, error) {
				console.error("AJAX Error: " + error); // Obsługa błędów AJAX
			})
			.always(function () {
				$("#your-form-id")[0].reset(); // Wyczyszczenie formularza
			});
	});
});
