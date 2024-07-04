document.addEventListener("DOMContentLoaded", function () {
    const selectElement = document.getElementById("dynamic-select");
    const costElement = document.getElementById("dynamic-cost");

    if (selectElement && costElement) {
        selectElement.addEventListener("change", function () {
            costElement.textContent = selectElement.value;
        });
    }
});
