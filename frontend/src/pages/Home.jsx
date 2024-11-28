import React, { useState, useEffect } from 'react';
import AddTodo from '../components/AddTodo';  // Component for adding todos
import TodoList from '../components/TodoList';  // Component for displaying the list of todos
import { getTodos, createTodo, updateTodo, deleteTodo } from '../services/api';  // API functions for CRUD operations

const Home = () => {
    const [todos, setTodos] = useState([]);  // State to store the list of todos
    const [loading, setLoading] = useState(true);  // State for loading indicator
    const [error, setError] = useState(null);  // State to handle errors
    const [successMessage, setSuccessMessage] = useState('');  // State to handle success messages

    // Fetch todos when the component mounts
    useEffect(() => {
        const loadTodos = async () => {
            try {
                const todosData = await getTodos();  // Fetch data from the backend
                if (todosData) {
                    setTodos(todosData);  // Set the todos state with the fetched data
                } else {
                    setTodos([]);  // Handle case where no todos are returned
                }
            } catch (error) {
                console.error('Error loading todos: ', error);
                setError('Failed to load todos');  // Set error state if the request fails
            } finally {
                setLoading(false);  // Set loading to false after the fetch completes
            }
        };

        loadTodos();  // Call the loadTodos function when the component mounts
    }, []);  // Empty dependency array ensures this runs only once on component mount

    // Handle adding a new todo
    const handleAdd = async (todo) => {
        const newTodo = {
            title: todo.title,  // Ensure the correct properties are being passed
            description: todo.description || '',  // Optional description
            completed: false,  // Assuming 'completed' is a boolean
        };

        try {
            const createdTodo = await createTodo(newTodo);  // Pass the correctly structured todo object
            setTodos((prevTodos) => [...prevTodos, createdTodo]);  // Add the new todo to the state
            setSuccessMessage('Todo added successfully!');
        } catch (error) {
            console.error('Error adding todo: ', error);
            setError(error.message);  // Show detailed error message
        }
    };

    // Handle updating a todo
    const handleUpdate = async (id, updatedTodo) => {
        try {
            await updateTodo(id, updatedTodo);  // Update the todo via API
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo._id === id ? { ...todo, ...updatedTodo } : todo
                )
            );  // Update the todo in the state without making a new request
        } catch (error) {
            console.error('Error updating todo: ', error);
            setError('Failed to update todo');  // Handle error during the updating process
        }
    };

    // Handle deleting a todo
    const handleDelete = async (id) => {
        try {
            await deleteTodo(id);  // Delete the todo via API
            setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));  // Remove the todo from the state
        } catch (error) {
            console.error('Error deleting todo: ', error);
            setError('Failed to delete todo');  // Handle error during the deleting process
        }
    };

    // Show loading or error messages
    if (loading) {
        return <div>Loading...</div>;  // Display a loading message while fetching todos
    }

    if (error) {
        return <div>Error: {error}</div>;  // Display the error message if any error occurred
    }

    return (
        <div className="container">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            <AddTodo onAdd={handleAdd} />  {/* Component to add a new todo */}
            <TodoList 
                todos={todos} 
                onUpdate={handleUpdate} 
                onDelete={handleDelete} 
            />  {/* Component to display and manage the list of todos */}
        </div>
    );
};

export default Home;
