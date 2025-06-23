const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  imageUrl: String,
}, {
  timestamps: true // Giúp dễ kiểm tra thời gian thêm
});

module.exports = mongoose.model('Product', productSchema);
