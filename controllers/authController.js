const jwt = require('jsonwebtoken');
const User = require('../models/User');
const e = require('express');

// 注册新用户
exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    const newUser = await User.create({
      username,
      email,
      password
    });

    // 创建token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(201).json({
      status: 'success',
      token,
      data: {
        user: newUser
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    });
  }
};

// 用户登录
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. 检查邮箱和密码是否存在
    if (!email || !password) {
      throw new Error('请输入邮箱和密码');
    }

    // 2. 检查用户是否存在
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      throw new Error('邮箱或密码错误');
    }

    // 3. 验证密码
    const isCorrect = await user.correctPassword(password, user.password);
    if (!isCorrect) {
      throw new Error('邮箱或密码错误');
    }

    // 4. 创建token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    });

    res.status(200).json({
      status: 'success',
      token,
      data: {
        id: user._id,
        name: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    });
  }
};

exports.loginout = async (req, res) => {
  try {
    // 清除token
    res.status(200).json({
      status: 'success',
      message: '用户已登出'
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    });
  }
}