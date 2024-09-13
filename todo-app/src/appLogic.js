import { createTodo } from './todo';
import { createProject } from './project';

export const appLogic = (() => {
    let projects = JSON.parse(localStorage.getItem('projects')) || [createProject('Default')];

    const getProject = (name) => projects.find(project => project.name === name);

    const addProject = (name) => {
        const newProject = createProject(name);
        projects.push(newProject);
        saveToLocalStorage();
    };

    const addTodoToProject = (projectName, todo) => {
        const project = getProject(projectName);
        if (project) {
            project.addTodo(todo);
            saveToLocalStorage();
        }
    };

    const deleteTodoFromProject = (projectName, todoTitle) => {
        const project = getProject(projectName);
        if (project) {
            project.removeTodo(todoTitle);
            saveToLocalStorage();
        }
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('projects', JSON.stringify(projects));
    };

    return {
        addProject,
        addTodoToProject,
        deleteTodoFromProject,
        getProjects: () => projects,
        saveToLocalStorage
    };
})();
