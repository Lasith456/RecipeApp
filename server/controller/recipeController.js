import axios from 'axios';

export const getRecipeCategories = async (req, res) => {
    try {
        const response = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php');
        res.status(200).json({ success: true, categories: response.data.categories });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch recipe categories" });
    }
};
export const getRecipesByCategory = async (req, res) => {
    try {
        const { categoryName } = req.params;
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${categoryName}`);
        res.status(200).json({ success: true, recipes: response.data.meals });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch recipes" });
    }
};
export const getRecipeById = async (req, res) => {
    try {
        const { recipeId } = req.params;
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        res.status(200).json({ success: true, recipe: response.data.meals[0] });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch recipe details" });
    }
};
export const searchRecipes = async (req, res) => {
    try {
        const { query } = req.params;
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
        res.status(200).json({ success: true, recipes: response.data.meals });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to search recipes" });
    }
};