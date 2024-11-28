import React from 'react';
import PropTypes from 'prop-types'; // For prop validation
import TodoItem from './TodoItem';

const TodoList = ({ todos, onUpdate, onDelete }) => (
    <div className="container">
        {/* Check if todos array exists and has items */}
        {todos && todos.length ? (
            todos.map((todo) => (
                <TodoItem 
                    key={todo._id}  // Ensure your todos have a unique _id
                    todo={todo} 
                    onUpdate={onUpdate} 
                    onDelete={onDelete} 
                />
            ))
        ) : (
            <p className="text-center">No to-do items found. Add a new one!</p>  // Fallback message
        )}
    </div>
);

// Prop validation to ensure proper data is passed to the component
TodoList.propTypes = {
    todos: PropTypes.array.isRequired,   // todos should be an array
    onUpdate: PropTypes.func.isRequired, // onUpdate should be a function
    onDelete: PropTypes.func.isRequired  // onDelete should be a function
};

export default TodoList;
