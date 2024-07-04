jQuery(document).ready(function ($) {
	$("#your-form-id").on("submit", function (e) {
		e.preventDefault();

		var formData = {
			action: "form_creator_payment",
			enable_payu: $("#enable_payu").is(":checked"),

			buyer_first_name: $("#buyer_first_name").val(),
			buyer_last_name: $("#buyer_last_name").val(),
			amount: 500, // DODAC ELEMENT !!!!!!!!
			description: "zaw",
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

	// Dodaj funkcję, która usunie stronę "Thank You" po opuszczeniu
	$(window).on("beforeunload", function () {
		console.log("Before unload event triggered.");
		$.ajax({
			url: formCreatorAjax.ajax_url,
			type: "POST",
			data: {
				action: "delete_thank_you_page",
				_ajax_nonce: formCreatorAjax.nonce,
			},
			async: false, // aby upewnić się, że żądanie zostanie wykonane przed zamknięciem okna
		})
			.done(function (response) {
				console.log('Strona "Thank You" została usunięta:', response);
			})
			.fail(function (xhr, status, error) {
				console.error('Błąd podczas usuwania strony "Thank You":', error);
			});
	});
});
