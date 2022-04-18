const input = document.querySelector("input[type='text']"),
    todos = document.querySelector(".todos"),
    saveBtn = document.querySelector(".save"),
    clearBtn = document.querySelector(".clear"),
    helpBtn = document.querySelector(".showTips"),
    tips = document.querySelector('.tips'),
    overlay = document.querySelector('#overlay'),
    delLiBtn = document.querySelectorAll('.delLi');
let tasks = [];
// Работа с кнопками
saveBtn.addEventListener('click', () => {
    if (input.value.length <= 35 && input.value.length >= 3) {
        tasks.push({
            text: input.value,
            checked: false
        })
        saveTasks();
        getTasks();
        generateTasks();
    } else if (input.value.length < 3) {
        alert('The minimum task length is 3 characters');
        input.value = '';
    } else {
        alert('Max length - 42 symbols');
        input.value = '';
    }
});
clearBtn.addEventListener('click', () => {
    tasks = [];
    saveTasks();
    getTasks();
    generateTasks();
});
helpBtn.addEventListener('click', (event) => {
    if (event.target.className == 'showTips') {
        event.target.classList.add('active');
        overlay.style = 'display: block;';
    } else {
        overlay.style = 'display: none;';
        event.target.classList.remove('active');
    }
});

function getTasks() {
    tasks = JSON.parse(localStorage.getItem('tasks')) || [];
}

function generateTasks() {
    todos.innerHTML = '';
    tasks.forEach((task, index) => {
        todos.innerHTML += `
        <li class="${task.checked ? 'checked' : ''}">
        <img class="checkmark" src="./img/checkmark.png" alt="checkmark" onclick="checkTask(${index})">
        <p class="todo-text">${task.text}</p>
        <img class="trashcan" src="./img/TrashCan.png" alt="trashcan" onclick="removeTask(${index})">
        </li>`
    });
    input.value = '';
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function checkTask(index) {
    tasks[index].checked = !tasks[index].checked;
    saveTasks();
    getTasks();
    generateTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    getTasks();
    generateTasks();
}

getTasks();
generateTasks();
//
