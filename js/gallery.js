const API_URL = "gallery.json"; // Path to your JSON file containing image data

/**
 * Fetches gallery data from the JSON file.
 */
async function fetchGalleryData() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Failed to fetch images");

        const data = await response.json();
        displayGallery(data); // Pass the fetched data to the display function
    } catch (error) {
        console.error("Error loading images:", error);
    }
}

/**
 * Displays the gallery images on the webpage.
 */
function displayGallery(images) {
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.innerHTML = ""; // Clear any existing content

    images.forEach((image, index) => {
        const colDiv = document.createElement("div");
        colDiv.classList.add("col-md-4", "mb-3"); // Bootstrap classes for layout

        const imgElement = document.createElement("img");
        imgElement.src = image.url; // Set image source
        imgElement.alt = image.alt; // Set alt text for accessibility
        imgElement.classList.add("img-fluid", "rounded", "shadow-sm"); // Styling classes
        imgElement.onclick = () => openLightbox(index, images); // Open lightbox on click

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = image.description; // Add image description

        colDiv.appendChild(imgElement);
        colDiv.appendChild(descriptionElement);
        galleryContainer.appendChild(colDiv);
    });
}

/**
 * Opens the lightbox modal to display a larger version of the image.
 * AI could be used here to enhance functionality, such as:
 * - Automatically tagging images based on content.
 * - Implementing image recognition to group similar images.
 * - Adding accessibility features like automatic alt text generation.
 */
function openLightbox(index, images) {
    const modal = document.getElementById("lightboxModal");
    const lightboxImage = document.getElementById("lightboxImage");
    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let currentImageIndex = index;
    lightboxImage.src = images[currentImageIndex].url; // Set initial image
    lightboxImage.alt = images[currentImageIndex].alt; // Set alt text
    modal.style.display = "flex"; // Show the modal

    // Navigation between images
    prevButton.onclick = () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        lightboxImage.src = images[currentImageIndex].url;
        lightboxImage.alt = images[currentImageIndex].alt;
    };

    nextButton.onclick = () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        lightboxImage.src = images[currentImageIndex].url;
        lightboxImage.alt = images[currentImageIndex].alt;
    };
}

/**
 * Closes the lightbox modal.
 */
document.getElementById("closeLightbox").addEventListener("click", () => {
    document.getElementById("lightboxModal").style.display = "none";
});

/**
 * Initializes the gallery by fetching and displaying data when the page loads.
 */
window.addEventListener("load", fetchGalleryData);