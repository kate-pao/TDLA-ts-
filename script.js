// script.ts
// Get required elements from index.html
var enterTask = document.getElementById('input-task');
var addTaskButton = document.getElementById('input-task-btn');
var taskFilter = document.getElementById('task-filter');
var taskTable = document.getElementById('task-list');
// Initialize the array for Task
var taskSet = JSON.parse(localStorage.getItem('taskSet') || '[]');
// Load Task when the page loads
document.addEventListener('DOMContentLoaded', updateTaskSet);
addTaskButton.addEventListener('click', addTsk);
taskFilter.addEventListener('input', filterTasks);
// Function to add a task to the set
function addTsk() {
    // Get inputted task value
    var taskValue = enterTask.value.trim();
    // Check whether the value is empty
    if (taskValue !== '') {
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
function updateTaskSet() {
    // Clear the current set to  to add only new entered task
    taskTable.innerHTML = '';
    var _loop_1 = function (i) {
        // Create a new element slot
        var taksElement = document.createElement('ul');
        taksElement.classList.add('task');
        // Create new task text element
        var taskText = document.createElement('span');
        taskText.textContent = taskSet[i];
        // Create a remove button in each element
        var removeBtn = document.createElement('button');
        removeBtn.classList.add('remove-btn');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '15px'; // Add space
        removeBtn.addEventListener('click', function () {
            // Remove task from the array
            taskSet.splice(i, 1);
            localStorage.setItem('taskSet', JSON.stringify(taskSet)); // Save xhanges
            updateTaskSet();
        });
        taksElement.appendChild(taskText);
        taksElement.appendChild(removeBtn);
        taskTable.appendChild(taksElement);
    };
    // Use for-loop through the taskSet
    for (var i = 0; i < taskSet.length; i++) {
        _loop_1(i);
    }
}
// Function to filter tasks based on the entered letters
function filterTasks() {
    var _a;
    var filterVal = taskFilter.value.toLowerCase(); // For case-insensitive comparison
    var tasks = taskTable.getElementsByTagName('ul'); // Retrival of matched items
    // Check if elements matches the filter
    for (var i = 0; i < tasks.length; i++) {
        var task = tasks[i].querySelector('span');
        if (task) {
            var taskText = ((_a = task.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || ''; // Undetified cases check
            if (taskText.includes(filterVal)) {
                tasks[i].style.display = ''; // Show matched tasks
            }
            else {
                tasks[i].style.display = 'none'; // Hide non-matched task
            }
        }
        else {
            tasks[i].style.display = 'none'; // Hide by default
        }
    }
}
