let inputEl = document.getElementById("inputField");
const saveBtn = document.getElementById("saveBtn");
const listBox = document.querySelector(".todoListBox");
let todoArr = [];
const dateMethod = new Date();
const dateEl = document.querySelector(".date");
const timeEl = document.querySelector(".time");
const success = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#008000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> Activity Added Successfully!';
const error = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
Please add Activity!`;
const del = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#f00" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
Activity Deleted Successfully!`
function showToast(msg) {
    const toastBox = document.querySelector(".toastBox");
    const toast = document.createElement("div");
    toast.classList.add("toast")
    toastBox.append(toast)
    toast.innerHTML = msg;
    if(msg.includes("Please")) {
        toast.classList.add("error")
    }
    if(msg.includes("Deleted")) {
        toast.classList.add("error")
    }
setTimeout(() => {
    toast.remove()
},5000)
}

function updateTime() {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
    let timeFormat = "";
    // const formattedTime = [hours, minutes, seconds].map(num => num < 10 ? '0' + num : num).join(" : ");
    // const formattedTime = `${hours} : ${minutes} : ${seconds}`
    const timeArr = [hours, minutes, seconds];
    timeArr.forEach((num, index)=> {
        if(num < 10) {
            timeFormat += `0${num}`
        } else {
            timeFormat += num
        } if(index < timeArr.length - 1) {
            timeFormat += " : "
        }
    })
    timeEl.innerHTML = timeFormat
    dateEl.innerHTML  = dateMethod.toDateString()
    setTimeout(updateTime, 1000);
}

updateTime();


let dataFromLocalStorage = JSON.parse(localStorage.getItem("storeList"))
if(dataFromLocalStorage) {
        todoArr = dataFromLocalStorage;
        renderTodo()
    }

function renderTodo() {
        listBox.textContent = "";
        if(inputEl.value !== "") {
        todoArr.push(inputEl.value.trim());
            localStorage.setItem("storeList", JSON.stringify(todoArr))
        }if (todoArr.length > 0) {
                todoArr.forEach((list) => {
                    const optionIcon = `<?xml version="1.0" encoding="iso-8859-1"?>
                    <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                    <svg fill="#ffffff" height="20px" width="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
                         viewBox="0 0 32.055 32.055" xml:space="preserve">
                    <g>
                        <path d="M3.968,12.061C1.775,12.061,0,13.835,0,16.027c0,2.192,1.773,3.967,3.968,3.967c2.189,0,3.966-1.772,3.966-3.967
                            C7.934,13.835,6.157,12.061,3.968,12.061z M16.233,12.061c-2.188,0-3.968,1.773-3.968,3.965c0,2.192,1.778,3.967,3.968,3.967
                            s3.97-1.772,3.97-3.967C20.201,13.835,18.423,12.061,16.233,12.061z M28.09,12.061c-2.192,0-3.969,1.774-3.969,3.967
                            c0,2.19,1.774,3.965,3.969,3.965c2.188,0,3.965-1.772,3.965-3.965S30.278,12.061,28.09,12.061z"/>
                    </g>
                    </svg>`;
                    const bulletIcon = `
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" 
                    viewBox="0 0 24 24" fill="none" stroke="#97e028" 
                    stroke-width="3" stroke-linecap="round" stroke-linejoin="round" 
                    class="feather feather-check"><polyline points="20 6 9 17 4 12">
                    </polyline>
                    </svg>
                    `;
                    
            let eachList = document.createElement("li");
            eachList.className = "eachList";

            const bullet = document.createElement("span");
            bullet.className = "bullet";
            bullet.innerHTML = bulletIcon;

            const listText = document.createElement("span");
            listText.className = "listText";

            const optionBtn = document.createElement("span");
            const dropDown = document.createElement("span");
            const editList = document.createElement("span");
            const delList = document.createElement("span");
            dropDown.className = "dropDown";
            optionBtn.className = "optionBtn";
            editList.innerHTML = "Edit";
            delList.innerHTML = "Delete";
            optionBtn.innerHTML = optionIcon;
            dropDown.append(editList);
            dropDown.append(delList);
            optionBtn.append(dropDown);
            eachList.append(bullet)
            eachList.append(listText)
            eachList.append(optionBtn)
            listText.textContent = list;
            listBox.appendChild(eachList);
           

            optionBtn.addEventListener("click", (event) => {
                event.stopPropagation();
                dropDown.classList.toggle("open");
            })

            document.querySelector("body").addEventListener("click", () => {
                if(dropDown.classList.contains("open")) {
                    dropDown.classList.toggle("open")
                    console.log("click working")
                }
            })

            editList.addEventListener("click", (event) => {
                event.stopPropagation()
                const todoTextElement = eachList.querySelector(".listText");
                const todoText = todoTextElement.textContent;
                const index = todoArr.indexOf(todoText);
                console.log(index)
                if(index !== -1) {
                    inputEl.value = todoText
                    console.log("edit btn clicked")
                }

                saveBtn.addEventListener("click", () => {
                    const editedText = inputEl.value.trim();
                    console.log(editedText)
                    if(index !== -1) {
                        todoArr[index] = editedText;
                        todoTextElement.textContent = editedText;
                        todoArr.splice(index, 1);
                        console.log(todoArr)
                        localStorage.setItem("storeList", JSON.stringify(todoArr));
                        console.log("Edited and saved:", editedText)
                    } else {
                        console.log("Empty input. Nothing to save.");
                    }
            })})

            delList.addEventListener("click", () => {
                eachList.remove()
                
                const todoText = eachList.querySelector(".listText").textContent;
            const index = todoArr.indexOf(todoText);
            if (index !== -1) {
                todoArr.splice(index, 1);
                localStorage.setItem("storeList", JSON.stringify(todoArr));
            }
            showToast(del)
            })
        })
    }
        inputEl.value = "";
    }
    
saveBtn.addEventListener("click", () => {
    if(inputEl.value !== "") {
        renderTodo()
        showToast(success)
        setTimeout(() => {
    }, 600)   
    } else {
        inputEl.classList.add("warning")
        showToast(error)
        setTimeout(() => {
            inputEl.classList.remove("warning");
        }, 600)
    }
})


