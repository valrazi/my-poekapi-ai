const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // 1. Import cors
require('dotenv').config();

const app = express();
app.use(cors({
  origin: '*', // Izinkan semua origin
  methods: ['GET', 'POST'], // Batasi method yang diizinkan
  allowedHeaders: ['Content-Type', 'X-Auth'] // Pastikan X-Auth diizinkan
}));
app.use(express.json());

const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['x-auth'];
  
  if (!authHeader || authHeader !== WEBHOOK_SECRET) {
    return res.status(401).json({ 
      status: 'error', 
      message: 'Unauthorized: Invalid or missing X-Auth header' 
    });
  }
  next(); 
};

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

const User = require('./models/Users');

app.post('/register', authMiddleware, async (req, res) => {
  try {
    const { name } = req.body;
    const newUser = new User({ name });
    await newUser.save();
    res.status(201).json({ status: 'success', message: 'User registered!' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

app.listen(process.env.PORT, () => console.log(`API running on port ${process.env.PORT}`));