const Todo = require('../models/Todo');

// Create a new to-do
exports.createTodo = async (req, res) => {
    try {
        const todo = await Todo.create(req.body);
        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: 'Error creating to-do', error });
    }
};

// Get all to-dos
exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving to-dos', error });
    }
};

// Get a specific to-do by ID
exports.getTodoById = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'To-do not found' });
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving to-do', error });
    }
};

// Update a to-do by ID
exports.updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!todo) return res.status(404).json({ message: 'To-do not found' });
        res.status(200).json(todo);
    } catch (error) {
        res.status(400).json({ message: 'Error updating to-do', error });
    }
};

// Delete a to-do by ID
exports.deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findByIdAndDelete(req.params.id);
        if (!todo) return res.status(404).json({ message: 'To-do not found' });
        res.status(200).json({ message: 'To-do deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting to-do', error });
    }
};
