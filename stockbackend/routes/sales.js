const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// Get sales history
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Record a sale
router.post('/', async (req, res) => {
  const { brand, size, quantity, remark } = req.body;
  const newSale = new Sale({
    brand,
    size,
    quantity,
    remark,
  });

  try {
    const savedSale = await newSale.save();
    res.json(savedSale);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// DELETE a sale record
router.delete('/:id', async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id);
    if (!sale) {
      return res.status(404).json({ message: 'Sale record not found' });
    }

    await sale.remove();
    res.json({ message: 'Sale record deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
