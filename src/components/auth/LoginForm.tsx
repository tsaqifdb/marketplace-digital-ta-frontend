'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LoginInput } from '@/types/auth';
import { authService } from '@/services/auth';
import { useAuth } from '@/contexts/AuthContext';

const LoginForm = () => {
    const router = useRouter();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const data: LoginInput = {
                email: formData.get('email') as string,
                password: formData.get('password') as string,
            };

            console.log('Attempting login with:', data);  // Debug log
            
            const response = await authService.login(data);
            console.log('Login response:', response);  // Debug log
            
            login(response.token, response.user);
            router.push('/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);  // Debug log
            setError(err.response?.data?.error || 'Failed to login. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Sign in to your account
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="p-3 text-sm text-red-500 bg-red-50 rounded">
                            {error}
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-400"
                            placeholder="••••••••"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                        >
                            {loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                    <div className="text-center mt-4">
                        <Link 
                            href="/auth/register"
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                        >
                            Don&apos;t have an account? Sign up
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;