document.getElementById("task-form").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get input values
    let taskName = document.getElementById("task-input").value;
    let dueDate = document.getElementById("due-date").value;
    let creationDate = new Date().toLocaleString(); // Capture current date & time

    // Create task element
    let taskElement = document.createElement("div");
    taskElement.classList.add("task-item");
    taskElement.innerHTML = `
        <p><strong>Task:</strong> ${taskName}</p>
        <p><strong>Created:</strong> ${creationDate}</p>
        <p><strong>Due:</strong> ${dueDate}</p>
        <button class="complete-btn">Mark as Complete</button>
    `;

    // Append to Ongoing Tasks
    document.getElementById("ongoing-task-list").appendChild(taskElement);

    // Add event listener for the "Mark as Complete" button
    taskElement.querySelector(".complete-btn").addEventListener("click", function() {
        // Move the task to the Completed Tasks section
        document.getElementById("completed-task-list").appendChild(taskElement);

        // Update button text to indicate task is complete
        this.textContent = "Completed";
        this.disabled = true;  // Disable the button after task completion
    });

    // Clear form inputs
    document.getElementById("task-input").value = "";
    document.getElementById("due-date").value = "";
});
