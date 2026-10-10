'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Tag, Users, ArrowUpRight, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  category: string;
  image?: string | null;
  featured?: boolean;
  registrationCount?: number;
  isRegistered?: boolean;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  Workshop: { bg: 'bg-[#4285F4]/15', text: 'text-[#4285F4]', border: 'border-[#4285F4]' },
  Hackathon: { bg: 'bg-[#EA4335]/15', text: 'text-[#EA4335]', border: 'border-[#EA4335]' },
  'Tech Talk': { bg: 'bg-[#34A853]/15', text: 'text-[#34A853]', border: 'border-[#34A853]' },
  Orientation: { bg: 'bg-[#FBBC05]/20', text: 'text-amber-700 dark:text-[#FBBC05]', border: 'border-[#FBBC05]' },
  'AI/ML': { bg: 'bg-purple-100 dark:bg-purple-950/40', text: 'text-purple-600 dark:text-purple-400', border: 'border-purple-500' },
  Web3: { bg: 'bg-indigo-100 dark:bg-indigo-950/40', text: 'text-indigo-600 dark:text-indigo-400', border: 'border-indigo-500' },
};

export function EventCard({ event }: { event: EventItem }) {
  const regCount = event.registrationCount ?? 0;
  const isFull = regCount >= event.capacity;
  const percentFilled = Math.min(100, Math.round((regCount / event.capacity) * 100));
  const categoryStyle = CATEGORY_COLORS[event.category] || {
    bg: 'bg-neutral-100 dark:bg-neutral-800',
    text: 'text-neutral-700 dark:text-neutral-300',
    border: 'border-neutral-400',
  };

  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border-2 border-neutral-900 dark:border-neutral-600 bg-white dark:bg-neutral-900 p-6 shadow-[4px_4px_0px_0px_#1e1e1e] dark:shadow-[4px_4px_0px_0px_#4285F4] hover:-translate-x-0.5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_#1e1e1e] dark:hover:shadow-[6px_6px_0px_0px_#4285F4] transition-all duration-200">
      
      <div className="flex items-center justify-between gap-2 mb-4">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border-2 ${categoryStyle.border} ${categoryStyle.bg} ${categoryStyle.text}`}
        >
          <Tag className="w-3 h-3" />
          {event.category}
        </span>

        {event.isRegistered ? (
          <span className="px-2.5 py-1 text-xs font-black rounded-lg border-2 border-green-600 bg-green-500 text-white shadow-[2px_2px_0px_0px_#1e1e1e]">
            Registered ✓
          </span>
        ) : isFull ? (
          <span className="px-2.5 py-1 text-xs font-black rounded-lg border-2 border-red-600 bg-red-500 text-white shadow-[2px_2px_0px_0px_#1e1e1e]">
            Housefull
          </span>
        ) : (
          <span className="px-2.5 py-1 text-xs font-bold rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300">
            {event.capacity - regCount} spots left
          </span>
        )}
      </div>

      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-black text-neutral-900 dark:text-white leading-snug group-hover:text-[#4285F4] transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 font-medium">
          {event.description}
        </p>
      </div>

      <div className="space-y-2.5 py-3 border-y-2 border-dashed border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300 mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#4285F4]" />
          <span>{formatDate(event.date)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#EA4335]" />
          <span>{event.time}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#34A853]" />
          <span className="truncate">{event.venue}</span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between text-xs font-black text-neutral-700 dark:text-neutral-300 mb-1.5">
            <span>Registration Status</span>
            <span>
              {regCount} / {event.capacity}
            </span>
          </div>
          <div className="w-full h-3 rounded-full border-2 border-neutral-900 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isFull
                  ? 'bg-[#EA4335]'
                  : percentFilled > 75
                  ? 'bg-[#FBBC05]'
                  : 'bg-[#34A853]'
              }`}
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        <Link
          href={`/events/${event.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-black border-2 border-neutral-900 dark:border-white bg-[#4285F4] text-white hover:bg-blue-600 shadow-[3px_3px_0px_0px_#1e1e1e] dark:shadow-[3px_3px_0px_0px_#ffffff] transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
