"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';
export default function RecipeCard({ recipe, onClick }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            onClick={onClick}
            className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer group"
        >
            <div className="relative">
        <Image
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            width={500}
            height={500} 
            className="w-full h-48 object-cover transition-transform duration-300 group-hover-scale-110"
            unoptimized 
        />
                        
            </div>
            <div className="p-4">
                <h3 className="font-bold text-lg truncate text-gray-800">{recipe.strMeal}</h3>
            </div>
        </motion.div>
    );
}