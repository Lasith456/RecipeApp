"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '@/lib/api'; // Import the configured axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                const { data } = await api.get('/auth/check-auth');
                if (data.success) {
                    setUser(data.user);
                }
            } catch (error) {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkUserLoggedIn();
    }, []);

    const signup = async (credentials) => {
        try {
            const { data } = await api.post('/auth/signup', credentials);
            return data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Signup failed');
        }
    };
    

    const login = async (credentials) => {
        try {
            const { data } = await api.post('/auth/login', credentials);
            if (data.success) setUser(data.user);
            return data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        try {
            await api.post('/auth/logout');
            setUser(null);
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };
    
    const verifyEmail = async (verificationData) => {
        try {
            return await api.post('/auth/verify-email', verificationData);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Verification failed');
        }
    };

    const forgotPassword = async (emailData) => {
        try {
            return await api.post('/auth/forget-password', emailData);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Request failed');
        }
    };

    const resetPassword = async ({ token, password }) => {
        try {
            return await api.post(`/auth/reset-password/${token}`, { password });
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Password reset failed');
        }
    };

    const addFavorite = async (recipe) => {
        try {
            // Assuming your backend has this route, e.g., POST /api/user/favorites
            const { data } = await api.post('/user/favorites', recipe);
            if (data.success) setUser(prev => ({...prev, favorites: data.favorites}));
        } catch (error) {
            console.error("Failed to add favorite:", error);
        }
    };
    
    const removeFavorite = async (recipeId) => {
        try {
            // Assuming your backend has this route, e.g., DELETE /api/user/favorites/:id
            const { data } = await api.delete(`/user/favorites/${recipeId}`);
            if (data.success) setUser(prev => ({...prev, favorites: data.favorites}));
        } catch (error) {
            console.error("Failed to remove favorite:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, loading, signup, login, logout, verifyEmail, forgotPassword, resetPassword, addFavorite, removeFavorite }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

