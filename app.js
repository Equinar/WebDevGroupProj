const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

//Mongoose Connection - connect directly to the brogrammers database
mongoose.connect('mongodb+srv://admin:CNyr685Sw3XobFwb@cluster0.xvya0fb.mongodb.net/Brogrammers', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => console.error('Could not connect to MongoDB', err));
  

// Middleware
app.use(cors());
app.use(express.json());

// Main page display
app.get('/', (req, res) => {
    res.json({ message: "Welcome to Brogrammers application" });
  });

//Controllers
const userCtrl = require('./controllers/users.controller.js');
app.use('', userCtrl);

const itemCtrl = require('./controllers/items.controller.js');
app.use('', itemCtrl);

const shopCtrl = require('./controllers/shops.controller.js');
app.use('', shopCtrl);

const cartCtrl = require('./controllers/carts.controller.js');
app.use('', cartCtrl);

// Import and run the initialization function
const initialize = require('./initialize');
initialize();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});