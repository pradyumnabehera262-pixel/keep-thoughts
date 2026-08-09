const button = document.getElementById("addThoughtBtn");
const main = document.getElementById("main");
const backBtn = document.getElementById("backBtn");
const contentInput = document.getElementById("contentInput");
const clearButton = document.getElementById("clrBtn");
const confirmBox = document.getElementById("clearPopup");
const popupBox = document.getElementById("popupBox");
const cancelBtn = document.getElementById("cancelBtn");
const confirmClear = document.getElementById("confirmClear");

button.addEventListener("click", function () {
        main.classList.add("expanding");
    });

backBtn.addEventListener("click", function (){
    main.classList.remove("expanding");
});

clearButton.addEventListener("click", function (){
    confirmBox.classList.add("overlay-popup");
});

confirmBox.addEventListener("click", function (){
    confirmBox.classList.remove("overlay-popup");
});

popupBox.addEventListener("click", function (event){
    event.stopPropagation();
});

cancelBtn.addEventListener("click", function (){
    confirmBox.classList.remove("overlay-popup");
});

confirmClear.addEventListener("click", function (){
    contentInput.value = "";
    confirmBox.classList.remove("overlay-popup");

});