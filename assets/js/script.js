// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
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
    cardTitle.addClass('card-title').text(task.name);
    const cardDue = $('<h6>');
    cardDue.addClass('card-subtitle mb-2 text-muted').text(task.dueDate);
    const cardDescription = $('<p>');
    cardDescription.addClass('card-text').text(task.description);
    const cardDeleteBtn = $('<button>')
    cardDeleteBtn.addClass('btn btn-danger delete').text('Delete').
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    // https://jqueryui.com/datepicker/
    $( "#taskDueDate" ).datepicker();
    $('#addTaskBtn').on('click', handleAddTask());
});
