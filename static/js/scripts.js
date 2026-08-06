const button = document.getElementById("addThoughtBtn");
const main = document.getElementById("main");
const backBtn = document.getElementById("backBtn");

button.addEventListener("click", function () {
        main.classList.add("expanding");
        console.log("Button clicked, expanding class added to main.");
    });

backBtn.addEventListener("click", function (){
    main.classList.remove("expanding");
});