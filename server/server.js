const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const cartRoutes = require('./routes/carts');
const orderRoutes = require('./routes/orders');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

module.exports = app;