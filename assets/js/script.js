const taskTitleEl = document.querySelector('#taskName');
const taskDueDateEl = document.querySelector('#taskDueDate');
const taskDescriptionEl = document.querySelector('#taskDescription');



// Retrieve tasks and nextId from localStorage
function readStoredTasks() {
let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = [];
    }
    return tasks;
};

let nextId = JSON.parse(localStorage.getItem("nextId"));

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>');
    taskCard.addClass('task-card task-card:hover card');
    const cardBody = $('<div>');
    cardBody.addClass('card-body');
    const cardTitle = $('<h5>');
    cardTitle.addClass('card-title').text(tasks.name);
    const cardDue = $('<h6>');
    cardDue.addClass('card-subtitle mb-2 text-muted').text(tasks.dueDate);
    const cardDescription = $('<p>');
    cardDescription.addClass('card-text').text(tasks.description);
    const cardDeleteBtn = $('<button>')
    cardDeleteBtn.addClass('btn btn-danger delete').text('Delete').attr('id', "cardDeleteBtn")

    cardBody.append(cardTitle, cardDue, cardDescription, cardDeleteBtn);
    taskCard.append(cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const newTask = {
        name: taskTitleEl.value.trim(),
        dueDate: taskDueDateEl.value,
        description: taskDescriptionEl.value,
    }
    const tasks = readStoredTasks();
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // renderTaskList();
    $( "#taskDueDate" ).datepicker({
        changeMonth: true,
        changeYear:  true,
    });
    $('#addTaskBtn').on('click', handleAddTask);
    $('#cardDeleteBtn').on('click', handleDeleteTask)
});
