'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { LogIn, Mail, Lock, AlertCircle, Sparkles, Eye, EyeOff } from 'lucide-react';

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/dashboard';

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
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to log in');
      }

      router.push(redirectUrl);
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
          <div className="inline-flex items-center gap-1.5 p-2 rounded-xl border-2 border-neutral-900 dark:border-white bg-[#FBBC05] text-neutral-900 shadow-[2px_2px_0px_0px_#1e1e1e] mb-2">
            <LogIn className="w-5 h-5" />
          </div>
          <h1 className="text-3xl font-black text-neutral-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-xs font-semibold text-neutral-500">
            Sign in to access your GDG event passes and profile
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
              <Mail className="w-3.5 h-3.5 text-[#4285F4]" /> Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. yash@rbu.edu"
              className="w-full px-4 py-3 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-white text-sm font-medium focus:outline-none focus:border-[#4285F4]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#EA4335]" /> Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
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
            className="w-full py-3.5 rounded-xl text-sm font-black border-2 border-neutral-900 dark:border-white bg-[#4285F4] text-white hover:bg-blue-600 disabled:opacity-50 shadow-[3px_3px_0px_0px_#1e1e1e] transition-all active:translate-x-0.5 active:translate-y-0.5"
          >
            {loading ? 'Authenticating...' : 'Sign In to GDG RBU'}
          </button>
        </form>

        <div className="p-3.5 rounded-xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/60 text-xs text-neutral-600 dark:text-neutral-400 space-y-2 font-mono">
          <div className="font-sans font-bold text-neutral-700 dark:text-neutral-300 text-[11px]">
            ⚡ Quick Demo Accounts:
          </div>
          <div className="text-[11px] space-y-0.5">
            <div><span className="font-bold text-neutral-900 dark:text-white">Admin:</span> admin@gdgrbu.com | admin123</div>
            <div><span className="font-bold text-neutral-900 dark:text-white">Student:</span> yash@rbu.edu | password123</div>
          </div>
        </div>

        <div className="text-center pt-2 text-xs font-semibold text-neutral-500">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="text-[#4285F4] font-black hover:underline">
            Register Now
          </Link>
        </div>

      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center py-20 font-bold">Loading...</div>}>
      <LoginFormContent />
    </Suspense>
  );
}
