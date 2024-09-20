import "./styles.css";

interface Task {
  id: number;
  text: string;
  complete: boolean;
}

const textInput = document.querySelector("#Todo_text") as HTMLInputElement;
const taskCont = document.querySelector("#task") as HTMLDivElement;
const addBtn = document.querySelector("#addBtn") as HTMLButtonElement;
const errCont = document.querySelector("#errCont") as HTMLDivElement;
const errMsg = document.querySelector("#errMsg") as HTMLParagraphElement;
const lg_footer = document.querySelector("#lg_footer") as HTMLDivElement;
const sm_footer = document.querySelector("#sm_footer") as HTMLDivElement;
const showAll = document.querySelector("#showAll") as HTMLAnchorElement;
const ft_showAll = document.querySelector("#ft_showAll") as HTMLAnchorElement;
const showComp = document.querySelector("#showComp") as HTMLAnchorElement;
const ft_showComp = document.querySelector("#ft_showComp") as HTMLAnchorElement;
const clearComp = document.querySelector("#clearCompTask") as HTMLAnchorElement;
const active = document.querySelector("#active") as HTMLAnchorElement;
const ft_active = document.querySelector("#ft_active") as HTMLAnchorElement;
const noCompTask = document.querySelector(
  "#noCompTask"
) as HTMLParagraphElement;

let Tasks: Task[] = JSON.parse(localStorage.getItem("task") || "[]");
let editId: number | null = null;

// SET THE NUMBER OF TASKS
const setNoofTask = () => {
  const compTasks: Task[] = Tasks.filter((task) => task.complete !== true);
  const numCompTasks = compTasks.length;
  noCompTask.textContent = `${numCompTasks} tasks left`;
};
setNoofTask();

// DISPLAY FOOTER ACCORDINGLY
const setDisplayFooter = () => {
  const tasksLength = Tasks.length;
  if (tasksLength !== 0) {
    lg_footer.classList.remove("hidden");
    lg_footer.classList.add("flex");
    sm_footer.classList.remove("hidden");
    sm_footer.classList.add("block");
  } else {
    lg_footer.classList.add("hidden");
    lg_footer.classList.remove("flex");
    sm_footer.classList.add("hidden");
    sm_footer.classList.remove("block");
  }
};
setDisplayFooter();

// CALL THE ADDTASK FUNCTION WHEN ENTER KEY IS PRESSED
addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

const showError = (message: string): void => {
  errMsg.textContent = message;
  errCont.classList.remove("hidden");
  errCont.classList.add("flex");
  setTimeout(() => {
    errCont.classList.remove("flex");
    errCont.classList.add("hidden");
  }, 2000);
};

const addTask = (): void => {
  addBtn.textContent = "Add Task";
  const InputValue: string = textInput.value.trim();
  if (InputValue !== "") {
    if (editId === null) {
      const newTask: Task = {
        id: Date.now(),
        text: InputValue,
        complete: false,
      };
      Tasks = [newTask, ...Tasks];
      localStorage.setItem("task", JSON.stringify(Tasks));
      setDisplayFooter();
      setNoofTask();
    }
    if (editId) {
      Tasks = Tasks.map((task) =>
        task.id === editId ? { ...task, text: InputValue } : task
      );
      localStorage.setItem("task", JSON.stringify(Tasks));
      editId = null;
      setDisplayFooter();
      setNoofTask();
    }
    displayTasks(Tasks);
    textInput.value = "";
  } else {
    showError("Sorry, Input cannot be empty");
    return;
  }
};

const displayTasks = (Tasks: Task[]): void => {
  taskCont.innerHTML = "";
  Tasks.forEach((task) => {
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
  setDisplayFooter();
  setNoofTask();
};

// TOGGLE COMPLETE TASK
const ToggleComplete = (id: number): void => {
  Tasks = Tasks.map((task) =>
    task.id === id ? { ...task, complete: !task.complete } : task
  );
  localStorage.setItem("task", JSON.stringify(Tasks));
  displayTasks(Tasks);
};

// DELETE TASK
const deleteTask = (id: number): void => {
  Tasks = Tasks.filter((task) => task.id !== id);
  localStorage.setItem("task", JSON.stringify(Tasks));
  displayTasks(Tasks);
};

// EDIT TASK
const editTask = (id: number): void => {
  if (textInput.value.trim() != "") {
    showError("Please Submit or clear input text first");
  } else {
    addBtn.textContent = "Edit Task";
    const editTask = Tasks.find((task) => task.id === id);
    editId = id;
    if (editTask) textInput.value = editTask.text;
    const unEditedTasks = Tasks.filter((task) => task.id !== id);
    displayTasks(unEditedTasks);
  }
};

showAll.onclick = (e) => {
  e.preventDefault();
  showAllTask();
};

showComp.onclick = (e) => {
  e.preventDefault();
  showCompTask();
};

active.onclick = (e) => {
  e.preventDefault();
  activeTask();
};

ft_showAll.onclick = (e) => {
  e.preventDefault();
  showAllTask();
};

ft_showComp.onclick = (e) => {
  e.preventDefault();
  showCompTask();
};

ft_active.onclick = (e) => {
  e.preventDefault();
  activeTask();
};

clearComp.onclick = (e) => {
  e.preventDefault();
  clearCompTask();
};

const showAllTask = () => {
  displayTasks(Tasks);
};

const showCompTask = () => {
  const newTasks: Task[] = Tasks.filter((task) => task.complete !== false);
  displayTasks(newTasks);
};

const activeTask = () => {
  const newTasks: Task[] = Tasks.filter((task) => task.complete !== true);
  displayTasks(newTasks);
};

const clearCompTask = () => {
  Tasks = Tasks.filter((task) => task.complete !== true);
  localStorage.setItem("task", JSON.stringify(Tasks));
  displayTasks(Tasks);
};

document.addEventListener("DOMContentLoaded", () => {
  displayTasks(Tasks);
});

addBtn.onclick = (e) => {
  e.preventDefault();
  addTask();
};
