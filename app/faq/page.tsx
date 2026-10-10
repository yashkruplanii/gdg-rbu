'use client';

import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const FAQS = [
  {
    q: 'What is Google Developer Groups (GDG) on Campus RBU?',
    a: 'GDG on Campus RBU is a university-based community group for students interested in Google developer technologies. We bring together developers to learn, connect, and grow through hands-on workshops, speaker sessions, and hackathons.',
  },
  {
    q: 'Is event registration completely free?',
    a: 'Yes! All GDG RBU workshops, hackathons, and technical bootcamps are 100% free for students.',
  },
  {
    q: 'How does event registration and the QR Pass work?',
    a: 'Browse the Events tab, pick the event you want to join, and click "Register Now". If capacity is available, the system immediately generates your verified QR Ticket Pass which is saved to your personal dashboard.',
  },
  {
    q: 'What happens if an event reaches full capacity?',
    a: 'When an event hits its maximum capacity, new registrations are automatically blocked with a "Housefull" notice to ensure everyone has a seat and materials.',
  },
  {
    q: 'Can I cancel my registration if I cannot attend?',
    a: 'Yes! Simply navigate to the event details page or your User Dashboard and click "Cancel Registration". This immediately frees up the spot for another student.',
  },
  {
    q: 'Do I get certificates for attending workshops?',
    a: 'Yes, attendees who participate in hands-on workshops and submit the project tasks will receive an official GDG RBU Certificate of Completion.',
  },
  {
    q: 'How can I join the GDG Core Organizing Team?',
    a: 'We conduct recruitment drives at the beginning of each academic semester. Complete the assignment tasks (like this EventHub web dev project) and participate in our technical interview rounds.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-neutral-900 dark:border-white bg-[#4285F4] text-white shadow-[2px_2px_0px_0px_#1e1e1e]">
          <HelpCircle className="w-3.5 h-3.5" />
          Help & Support
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-neutral-900 dark:text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-neutral-600 dark:text-neutral-400 font-medium">
          Everything you need to know about GDG RBU events, registration rules, passes, and team selections.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-[4px_4px_0px_0px_#1e1e1e] dark:shadow-[4px_4px_0px_0px_#4285F4] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left font-black text-base text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-[#4285F4] flex-shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-neutral-400 flex-shrink-0 ml-4" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-sm font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed border-t border-dashed border-neutral-200 dark:border-neutral-800">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl border-3 border-neutral-900 bg-[#FBBC05] text-neutral-900 shadow-[6px_6px_0px_0px_#1e1e1e] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-black text-lg">Still have questions?</h3>
          <p className="text-xs font-bold text-neutral-800">
            Ask our built-in AI assistant Sparky or email the organizing team directly!
          </p>
        </div>
        <a
          href="mailto:lead@gdgrbu.org"
          className="px-5 py-2.5 rounded-xl font-black text-xs border-2 border-neutral-900 bg-white text-neutral-900 hover:bg-neutral-100 shadow-[2px_2px_0px_0px_#1e1e1e] whitespace-nowrap"
        >
          Contact Organizers
        </a>
      </div>
    </div>
  );
}
