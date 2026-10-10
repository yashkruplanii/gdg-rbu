'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowUpRight, CheckCircle2, ChevronDown, ChevronUp, MapPin, Mail, Instagram, Linkedin, Twitter, Sparkles } from 'lucide-react';
import { EventItem } from '@/components/EventCard';
import { GdgLogo } from '@/components/GdgLogo';
import { formatDate } from '@/lib/utils';

export default function HomePage() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  useEffect(() => {
    fetch('/api/events')
      .then((res) => (res.ok ? res.json() : { events: [] }))
      .then((data) => setEvents(data.events || []))
      .catch(() => setEvents([]));
  }, []);

  const featuredEvent = events[0] || {
    id: 'sample-1',
    title: 'GDG ORIENTATION',
    description: 'Google Developer Groups (GDG) – Student Chapter is a community of students passionate about technology, innovation, and learning. We bring students together to learn, build, and grow through technical workshops, hands-on sessions, hackathons, projects, and networking.',
    date: '2026-10-07',
    time: '3:00 PM',
    venue: 'Ramdeobaba University, Main Auditorium',
    capacity: 100,
    category: 'Orientation',
  };

  const faqs = [
    {
      q: 'What is GDG RBU?',
      a: 'GDG RBU is focused on empowering students through hands-on workshops, tech talks, hackathons, and real-world project collaboration.',
    },
    {
      q: 'How to join GDG?',
      a: 'Any student at Ramdeobaba University can join by registering on our platform, attending upcoming induction sessions, and participating in chapter events.',
    },
    {
      q: 'What does a GDG Lead do?',
      a: 'GDG Leads collaborate with Google to plan curriculum, host campus tech events, mentor peer developers, and build high-impact software solutions.',
    },
    {
      q: 'How is GDG related to Google?',
      a: 'Google Developer Groups on Campus is an official program supported by Google Developers to bridge students with industry technologies and Google mentorship.',
    },
    {
      q: 'How to reach us?',
      a: 'You can email the organizing team at gdsc@rknec.edu or connect with us on our social handles below!',
    },
  ];

  return (
    <div className="space-y-24 py-6">
      
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-4">
        
        <div className="lg:col-span-7 space-y-6">
          <h1 className="font-pixel text-3xl sm:text-5xl lg:text-6xl text-neutral-900 dark:text-white leading-[1.2] tracking-tight uppercase">
            Google Developer Groups, RBU
          </h1>

          <p className="text-base sm:text-lg font-medium text-neutral-700 dark:text-neutral-300 max-w-lg leading-relaxed">
            Empowering students with cutting-edge tech skills, community, and resources for a future in technology.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/events"
              className="px-6 py-3 rounded-lg text-xs font-pixel font-bold uppercase tracking-wider border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#4285F4] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              Learn More
            </Link>

            <Link
              href="/dashboard"
              className="px-6 py-3 rounded-lg text-xs font-pixel font-bold uppercase tracking-wider border-2 border-black dark:border-white bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-[3px_3px_0px_0px_#000000] dark:shadow-[3px_3px_0px_0px_#4285F4] hover:-translate-x-0.5 hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              Profile
            </Link>
          </div>

          <div>
            <span className="inline-block px-3 py-1 rounded-md text-[10px] font-pixel bg-black text-white dark:bg-white dark:text-black">
              GDG · RBU
            </span>
          </div>
        </div>

        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm h-64 bg-black dark:bg-neutral-800 rounded-[48px] shadow-[8px_8px_0px_0px_#4285F4] p-8 flex flex-col justify-center items-center">
            
            <div className="w-full bg-white rounded-full px-4 py-2.5 flex items-center gap-2 border-2 border-black shadow-[2px_2px_0px_0px_#1e1e1e]">
              <Search className="w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="gdgr..."
                className="w-full bg-transparent text-xs font-mono text-neutral-800 focus:outline-none"
              />
            </div>

            <p className="text-[11px] text-neutral-400 font-pixel mt-4 text-center">
              Quickly find workshops, talks & tracks
            </p>
          </div>
        </div>

      </section>

      <section className="space-y-6">
        <h2 className="font-pixel text-2xl sm:text-3xl text-neutral-900 dark:text-white text-center sm:text-left">
          Upcoming Event
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-8 rounded-3xl border-3 border-black dark:border-white bg-gradient-to-br from-neutral-200 via-neutral-400 to-neutral-800 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-950 p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#000000] dark:shadow-[6px_6px_0px_0px_#4285F4] min-h-[320px] text-white">
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-pixel text-neutral-900 dark:text-neutral-300">
                  {featuredEvent.title}
                </span>
                <span className="px-3 py-1 rounded-full text-[10px] font-pixel uppercase bg-white text-black border-2 border-black">
                  UPCOMING
                </span>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white drop-shadow">
                {featuredEvent.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-200 font-medium leading-relaxed max-w-xl line-clamp-3">
                {featuredEvent.description}
              </p>

              <div>
                <Link
                  href={`/events/${featuredEvent.id}`}
                  className="w-10 h-10 rounded-full border-2 border-black bg-[#FBBC05] text-black flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] hover:scale-105 transition-transform"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

          </div>

          <div className="lg:col-span-4 rounded-3xl border-3 border-black dark:border-white bg-[#FBBC05] text-neutral-900 p-6 sm:p-8 flex flex-col justify-between shadow-[6px_6px_0px_0px_#000000] min-h-[320px]">
            
            <div className="space-y-4">
              <h3 className="font-pixel text-3xl sm:text-4xl text-neutral-900 leading-none">
                New <br /> Event
              </h3>

              <div className="space-y-1 pt-4 border-t-2 border-black">
                <span className="text-[10px] font-pixel text-neutral-800 uppercase block">DATE & TIME</span>
                <p className="text-sm font-black">{formatDate(featuredEvent.date)}</p>
                <p className="text-sm font-black">{featuredEvent.time}</p>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href={`/events/${featuredEvent.id}`}
                className="w-full block text-center py-3.5 px-4 rounded-full text-xs font-pixel font-bold bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#ffffff] hover:bg-neutral-800 transition-colors"
              >
                Register Now
              </Link>
            </div>

          </div>

        </div>
      </section>

      <section className="rounded-3xl border-3 border-black dark:border-white bg-white dark:bg-neutral-900 shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#4285F4] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          
          <div className="lg:col-span-6 p-8 sm:p-12 space-y-6 flex flex-col justify-center">
            <h2 className="font-pixel text-2xl sm:text-4xl text-neutral-900 dark:text-white leading-tight">
              Meet the Google Developer Group Team
            </h2>

            <p className="text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed">
              Google Developer Groups (GDG) are open and volunteer-run communities for developers interested in Google technologies. Our team focuses on learning, networking, and collaboration through events and hands-on sessions.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-900 dark:text-white flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Passionate Community Leaders</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                    Our organizers build an inclusive environment where developers can connect, share knowledge, and grow together.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-neutral-900 dark:text-white flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-xs sm:text-sm text-neutral-900 dark:text-white">Empowering Developers</h4>
                  <p className="text-[11px] sm:text-xs text-neutral-500 font-medium">
                    We host meetups and codelabs to help developers stay current with modern tools and best practices.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/team"
                className="inline-block px-5 py-2.5 rounded-lg text-xs font-pixel border-2 border-black dark:border-white bg-[#4285F4] text-white shadow-[3px_3px_0px_0px_#000000]"
              >
                Meet All Leads →
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 bg-neutral-100 dark:bg-neutral-800 border-t-3 lg:border-t-0 lg:border-l-3 border-black dark:border-neutral-700 relative min-h-[350px]">
            <img
              src="/gdg-team.jpg"
              alt="GDG RBU Core Team"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

      <section className="max-w-3xl mx-auto space-y-8">
        <h2 className="font-pixel text-3xl sm:text-5xl text-neutral-900 dark:text-white text-center">
          FAQs
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border-3 border-black dark:border-white bg-white dark:bg-neutral-900 shadow-[4px_4px_0px_0px_#000000] dark:shadow-[4px_4px_0px_0px_#4285F4] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-5 text-left font-black text-sm sm:text-base text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/60"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-neutral-900 dark:text-white flex-shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-neutral-900 dark:text-white flex-shrink-0 ml-4" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm font-medium text-neutral-700 dark:text-neutral-300 leading-relaxed border-t-2 border-black dark:border-neutral-700">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-12">
        <div className="rounded-3xl border-3 border-black dark:border-white bg-white dark:bg-neutral-900 p-8 sm:p-12 shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#4285F4] space-y-8">
          
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center mb-2">
              <GdgLogo className="h-10 w-auto" />
            </div>
            <h3 className="font-pixel text-2xl sm:text-3xl text-neutral-900 dark:text-white">
              Google Developer Groups
            </h3>
            <p className="text-xs font-bold text-neutral-600 dark:text-neutral-400">
              On Campus • Ramdeobaba University
            </p>
          </div>

          <div className="border-b-2 border-dashed border-black dark:border-neutral-700"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-black bg-[#4285F4] text-white shadow-[3px_3px_0px_0px_#000000]">
                <MapPin className="w-6 h-6 flex-shrink-0" />
                <div className="text-xs font-bold leading-tight">
                  <span className="font-black block">Ramdeobaba University</span>
                  <span>Ramdeo Tekdi, Gittikhadan, Katol Road, Nagpur-440013</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-xl border-2 border-black bg-[#FBBC05] text-neutral-900 shadow-[3px_3px_0px_0px_#000000]">
                <Mail className="w-6 h-6 flex-shrink-0" />
                <span className="text-xs font-black">gdsc@rknec.edu</span>
              </div>
            </div>

            <div className="lg:col-span-5 p-6 rounded-2xl border-2 border-black bg-[#6C5CE7] text-white shadow-[4px_4px_0px_0px_#000000] flex flex-col justify-center items-center space-y-4">
              <span className="font-black text-xs uppercase tracking-wider">Follow Us:</span>
              
              <div className="flex items-center gap-3">
                <a
                  href="https://www.instagram.com/gdg_rbu?utm_source=ig_web_button_share_sheet&exln=ZDNlZDc0MzIxNw=="
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl border-2 border-black bg-[#EA4335] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] hover:scale-105 transition-transform"
                  aria-label="Instagram"
                  title="GDG RBU Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>

                <a
                  href="https://www.linkedin.com/company/gdg-rbu/home/"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl border-2 border-black bg-[#4285F4] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] hover:scale-105 transition-transform"
                  aria-label="LinkedIn"
                  title="GDG RBU LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>

                <a
                  href="https://x.com/gdsc_rcoem"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-xl border-2 border-black bg-[#34A853] text-white flex items-center justify-center shadow-[2px_2px_0px_0px_#000000] hover:scale-105 transition-transform"
                  aria-label="Twitter / X"
                  title="GDG RBU on X / Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

          </div>

        </div>

        <div className="w-full flex items-center justify-center gap-3 overflow-hidden py-4 opacity-90">
          <div className="w-12 h-6 rounded-t-full bg-[#34A853]"></div>
          <div className="w-10 h-10 bg-[#EA4335] transform rotate-12"></div>
          <div className="w-12 h-12 rounded-full bg-[#FBBC05]"></div>
          <div className="w-14 h-8 bg-[#4285F4] rounded-lg transform -rotate-6"></div>
          <div className="w-12 h-6 rounded-b-full bg-[#EA4335]"></div>
          <div className="w-10 h-10 rounded-full bg-[#FBBC05]"></div>
          <div className="w-8 h-8 bg-[#34A853] transform rotate-45"></div>
          <div className="w-14 h-8 bg-[#4285F4] rounded-lg"></div>
        </div>

      </section>

    </div>
  );
}
