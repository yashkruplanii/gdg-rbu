'use client';

import React, { useState, useEffect } from 'react';
import { Search, Filter, Calendar, Sparkles, Tag } from 'lucide-react';
import { EventCard, EventItem } from '@/components/EventCard';

const CATEGORIES = ['All', 'Workshop', 'Hackathon', 'Tech Talk', 'Orientation', 'AI/ML', 'Web3'];

export default function EventsPage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const fetchEvents = () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.append('q', search);
    if (activeCategory && activeCategory !== 'All') params.append('category', activeCategory);

    fetch(`/api/events?${params.toString()}`)
      .then((res) => (res.ok ? res.json() : { events: [] }))
      .then((data) => setEvents(data.events || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchEvents();
  }, [activeCategory]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents();
  };

  return (
    <div className="space-y-10 py-4">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-neutral-900 dark:border-white bg-[#4285F4] text-white shadow-[2px_2px_0px_0px_#1e1e1e]">
          <Calendar className="w-3.5 h-3.5" />
          Event Directory
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 dark:text-white">
          Explore All Events
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 font-medium max-w-2xl">
          Browse upcoming developer workshops, community hackathons, and tech talks. Reserve your seat and get an instant digital pass.
        </p>
      </div>

      <div className="space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-3">
          <div className="flex-1 flex items-center gap-3 bg-white dark:bg-neutral-900 border-2 border-neutral-900 dark:border-neutral-700 px-4 py-3 rounded-2xl shadow-[4px_4px_0px_0px_#1e1e1e] dark:shadow-[4px_4px_0px_0px_#4285F4]">
            <Search className="w-5 h-5 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by event title, speaker or venue..."
              className="w-full bg-transparent text-sm font-semibold text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl font-black text-sm border-2 border-neutral-900 dark:border-white bg-[#FBBC05] text-neutral-900 hover:bg-yellow-400 shadow-[4px_4px_0px_0px_#1e1e1e] transition-all"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all border-2 border-neutral-900 dark:border-neutral-600 ${
                  isSelected
                    ? 'bg-[#4285F4] text-white shadow-[3px_3px_0px_0px_#1e1e1e]'
                    : 'bg-white dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 shadow-[2px_2px_0px_0px_#1e1e1e]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-80 rounded-2xl border-2 border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 animate-pulse"
            />
          ))}
        </div>
      ) : events.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 rounded-3xl border-3 border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-8 space-y-3">
          <p className="text-lg font-black text-neutral-800 dark:text-neutral-200">
            No events found matching your criteria.
          </p>
          <p className="text-sm font-medium text-neutral-500">
            Try adjusting your search query or selecting a different category filter.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setActiveCategory('All');
            }}
            className="mt-2 px-4 py-2 rounded-xl text-xs font-bold border-2 border-neutral-900 bg-[#4285F4] text-white"
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}
