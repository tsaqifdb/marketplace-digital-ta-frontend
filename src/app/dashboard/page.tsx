'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const { user, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/auth/login');
        }
    }, [user, router]);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-semibold">Dashboard</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-4">{user?.email}</span>
                            <button
                                onClick={() => logout()}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <h2 className="text-2xl font-bold mb-4">Welcome, {user?.name}!</h2>
                    <p>Your role is: {user?.role}</p>
                    
                    {/* Tampilan berbeda berdasarkan role */}
                    {user?.role === 'seller' && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Seller Dashboard</h3>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                                Upload New Product
                            </button>
                        </div>
                    )}

                    {user?.role === 'buyer' && (
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold mb-2">Buyer Dashboard</h3>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600">
                                Browse Products
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}