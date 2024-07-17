window.validateForm = function (form) {
	var isValid = true;
	var errorMessage = "This field is required";
	var formFields = {};

	form
		.querySelectorAll(".form-control input, .form-control select")
		.forEach(function (field) {
			var value = field.value.trim();
			var fieldName = field.getAttribute("name");
			var errorMessageElement = field.nextElementSibling;

			if (
				errorMessageElement &&
				errorMessageElement.classList.contains("error-message")
			) {
				errorMessageElement.remove();
			}

			if (value === "") {
				isValid = false;
				field.insertAdjacentHTML(
					"afterend",
					'<div class="error-message" style="color: red; font-size: 10px;">' +
						errorMessage +
						"</div>",
				);
			} else {
				field.insertAdjacentHTML(
					"afterend",
					'<div class="error-message" style="color: green; font-size: 10px;">' +
						"This field is correct." +
						"</div>",
				);
			}

			if (fieldName) {
				formFields[fieldName] = value;
			} else {
				console.error("Field is missing name attribute:", field);
			}
		});

	return { isValid, formFields };
};
