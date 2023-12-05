const express = require('express');
const router = express.Router();
const User = require('../models/users.model.js');
const bcrypt = require('bcrypt'); // For password hashing

// Create a user
router.post('/api/users', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      //Automatically generate both dates
      created: new Date(),
      updated: new Date(),
    });

    const savedUser = await newUser.save();
    //respond with the saved user document
    res.json(savedUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal Server Error' });
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
