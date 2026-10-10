import React from 'react';
import Link from 'next/link';
import { GdgLogo } from './GdgLogo';
import { Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <GdgLogo className="h-7 w-auto" />
              <span className="text-xl font-black">GDG RBU</span>
            </div>
            <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md font-medium leading-relaxed">
              Google Developer Groups on Campus — Ramdeobaba University. Empowering students with cutting-edge technology, workshops, hackathons, and real-world developer experience.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://www.instagram.com/gdg_rbu?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw=="
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-[#EA4335] hover:text-white transition-all shadow-[2px_2px_0px_0px_#1e1e1e]"
                aria-label="Instagram"
                title="GDG RBU Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/gdg-rbu/home/"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-[#4285F4] hover:text-white transition-all shadow-[2px_2px_0px_0px_#1e1e1e]"
                aria-label="LinkedIn"
                title="GDG RBU LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://x.com/gdsc_rcoem"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-[#34A853] hover:text-white transition-all shadow-[2px_2px_0px_0px_#1e1e1e]"
                aria-label="Twitter / X"
                title="GDG RBU on X"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-sm uppercase tracking-wider text-neutral-400">Navigation</h4>
            <ul className="space-y-2 text-sm font-semibold">
              <li>
                <Link href="/" className="hover:text-[#4285F4] transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#4285F4] transition-colors">All Events</Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[#4285F4] transition-colors">GDG Team</Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-[#4285F4] transition-colors">Photo Gallery</Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#4285F4] transition-colors">FAQ & Support</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-black text-sm uppercase tracking-wider text-neutral-400">Tech Pillars</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-2.5 py-1 text-xs font-bold rounded-lg border border-neutral-900 dark:border-neutral-700 bg-[#4285F4]/15 text-[#4285F4]">
                Web & Cloud
              </span>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t-2 border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-neutral-500">
          <p>© {new Date().getFullYear()} GDG RBU Chapter. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
