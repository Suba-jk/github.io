"use strict";
// Handles authentication-based UI updates and session timeout management

// Session timeout (15 minutes)
let sessionTimeout;
function resetSessionTimeout() {
    clearTimeout(sessionTimeout);
    sessionTimeout = setTimeout(() => {
        sessionStorage.removeItem("user");
        alert("Session expired. Please log in again.");
        window.location.href = "login.html";
    }, 15 * 60 * 1000); // 15 minutes
}

// Reset timeout on activity
document.addEventListener("mousemove", resetSessionTimeout);
document.addEventListener("keypress", resetSessionTimeout);

// AuthGuard for restricted pages
function AuthGuard() {
    const user = sessionStorage.getItem("user");
    if (!user) {
        alert("Access denied. Please log in.");
        window.location.href = "login.html";
    } else {
        resetSessionTimeout();
    }
}

// Navbar updates based on user status
function updateNavbar() {
    const user = sessionStorage.getItem("user");
    const welcomeMsg = document.getElementById("welcomeMsg");
    const loginNav = document.getElementById("loginNav");
    const userDropdown = document.getElementById("userDropdown");

    if (user) {
        if (welcomeMsg) welcomeMsg.textContent = `Welcome, ${user}`;
        if (userDropdown) userDropdown.classList.remove("d-none");
        if (loginNav) loginNav.classList.add("d-none");
    } else {
        if (userDropdown) userDropdown.classList.add("d-none");
        if (loginNav) loginNav.classList.remove("d-none");
    }
}

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
    updateNavbar();
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            sessionStorage.removeItem("user");
            window.location.href = "login.html";
        });
    }
});

// Export for use in TS files if needed
window.AuthGuard = AuthGuard;
