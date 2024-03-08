const taskTitleEl = document.querySelector('#taskName');
const taskDueDateEl = document.querySelector('#taskDueDate');
const taskDescriptionEl = document.querySelector('#taskDescription');

const today = dayjs()

// Retrieve tasks and nextId from localStorage
// a function that either accesses the tasks currently in  local storage or initializes an empty array to store them in
function readStoredTasks() {
let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = [];
    }
    return tasks;
};


// Todo: create a function to generate a unique task id
// function to create unique IDs for each task object in the array
function generateTaskId() {  
    const taskID = self.crypto.randomUUID();
    return taskID;
}

// Todo: create a function to create a task card
// function to actually create the task cards using the user inputted information
function createTaskCard(task) {
    const taskCard = $('<div>');
    taskCard.addClass('task-card task-card:hover draggable ui-widget-content card').attr('data-task-id', task.id)
    const cardBody = $('<div>');
    cardBody.addClass('card-body');
    const cardTitle = $('<h3>');
    cardTitle.addClass('card-title').text(task.name);
    const cardDue = $('<h6>');
    cardDue.addClass('card-subtitle mb-2').text(`Due on: ${task.dueDate}`);
    const cardDescription = $('<p>');
    cardDescription.addClass('card-text').text(task.description);
    const cardDeleteBtn = $('<button>')
    cardDeleteBtn.addClass('btn btn-danger delete').text('Delete').attr('data-task-id', task.id)

// this changes the color of the cards depending on the relationship between today's date and the due date
    if(task.dueDate && task.status  !== 'done')  {
        const taskDueDate =  dayjs(task.dueDate, 'MM[/]DD[/]YYYY');
        if(today.isSame(taskDueDate, 'day')) {
        taskCard.addClass('bg-warning text-white');
        } else if (today.isAfter(taskDueDate)) {
            taskCard.addClass('bg-danger text-white');
            cardDeleteBtn.addClass('border-light');
        }
    }
// appends the title, due date, description, and delete button to the body of the card and then all of that to the card as a whole
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
// for of loop that appends the cards to their proper rows depending on what status they currently have
    for (let task of tasks) {
        if(task.status === 'to-do') {
            $('#todo-cards').append(createTaskCard(task));
        } else if (task.status === 'in-progress')  {
            $('#in-progress-cards').append(createTaskCard(task));
        } else if (task.status === 'done') {
            $('#done-cards').append(createTaskCard(task));
        }
    }
// makes anything with the class ".draggable" a draggable element
    $('.draggable').draggable({
        opacity: 1,
        zIndex:  100,
    //   I got this helper function from a mini project we worked through in class
        helper: function (event) {
            const original = $(event.target).hasClass('ui-draggable')
              ? $(event.target)
              : $(event.target).closest('.ui-draggable');
            return original.clone().css({
              width: original.outerWidth(),
            });
          },
        });
      }

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    event.preventDefault();
    // creates the object that will populate the card's content.  the  to-do status means all cards will first go to To Do column
    const newTask = {
        name: taskTitleEl.value.trim(),
        dueDate: taskDueDateEl.value,
        description: taskDescriptionEl.value,
        status: 'to-do',
        id: generateTaskId(),
    }
    // if not all forms are filled out, there will be an alert, otherwise the card will be rendered
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
// for loop ensuring that only the card on which the user presses the delete button is deleted
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
    // for of loop that ensures that only the card being dragged to a new column will get a new status
    const tasks = readStoredTasks();
    const draggedID = ui.draggable.attr('data-task-id')
    const newStatus = event.target.id
    for (let task of tasks) {
        if (task.id === draggedID){
            task.status = newStatus
        }
    }
localStorage.setItem('tasks',  JSON.stringify(tasks));
renderTaskList();
}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
    renderTaskList();
// makes any element with the class ".lane" a droppable target
    $('.lane').droppable({
        accept: '.draggable',
        drop: handleDrop,
    });
// adds datepicker to due date form in modal
    $( "#taskDueDate" ).datepicker({
        changeMonth: true,
        changeYear:  true,
    });
// adds event listener to the add task button in the modal that runs handleAddTask function
    $('#addTaskBtn').on('click', handleAddTask);
// event delegation in each column for cards to be deleted
    $('#todo-cards').on('click', 'button', handleDeleteTask);
    $('#in-progress-cards').on('click', 'button', handleDeleteTask);
    $('#done-cards').on('click', 'button', handleDeleteTask);
});
