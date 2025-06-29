const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// 加载环境变量
dotenv.config({ path: './.env' });

// 导入路由
const authRoutes = require('./routes/authRoutes');
const todoRoutes = require('./routes/todoRoutes');

// 创建Express应用
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 路由
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/todos', todoRoutes);

// 数据库连接
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('数据库连接成功'))
.catch(err => console.log('数据库连接失败:', err));

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// 处理未捕获的异常
process.on('unhandledRejection', err => {
  console.log('未捕获的异常:', err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

