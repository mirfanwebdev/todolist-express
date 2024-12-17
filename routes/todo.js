const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.resolve(__dirname, "../db/todos.json");

// utility to read/write data
const readData = () => JSON.parse(fs.readFileSync(dbPath, "utfs-8"));
const writeData = (data) => {
  return fs.writeFileSync(dbPath, JSON.stringify(data), null, 2);
};

// get all todo items
router.get("/", (req, res) => {
  const todos = readData();
  res.json(todos);
});

// add a new todo item
router.post("/", (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).json({ error: "task is required" });

  const todos = readData();
  const newTodo = { id: Date.now(), task, completed: false };
  todos.push(newTodo);

  writeData(todos);
  res.status(201).json({ message: "task added successfully", todo: newTodo });
});

// update a todo item
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  const todos = readData();
  const todoIndex = todos.findIndex((todo) => todo.id == id);
  if (todoIndex === -1) {
    return res.status(404).json({ error: "todo not found" });
  }

  todos[todoIndex] = { ...todos[todoIndex], task, completed };
  writeData(todos);

  res
    .status(200)
    .json({ message: "todo updated successfully", todo: todos[todoIndex] });
});

// delete a todo item
router.delete(":/id", (req, res) => {
    const { id } = req.params;
    
    const todos = readData();
    const filteredTodos = todos.filter((todo) => todo.id != id);

    if (todos.length === filteredTodos.length) {
        return res.status(404).json({ error: "todo not found" });
    }

    writeData(filteredTodos);
    res.status(204).send();
})

module.exports = router;