let inputEl = document.getElementById("inputField");
const saveBtn = document.getElementById("saveBtn");
const listBox = document.querySelector(".todoListBox");
let todoArr = [];
const dateMethod = new Date();
const dateEl = document.querySelector(".date");
const timeEl = document.querySelector(".time");

function updateTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    let timeFormat = "";
    const timeArr = [hours, minutes, seconds];
    timeArr.forEach((num, index) => {
        if (num < 10) {
            timeFormat += `0${num}`;
        } else {
            timeFormat += num;
        }
        if (index < timeArr.length - 1) {
            timeFormat += " : ";
        }
    });
    timeEl.innerHTML = timeFormat;
    dateEl.innerHTML = dateMethod.toDateString();
    setTimeout(updateTime, 1000);
}

updateTime();

let dataFromLocalStorage = JSON.parse(localStorage.getItem("storeList"));
if (dataFromLocalStorage) {
    todoArr = dataFromLocalStorage;
    renderTodo();
}

function renderTodo() {
    listBox.textContent = "";
    if (inputEl.value!== "") {
        todoArr.push(inputEl.value.trim());
        localStorage.setItem("storeList", JSON.stringify(todoArr));
    }
    if (todoArr.length > 0) {
        todoArr.forEach((list) => {
            // Your existing code for creating and appending list items goes here
        });
    }
    inputEl.value = "";
}

// Move the event listener for saveBtn outside of the renderTodo function
saveBtn.addEventListener("click", () => {
    if (inputEl.value!== "") {
        renderTodo();
    } else {
        inputEl.classList.add("warning");
        setTimeout(() => {
            inputEl.classList.remove("warning");
        }, 600);
    }
});

// Correctly place the event listener for the edit button outside of the forEach loop
document.querySelectorAll(".optionBtn").forEach((btn) => {
    btn.addEventListener("click", (event) => {
        event.stopPropagation();
        const dropDown = btn.querySelector(".dropDown");
        dropDown.classList.toggle("open");
    });
});

// Ensure the delete functionality works as expected
document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", () => {
        const listItem = btn.closest(".eachList");
        const todoText = listItem.querySelector(".listText").textContent;
        const index = todoArr.indexOf(todoText);
        if (index!== -1) {
            todoArr.splice(index, 1);
            localStorage.setItem("storeList", JSON.stringify(todoArr));
            listItem.remove();
        }
    });
});
