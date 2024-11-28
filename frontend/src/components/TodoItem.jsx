import React from 'react';
import { Button, Card } from 'react-bootstrap';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    // Handle the completion toggle (Mark as completed or undo)
    const handleComplete = () => {
        onUpdate(todo._id, { ...todo, completed: !todo.completed });
    };

    return (
        <Card className="mb-3">
            <Card.Body>
                {/* Title with strike-through effect when completed */}
                <Card.Title
                    style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >
                    {todo.text}  {/* Assuming `text` is the title for the todo */}
                </Card.Title>
                
                {/* Display description */}
                <Card.Text>{todo.description}</Card.Text>

                {/* Button to toggle completion */}
                <Button 
                    variant={todo.completed ? "secondary" : "success"} 
                    onClick={handleComplete}
                    aria-label={todo.completed ? "Undo completion" : "Complete task"}
                >
                    {todo.completed ? 'Undo' : 'Complete'}
                </Button>
                
                {/* Button to delete the todo */}
                <Button 
                    variant="danger" 
                    onClick={() => onDelete(todo._id)} 
                    className="ms-2"
                    aria-label="Delete task"
                >
                    Delete
                </Button>
            </Card.Body>
        </Card>
    );
};

export default TodoItem;
