"use strict";

$(document).ready(function () {
    // Handle feedback form submission
    $('#feedbackForm').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        // Get form values and trim whitespace
        const fullName = $('#fullName').val().trim();
        const emailAddress = $('#emailAddress').val().trim();
        const subject = $('#subject').val().trim();
        const message = $('#message').val().trim();

        // Validate inputs
        if (!fullName || !emailAddress || !subject || !message) {
            alert("Please fill in all fields."); // Show an alert if any field is empty
            return;
        }

        // Populate confirmation modal with submitted data
        $('#confirmationName').text(fullName);
        $('#confirmationEmail').text(emailAddress);
        $('#confirmationSubject').text(subject);
        $('#confirmationMessage').text(message);

        // Show the confirmation modal using Bootstrap's modal component
        const confirmationModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
        confirmationModal.show();

        console.log("Modal should be visible now."); // Debugging

        // Reset the form after submission
        $('#feedbackForm')[0].reset();
    });

    // Handle cancel button click to reset the form
    $('#cancelButton').click(function () {
        $('#feedbackForm')[0].reset();
    });
});