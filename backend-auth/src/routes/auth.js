const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User'); // Đảm bảo model đúng

// Đăng ký
router.post('/register', async (req, res) => {
  try {
    const { email, password, phone } = req.body;

    if (!email || !password || !phone) {
      return res.status(400).json({ message: 'Vui lòng điền đầy đủ thông tin' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email đã được đăng ký' });
    }

    console.log('📥 Mật khẩu người dùng nhập:', password);

    const hashedPassword = await bcrypt.hash(password, 10);

    console.log('🔐 Mật khẩu đã mã hóa:', hashedPassword);
    console.log('Hashed password:', hashedPassword);
    const newUser = new User({
      email,
      password: hashedPassword,
      phone,
      role: email === 'admin@example.com' ? 'admin' : 'user', // mặc định
    });

    await newUser.save();
    console.log('💾 Mật khẩu được lưu vào DB:', newUser.password);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Lỗi register:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Đăng nhập
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Sai email hoặc mật khẩu' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'your_secret_key', // Nên lưu vào biến môi trường .env
      { expiresIn: '5m' } // Token chỉ sống 5 phút
    );

    res.json({ token, role: user.role });
  } catch (err) {
    res.status(500).json({ message: 'Lỗi máy chủ' });
  }
});



module.exports = router;
