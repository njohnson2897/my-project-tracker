const taskTitleEl = document.querySelector('#taskName');
const taskDueDateEl = document.querySelector('#taskDueDate');
const taskDescriptionEl = document.querySelector('#taskDescription');

const today = dayjs()




// Retrieve tasks and nextId from localStorage
function readStoredTasks() {
let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = [];
    }
    return tasks;
};

function readStoredIds() {
let nextId = JSON.parse(localStorage.getItem("nextId"));
    if(!nextID) {
        nextID = [];
    }
    return nextID;
};

// Todo: create a function to generate a unique task id
function generateTaskId() {  
    const taskID = self.crypto.randomUUID();
    return taskID;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $('<div>');
    taskCard.addClass('task-card task-card:hover card').attr('data-task-id', task.id)
    const cardBody = $('<div>');
    cardBody.addClass('card-body');
    const cardTitle = $('<h3>');
    cardTitle.addClass('card-title').text(task.name);
    const cardDue = $('<h6>');
    cardDue.addClass('card-subtitle mb-2 text-muted').text(task.dueDate);
    const cardDescription = $('<p>');
    cardDescription.addClass('card-text').text(task.description);
    const cardDeleteBtn = $('<button>')
    cardDeleteBtn.addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id)

    if(task.dueDate && task.status  !== 'done')  {
        const taskDueDate =  dayjs(task.dueDate, 'MM[/]DD[/]YYYY');
        if(today.isSame(taskDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');
        } else if (today.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }

    cardBody.append(cardTitle, cardDue, cardDescription, cardDeleteBtn);
    taskCard.append(cardBody);

    return taskCard;
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
    const tasks = readStoredTasks();
    $('#todo-cards').empty();
    $('#in-progress-cards').empty();
    $('#done-cards').empty();

    for (let task of tasks) {
        if(task.status === 'to-do') {
            $('#todo-cards').append(createTaskCard(task));
        } else if (task.status === 'in-progress')  {
            $('#in-progress-cards').append(createTaskCard(task));
        } else if (task.status === 'done') {
            $('#done-cards').append(createTaskCard(task));
        }
    }

    $('draggable').draggable({
        opacity: 0.7,
        zIndex:  2,
    });
 }

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    const newTask = {
        name: taskTitleEl.value.trim(),
        dueDate: taskDueDateEl.value,
        description: taskDescriptionEl.value,
        status: 'to-do',
        id: generateTaskId(),
    }
    const tasks = readStoredTasks();
    if (taskTitleEl.value === '' || taskDueDateEl.value === '' || taskDescriptionEl.value === '') {
        alert('Please fill out all forms');
    } else {
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}};

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
    event.preventDefault();
    const thisTaskId = $(this).attr('data-task-id');
    const tasks = readStoredTasks();

    for (let i=0; i < tasks.length; i++) {
        if (tasks[i].id === thisTaskId)  {
            tasks.splice(i, 1);
        }
    }

    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();

    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });

    $( "#taskDueDate" ).datepicker({
        changeMonth: true,
        changeYear:  true,
    });

    $('#addTaskBtn').on('click', handleAddTask);
    $('#todo-cards').on('click', 'button', handleDeleteTask);
});
