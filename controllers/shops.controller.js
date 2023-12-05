const express = require('express');
const router = express.Router();
const Shop = require('../models/shops.model.js');

// Create a shop
router.post('/api/shops', async (req, res) => {
  try {
    const { name, description, picture, items, owner } = req.body;

    const newShop = new Shop({
      name,
      description,
      picture,
      items,
      owner,
      created: new Date(),
      updated: new Date(),
    });

    const savedShop = await newShop.save();
    res.json(savedShop);
  } catch (error) {
    console.error('Error creating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List all shops
router.get('/api/shops', async (req, res) => {
  try {
    const shops = await Shop.find().populate('items');
    res.json(shops);
  } catch (error) {
    console.error('Error fetching shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch a specific shop by ID
router.get('/api/shops/:shopID', async (req, res) => {
  try {
    const shop = await Shop.findById(req.params.shopID).populate('items');
    if (!shop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(shop);
  } catch (error) {
    console.error('Error fetching shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a shop
router.put('/api/shops/:shopID', async (req, res) => {
  try {
    const updatedShop = await Shop.findByIdAndUpdate(
        req.params.shopID,
        { $set: req.body, updated: new Date() },
        { new: true }
    ).populate('items');

    if (!updatedShop) {
      return res.status(404).json({ error: 'Shop not found' });
    }

    res.json(updatedShop);
  } catch (error) {
    console.error('Error updating shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a shop
router.delete('/api/shops/:shopID', async (req, res) => {
  try {
    const deletedShop = await Shop.findByIdAndDelete(req.params.shopID).populate('items');
    if (!deletedShop) {
      return res.status(404).json({ error: 'Shop not found' });
    }
    res.json(deletedShop);
  } catch (error) {
    console.error('Error deleting shop:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch shops by substring
router.get('/api/shops/search/:substring', async (req, res) => {
  try {
    const substring = req.params.substring;
    const shops = await Shop.find({ name: { $regex: substring, $options: 'i' } });
    res.json(shops);
  } catch (error) {
    console.error('Error searching shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Fetch shops owned by a specific user
router.get('/api/shops/myshops/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    // Fetch shops where the owner field matches the user's ID
    const userShops = await Shop.find({ owner: userId });
    console.log('User shops:', userShops);

    res.json(userShops);
  } catch (error) {
    console.error('Error fetching user shops:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;