"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
    const { user, logout, loading } = useAuth();
    const pathname = usePathname();

    const isActive = (path) => pathname === path;

    return (
        <header className="bg-white/80 backdrop-blur-sm sticky top-0 z-40 shadow-sm">
            <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-gray-800">
                    Recipe<span className="text-pink-500">App</span>
                </Link>
                <div className="flex items-center gap-4 md:gap-6">
                    <Link href="/" className={`font-semibold ${isActive('/') ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'}`}>Home</Link>
                    {user && <Link href="/favorites" className={`font-semibold ${isActive('/favorites') ? 'text-pink-500' : 'text-gray-600 hover:text-pink-500'}`}>Favorites</Link>}
                    
                    {!loading && (
                        user ? (
                            <button onClick={logout} className="bg-pink-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-pink-600 transition-colors text-sm">Logout</button>
                        ) : (
                            <Link href="/login" className="bg-gray-200 text-gray-800 px-4 py-2 rounded-full font-semibold hover:bg-gray-300 transition-colors text-sm">Login</Link>
                        )
                    )}
                </div>
            </nav>
        </header>
    );
}


