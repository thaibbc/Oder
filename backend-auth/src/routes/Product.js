const express = require('express');
const multer = require('multer');
const path = require('path');
const mongoose = require('mongoose'); 
const fs = require('fs');
const router = express.Router();
const Product = require('../models/Product');

// Tạo thư mục uploads nếu chưa có
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Cấu hình lưu file bằng multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// ✅ GET tất cả sản phẩm
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi lấy sản phẩm' });
  }
});

// ✅ POST thêm sản phẩm (cho phép upload ảnh hoặc nhập link)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { name, price, description, imageUrl } = req.body;
    let imagePath = imageUrl;

    if (req.file) {
      imagePath = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const newProduct = new Product({
      name,
      price,
      description,
      imageUrl: imagePath,
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi thêm sản phẩm' });
  }
});

// ✅ PUT cập nhật sản phẩm (không upload ảnh mới)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'ID không hợp lệ' });
    }

    const { name, price, description, imageUrl } = req.body;

    let newImageUrl = imageUrl;

    if (req.file) {
      newImageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        description,
        imageUrl: newImageUrl,
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server khi cập nhật sản phẩm' });
  }
});

// ✅ DELETE xóa sản phẩm
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });

    res.json({ message: 'Đã xóa sản phẩm' });
  } catch (err) {
    res.status(500).json({ error: 'Lỗi server khi xóa sản phẩm' });
  }
});

module.exports = router;
