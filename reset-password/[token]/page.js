"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';

export default function ResetPasswordPage() {
    const { resetPassword } = useAuth();
    const router = useRouter();
    const params = useParams();
    const token = params.token;
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        setError('');
        setMessage('');
        setLoading(true);
        try {
            await resetPassword({ token, password });
            setMessage('Password reset successfully! Redirecting to login...');
            setTimeout(() => router.push('/login'), 2000);
        } catch (err) {
            setError(err.message || 'Invalid or expired token.');
        }finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] bg-gray-50">
            <motion.div 
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg"
            >
                <h2 className="text-3xl font-bold text-center text-gray-900">Set a New Password</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">New Password</label>
                        <input 
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 text-gray-900 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="••••••••" required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">Confirm New Password</label>
                        <input 
                            type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full p-3 mt-1 text-gray-900 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="••••••••" required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    {message && <p className="text-green-500 text-sm text-center">{message}</p>}
                    <button 
                        type="submit" 
                        className="w-full py-3 font-bold text-white bg-pink-500 rounded-md hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
