const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  brand: { type: String, required: true },
  size: { type: String, required: true },
  quantity: { type: Number, required: true },
  remark: { type: String },
});

module.exports = mongoose.model('Item', ItemSchema);
