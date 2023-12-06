const express = require('express');
const router = express.Router();
const User = require('../models/users.model.js');
const Cart = require('../models/carts.model.js');
const bcrypt = require('bcrypt'); // For password hashing

// Create a user
router.post('/api/users', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Save the new user
    const savedUser = await newUser.save();

    // Log the saved user (for debugging purposes)
    console.log('Saved User:', savedUser);

    // Create a cart for the user
    const newCart = new Cart({
      userID: savedUser._id,
      created: new Date(),
      updated: new Date(),
    });

    // Save the new cart
    const savedCart = await newCart.save();

    // Log the saved cart (for debugging purposes)
    console.log('Saved Cart:', savedCart);

    // Respond with the saved user and cart documents
    res.json({ user: savedUser, cart: savedCart });
  } catch (error) {
    console.error('Error creating user:', error);

    // Log additional details about the request
    console.error('Request body:', req.body);

    // Send an error response with details
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
});


// List all users
router.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Fetch a specific user by ID
router.get('/api/users/:userID', async (req, res) => {
  try {
    const user = await User.findById(req.params.userID);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    //if found, return the entire user document
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update a user
router.put('/api/users/:userID', async (req, res) => {
  try {
    if ('password' in req.body) {
      // Hash the updated password before saving it
      req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    // Add logic to set the role during user update
    if ('role' in req.body) {
      req.body.role = req.body.role.toLowerCase(); // Ensure consistency, e.g., 'seller' or 'Seller'
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userID,
      //once the user is found, update the sent parameters and generate a new timestamp for the 'updated' field
      { $set: req.body, updated: new Date() },
      { new: true }
    );
    //If the user is not found
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    //Respond with the entire Updated user document
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user
router.delete('/api/users/:userID', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userID);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    //if the user is found, respond with the now deleted user document
    res.json(deletedUser);
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User sign-in
router.post('/auth/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // test (print email and password to terminal to double check)
    console.log('Received email:', email);
    console.log('Received password:', password);

    // Find the user by email
    const user = await User.findOne({ email });

    // Check if the user exists and verify the password
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // generate authentication token here in future
    const token = user.generateAuthToken();
    
    // Return success message
   res.json({ message: 'Sign-in successful', token });
  } catch (error) {
    console.error('Error signing in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User sign-out
router.get('/auth/signout', (req, res) => {
  // Perform any sign-out logic, such as revoking authentication tokens here in future
  res.json({ message: 'Sign-out successful' });
});

module.exports = router;
