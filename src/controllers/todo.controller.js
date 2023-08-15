const TodoService = require("../services/todo.service");

const todoService = new TodoService();

class TodoController {
  async createTodo(req, res) {
    const data = await todoService.saveTodo(req.body);
    return res.status(201).json({
      message: "Todo created",
      data,
    });
  }

  async fetchTodos(req, res) {
    const todos = await todoService.getTodos();
    return res.status(200).json({
      message: "Fetched todos",
      data: todos,
    });
  }
}

module.exports = TodoController;
