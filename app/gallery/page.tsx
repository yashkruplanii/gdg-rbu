'use client';

import React from 'react';
import { Camera } from 'lucide-react';

const MEMORIES = [
  {
    title: 'GDG ORIENTATION',
    category: 'Orientation',
    attendees: '300+ Attendees',
    gradient: 'from-amber-500 to-orange-600',
    description: 'Google Developer Groups (GDG) – Student Chapter is a community of students passionate about technology, innovation, and learning.',
  },
  {
    title: 'Pixtopia',
    category: 'Creative Tech',
    attendees: '200+ Attendees',
    gradient: 'from-purple-600 to-pink-600',
    description: 'PIXTOPIA is a Pixar-themed tech adventure organized by the Google Developer Groups (GDG RBU).',
  },
  {
    title: 'Tech Sprint',
    category: 'Hackathon',
    attendees: '48 Teams',
    gradient: 'from-red-500 to-amber-600',
    description: 'TechSprint 2026 is a Hybrid (Online + Offline) 7 days hackathon organized by Google Developer Groups.',
  },
  {
    title: 'Google Cloud Study Jam',
    category: 'Cloud Workshop',
    attendees: '180 Attendees',
    gradient: 'from-blue-600 to-indigo-700',
    description: 'Google Cloud Study Jams with GDG successfully concluded, offering participants hands-on labs and certifications.',
  },
];

export default function GalleryPage() {
  return (
    <div className="space-y-10 py-6">
      <div className="space-y-3 max-w-2xl">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-pixel uppercase tracking-wider border-2 border-neutral-900 dark:border-white bg-[#FBBC05] text-neutral-900 shadow-[2px_2px_0px_0px_#1e1e1e]">
          <Camera className="w-3.5 h-3.5" />
          Community Moments
        </div>
        <h1 className="font-pixel text-3xl sm:text-5xl text-neutral-900 dark:text-white">
          Event Gallery & Highlights
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 font-medium">
          A visual journey through past GDG RBU events, workshops, hackathons, and tech meetups.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {MEMORIES.map((item, idx) => (
          <div
            key={idx}
            className="group rounded-3xl border-3 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden shadow-[6px_6px_0px_0px_#1e1e1e] dark:shadow-[6px_6px_0px_0px_#4285F4] hover:-translate-y-1 transition-all"
          >
            <div className={`h-48 bg-gradient-to-br ${item.gradient} p-6 flex flex-col justify-between text-white relative overflow-hidden border-b-2 border-neutral-900`}>
              <div className="flex justify-between items-start">
                <span className="px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-lg bg-black/40 border border-white/20">
                  {item.category}
                </span>
                <span className="text-xs font-bold bg-white/20 px-2 py-0.5 rounded">
                  {item.attendees}
                </span>
              </div>
              <div className="text-2xl font-black">{item.title}</div>
            </div>

            <div className="p-6 space-y-2">
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
