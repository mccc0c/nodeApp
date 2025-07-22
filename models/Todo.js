const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "请输入待办事项标题"],
    trim: true,
    maxlength: [100, "标题不能超过100个字符"],
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, "描述不能超过500个字符"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedDt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
