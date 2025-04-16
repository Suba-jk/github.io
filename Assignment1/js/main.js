"use strict";

(function () {

    function DisplayHomePage() {
        console.log("Called DisplayHomePage()...");

        let getInvolvedBtn = document.getElementById("getInvolvedBtn");
        getInvolvedBtn.addEventListener("click", function () {
            location.href = "./opportunities.html";
        });
    }
    function DisplayOpportunitiesPage() {
        console.log("Called DisplayOpportunitiesPage()...");
    }
    function DisplayAboutPage() {
        console.log("Called DisplayAboutPage()...");
    }

    function DisplayEventsPage() {
        console.log("Called DisplayEventsPage()...");
    }

    function DisplayContactPage() {
        console.log("Called DisplayContactPage()...");
    }

    function Start() {
        console.log("Start App...");

        switch(document.title) {
            case "Home":
                DisplayHomePage();
                break;
            case "Opportunities":
                DisplayOpportunitiesPage();
                break;
            case "Events":
                DisplayEventsPage();
                break;
            case "About":
                DisplayAboutPage();
                break;
            case "Contact":
                DisplayContactPage();
                break;
        }
    }
    window.addEventListener("load", Start);







}) ()