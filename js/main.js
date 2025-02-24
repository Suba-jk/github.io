/**
 * NAME: DEV PATEL, DEODATO SOZINHO, Subashini Ramalingam
 * STUDENT ID: 100934719, 100914858, 100843749
 * DATE OF COMPLETION: 01/25/2025
 **/
"use strict";

/**
 * Loads the navigation bar dynamically from an external file.
 */
document.addEventListener("DOMContentLoaded", function () {
    fetch("header.html")
        .then(response => response.text())
        .then(data => {
            document.getElementById("navbar-container").innerHTML = data;
        })
        .catch(error => console.error("Error loading navbar:", error));
});

/**
 * Highlights the active page link in the navbar.
 */
function highlightActivePage() {
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link'); // Select all navbar links
    const currentUrl = window.location.href; // Get the current URL of the page

    navLinks.forEach(link => {
        const linkUrl = link.href; // Get the href value of the current navbar link
        if (currentUrl === linkUrl) {
            link.classList.add('active'); // Add the "active" class to the matching link
        } else {
            link.classList.remove('active'); // Remove the "active" class from other links
        }
    });
}

/**
 * Predefined list of locations for filtering.
 */
const locations = ["Community Center", "Tech Hub", "Central Park", "City Stadium", "Tech Center", "Sunny Beach"];

/**
 * List of volunteer opportunities with details including title, date, time, location, category, and description.
 */
const events = [
    { title: "Fundraiser for Animal Shelter", date: "2025-02-01", time: "10:00 AM", location: "Community Center", category: "fundraisers", description: "A fun event to raise funds for the local animal shelter." },
    { title: "Workshop on Web Development", date: "2025-02-05", time: "02:00 PM", location: "Tech Hub", category: "workshops", description: "A workshop to learn web development basics." },
    { title: "Park Cleanup Day", date: "2025-02-10", time: "08:00 AM", location: "Central Park", category: "cleanups", description: "Join us for a day of cleaning up the local park." },
    { title: "Charity Run", date: "2025-03-01", time: "07:00 AM", location: "City Stadium", category: "fundraisers", description: "Participate in a fun run to raise funds for a good cause." },
    { title: "JavaScript Workshop", date: "2025-03-10", time: "05:00 PM", location: "Tech Center", category: "workshops", description: "Learn JavaScript from scratch in this hands-on workshop." },
    { title: "Beach Cleanup", date: "2025-03-15", time: "09:00 AM", location: "Sunny Beach", category: "cleanups", description: "Help us clean up the local beach and preserve the environment." }
];

/**
 * Populates the location filter dropdown with predefined locations.
 */
function populateLocationFilter() {
    const locationFilter = document.getElementById("searchLocation");
    locationFilter.innerHTML = '<option value="">All Locations</option>';
    locations.forEach(location => {
        locationFilter.innerHTML += `<option value="${location}">${location}</option>`;
    });
}

/**
 * Filters events based on selected category, location, date, and time.
 */
function filterEvents() {
    const selectedCategory = document.getElementById('categoryFilter').value;
    const searchLocation = document.getElementById('searchLocation').value;
    const searchDate = document.getElementById('eventDate').value;

    console.log("Filters - Category:", selectedCategory, "Location:", searchLocation, "Date:", searchDate);

    const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.date).toISOString().split('T')[0]; // Convert event date to yyyy-mm-dd
        return (selectedCategory === "all" || event.category === selectedCategory) &&
            (searchLocation === "" || event.location === searchLocation) &&
            (searchDate === "" || eventDate === searchDate);  // Compare event date with selected date
    });

    console.log("Filtered Events:", filteredEvents);
    displayEvents(filteredEvents);
}

/**
 * Displays a list of events dynamically on the webpage.
 */
function displayEvents(eventsToDisplay) {
    const eventList = document.getElementById('eventList');
    eventList.innerHTML = '';

    if (eventsToDisplay.length === 0) {
        eventList.innerHTML = "<p>No events found.</p>";
    } else {
        eventsToDisplay.forEach(event => {
            const eventElement = document.createElement('div');
            eventElement.classList.add('col-md-4', 'mb-4');
            eventElement.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">${event.description}</p>
                        <p class="card-text"><small class="text-muted">${formatDate(event.date)} at ${event.time} - ${event.location}</small></p>
                        <button class="btn btn-primary" onclick="openSignUpModal('${event.title}')">Sign Up</button>
                    </div>
                </div>
            `;
            eventList.appendChild(eventElement);
        });
    }
}

/**
 * Formats the date to a more readable format (e.g., Feb 1, 2025)
 */
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);  // e.g., "Feb 1, 2025"
}

/**
 * Opens the modal for signing up for an event.
 */
function openSignUpModal(eventTitle) {
    const modal = document.getElementById('signup-modal');
    const modalTitle = document.querySelector('.modal-content h2') || document.createElement('h2');
    modalTitle.textContent = `Sign Up for ${eventTitle}`;
    modal.querySelector('.modal-content').prepend(modalTitle);
    modal.style.display = 'block';
}

/**
 * Displaying the news through API.
 * AI was used to help fix the URL settings and resolve errors related to the API integration.
 * Additionally, AI was consulted to clarify how to properly use the article data returned by the API.
 * @returns {Promise<void>}
 * @constructor
 */
async function DisplayNews() {
    const apiKey = "CpRl4v8tj4U7U55UshM0AB48biaLDzshfBa1fl4x";
    const country = "ca";
    const url = `https://api.thenewsapi.com/v1/news/top?api_token=${apiKey}&locale=${country}&limit=3`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Failed to fetch news data");
        }

        const data = await response.json();
        console.log("News API response: ", data);

        const newsDataElement = document.getElementById("news-data");

        data.data.forEach(article => {
            newsDataElement.innerHTML += `
                <div>
                    <strong>Title:</strong> ${article.title} <br>
                    <strong>Source:</strong> ${article.source} <br>
                    <strong>Published:</strong> ${new Date(article.published_at).toLocaleDateString()} <br>
                    <a href="${article.url}" target="_blank">Read More</a>
                    <br>
                </div>
            `;
        });

    } catch (error) {
        console.error("Error fetching news data", error);
        document.getElementById("news-data").textContent = "Unable to fetch news data at this time";
    }
}

/**
 * Closes the modal.
 */
function closeSignUpModal() {
    const modal = document.getElementById('signup-modal');
    modal.style.display = 'none';
}

/**
 * Initializes the webpage by calling relevant functions based on the page title.
 */
function Start() {
    highlightActivePage(); // Call the function to highlight the active page
    populateLocationFilter();
    DisplayNews();
    switch (document.title) {
        case "Home": DisplayHomePage(); break;
        case "Events": displayEvents(events); break;
    }

    // Event listeners for filtering
    document.getElementById('categoryFilter').addEventListener('change', filterEvents);
    document.getElementById('searchLocation').addEventListener('change', filterEvents);
    document.getElementById('eventDate').addEventListener('change', filterEvents);

    // Modal close button
    document.getElementById('close-modal').addEventListener('click', closeSignUpModal);
}

// Scroll to top button functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

window.addEventListener("load", Start);