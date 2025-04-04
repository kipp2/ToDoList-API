document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("task-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        // Get input values
        let taskName = document.getElementById("task-input").value;
        let dueDate = document.getElementById("due-date").value;
        let creationDate = new Date().toLocaleString(); // Capture current date & time

        // Send request to Flask backend
        let response = await fetch("/add-task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: taskName,
                due_date: dueDate,
                created_at: creationDate,
                status: "ongoing"
            })
        });

        let data = await response.json();

        if (response.ok) {
            console.log("Task added:", data);
            loadTasks(); // Reload tasks from backend
        } else {
            console.error("Error adding task:", data.error);
        }

        // Clear form inputs
        document.getElementById("task-input").value = "";
        document.getElementById("due-date").value = "";
    });

    async function loadTasks() {
        try {
            let response = await fetch("/tasks"); // Fetch tasks from Flask
            let tasks = await response.json();

            let ongoingTasksContainer = document.getElementById("ongoing-task-list");
            let completedTasksContainer = document.getElementById("completed-task-list");

            ongoingTasksContainer.innerHTML = "";  // Clear the task list
            completedTasksContainer.innerHTML = "";

            tasks.forEach(task => {
                let taskElement = document.createElement("div");
                taskElement.classList.add("task-item");
                taskElement.innerHTML = `
                    <p><strong>Task:</strong> ${task.name}</p>
                    <p><strong>Created:</strong> ${task.created_at}</p>
                    <p><strong>Due:</strong> ${task.due_date}</p>
                    ${task.status === "ongoing" ? `<button onclick="markTaskAsComplete(${task.id})">Mark as Complete</button>` : ""}
                `;

                if (task.status === "ongoing") {
                    ongoingTasksContainer.appendChild(taskElement);
                } else {
                    completedTasksContainer.appendChild(taskElement);
                }
            });
        } catch (error) {
            console.error("Error loading tasks:", error);
        }
    }

    async function markTaskAsComplete(taskId) {
        try {
            let response = await fetch(`/complete-task/${taskId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" }
            });

            let data = await response.json();
            if (response.ok) {
                console.log("Task marked as complete:", data);
                loadTasks();  // Reload tasks
            } else {
                console.error("Error updating task:", data.error);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    loadTasks(); // Load tasks on page load
});
