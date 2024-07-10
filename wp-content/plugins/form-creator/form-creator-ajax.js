jQuery(document).ready(function ($) {
	$("#your-form-id").on("submit", function (e) {
		e.preventDefault();

		var amount = $("#service_select").val();
		var description = $("#service_select").find("option:selected").text();

		var formData = {
			action: "form_creator_payment",
			buyer_first_name: $("#buyer_first_name").val(),
			buyer_last_name: $("#buyer_last_name").val(),
			amount: amount,
			description: description,
			_ajax_nonce: formCreatorAjax.nonce,
		};
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
