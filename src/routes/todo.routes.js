const express = require("express");
const TodoController = require("../controllers/todo.controller");

const router = express.Router();
const todoController = new TodoController();

router.post("/", async (req, res) => todoController.createTodo(req, res));
router.get("/", async (req, res) => todoController.fetchTodos(req, res));

module.exports = router;
