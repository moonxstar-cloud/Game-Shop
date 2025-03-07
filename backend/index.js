require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const wishlistRoutes = require('./routes/wishlist');

const app = express();

const cors = require('cors');
app.use(cors({
  origin: 'https://game-shop-rho-khaki.vercel.app',
  credentials: true
}));

app.use(express.json());

// Routes prefix
app.use('/api/auth', authRoutes);
app.use('/api/wishlist', wishlistRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Something went wrong! Please try again later.'
  });
});

// Database connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// Handle MongoDB connection errors
mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
