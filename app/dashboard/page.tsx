'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, QrCode, Calendar, Clock, MapPin, Tag, ArrowRight, ShieldCheck, Ticket, AlertCircle } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { QRPassModal } from '@/components/QRPassModal';

interface RegistrationItem {
  registrationId: string;
  qrToken: string;
  registeredAt: string;
  userName: string;
  userEmail: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventCategory: string;
}

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ userId: string; name: string; email: string; role: string; createdAt: string } | null>(null);
  const [registrations, setRegistrations] = useState<RegistrationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTicket, setSelectedTicket] = useState<RegistrationItem | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) throw new Error('Not logged in');
        return res.json();
      })
      .then((data) => {
        if (!data.user) {
          router.push('/login?redirect=/dashboard');
          return;
        }
        setUser(data.user);
        return fetch('/api/registrations/my');
      })
      .then((res) => (res && res.ok ? res.json() : { registrations: [] }))
      .then((data) => {
        if (data?.registrations) {
          setRegistrations(data.registrations);
        }
      })
      .catch(() => {
        router.push('/login?redirect=/dashboard');
      })
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto py-12 space-y-6 animate-pulse">
        <div className="h-40 bg-neutral-200 dark:bg-neutral-800 rounded-3xl"></div>
        <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-3xl"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-10">
      
      <div className="rounded-3xl border-3 border-neutral-900 dark:border-neutral-200 bg-white dark:bg-neutral-900 p-8 shadow-[8px_8px_0px_0px_#1e1e1e] dark:shadow-[8px_8px_0px_0px_#4285F4]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl border-2 border-neutral-900 bg-[#4285F4] text-white flex items-center justify-center font-black text-2xl shadow-[3px_3px_0px_0px_#1e1e1e]">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                  {user.name}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border border-neutral-900 bg-[#FBBC05] text-neutral-900">
                  {user.role}
                </span>
              </div>
              <p className="text-xs font-semibold text-neutral-500 mt-0.5">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-4 py-2.5 rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-center">
              <span className="text-xs font-black uppercase text-neutral-400 block">Total Passes</span>
              <span className="text-xl font-black text-[#4285F4]">{registrations.length}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#34A853] mb-1">
              <Ticket className="w-4 h-4" />
              <span>Event Passes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
              My Active Event Tickets
            </h2>
          </div>

          <Link
            href="/events"
            className="text-xs sm:text-sm font-black text-[#4285F4] hover:underline"
          >
            + Register for more events
          </Link>
        </div>

        {registrations.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {registrations.map((reg) => (
              <div
                key={reg.registrationId}
                className="group rounded-3xl border-3 border-neutral-900 dark:border-neutral-600 bg-white dark:bg-neutral-900 p-6 shadow-[6px_6px_0px_0px_#1e1e1e] dark:shadow-[6px_6px_0px_0px_#4285F4] flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-lg text-xs font-black uppercase tracking-wider border-2 border-neutral-900 bg-[#FBBC05] text-neutral-900">
                      {reg.eventCategory}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-neutral-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                      Pass Confirmed
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-black text-neutral-900 dark:text-white leading-snug">
                      {reg.eventTitle}
                    </h3>
                  </div>

                  <div className="space-y-2 py-3 border-y border-dashed border-neutral-200 dark:border-neutral-800 text-xs font-bold text-neutral-700 dark:text-neutral-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#4285F4]" />
                      <span>{formatDate(reg.eventDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[#EA4335]" />
                      <span>{reg.eventTime}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#34A853]" />
                      <span className="truncate">{reg.eventVenue}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedTicket(reg)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-black border-2 border-neutral-900 dark:border-white bg-[#4285F4] text-white hover:bg-blue-600 shadow-[2px_2px_0px_0px_#1e1e1e] transition-all"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View QR Pass</span>
                  </button>

                  <Link
                    href={`/events/${reg.eventId}`}
                    className="p-3 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 transition-colors"
                    title="View Event Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 rounded-3xl border-3 border-dashed border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-8 space-y-4">
            <Ticket className="w-12 h-12 text-neutral-400 mx-auto" />
            <h3 className="text-xl font-black text-neutral-800 dark:text-neutral-200">
              You haven&apos;t registered for any events yet.
            </h3>
            <p className="text-xs font-semibold text-neutral-500 max-w-sm mx-auto">
              Check out our upcoming workshops and hackathons, reserve your seat and claim your QR pass!
            </p>
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-black border-2 border-neutral-900 bg-[#34A853] text-white shadow-[3px_3px_0px_0px_#1e1e1e]"
            >
              Explore GDG Events
            </Link>
          </div>
        )}
      </div>

      {selectedTicket && (
        <QRPassModal
          isOpen={Boolean(selectedTicket)}
          onClose={() => setSelectedTicket(null)}
          ticket={selectedTicket}
        />
      )}

    </div>
  );
}
