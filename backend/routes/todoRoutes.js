const express = require('express');
const router = express.Router();
const todoService = require('../services/todoService');

router.get('/', (req, res) => {
    const todos = todoService.getAllTodos();
    res.json(todos);
});

router.post('/', (req, res) => {
    const { title } = req.body;
    const todo = todoService.addTodo(title);
    res.status(201).json(todo);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const todo = todoService.toggleTodo(id);
    if (!todo) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    todoService.deleteTodo(id);
    res.status(204).send();
});

module.exports = router;