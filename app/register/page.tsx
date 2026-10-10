'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { UserPlus, User, Mail, Lock, AlertCircle, Sparkles, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/dashboard');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-12">
      <div className="rounded-3xl border-3 border-neutral-900 dark:border-neutral-200 bg-white dark:bg-neutral-900 p-8 shadow-[8px_8px_0px_0px_#1e1e1e] dark:shadow-[8px_8px_0px_0px_#4285F4] space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 p-2 rounded-xl border-2 border-neutral-900 dark:border-white bg-[#34A853] text-white shadow-[2px_2px_0px_0px_#1e1e1e] mb-2">
            <UserPlus className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-black text-neutral-900 dark:text-white">
            Join GDG RBU
          </h1>
          <p className="text-xs font-semibold text-neutral-500">
            Create your account to unlock event registrations and QR passes
          </p>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3.5 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#FBBC05]" /> Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Yash Kruplani"
              className="w-full px-4 py-3 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-medium focus:outline-none focus:border-[#4285F4]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5 text-[#4285F4]" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. student@rbu.edu"
              className="w-full px-4 py-3 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-medium focus:outline-none focus:border-[#4285F4]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#EA4335]" /> Password (min 6 chars)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-11 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-medium focus:outline-none focus:border-[#4285F4]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white p-1 rounded-lg transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl text-sm font-black border-2 border-neutral-900 dark:border-white bg-[#34A853] text-white hover:bg-emerald-600 disabled:opacity-50 shadow-[3px_3px_0px_0px_#1e1e1e] transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            {loading ? 'Creating Account...' : 'Create GDG Account'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs font-semibold text-neutral-500">
          Already registered?{' '}
          <Link href="/login" className="text-[#4285F4] font-black hover:underline">
            Log In
          </Link>
        </div>

      </div>
    </div>
  );
}
