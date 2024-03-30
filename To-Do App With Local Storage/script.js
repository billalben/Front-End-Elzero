const input = document.querySelector(".input");
const submit = document.querySelector(".add");
const tasksDiv = document.querySelector(".tasks");

// empty array tp store the tasks
let arrayOfTasks = [];

// check there are tasks in local storage
if (window.localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(window.localStorage.getItem("tasks"));
}

getDataFromLocalStorage();

// Add Task
const addTask = () => {
  if (input.value.trim() !== "") {
    addTaskToArray(input.value); // add task to array of tasks
    input.value = ""; // empty input field
  }
};

submit.addEventListener("click", () => {
  addTask();
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    submit.click();
  }
});

// click on task element
tasksDiv.addEventListener("click", (e) => {
  // delete button
  if (e.target.classList.contains("del")) {
    // remove task from local storage
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));

    // remove element from page
    e.target.parentElement.remove();
  }
  // task element
  if (e.target.classList.contains("task")) {
    // toggle completed for the task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));

    // toggle task done
    e.target.classList.toggle("done");
  }
});

function addTaskToArray(taskText) {
  // task data
  const task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };

  // push task to array of tasks
  arrayOfTasks.push(task);

  // add task to page
  addElementsToPageFrom(arrayOfTasks);

  // add tasks to local storage
  addDataToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  // empty task div
  tasksDiv.textContent = "";
  // looping on array of tasks
  arrayOfTasks.forEach((task) => {
    // create main div
    let div = document.createElement("div");
    div.classList.add("task");

    // check if task is done
    if (task.completed) {
      div.classList.add("done");
    }

    div.setAttribute("data-id", task.id);
    div.appendChild(document.createTextNode(task.title));

    // create delete button
    let span = document.createElement("span");
    span.classList.add("del");
    span.appendChild(document.createTextNode("Delete"));

    // create button to main div
    div.appendChild(span);

    // add task div to tasks container
    tasksDiv.appendChild(div);
  });
}

function addDataToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId)
  addDataToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}