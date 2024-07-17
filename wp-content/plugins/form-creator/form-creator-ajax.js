document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".custom-form").forEach(function (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();
			var formId = form.getAttribute("id");

			var { isValid, formFields } = window.validateForm(form);

			if (!isValid) {
				return;
			}

			// Utworzenie obiektu FormData
			var formData = new FormData();
			if (formId === "your-form-id") {
				formData.append("action", "form_creator_payment");
				formData.append("_ajax_nonce", formCreatorAjax.nonce_your_form);
				formData.append(
					"buyer_first_name",
					document.getElementById("buyer_first_name").value,
				);
				formData.append(
					"buyer_last_name",
					document.getElementById("buyer_last_name").value,
				);
				formData.append(
					"amount",
					document.getElementById("service_select").value,
				);
				formData.append(
					"description",
					document.getElementById("service_select").selectedOptions[0].text,
				);
				// Dodanie pól formularza do formData
				document
					.querySelectorAll(".form-control input, .form-control select")
					.forEach(function (field) {
						formData.append(field.getAttribute("name"), field.value);
					});
			} else {
				formData.append("action", "my_custom_action");
				formData.append("_ajax_nonce", formCreatorAjax.nonce_other_form);

				// Dodanie pól formularza do formData
				document
					.querySelectorAll(".form-control input, .form-control select")
					.forEach(function (field) {
						formData.append(field.getAttribute("name"), field.value);
					});
			}

			console.log("Form Data:", formData);

			fetch(formCreatorAjax.ajax_url, {
				method: "POST",
				body: formData,
			})
				.then((response) => response.json())
				.then((response) => {
					console.log("Response:", response);
					if (response.success) {
						if (formId === "your-form-id") {
							window.location.href = response.data.redirectUrl;
						} else {
							console.log("res", response);
						}
					} else {
						alert(response.data.message);
					}
				})
				.catch((error) => console.error("AJAX Error:", error))
				.finally(() => {
					form.reset();
				});
		});
	});
});
