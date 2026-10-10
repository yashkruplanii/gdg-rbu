'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ThemeToggle } from './ThemeToggle';
import { GdgLogo } from './GdgLogo';
import { Menu, X, ChevronDown, User, Shield, LogOut, Ticket } from 'lucide-react';

interface UserSession {
  userId: string;
  name: string;
  email: string;
  role: string;
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserSession | null>(null);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      })
      .catch(() => setUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setUserDropdownOpen(false);
    router.push('/');
    router.refresh();
  };

  const navItems = [
    { name: 'Home', href: '/', bg: 'bg-[#4285F4] text-white', hover: 'hover:bg-[#4285F4] hover:text-white' },
    { name: 'Team', href: '/team', bg: 'bg-[#EA4335] text-white', hover: 'hover:bg-[#EA4335] hover:text-white' },
    { name: 'Events', href: '/events', bg: 'bg-[#FBBC05] text-neutral-900', hover: 'hover:bg-[#FBBC05] hover:text-neutral-900' },
    { name: 'Gallery', href: '/gallery', bg: 'bg-[#34A853] text-white', hover: 'hover:bg-[#34A853] hover:text-white' },
    { name: 'Portfolio', href: '/team', bg: 'bg-[#6C5CE7] text-white', hover: 'hover:bg-[#6C5CE7] hover:text-white' },
    { name: 'More', href: '/faq', bg: 'bg-[#00A8FF] text-white', hover: 'hover:bg-[#00A8FF] hover:text-white' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black dark:border-neutral-700 bg-white dark:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center gap-2 group">
            <GdgLogo className="h-8 w-auto transition-transform group-hover:scale-105" />
            <span className="font-pixel text-lg font-bold tracking-tight text-neutral-900 dark:text-white hidden sm:inline-block">
              GDG RBU
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-black dark:border-white shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 ${
                    item.bg
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <ThemeToggle />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-2xl border-2 border-black dark:border-white bg-white dark:bg-neutral-800 shadow-[2px_2px_0px_0px_#000000] dark:shadow-[2px_2px_0px_0px_#ffffff] hover:bg-neutral-50"
                >
                  <div className="w-7 h-7 rounded-full bg-[#4285F4] text-white flex items-center justify-center text-xs font-black border border-black">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-black text-neutral-900 dark:text-white hidden sm:inline-block max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-neutral-600 dark:text-neutral-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-2xl border-2 border-black dark:border-white bg-white dark:bg-neutral-900 shadow-[4px_4px_0px_0px_#000000] p-2 space-y-1 z-50">
                    <Link
                      href="/dashboard"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <Ticket className="w-4 h-4 text-[#FBBC05]" />
                      <span>My Event Passes</span>
                    </Link>

                    {user.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      >
                        <Shield className="w-4 h-4 text-[#EA4335]" />
                        <span>Admin Console</span>
                      </Link>
                    )}

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 p-2 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-xs font-black border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-[2px_2px_0px_0px_#000000] hover:bg-neutral-100"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-xl text-xs font-black border-2 border-black dark:border-white bg-[#34A853] text-white shadow-[2px_2px_0px_0px_#000000] hover:bg-emerald-600"
                >
                  Join
                </Link>
              </div>
            )}

            <div className="flex md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl border-2 border-black dark:border-white bg-white dark:bg-neutral-800 shadow-[2px_2px_0px_0px_#000000]"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-black dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 space-y-2">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-3 rounded-xl text-xs font-black text-center border-2 border-black shadow-[2px_2px_0px_0px_#000000] ${item.bg}`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
