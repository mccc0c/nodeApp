const Todo = require("../models/Todo");

// 获取所有待办事项
exports.getAllTodos = async (req, res) => {
  try {
    let payload = {
      user: req.user.id,
    };
    if (req.body.listId) {
      payload._id = { $in: req.body.listId };
    }
    const todos = await Todo.find(payload).sort({ createdAt: -1 });

    res.status(200).json({
      status: "success",
      results: todos.length,
      data: {
        todos,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// 创建待办事项
exports.createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    const newTodo = await Todo.create({
      title,
      description,
      user: req.user.id,
    });

    res.status(201).json({
      status: "success",
      data: {
        todo: newTodo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// 更新待办事项
exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.body._id, user: req.user.id },
      {
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed,
        updateDt: Date.now(),
      },
      { new: true, runValidators: true }
    );

    if (!todo) {
      throw new Error("未找到该待办事项");
    }

    res.status(200).json({
      status: "success",
      data: {
        todo,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

// 删除待办事项
exports.deleteTodo = async (req, res) => {
  try {
    const { listId, user } = req.body;
    const todo = await Todo.findOneAndDelete({ _id: listId, user: user.id });

    if (!todo) {
      throw new Error("未找到该待办事项");
    }

    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
