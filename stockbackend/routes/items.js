const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new item
router.post('/', async (req, res) => {
  const { brand, size, quantity, remark } = req.body;
  const newItem = new Item({
    brand,
    size,
    quantity,
    remark,
  });

  try {
    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update item quantity (for adding stock or selling)
router.put('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });

    const { quantity, remark } = req.body;
    item.quantity = quantity;
    if (remark) item.remark = remark;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
