const elTodoForm = document.querySelector('.todo-form');
const elTodoInput = document.querySelector('.todo-input');
const elTodoList = document.querySelector('.todo-list');
const elTodoAllBtn = document.querySelector('.todo-all__btn');
const elTodoCompBtn = document.querySelector('.todo-completed__btn');
const elTodoUnCompBtn = document.querySelector('.todo-uncompleted__btn');

let todos = [];

elTodoList.addEventListener('click', evt => {
    if (evt.target.matches('.todo-delete__btn')) {
        const todoId = Number(evt.target.dataset.todoId);
        const foundTodoIndex = todos.findIndex(todo => todo.id === todoId);
        todos.splice(foundTodoIndex, 1);
        renderTodos(todos, elTodoList);
    }
    else if (evt.target.matches('.todo-checkbox')) {
        const todoId = Number(evt.target.dataset.todoId);
        const foundTodo = todos.find(todo => todo.id === todoId);
        foundTodo.isCompleted = !foundTodo.isCompleted;
        renderTodos(todos, elTodoList);
    }
})
const elCostumLabel = document.querySelector('.todo-label');

function renderTodos(arr, node) {
    node.innerHTML = null;
    arr.forEach( todo => {
        const elTodoItem = document.createElement('li');
        const elTodoBtn = document.createElement('button');
        const elTodoLabel = document.createElement('label');
        const elTodoCheckbox = document.createElement('input');

        elTodoItem.textContent = todo.title;
        elTodoBtn.textContent = 'Delete';
        
        elTodoItem.setAttribute('class', 'todo-item');
        elTodoCheckbox.type = 'checkbox';
        elTodoLabel.setAttribute('class', 'todo-label');
        elTodoLabel.setAttribute('for', `todo-checkbox-${todo.id}`);
        elTodoBtn.classList.add('todo-delete__btn');
        elTodoCheckbox.classList.add('todo-checkbox');
        elTodoCheckbox.setAttribute('id', `todo-checkbox-${todo.id}`);
        elTodoBtn.dataset.todoId = todo.id;
        elTodoCheckbox.dataset.todoId = todo.id;

        if (todo.isCompleted) {
            elTodoCheckbox.checked = true;
            elTodoItem.style.textDecoration = 'line-through';
        }
        elTodoLabel.appendChild(elTodoCheckbox);
        elTodoItem.appendChild(elTodoLabel);
        elTodoItem.appendChild(elTodoBtn)
        node.appendChild(elTodoItem);
    });
}

let elBadgeBtn = document.createElement('strong');
elBadgeBtn.classList.add('todo-badge__btn');

elTodoForm.addEventListener('submit', evt => {
    evt.preventDefault();
    
    elBadgeBtn.textContent = todos.length + 1;
    elTodoAllBtn.appendChild(elBadgeBtn);

    const elTodoInputValue = elTodoInput.value.trim();

    const newTodo = {
        id: todos[todos.length - 1]?.id + 1 || 0,
        title: elTodoInputValue,
        isCompleted: false,
    }
    todos.push(newTodo);
    
    renderTodos(todos, elTodoList);    

    elTodoInput.value = null;
})

elTodoAllBtn.addEventListener('click', () => {
    todos = todos.filter(todo => todo.isCompleted === false || true);
    elBadgeBtn.textContent = todos.length;
    elTodoAllBtn.appendChild(elBadgeBtn);
    renderTodos(todos, elTodoList);
})

elTodoCompBtn.addEventListener('click', () => {
    const todoTrue = todos.filter(todo => todo.isCompleted === true);
    elBadgeBtn.textContent = todoTrue.length;
    elTodoCompBtn.appendChild(elBadgeBtn);
    renderTodos(todoTrue, elTodoList);
})

elTodoUnCompBtn.addEventListener('click', () => {
    const todoFalse = todos.filter(todo => todo.isCompleted === false);
    elBadgeBtn.textContent = todoFalse.length;
    elTodoUnCompBtn.appendChild(elBadgeBtn);
    renderTodos(todoFalse, elTodoList);
})