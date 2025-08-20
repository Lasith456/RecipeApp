"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function RegisterPage() {
    const { signup } = useAuth();
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); 
        try {
            await signup({ name, email, password });
            router.push('/verify-email');
        } catch (err) {
            setError(err.message || 'Failed to create an account.');
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
                <h2 className="text-3xl font-bold text-center text-gray-900">Create an Account</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">Name</label>
                        <input 
                            type="text" value={name} onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 mt-1 text-gray-900 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="user" required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">Email</label>
                        <input 
                            type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 mt-1 text-gray-900 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="user@example.com" required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block">Password</label>
                        <input 
                            type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 text-gray-900 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500"
                            placeholder="••••••••" required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                     <button 
                        type="submit" 
                        className="w-full py-3 font-bold text-white bg-pink-500 rounded-md hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account? <Link href="/login" className="text-pink-500 hover:underline font-semibold">Log in</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}