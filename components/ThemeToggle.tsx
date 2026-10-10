'use client';

import * as React from 'react';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-lg border-2 border-neutral-800 dark:border-neutral-200 bg-neutral-100 dark:bg-neutral-800 opacity-50" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2.5 rounded-lg border-2 border-neutral-900 dark:border-white bg-white dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-yellow-400 transition-all shadow-[2px_2px_0px_0px_#1e1e1e] dark:shadow-[2px_2px_0px_0px_#4285F4] active:translate-x-0.5 active:translate-y-0.5"
      aria-label="Toggle theme"
      title="Toggle Dark / Light Mode"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-yellow-400 animate-spin-slow" />
      ) : (
        <Moon className="w-5 h-5 text-neutral-800" />
      )}
    </button>
  );
}
