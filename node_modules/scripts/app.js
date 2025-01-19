
"use strict";
// IIFE  , immidieately invoked functional experession
// its a function which calls itself , we dont need client side code to call , irt calls itself when its lioaded

(function () {

    function DisplayHomePage(){
        console.log(" Called DisplayHomePage()...");
        let aboutUsBtn = document.getElementById("AboutUsBtn");
        aboutUsBtn.addEventListener("click", function(){location.href="about.html";})
        // the funcytion() is a callback

    }

    function DisplayAboutPage() {
        console.log(" Called DisplayAboutPage");
    }

    function DisplayProductsPage() {
        console.log(" Called DisplayProductsPage");

    }
    function DisplayServicesPage() {
        console.log(" Called DisplayServicesPage");
    }
    function DisplayContactsPage() {
        console.log(" Called DisplayContactsPage");
    }

    function Start () {
        console.log("Start App..");

        switch(document.title){
            case "Home":
                DisplayHomePage();
                break;
            case "About":
                DisplayAboutPage();
                break;
            case "Products":
                DisplayProductsPage();
                break;
            case "Services":
                DisplayServicesPage();
                break;
            case "Contact":
                DisplayContactsPage();
                break;

        }
    }
    window.addEventListener("load", Start);



}) () // these para make a call for the function
