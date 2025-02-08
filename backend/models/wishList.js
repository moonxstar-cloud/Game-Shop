const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
    
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: String, required: true },
  gameName: { type: String, required: true },
  gameImage: { type: String },
  addedAt: { type: Date, default: Date.now }
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;