// Select Elements
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const searchInput = document.getElementById("searchInput");
const themeColor = document.getElementById("themeColor");

const total = document.getElementById("total");
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");

// Load Tasks
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add Task
addBtn.addEventListener("click", () => {

    const text = taskInput.value.trim();

    if (text === "") return;

    tasks.push({
        name: text,
        done: false
    });

    taskInput.value = "";

    saveTasks();
});

// Save
function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));

    displayTasks();
}

// Display
function displayTasks() {

    taskList.innerHTML = "";

    let completeCount = 0;

    tasks.forEach((task, index) => {

        if (task.done) completeCount++;

        taskList.innerHTML += `
        <li>
            <span style="${task.done ? 'text-decoration:line-through;color:gray;' : ''}">
                ${task.name}
            </span>

            <div class="task-buttons">
                <button class="complete-btn"
                    onclick="toggleTask(${index})">
                    ✓
                </button>

                <button class="delete-btn"
                    onclick="deleteTask(${index})">
                    X
                </button>
            </div>
        </li>
        `;
    });

    total.textContent = tasks.length;
    completed.textContent = completeCount;
    pending.textContent = tasks.length - completeCount;
}

// Complete
function toggleTask(index) {

    tasks[index].done = !tasks[index].done;

    saveTasks();
}

// Delete
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();
}

// Search
searchInput.addEventListener("keyup", () => {

    const value = searchInput.value.toLowerCase();

    document.querySelectorAll("#taskList li").forEach(task => {

        task.style.display =
            task.innerText.toLowerCase().includes(value)
                ? "flex"
                : "none";
    });

});

// Theme Color
themeColor.addEventListener("input", () => {

    document.documentElement.style.setProperty(
        "--primary",
        themeColor.value
    );

});

// Load on Start
displayTasks();