"use client";

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function VerifyEmailPage() {
    const { verifyEmail } = useAuth();
    const router = useRouter();
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);
        try {
            await verifyEmail({ code });
            setMessage('Email verified successfully! Redirecting...');
            setTimeout(() => router.push('/login'), 2000);
        } catch (err) {
            setError(err.message || 'Invalid or expired code.');
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
                <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
                <p className="text-gray-600">A verification code has been sent to your email address. Please enter it below.</p>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="text-sm font-bold text-gray-600 block sr-only">Verification Code</label>
                        <input 
                            type="text" value={code} onChange={(e) => setCode(e.target.value)}
                            className="w-full p-3 mt-1 text-gray-900 bg-gray-50 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pink-500 text-center tracking-widest text-lg"
                            placeholder="_ _ _ _ _ _" maxLength="6" required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {message && <p className="text-green-500 text-sm">{message}</p>}
                    <button 
                        type="submit" 
                        className="w-full py-3 font-bold text-white bg-pink-500 rounded-md hover:bg-pink-600 transition-colors disabled:bg-pink-300 disabled:cursor-not-allowed"
                        disabled={loading}
                    >
                         {loading ? 'Verifying...' : 'Verify'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}