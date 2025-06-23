const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Kết nối MongoDB
mongoose.connect('mongodb://localhost:27017/Oder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Kết nối MongoDB thành công'))
.catch((err) => console.error('❌ Kết nối MongoDB thất bại:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Cho phép truy cập ảnh tĩnh trong thư mục uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/products', require('./routes/Product'));

// Khởi động server
app.listen(5000, () => {
  console.log('🚀 Server đang chạy tại http://localhost:5000');
});
