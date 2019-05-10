export const TODO_ITEMS_KEY = "todoItems";

export const generateTodoItem = (title, priority) => {
    return {
        title,
        priority,
        createdAt: (new Date()).getTime(),
        active: false,
        done: false
    }
};