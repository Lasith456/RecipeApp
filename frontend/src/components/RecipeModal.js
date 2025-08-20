
"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

// Icons
const HeartIcon = ({ className = "w-6 h-6" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}><path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-1.383-.597 15.218 15.218 0 0 1-2.203-1.33c-.326-.22-.652-.451-.973-.682A5.005 5.005 0 0 1 6 15a5.005 5.005 0 0 1-2.5-4.243V9.752a5.25 5.25 0 0 1 3.25-4.941c1.453-.498 3.043.226 4.25 1.364a5.25 5.25 0 0 1 4.25-1.364c1.453.498 3.043 1.226 3.25 4.941V10.757a5.005 5.005 0 0 1-2.5 4.243c-.321.231-.647.462-.973.682a15.218 15.218 0 0 1-2.203 1.33 15.247 15.247 0 0 1-1.383.597l-.022.012-.007.003Z" /></svg>
);
const XMarkIcon = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
);

export default function RecipeModal({ recipeId, onClose }) {
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, addFavorite, removeFavorite } = useAuth();
    const router = useRouter();

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            setLoading(true);
            try {
                const { data } = await api.get(`/recipes/details/${recipeId}`);
                if (data.success) {
                    setRecipe(data.recipe);
                }
            } catch (error) {
                console.error("Failed to fetch recipe details:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipeDetails();
    }, [recipeId]);
        
    const isFavorite = user?.favorites?.some(fav => fav.idMeal === recipeId);

    const handleToggleFavorite = async () => {
        if (!user) {
            router.push('/login');
            return;
        }

        if (isFavorite) {
            await removeFavorite(recipeId);
        } else {
            const newFavorite = { idMeal: recipe.idMeal, strMeal: recipe.strMeal, strMealThumb: recipe.strMealThumb };
            await addFavorite(newFavorite);
        }
    };

    const ingredients = recipe ? Object.keys(recipe)
        .filter(key => key.startsWith('strIngredient') && recipe[key])
        .map(key => `${recipe[key]} - ${recipe[`strMeasure${key.slice(13)}`]}`) : [];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, y: 50 }}
                transition={{ type: 'spring', damping: 20, stiffness: 200 }}
                className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {loading ? (
                    <div className="h-96 flex justify-center items-center">
                        <div className="w-12 h-12 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
                    </div>
                ) : recipe && (
                     <div>
                        <div className="relative">
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="w-full h-64 object-cover rounded-t-2xl" />
                            <button onClick={onClose} className="absolute top-4 right-4 bg-white/70 rounded-full p-2 text-gray-800 hover:bg-white transition-colors">
                                <XMarkIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-6 md:p-8">
                            <div className="flex justify-between items-start">
                                <h2 className="text-3xl font-bold text-gray-900">{recipe.strMeal}</h2>
                                <motion.button 
                                    whileTap={{ scale: 1.2 }}
                                    onClick={handleToggleFavorite} 
                                    className={`p-2 rounded-full transition-colors ${isFavorite ? 'text-pink-500 bg-pink-100' : 'text-gray-400 bg-gray-100 hover:text-pink-500'}`}
                                >
                                    <HeartIcon className="w-7 h-7" />
                                </motion.button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{recipe.strCategory} | {recipe.strArea}</p>

                            <div className="mt-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Ingredients</h3>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 list-disc list-inside text-gray-700">
                                    {ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
                                </ul>
                            </div>
                            
                            <div className="mt-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Instructions</h3>
                                <p className="whitespace-pre-wrap text-gray-700 leading-relaxed">{recipe.strInstructions}</p>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>
        </motion.div>
    );
}
