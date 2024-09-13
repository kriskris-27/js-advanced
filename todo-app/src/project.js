export function createProject(name) {
    const todos = [];

    return {
        name,
        todos,
        addTodo(todo) {
            this.todos.push(todo);
        },
        removeTodo(todoTitle) {
            this.todos = this.todos.filter(todo => todo.title !== todoTitle);
        },
        getTodos() {
            return this.todos;
        }
    };
}
