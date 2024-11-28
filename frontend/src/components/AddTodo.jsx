import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const AddTodo = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title) {
            alert('Title is required!');
            return;
        }
        const newTodo = { title, description };
        onAdd(newTodo);  // Pass the new todo to the parent component
        setTitle('');
        setDescription('');
    };

    return (
        <Form onSubmit={handleSubmit} className="mb-3">
            <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter todo title"
                    required
                />
            </Form.Group>

            <Form.Group controlId="formDescription" className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter todo description"
                />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
                Add Todo
            </Button>
        </Form>
    );
};

export default AddTodo;
