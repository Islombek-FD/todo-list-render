const elForm = document.querySelector('.todo-form');
const elInput = document.querySelector('.todo-input');
const elBtnGroup = document.querySelector('.btn-group');
const elTodoList = document.querySelector('.todo-list');

const elAllBtn = document.querySelector('.todo-all__btn');
const elCompletedBtn = document.querySelector('.todo-completed__btn');
const elUncompletedBtn = document.querySelector('.todo-uncompleted__btn');

const elAllBadge = document.querySelector('.todo-all__badge');
const elCompletedBadge = document.querySelector('.todo-completed__badge');
const elUncompletedBadge = document.querySelector('.todo-uncompleted__badge');

const localStorageTodos = JSON.parse(window.localStorage.getItem('todos'));

const todos = localStorageTodos || [];

function renderSaveTodos() {
	renderTodos(todos, elTodoList);
	window.localStorage.setItem('todos', JSON.stringify(todos));
}

renderSaveTodos();

elTodoList.addEventListener('click', (evt) => {

    if (evt.target.matches('.todo-delete-btn')) {
        const todoId = Number(evt.target.dataset.todoId);
        const foundTodoIndex = todos.findIndex(todo => todo.id === todoId);
        todos.splice(foundTodoIndex, 1);

        renderSaveTodos();
    }
    else if (evt.target.matches('.todo-checkbox')) {
        const todoId = Number(evt.target.dataset.todoId);
        const foundTodo = todos.find(todo => todo.id === todoId);
        foundTodo.isCompleted = !foundTodo.isCompleted;

        renderSaveTodos();
    }
})

function renderTodos(arr, node) {
    node.innerHTML = null;

    elAllBadge.textContent = todos.length;
    elCompletedBadge.textContent = todos.filter(todo => todo.isCompleted === true).length;
    elUncompletedBadge.textContent = todos.filter(todo => todo.isCompleted === false).length;

    arr.forEach(todo => {
        const todoLi = document.createElement('li');
        const todoButton = document.createElement('button');
        const todoLabel = document.createElement('label');
        const todoCheckbox = document.createElement('input');

        todoLi.textContent = todo.title;
        todoButton.textContent = 'Delete';

        todoLi.classList.add('todo-item');
        todoButton.classList.add('todo-delete-btn');
        todoLabel.classList.add('todo-label');
        todoCheckbox.classList.add('todo-checkbox');
        todoCheckbox.type = 'checkbox';
        todoLabel.dataset.todoId = todo.id;
        todoButton.dataset.todoId = todo.id;
        todoCheckbox.dataset.todoId = todo.id;

        if (todo.isCompleted) {
            todoCheckbox.checked = true;
            todoLabel.classList.add('todo-label--checked');
            todoLi.style.color = 'green';
        }

        todoLabel.appendChild(todoCheckbox);

        todoLi.appendChild(todoLabel);
        todoLi.appendChild(todoButton);

        node.appendChild(todoLi);
    })
}

elForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const elInputValue = elInput.value.trim();

    const newTodo = {
        id: todos[todos.length - 1]?.id + 1 || 0,
        title: elInputValue,
        isCompleted: false,
    }

    todos.push(newTodo);
    renderSaveTodos();

    elInput.value = null;
})

elBtnGroup.addEventListener('click', (evt) => {
    const isAllBtn = evt.target.matches('.todo-all__btn') || evt.target.matches('.todo-all__badge');
    const isCompletedBtn = evt.target.matches('.todo-completed__btn') || evt.target.matches('.todo-completed__badge');
    const isUncompletedBtn = evt.target.matches('.todo-uncompleted__btn') || evt.target.matches('.todo-uncompleted__badge');

    if (isAllBtn) {
        renderTodos(todos, elTodoList);
    }
    else if (isCompletedBtn) {
        const filterCompleted = todos.filter(todo => todo.isCompleted === true);
        renderTodos(filterCompleted, elTodoList);
    }
    else if (isUncompletedBtn) {
        const filterUncompleted = todos.filter(todo => todo.isCompleted === false);
        renderTodos(filterUncompleted, elTodoList);
    }
})