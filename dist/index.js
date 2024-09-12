"use strict";
const textInput = document.querySelector("#Todo_text");
const taskCont = document.querySelector("#task");
const addBtn = document.querySelector("#addBtn");
const errCont = document.querySelector("#errCont");
const errMsg = document.querySelector("#errMsg");
const lg_footer = document.querySelector("#lg_footer");
const sm_footer = document.querySelector("#sm_footer");
let Tasks = JSON.parse(localStorage.getItem("task") || "[]");
let editId = null;
addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        e.preventDefault();
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
    if (InputValue !== "") {
        if (editId === null) {
            const newTask = {
                id: Date.now(),
                text: InputValue,
                complete: false,
            };
            Tasks = [newTask, ...Tasks];
            localStorage.setItem("task", JSON.stringify(Tasks));
            console.log(Tasks);
        }
        if (editId) {
            Tasks = Tasks.map((task) => task.id === editId ? { ...task, text: InputValue } : task);
            console.log(Tasks);
            localStorage.setItem("task", JSON.stringify(Tasks));
            editId = null;
        }
        displayTasks(Tasks);
        textInput.value = "";
    }
    else {
        showError("Sorry, Input cannot be empty");
        return;
    }
};
const displayTasks = (Tasks) => {
    if (Tasks.length !== 0) {
        lg_footer.classList.remove("hidden");
        lg_footer.classList.add("flex");
        sm_footer.classList.remove("hidden");
        sm_footer.classList.add("block");
    }
    taskCont.innerHTML = "";
    Tasks.forEach((task) => {
        console.log(task);
        const taskListCont = document.createElement("div");
        const taskList = document.createElement("ol");
        taskList.classList.add("taskList");
        const taskText = document.createElement("li");
        taskText.classList.add("taskText");
        taskText.textContent = task.text;
        taskList.appendChild(taskText);
        if (task.complete) {
            taskText.classList.add("complete");
        }
        // COMPLETE BUTTON
        const compBtn = document.createElement("button");
        compBtn.classList.add("compBtn");
        compBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
        compBtn.onclick = () => ToggleComplete(task.id);
        taskList.appendChild(compBtn);
        // DELETE BUTTON
        const delBtn = document.createElement("button");
        delBtn.classList.add("delBtn");
        delBtn.innerHTML = '<i class="fa-regular fa-trash-can"></i>';
        delBtn.onclick = () => deleteTask(task.id);
        taskList.appendChild(delBtn);
        //   EDIT BUTTON
        const edtBtn = document.createElement("button");
        edtBtn.classList.add("edtBtn");
        edtBtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>';
        edtBtn.onclick = () => editTask(task.id);
        taskList.appendChild(edtBtn);
        const hr = document.createElement("hr");
        taskListCont.appendChild(taskList);
        hr.classList.add("hr");
        taskListCont.appendChild(hr);
        taskCont.appendChild(taskListCont);
    });
};
// TOGGLE COMPLETE TASK
const ToggleComplete = (id) => {
    Tasks = Tasks.map((task) => task.id === id ? { ...task, complete: !task.complete } : task);
    localStorage.setItem("task", JSON.stringify(Tasks));
    displayTasks(Tasks);
};
// DELETE TASK
const deleteTask = (id) => {
    Tasks = Tasks.filter((task) => task.id !== id);
    localStorage.setItem("task", JSON.stringify(Tasks));
    displayTasks(Tasks);
};
// EDIT TASK
const editTask = (id) => {
    if (textInput.value.trim() != "") {
        showError("Please Submit or clear input text first");
    }
    else {
        addBtn.textContent = "Edit Task";
        const editTask = Tasks.find((task) => task.id === id);
        editId = id;
        if (editTask)
            textInput.value = editTask.text;
        const unEditedTasks = Tasks.filter((task) => task.id !== id);
        displayTasks(unEditedTasks);
    }
};
document.addEventListener("DOMContentLoaded", () => {
    displayTasks(Tasks);
});
addBtn.onclick = () => addTask();
//# sourceMappingURL=index.js.map