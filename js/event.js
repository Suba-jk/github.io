"use strict";
/**
 * Handles event form validation, event storage, and dynamic display.
 * Also handles login check for showing the form.
 */
document.addEventListener("DOMContentLoaded", function () {
    var proposeBtn = document.getElementById("proposeEventBtn");
    var eventFormSection = document.getElementById("eventFormSection");
    var eventForm = document.getElementById("eventForm");
    var welcomeText = document.getElementById("welcomeId");
    var user = sessionStorage.getItem("user");
    //alert(user);
    if (user) {
        welcomeText.innerText = "Welcome " + user;
    }
    if (proposeBtn && eventFormSection) {
        proposeBtn.addEventListener("click", function () {
            var user = sessionStorage.getItem("user");
            if (!user) {
                alert("Please log in to propose an event.");
                window.location.href = "login.html";
            }
            else {
                eventFormSection.style.display = "block";
                proposeBtn.style.display = "none";
            }
        });
    }
    if (!eventForm) {
        console.error("Event form not found");
        return;
    }
    eventForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var eventNameInput = document.getElementById("eventName");
        var eventDateInput = document.getElementById("eventDateInput");
        var eventTimeInput = document.getElementById("eventTime");
        var eventLocationInput = document.getElementById("eventLocation");
        var eventDescriptionInput = document.getElementById("eventDescription");
        if (!eventNameInput || !eventDateInput || !eventTimeInput || !eventLocationInput || !eventDescriptionInput) {
            console.error("One or more input fields are missing");
            return;
        }
        var eventName = eventNameInput.value.trim();
        var eventDate = eventDateInput.value;
        var eventTime = eventTimeInput.value;
        var eventLocation = eventLocationInput.value.trim();
        var eventDescription = eventDescriptionInput.value.trim();
        var errors = [];
        if (!eventName)
            errors.push("Event name is required.");
        if (!eventDate) {
            errors.push("Event date is required.");
        }
        else {
            var today = new Date().toISOString().split("T")[0];
            if (eventDate < today)
                errors.push("Event date cannot be in the past.");
        }
        if (!eventTime) {
            errors.push("Event time is required.");
        }
        else {
            var timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
            if (!timeRegex.test(eventTime))
                errors.push("Invalid time format. Use HH:MM (24-hour format).");
        }
        if (!eventLocation)
            errors.push("Event location is required.");
        if (!eventDescription)
            errors.push("Event description is required.");
        if (eventDescription.length > 500)
            errors.push("Event description cannot exceed 500 characters.");
        if (errors.length > 0) {
            alert("Please fix the following errors:\n" + errors.join("\n"));
            return;
        }
        console.log("Form validation passed. Ready to submit.");
        var newEvent = {
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription
        };
        var events = JSON.parse(localStorage.getItem("events") || "[]");
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));
        displayEvents();
        eventForm.reset();
    });
    function displayEvents() {
        var eventList = document.getElementById("eventList");
        if (!eventList) {
            console.error("Event list container not found");
            return;
        }
        eventList.innerHTML = "";
        var events = JSON.parse(localStorage.getItem("events") || "[]");
        events.forEach(function (event) {
            var eventItem = document.createElement("div");
            eventItem.classList.add("event-item", "card", "p-3", "mb-3");
            eventItem.innerHTML = "\n                <h5>".concat(event.name, "</h5>\n                <p><strong>Date:</strong> ").concat(event.date, "</p>\n                <p><strong>Time:</strong> ").concat(event.time, "</p>\n                <p><strong>Location:</strong> ").concat(event.location, "</p>\n                <p>").concat(event.description, "</p>\n            ");
            eventList.appendChild(eventItem);
        });
    }
    displayEvents();
});
