const { readData, writeData } = require("../utils/dataUtils");

// get all todo items
exports.getTodos = async (req, res) => {
  try {
    const todos = await readData();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// add a new todo item
exports.postTodo = async (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: "task is required" });
  }

  try {
    const todos = await readData();
    const newTodo = { id: Date.now(), task, completed: false };
    todos.push(newTodo);

    await writeData(todos);
    res.status(201).json({ message: "task added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// update a todo item
exports.updateTodo = async (req, res) => {
  const { id } = req.params;
  const { task, completed } = req.body;

  try {
    const todos = await readData();
    const todoIndex = todos.findIndex((todo) => todo.id == id);
    if (todoIndex == -1) {
      return res.status(404).json({ error: "todo not found" });
    }

    todos[todoIndex] = { ...todos[todoIndex], task, completed };
    await writeData(todos);
    res.status(200).json({ message: "task updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete a todo item
exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todos = await readData();
    const filteredTodos = todos.filter((todo) => todo.id != id);

    if (todos.length === filteredTodos.length) {
      return res.status(404).json({ error: "todo not found" });
    }

    await writeData(filteredTodos);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
