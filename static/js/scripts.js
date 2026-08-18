const button = document.getElementById("addThoughtBtn");
const main = document.getElementById("main");
const backBtn = document.getElementById("backBtn");
const titleInput = document.getElementById("titleInput")
const contentInput = document.getElementById("contentInput");
const clearButton = document.getElementById("clrBtn");
const confirmBox = document.getElementById("clearPopup");
const popupBox = document.getElementById("popupBox");
const cancelBtn = document.getElementById("cancelBtn");
const confirmClear = document.getElementById("confirmClear");
const saveThoughtBtn = document.getElementById("saveThoughtBtn");
const savePopup = document.getElementById("savePopup");
const emptyContentPopup = document.getElementById("emptyContent");
const loadedList = document.querySelector(".loaded-list");
const emptyList = document.querySelector(".empty-list");

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

saveThoughtBtn.addEventListener("click", function (){
    if (titleInput.value != ("") & contentInput.value != ("")){
        fetch("/save", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title : titleInput.value,
                content : contentInput.value
            })
        })
        .then(response => response.text()).then(result => {
            console.log(result)

            loadThoughts();
        });

        contentInput.value = "";
        titleInput.value = "";

        main.classList.remove("expanding");
        loadedList.classList.remove("hide");

        savePopup.classList.add("show");

        setTimeout(() => {
            savePopup.classList.remove("show");
        }, 2000);
    } else{
        emptyContentPopup.classList.add("true");

        const emptyContentBoxButton = document.getElementById("emptyContentBoxButton");
        const noContentBox = document.getElementById("noContentBox");
        
        noContentBox.addEventListener("click", function (event){
            event.stopPropagation();
        });
        emptyContentBoxButton.addEventListener("click", function (){
            emptyContentPopup.classList.remove("true");
        });
        emptyContentPopup.addEventListener("click", function (){
            emptyContentPopup.classList.remove("true");
        });
    };
});


function loadThoughts(){
    fetch('/thoughts').then(response => response.json()).then(thoughts => {
        
        loadedList.innerHTML = "";

        thoughts.forEach(thought => {
            const card = document.createElement("div");
            card.classList.add("thought-card");

            const contentTitle = document.createElement("h3");
            contentTitle.textContent = thought.title;

            const content = document.createElement("p");
            content.textContent = thought.content;

            card.appendChild(contentTitle);
            card.appendChild(content);

            loadedList.appendChild(card);
        });
        if (thoughts.length === 0) {
            loadedList.classList.add("hide");
            
        } else {
            emptyList.classList.add("hide");
            button.addEventListener("click", function () {
                loadedList.classList.add("hide");
            });

            backBtn.addEventListener("click", function (){
                loadedList.classList.remove("hide");
            });
        };
    });
}
loadThoughts(); 