import axios from 'axios';

// Adjusted API URL to include the '/api' prefix (since your backend uses '/api/todos')
const API_URL = 'https://assingment-09-todo-list-using-backend-1.onrender.com/api/todos';

export const getTodos = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;  // Return the response data (list of todos)
    } catch (error) {
        console.error('Error fetching todos:', error.response || error.message);
        throw new Error('Error fetching todos');
    }
};

export const createTodo = async (todo) => {
    try {
        // Assuming the backend expects { title: string, description: string, completed: boolean }
        const response = await axios.post(API_URL, todo, {
            headers: { 'Content-Type': 'application/json' }
        });

        return response.data;  // Return the created todo
    } catch (error) {
        console.error('Error creating todo:', error.response || error.message);
        throw new Error(error.response?.data?.message || 'Error creating todo');
    }
};

export const updateTodo = async (id, updatedTodo) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedTodo, {
            headers: { 'Content-Type': 'application/json' }
        });
        return response.data;  // Return the updated todo
    } catch (error) {
        console.error('Error updating todo:', error.response || error.message);
        throw new Error('Error updating todo');
    }
};

export const deleteTodo = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`);
        return response.data;  // Return a success message or confirmation
    } catch (error) {
        console.error('Error deleting todo:', error.response || error.message);
        throw new Error('Error deleting todo');
    }
};
