// script.ts

// Get required elements from index.html
const enterTask = document.getElementById('input-task') as HTMLInputElement;
const addTaskButton = document.getElementById('input-task-btn') as HTMLButtonElement;
const taskFilter = document.getElementById('task-filter') as HTMLInputElement;
const taskTable = document.getElementById('task-list') as HTMLUListElement;

// Initialize the array for Task
let taskSet: string[] = JSON.parse(localStorage.getItem('taskSet')||'[]');

// Load Task when the page loads
document.addEventListener('DOMContentLoaded', updateTaskSet);

addTaskButton.addEventListener('click', addTsk);
taskFilter.addEventListener('input', filterTasks);


// Function to add a task to the set
function addTsk(): void {
    // Get inputted task value
    const taskValue: string = enterTask.value.trim();

    // Check whether the value is empty
    if (taskValue !=='') {
        // Append new task
        taskSet.push(taskValue);

        // Save to local storage
        localStorage.setItem('taskSet', JSON.stringify(taskSet));

        // Task list updated
        updateTaskSet();

        // Clear field
        enterTask.value = '';
    }
}


// Function for updating elements in the set
function updateTaskSet(): void {
    // Clear the current set to  to add only new entered task
    taskTable.innerHTML = '';

    // Use for-loop through the taskSet
    for (let i = 0; i < taskSet.length; i++) {
        // Create a new element slot
        const taksElement =  document.createElement('ul');
        taksElement.classList.add('task');

        // Create new task text element
        const taskText = document.createElement('span');
        taskText.textContent = taskSet[i];

        // Create a remove button in each element
        const removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '15px'; // Add space

        removeBtn.addEventListener('click', function() {
            // Remove task from the array
            taskSet.splice(i, 1);

            localStorage.setItem('taskSet', JSON.stringify(taskSet)); // Save xhanges
            updateTaskSet();
        });

        taksElement.appendChild(taskText);
        taksElement.appendChild(removeBtn);
        taskTable.appendChild(taksElement);
    }
}

// Function to filter tasks based on the entered letters
function filterTasks(): void {

    const filterVal: string = taskFilter.value.toLowerCase(); // For case-insensitive comparison
    const tasks = taskTable.getElementsByTagName('ul'); // Retrival of matched items

    // Check if elements matches the filter
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i].querySelector('span');

        if (task) {
            const taskText = task.textContent?.toLowerCase()||'';  // handle undefined cases
            tasks[i].style.display = taskText.includes(filterVal)?'':'none'; // Show filtered task, otherwise make it hidden
        }
    }
}