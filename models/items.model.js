const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(\.\.\/frontEnd\/src\/assets\/items\/).+/.test(v);
      },
      message: props => `${props.value} is not a valid relative path to the items directory.`
    }
  },
  price: {
    type: Number,
    required: true
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now
  }
});



module.exports = mongoose.model('Item', itemSchema);
