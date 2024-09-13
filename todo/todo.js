// todo.js
export function createTodo(title, description, dueDate, priority, notes = '', checklist = []) {
    return {
        title,
        description,
        dueDate,
        priority,
        notes,
        checklist,
        complete: false,
        toggleComplete() {
            this.complete = !this.complete;
        }
    };
}
