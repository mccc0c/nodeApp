const express = require('express');
const todoController = require('../controllers/todoController');
const auth = require('../middleware/auth');

const router = express.Router();

// 保护所有以下路由
router.use(auth.protect);

router.route('/getAllTodos').post(todoController.getAllTodos)
router.route('/createTodo').post(todoController.createTodo);

router.route('/deleteTodo').post(todoController.deleteTodo);
router.route('/updateTodo').post(todoController.updateTodo)
  

module.exports = router;