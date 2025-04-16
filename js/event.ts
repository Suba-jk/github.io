"use strict";

/**
 * Handles event form validation, event storage, and dynamic display.
 * Also handles login check for showing the form.
 */

document.addEventListener("DOMContentLoaded", function () {
    const proposeBtn = document.getElementById("proposeEventBtn") as HTMLButtonElement | null;
    const eventFormSection = document.getElementById("eventFormSection") as HTMLElement | null;
    const eventForm = document.getElementById("eventForm") as HTMLFormElement | null;
//const welcomeText = document.getElementById("welcomeId");
    //const user = sessionStorage.getItem("user");
    //

    const user: string | null = sessionStorage.getItem("user");
    const welcomeText = document.getElementById("welcomeId") as HTMLElement | null;

    if (user && welcomeText) {
        welcomeText.innerText = `Welcome ${user}`;
    }

    if (proposeBtn && eventFormSection) {
        proposeBtn.addEventListener("click", () => {
            const user = sessionStorage.getItem("user");
            if (!user) {
                alert("Please log in to propose an event.");
                window.location.href = "login.html";
            } else {
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

        const eventNameInput = document.getElementById("eventName") as HTMLInputElement | null;
        const eventDateInput = document.getElementById("eventDateInput") as HTMLInputElement | null;
        const eventTimeInput = document.getElementById("eventTime") as HTMLInputElement | null;
        const eventLocationInput = document.getElementById("eventLocation") as HTMLInputElement | null;
        const eventDescriptionInput = document.getElementById("eventDescription") as HTMLTextAreaElement | null;

        if (!eventNameInput || !eventDateInput || !eventTimeInput || !eventLocationInput || !eventDescriptionInput) {
            console.error("One or more input fields are missing");
            return;
        }

        const eventName = eventNameInput.value.trim();
        const eventDate = eventDateInput.value;
        const eventTime = eventTimeInput.value;
        const eventLocation = eventLocationInput.value.trim();
        const eventDescription = eventDescriptionInput.value.trim();

        let errors: string[] = [];

        if (!eventName) errors.push("Event name is required.");
        if (!eventDate) {
            errors.push("Event date is required.");
        } else {
            const today = new Date().toISOString().split("T")[0];
            if (eventDate < today) errors.push("Event date cannot be in the past.");
        }

        if (!eventTime) {
            errors.push("Event time is required.");
        } else {
            const timeRegex = /^([01]?\d|2[0-3]):([0-5]\d)$/;
            if (!timeRegex.test(eventTime)) errors.push("Invalid time format. Use HH:MM (24-hour format).");
        }

        if (!eventLocation) errors.push("Event location is required.");
        if (!eventDescription) errors.push("Event description is required.");
        if (eventDescription.length > 500) errors.push("Event description cannot exceed 500 characters.");

        if (errors.length > 0) {
            alert("Please fix the following errors:\n" + errors.join("\n"));
            return;
        }

        console.log("Form validation passed. Ready to submit.");

        const newEvent = {
            name: eventName,
            date: eventDate,
            time: eventTime,
            location: eventLocation,
            description: eventDescription
        };

        let events = JSON.parse(localStorage.getItem("events") || "[]");
        events.push(newEvent);
        localStorage.setItem("events", JSON.stringify(events));

        displayEvents();
        eventForm.reset();
    });

    function displayEvents() {
        const eventList = document.getElementById("eventList");
        if (!eventList) {
            console.error("Event list container not found");
            return;
        }
        eventList.innerHTML = "";

        let events = JSON.parse(localStorage.getItem("events") || "[]");
        events.forEach((event: { name: string; date: string; time: string; location: string; description: string }) => {
            const eventItem = document.createElement("div");
            eventItem.classList.add("event-item", "card", "p-3", "mb-3");
            eventItem.innerHTML = `
                <h5>${event.name}</h5>
                <p><strong>Date:</strong> ${event.date}</p>
                <p><strong>Time:</strong> ${event.time}</p>
                <p><strong>Location:</strong> ${event.location}</p>
                <p>${event.description}</p>
            `;
            eventList.appendChild(eventItem);
        });
    }

    displayEvents();
});
