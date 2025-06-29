const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 保护路由中间件
exports.protect = async (req, res, next) => {
  try {
    // 1. 获取token
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        status: 'fail',
        message: '您尚未登录，请先登录'
      });
    }

    // 2. 验证token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. 检查用户是否存在
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        status: 'fail',
        message: '该用户已不存在'
      });
    }

    // 4. 将用户信息添加到请求对象
    req.user = currentUser;
    next();
  } catch (err) {
    res.status(401).json({
      status: 'fail',
      message: '无效的token'
    });
  }
};