"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import RecipeCard from '@/components/RecipeCard';
import RecipeModal from '@/components/RecipeModal';
import api from '@/lib/api'; // Use our API client

export default function HomePage() {
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('Seafood');
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/recipes/categories');
                if (data.success) {
                    setCategories(data.categories.slice(0, 5));
                }
            } catch (error) {
                console.error("Failed to fetch categories:", error);
            }
        };
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchRecipesByCategory = async () => {
            if (!selectedCategory || isSearching) return;
            setLoading(true);
            try {
                const { data } = await api.get(`/recipes/category/${selectedCategory}`);
                if (data.success) {
                    setRecipes(data.recipes || []);
                }
            } catch (error) {
                console.error("Failed to fetch recipes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecipesByCategory();
    }, [selectedCategory, isSearching]);
    
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        
        setLoading(true);
        setIsSearching(true);
        try {
            const { data } = await api.get(`/recipes/search/${searchQuery}`);
            if (data.success) {
                setSearchResults(data.recipes || []);
            }
        } catch (error) {
            console.error("Failed to search recipes:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    };
    
    const clearSearch = () => {
        setIsSearching(false);
        setSearchQuery('');
        setSearchResults([]);
    };
    
    const recipesToDisplay = isSearching ? searchResults : recipes;

    return (
        <>
            <div className="min-h-screen bg-gray-50 text-gray-800">
                <header className="text-center py-12 px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-bold text-gray-900"
                    >
                        When you are <span className="text-pink-500">Home Alone</span> and Hungry?
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto"
                    >
                        Enter ingredients, dietary preferences, or cravings, and get personalized recipes instantly!
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mt-8 max-w-lg mx-auto"
                    >
                        <form onSubmit={handleSearch} className="flex items-center bg-white rounded-full shadow-md p-2">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for a recipe..."
                                className="flex-grow bg-transparent px-4 text-gray-700 focus:outline-none"
                            />
                            <button type="submit" className="bg-pink-500 text-white rounded-full p-3 hover:bg-pink-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </form>
                    </motion.div>
                </header>

                <main className="container mx-auto px-4 pb-12">
                     {isSearching ? (
                        <div className="flex justify-between items-center mb-6">
                          <h2 className="text-3xl font-bold text-gray-800">Search Results for &quot;{searchQuery}&quot;</h2>
                           <button onClick={clearSearch} className="text-pink-500 font-semibold hover:underline">Clear Search</button>
                        </div>
                     ) : (
                        <>
                            <div className="flex justify-center flex-wrap gap-3 md:gap-4 mb-12 px-4">
                                {categories.map(cat => (
                                    <button
                                        key={cat.idCategory}
                                        onClick={() => setSelectedCategory(cat.strCategory)}
                                        className={`px-4 py-2 text-sm md:text-base font-semibold rounded-full transition-all duration-300 ${selectedCategory === cat.strCategory ? 'bg-pink-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-pink-100'}`}
                                    >
                                        {cat.strCategory}
                                    </button>
                                ))}
                            </div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Famous Recipes</h2>
                        </>
                     )}
                    
                    <AnimatePresence>
                        {loading ? (
                            <motion.div key="loader" className="flex justify-center items-center h-64">
                                <div className="w-16 h-16 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
                            </motion.div>
                        ) : (
                            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                {recipesToDisplay.length > 0 ? (
                                    recipesToDisplay.map(recipe => (
                                        <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={() => setSelectedRecipeId(recipe.idMeal)} />
                                    ))
                                ) : (
                                    <p className="col-span-full text-center text-gray-500">No recipes found.</p>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
            <AnimatePresence>
                {selectedRecipeId && (
                    <RecipeModal
                        key={selectedRecipeId}
                        recipeId={selectedRecipeId}
                        onClose={() => setSelectedRecipeId(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}