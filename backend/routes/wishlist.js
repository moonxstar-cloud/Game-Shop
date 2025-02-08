
const express = require('express');
const authMiddleware = require('../middleware/auth');
const Wishlist = require('../models/wishList');
const router = express.Router();

// Add to wishlist
router.post('/add', authMiddleware, async (req, res) => {
    console.log("Request received at /api/wishlist/add");
    console.log("Request Body:", req.body); 
  try {
    const { gameId, gameName, gameImage } = req.body;
    const userId = req.user.id;

    const existingItem = await Wishlist.findOne({ userId, gameId });
    if (existingItem) {
      return res.status(400).json({ message: 'Game already in wishlist' });
    }

    const wishlistItem = new Wishlist({
      userId,
      gameId,
      gameName,
      gameImage,
      
    });

    await wishlistItem.save();
    res.status(201).json({ message: 'Game added to wishlist', wishlistItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Remove from wishlist
router.delete('/remove/:gameId', authMiddleware, async (req, res) => {
  try {
    const { gameId } = req.params;
    const userId = req.user.id;

    const deletedItem = await Wishlist.findOneAndDelete({ userId, gameId });
    if (!deletedItem) {
      return res.status(404).json({ message: 'Game not found in wishlist' });
    }

    res.status(200).json({ message: 'Game removed from wishlist', deletedItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get wishlist
router.get('/', authMiddleware, async (req, res) => {
    console.log("Request Body:", req.body); 
  try {
    const userId = req.user.id;
    const wishlist = await Wishlist.find({ userId });
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;