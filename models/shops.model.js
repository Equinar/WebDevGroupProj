const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(\.\.\/frontEnd\/src\/assets\/shops\/).+/.test(v);
      },
      message: props => `${props.value} is not a valid relative path to the shops directory.`,
    },
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

module.exports = mongoose.model('Shop', shopSchema);
