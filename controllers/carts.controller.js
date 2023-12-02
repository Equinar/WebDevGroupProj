const express = require('express');
const router = express.Router();
const Cart = require('../models/carts.model.js');

// Create a new cart
router.post('/api/carts', async (req, res) => {
  try {
    const { userID, items } = req.body;

    const newCart = new Cart({
      userID,
      items,
      created: new Date(),
      updated: new Date(),
    });

    const savedCart = await newCart.save();
    res.json(savedCart);
  } catch (error) {
    console.error('Error creating cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// List all carts
router.get('/api/carts', async (req, res) => {
  try {
    const carts = await Cart.find().populate({
      path: 'items.itemID',
      model: 'Item',
    });
    res.json(carts);
  } catch (error) {
    console.error('Error fetching carts:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch a specific cart by ID
router.get('/api/carts/:cartID', async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.cartID).populate({
      path: 'items.itemID',
      model: 'Item',
    });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Update a cart
router.put('/api/carts/:cartID', async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.cartID,
      { $set: req.body, updated: new Date() },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    res.json(updatedCart);
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a cart
router.delete('/api/carts/:cartID', async (req, res) => {
  try {
    const deletedCart = await Cart.findByIdAndDelete(req.params.cartID);
    if (!deletedCart) {
      return res.status(404).json({ error: 'Cart not found' });
    }
    res.json(deletedCart);
  } catch (error) {
    console.error('Error deleting cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//get cart by userID
router.get('/api/carts/user/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;

    const carts = await Cart.find({ userID }).populate({
      path: 'items.itemID',
      model: 'Item',
    });

    if (!carts || carts.length === 0) {
      return res.status(404).json({ error: 'Carts not found for the given userID' });
    }

    res.json(carts);
  } catch (error) {
    console.error('Error fetching carts by userID:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
