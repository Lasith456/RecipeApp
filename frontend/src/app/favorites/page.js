"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import RecipeCard from '@/components/RecipeCard';
import RecipeModal from '@/components/RecipeModal';
import { motion, AnimatePresence } from 'framer-motion';

export default function FavoritesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [selectedRecipeId, setSelectedRecipeId] = useState(null);

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-[calc(100vh-80px)]">
                <div className="w-16 h-16 border-4 border-pink-500 border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }
    
    if (!user) {
        return null; // or a redirect message
    }

    return (
       <>
            <div className="container mx-auto p-4 md:p-8 min-h-[calc(100vh-80px)]">
                <h1 className="text-4xl font-bold text-center my-8 text-gray-900">My Favorite Recipes</h1>
                {user.favorites && user.favorites.length > 0 ? (
                    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {user.favorites.map(recipe => (
                            <RecipeCard key={recipe.idMeal} recipe={recipe} onClick={() => setSelectedRecipeId(recipe.idMeal)} />
                        ))}
                    </motion.div>
                ) : (
                    <p className="text-center text-gray-600 mt-10">You haven&apos;t saved any favorite recipes yet.</p>
                )}
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