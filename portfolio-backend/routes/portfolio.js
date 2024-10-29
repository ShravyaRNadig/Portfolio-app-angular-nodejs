const express = require('express');
const PortfolioItem = require('../models/PortfolioItem');
const router = express.Router();

// Get all portfolio items
router.get('/', async (req, res) => {
  const items = await PortfolioItem.find();
  res.json(items);
});

// Add a new portfolio item
router.post('/', async (req, res) => {
  const newItem = new PortfolioItem(req.body);
  await newItem.save();
  res.status(201).json(newItem);
});

// Update an existing portfolio item
router.put('/:id', async (req, res) => {
  const updatedItem = await PortfolioItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedItem);
});

// Delete a portfolio item
router.delete('/:id', async (req, res) => {
  await PortfolioItem.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
