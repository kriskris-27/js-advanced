import { appLogic } from './appLogic';
import { createTodo } from './todo';

const renderProjects = () => {
    const projectList = document.getElementById('project-list');
    projectList.innerHTML = '';

    appLogic.getProjects().forEach(project => {
        const projectItem = document.createElement('div');
        projectItem.textContent = project.name;
        projectList.appendChild(projectItem);

        projectItem.addEventListener('click', () => renderTodos(project.name));
    });
};

const renderTodos = (projectName) => {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    const project = appLogic.getProjects().find(p => p.name === projectName);
    if (project) {
        project.getTodos().forEach(todo => {
            const todoItem = document.createElement('div');
            todoItem.textContent = `${todo.title} (Due: ${todo.dueDate})`;

            if (todo.priority === 'high') {
                todoItem.style.color = 'red';
            } else if (todo.priority === 'medium') {
                todoItem.style.color = 'orange';
            }

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.addEventListener('click', () => {
                appLogic.deleteTodoFromProject(projectName, todo.title);
                renderTodos(projectName);
            });

            todoItem.appendChild(deleteBtn);
            todoList.appendChild(todoItem);
        });
    }
};

const setupUI = () => {
    document.getElementById('add-project-btn').addEventListener('click', () => {
        const projectName = prompt('Enter project name:');
        if (projectName) {
            appLogic.addProject(projectName);
            renderProjects();
        }
    });

    document.getElementById('add-todo-btn').addEventListener('click', () => {
        const title = prompt('Enter todo title:');
        const description = prompt('Enter todo description:');
        const dueDate = prompt('Enter due date (YYYY-MM-DD):');
        const priority = prompt('Enter priority (low, medium, high):');
        const projectName = prompt('Enter project name to add todo:');

        const newTodo = createTodo(title, description, dueDate, priority);
        appLogic.addTodoToProject(projectName, newTodo);
        renderTodos(projectName);
    });

    renderProjects();
};

export { setupUI };
