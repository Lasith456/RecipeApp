import express from 'express';
import { getRecipeCategories ,getRecipesByCategory,getRecipeById,searchRecipes} from '../controller/recipeController.js';

const router = express.Router();

router.get('/categories', getRecipeCategories);
router.get('/category/:categoryName', getRecipesByCategory);
router.get('/details/:recipeId', getRecipeById);
router.get('/search/:query', searchRecipes);

export default router;