"use strict";
const textInput = document.querySelector("#Todo_text");
const taskList = document.querySelector("#taskCont");
const addBtn = document.querySelector("#addBtn");
const errCont = document.querySelector("#errCont");
const errMsg = document.querySelector("#errMsg");
let Tasks = JSON.parse(localStorage.getItem("task") || "[]");
console.log(Tasks);
addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        addTask();
    }
});
const showError = (message) => {
    errMsg.textContent = message;
    errCont.classList.remove("hidden");
    errCont.classList.add("flex");
    setTimeout(() => {
        errCont.classList.remove("flex");
        errCont.classList.add("hidden");
    }, 2000);
};
const addTask = () => {
    addBtn.textContent = "Add Task";
    const InputValue = textInput.value.trim();
    console.log(InputValue);
    if (InputValue === "") {
        showError("Sorry, Input can not be empty");
        return;
    }
    const newTask = { id: Date.now(), text: InputValue, complete: false };
    Tasks = [newTask, ...Tasks];
    localStorage.setItem("task", JSON.stringify(Tasks));
    displayTasks();
    textInput.value = "";
};
const displayTasks = () => {
    taskList.innerHTML = "";
    Tasks.forEach((task) => {
        console.log(task);
        const taskText = document.createElement("li");
        // taskText.classList.add("");
        taskText.textContent = task.text;
        taskList.appendChild(taskText);
        if (!task.complete) {
            taskText.classList.add("complete");
        }
        // COMPLETE BUTTON
        const compBtn = document.createElement("button");
        compBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        compBtn.onclick = () => ToggleComplete(task.id);
        taskList.appendChild(compBtn);
        // DELETE BUTTON
        const delBtn = document.createElement("button");
        delBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        delBtn.onclick = () => deleteTask(task.id);
        taskList.appendChild(delBtn);
        //   EDIT BUTTON
        const edtbtn = document.createElement("button");
        edtbtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        edtbtn.onclick = () => editTask(task.id);
        taskList.appendChild(edtbtn);
    });
};
// TOGGLE COMPLETE TASK
const ToggleComplete = (id) => {
    Tasks = Tasks.map((task) => task.id === id ? Object.assign(Object.assign({}, task), { complete: !task.complete }) : task);
    localStorage.setItem("task", JSON.stringify(Tasks));
    displayTasks();
};
// DELETE TASK
const deleteTask = (id) => {
    Tasks = Tasks.filter((task) => task.id !== id);
    localStorage.setItem("task", JSON.stringify(Tasks));
    displayTasks();
};
// EDIT TASK
const editTask = (id) => {
    if (textInput.value.trim() != "") {
        showError("Please Submit or clear input text first");
    }
    else {
        addBtn.textContent = "Edit Task";
        const editTask = Tasks.find((task) => task.id === id);
        if (editTask)
            textInput.value = editTask.text;
        Tasks = Tasks.filter((task) => task.id !== id);
    }
};
document.addEventListener("DOMContentLoaded", () => {
    displayTasks();
});
addBtn.addEventListener("click", addTask);
