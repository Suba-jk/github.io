"use strict";

document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
            highlightActivePage();
        })
        .catch(error => console.error("Error loading navbar:", error));
});

// Sample events
const events = [
    { title: "Fundraiser for Animal Shelter", date: "2025-02-01", time: "10:00 AM", location: "Community Center", category: "fundraisers", description: "A fun event to raise funds for the local animal shelter." },
    { title: "Workshop on Web Development", date: "2025-02-05", time: "02:00 PM", location: "Tech Hub", category: "workshops", description: "A workshop to learn web development basics." },
    { title: "Park Cleanup Day", date: "2025-02-10", time: "08:00 AM", location: "Central Park", category: "cleanups", description: "Join us for a day of cleaning up the local park." }
];

// Display events based on the filtered list
function displayEvents(eventsToDisplay) {
    const eventList = document.getElementById('eventList');
    if (!eventList) return;
    eventList.innerHTML = '';  // Clear previous events

    if (eventsToDisplay.length === 0) {
        eventList.innerHTML = "<p>No events found.</p>";
    } else {
        eventsToDisplay.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('card', 'mb-3');
            eventElement.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">${event.description}</p>
                    <p class="card-text"><small class="text-muted">${event.date} at ${event.time} - ${event.location}</small></p>
                    <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signupModal" onclick="openSignUpModal('${event.title}')">Sign Up</button>
                </div>
            `;
            eventList.appendChild(eventElement);
        });
    }
}

// Filter events by category
function filterEvents() {
    const categoryFilter = document.getElementById("categoryFilter").value;
    let filteredEvents = events;

    if (categoryFilter !== "all") {
        filteredEvents = events.filter(event => event.category === categoryFilter);
    }

    displayEvents(filteredEvents);
}

// Open the Sign-Up Modal and update with event details
function openSignUpModal(eventTitle) {
    document.getElementById("modalEventTitle").textContent = eventTitle;
    document.getElementById("modalConfirmation").textContent = `Sign up for: ${eventTitle}`;
}

// Handle form submission
document.getElementById("signupForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value.trim();

    if (name === "" || email === "" || role === "") {
        alert("Please fill in all fields.");
        return;
    }

    console.log(`User Signed Up:\nName: ${name}\nEmail: ${email}\nPreferred Role: ${role}`);

    alert("Thank you for signing up!");

    // Close the modal
    const modal = bootstrap.Modal.getInstance(document.getElementById("signupModal"));
    modal.hide();

    // Clear form
    document.getElementById("signupForm").reset();
});

// Initialize the page
function Start() {
    displayEvents(events);
    document.getElementById("categoryFilter").addEventListener("change", filterEvents);
}

window.addEventListener("load", Start);
