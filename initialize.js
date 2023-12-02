const mongoose = require('mongoose');
const User = require('./models/users.model.js');
const Cart = require('./models/carts.model.js');

const createEmptyCartForUser = async (userID) => {
  const emptyCart = new Cart({
    userID,
    items: [],
    created: new Date(),
    updated: new Date(),
  });
  await emptyCart.save();
};

const initialize = async () => {
  try {
    const users = await User.find();

    for (const user of users) {
      const existingCart = await Cart.findOne({ userID: user._id });

      if (!existingCart) {
        await createEmptyCartForUser(user._id);
        console.log(`Empty cart created for user: ${user._id}`);
      }
    }

    console.log('Initialization complete.');
  } catch (error) {
    console.error('Initialization error:', error);
  }
};

module.exports = initialize;
