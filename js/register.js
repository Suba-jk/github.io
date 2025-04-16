// register.js
// Handles user registration and stores user data in localStorage

document.addEventListener("DOMContentLoaded", function () {
    const registerForm = document.getElementById("registerForm");

    if (!registerForm) {
        console.error("registerForm not found");
        return;
    }

    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const firstName = document.getElementById("FirstName").value.trim();
        const lastName = document.getElementById("lastName").value.trim();
        const email = document.getElementById("emailAddress").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            alert("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        const usersJSON = localStorage.getItem("registeredUsers");
        const users = usersJSON ? JSON.parse(usersJSON) : [];

        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert("Email already registered. Please log in.");
            return;
        }

        const newUser = { firstName, lastName, email, password };
        users.push(newUser);
        localStorage.setItem("registeredUsers", JSON.stringify(users));

        //alert (JSON.stringify(users))
        //alert("Registration successful! Redirecting to login page.");
        window.location.href = "login.html";
    });
});
