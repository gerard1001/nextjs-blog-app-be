const Todo = require("../models/Todo");

class TodoService {
  async saveTodo(data) {
    return await Todo.create(data);
  }

  async getTodos() {
    return await Todo.find();
  }
}

module.exports = TodoService;
