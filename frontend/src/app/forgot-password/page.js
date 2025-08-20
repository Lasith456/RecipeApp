"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { motion } from 'framer-motion';

export default function ForgotPasswordPage() {
    const { forgotPassword } = useAuth();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            await forgotPassword({ email });
            setMessage('If an account with that email exists, a password reset link has been sent.');
        } catch (err) {
            setError(err.message || 'An error occurred.');
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg text-center"
            >
                <h2 className="text-3xl font-bold text-gray-900">Reset Your Password</h2>
                <p className="text-gray-600">Enter your email address and we will send you a link to reset your password.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block sr-only">Email</label>
                        <input 
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mt-1 text-gray-900 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="user@example.com" required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                     <button 
                        type="submit" 
                        className="w-full py-3 font-bold text-white bg-pink-500 rounded-md hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
