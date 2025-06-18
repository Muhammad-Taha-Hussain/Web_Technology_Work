import Jw_favorites from '../models/Jw_favorites.js';

export const addFavorite = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.body;
  console.log('User ID:', userId);
  console.log('Adding to favorites:', productId);

  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required' });
  }

  try {
    const existingFavorite = await Jw_favorites.findOne({ userId, productId });

    if (existingFavorite) {
      return res.status(400).json({ message: 'Product already in favorites' });
    }

    const newFavorite = new Jw_favorites({ userId, productId });
    await newFavorite.save();

    res.status(201).json({ message: 'Product added to favorites', favorite: newFavorite });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// export const getFavoritesById = async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const favorites = await Jw_favorites.find({ userId }).populate('productId');
//     res.status(200).json({ favorites });
//   } catch (err) {
//     res.status(500).json({ message: 'Server error', error: err.message });
//   }
// };

export const getFavorites = async (req, res) => {
  const userId = req.userId;

  try {
    const favorites = await Jw_favorites.find({ userId }).populate('productId');
    res.status(200).json({ favorites });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const removeFavorite = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    const removed = await Jw_favorites.findOneAndDelete({ userId, productId });

    if (!removed) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.status(200).json({ message: 'Product removed from favorites' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
