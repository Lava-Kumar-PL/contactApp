
// Attach event listeners after the DOM loads
document.addEventListener("DOMContentLoaded", function () {
    // Select all delete buttons
    const deleteButtons = document.querySelectorAll(".deletebtn");

    deleteButtons.forEach((button) => {
        button.addEventListener("click", function () {
            // Get the contact ID from the data attribute
            const contactId = button.getAttribute("data-id");

            // Get the corresponding confirm div
            const confirmDiv = document.getElementById(`confirm-${contactId}`);

            // Toggle the visibility of the confirm div
            confirmDiv.classList.toggle("hidden");
        });
    });

    // Handle the "No" button to close the confirmation
    const noButtons = document.querySelectorAll(".nobtn");
    noButtons.forEach((button) => {
        button.addEventListener("click", function () {
            const confirmDiv = button.closest(".confirm");
            confirmDiv.classList.add("hidden");
        });
    });
});



function validateForm() {
    const password = document.querySelector('#password').value;
    const reEnter = document.querySelector('#reEnter').value;
    const errorElement = document.getElementById("error");

    if (password == reEnter) {
        return true;
    }
    errorElement.textContent = "password is not matching";
    return false;
}
