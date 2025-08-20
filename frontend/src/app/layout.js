import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Recipe App',
    description: 'Your daily dose of deliciousness.',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50`}>
                <AuthProvider>
                    <Header />
                    <main>{children}</main>
                </AuthProvider>
            </body>
        </html>
    );
}
