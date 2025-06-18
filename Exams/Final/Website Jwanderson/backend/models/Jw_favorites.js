// models/Favorite.js
import mongoose from 'mongoose';

const FavoriteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jw_Users', required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Jw_Products', required: true },
  addedAt: { type: Date, default: Date.now }
});

FavoriteSchema.index({ userId: 1, productId: 1 }, { unique: true });

const Favorite = mongoose.model("Jw_favorites", FavoriteSchema);
export default Favorite;

