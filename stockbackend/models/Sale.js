const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SaleSchema = new Schema({
  brand: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  remark: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Sale', SaleSchema);
