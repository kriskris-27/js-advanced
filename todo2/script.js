// Selecting DOM elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

// Function to load todos from local storage
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem('todos')) || [];
    todos.forEach(todo => addTodoToList(todo.text, todo.completed));
}

// Function to save todos to local storage
function saveTodos() {
    const todos = [];
    list.querySelectorAll('li').forEach(li => {
        todos.push({
            text: li.querySelector('.todo-text').textContent,
            completed: li.querySelector('.complete-checkbox').checked
        });
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Function to add a todo item to the list
function addTodoToList(text, completed = false) {
    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" class="complete-checkbox" ${completed ? 'checked' : ''}>
        <span class="todo-text">${text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;

    // Add event listeners to buttons
    const deleteBtn = li.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function() {
        list.removeChild(li);
        saveTodos();
    });

    const editBtn = li.querySelector('.edit-btn');
    editBtn.addEventListener('click', function() {
        const newText = prompt('Edit task:', li.querySelector('.todo-text').textContent);
        if (newText !== null) {
            li.querySelector('.todo-text').textContent = newText;
            saveTodos();
        }
    });

    const completeCheckbox = li.querySelector('.complete-checkbox');
    completeCheckbox.addEventListener('change', function() {
        saveTodos();
    });

    // Append the new todo item to the list
    list.appendChild(li);
}

// Add event listener to the form
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const todoText = input.value;
    if (todoText.trim() === '') return; // Prevent empty todos

    addTodoToList(todoText);
    input.value = '';
    saveTodos();
});

// Load todos on page load
loadTodos();
