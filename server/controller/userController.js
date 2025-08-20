import { User } from "../models/userModel.js";

export const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const addFavorite = async (req, res) => {
  const { idMeal, strMeal, strMealThumb } = req.body;

  if (!idMeal || !strMeal || !strMealThumb) {
    return res.status(400).json({ success: false, message: "Recipe details are required" });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    const isAlreadyFavorite = user.favorites.some(fav => fav.idMeal === idMeal);
    if (isAlreadyFavorite) {
      return res.status(400).json({ success: false, message: "Recipe is already in favorites" });
    }

    user.favorites.push({ idMeal, strMeal, strMealThumb });
    await user.save();

    res.status(201).json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const removeFavorite = async (req, res) => {
  const { id } = req.params; 

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    user.favorites = user.favorites.filter(fav => fav.idMeal !== id);
    await user.save();

    res.status(200).json({ success: true, favorites: user.favorites });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};
