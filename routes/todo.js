const express = require("express");
const {
  getTodos,
  postTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

router.get("/", getTodos);
router.post("/", postTodo);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

module.exports = router;
