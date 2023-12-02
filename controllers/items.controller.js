const express = require('express');
const router = express.Router();
const Item = require('../models/items.model.js');

// Add an item
router.post('/api/items', async (req, res) => {
  try {
    const { name, description, picture, price } = req.body;

    const newItem = new Item({
      name,
      description,
      picture,
      price,
      created: new Date(),
      updated: new Date(),
    });

    const savedItem = await newItem.save();
    res.json(savedItem);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List all items
router.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch a specific item by ID
router.get('/api/items/:itemID', async (req, res) => {
  try {
    const item = await Item.findById(req.params.itemID);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update an item
router.put('/api/items/:itemID', async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(
      req.params.itemID,
      { $set: req.body, updated: new Date() },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete an item
router.delete('/api/items/:itemID', async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.itemID);
    if (!deletedItem) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.json(deletedItem);
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch items by substring
router.get('/api/items/search/:substring', async (req, res) => {
  try {
    const substring = req.params.substring;
    const items = await Item.find({ name: { $regex: substring, $options: 'i' } });
    res.json(items);
  } catch (error) {
    console.error('Error searching items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
