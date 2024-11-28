const express = require('express');
const { createTodo, getTodos, getTodoById, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = express.Router();

router.post('/todos', createTodo);         // Create a new to-do
router.get('/todos', getTodos);            // Retrieve all to-dos
router.get('/todos/:id', getTodoById);     // Retrieve a specific to-do by ID
router.put('/todos/:id', updateTodo);      // Update a specific to-do by ID
router.delete('/todos/:id', deleteTodo);   // Delete a specific to-do by ID

module.exports = router;
