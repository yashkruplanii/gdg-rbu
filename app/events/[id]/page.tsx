'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, Clock, MapPin, Tag, Users, ArrowLeft, CheckCircle2, AlertCircle, QrCode, Sparkles, Share2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { QRPassModal } from '@/components/QRPassModal';
import confetti from 'canvas-confetti';

interface EventDetails {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  category: string;
  image?: string | null;
  registrationCount: number;
  isRegistered: boolean;
  qrToken?: string | null;
  registrationId?: string | null;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<{ userId: string; name: string; email: string } | null>(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => {});

    fetch(`/api/events/${eventId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Event not found');
        return res.json();
      })
      .then((data) => setEvent(data.event))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [eventId]);

  const handleRegister = async () => {
    if (!currentUser) {
      router.push(`/login?redirect=/events/${eventId}`);
      return;
    }

    setActionLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'POST',
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register');
      }

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      setEvent((prev) =>
        prev
          ? {
              ...prev,
              isRegistered: true,
              registrationCount: prev.registrationCount + 1,
              qrToken: data.registration.qrToken,
              registrationId: data.registration.id,
            }
          : null
      );

      setShowQRModal(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUnregister = async () => {
    if (!confirm('Are you sure you want to cancel your registration?')) return;

    setActionLoading(true);
    try {
      const res = await fetch(`/api/events/${eventId}/register`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setEvent((prev) =>
          prev
            ? {
                ...prev,
                isRegistered: false,
                registrationCount: Math.max(0, prev.registrationCount - 1),
                qrToken: null,
                registrationId: null,
              }
            : null
        );
      }
    } catch (err: any) {
      alert('Failed to cancel registration');
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-12 space-y-6 animate-pulse">
        <div className="h-8 w-36 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
        <div className="h-64 bg-neutral-200 dark:bg-neutral-800 rounded-3xl"></div>
      </div>
    );
  }

  if (error && !event) {
    return (
      <div className="max-w-md mx-auto py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-[#EA4335] mx-auto" />
        <h2 className="text-2xl font-black">Event Not Found</h2>
        <p className="text-sm text-neutral-500">The event you are looking for does not exist or has been removed.</p>
        <Link href="/events" className="inline-block px-5 py-2.5 rounded-xl text-sm font-bold bg-[#4285F4] text-white">
          Back to Events
        </Link>
      </div>
    );
  }

  if (!event) return null;

  const isFull = event.registrationCount >= event.capacity;
  const percentFilled = Math.min(100, Math.round((event.registrationCount / event.capacity) * 100));

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-8">
      
      <Link
        href="/events"
        className="inline-flex items-center gap-2 text-sm font-black text-neutral-700 dark:text-neutral-300 hover:text-[#4285F4] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to all events</span>
      </Link>

      <div className="rounded-3xl border-3 border-neutral-900 dark:border-neutral-200 bg-white dark:bg-neutral-900 p-6 sm:p-10 shadow-[8px_8px_0px_0px_#1e1e1e] dark:shadow-[8px_8px_0px_0px_#4285F4] space-y-8">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border-2 border-neutral-900 bg-[#FBBC05] text-neutral-900 shadow-[2px_2px_0px_0px_#1e1e1e]">
            {event.category}
          </span>

          {event.isRegistered ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-black rounded-xl border-2 border-neutral-900 bg-[#34A853] text-white shadow-[2px_2px_0px_0px_#1e1e1e]">
              <CheckCircle2 className="w-4 h-4" />
              You are Registered
            </span>
          ) : isFull ? (
            <span className="px-3 py-1.5 text-xs font-black rounded-xl border-2 border-neutral-900 bg-[#EA4335] text-white shadow-[2px_2px_0px_0px_#1e1e1e]">
              Capacity Reached (Full)
            </span>
          ) : (
            <span className="px-3 py-1.5 text-xs font-bold rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              {event.capacity - event.registrationCount} spots left
            </span>
          )}
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-neutral-900 dark:text-white leading-tight">
            {event.title}
          </h1>
          <p className="text-sm font-bold text-neutral-500 flex items-center gap-1.5">
            Hosted by <span className="text-[#4285F4]">Google Developer Groups RBU Chapter</span>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-5 rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#4285F4]" /> Date
            </span>
            <p className="text-sm font-black text-neutral-900 dark:text-white">
              {formatDate(event.date)}
            </p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#EA4335]" /> Time
            </span>
            <p className="text-sm font-black text-neutral-900 dark:text-white">{event.time}</p>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase text-neutral-400 tracking-wider flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#34A853]" /> Venue
            </span>
            <p className="text-sm font-black text-neutral-900 dark:text-white truncate">
              {event.venue}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-lg font-black text-neutral-900 dark:text-white">About The Event</h3>
          <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 font-medium text-sm sm:text-base leading-relaxed whitespace-pre-line">
            {event.description}
          </div>
        </div>

        <div className="space-y-2 pt-4 border-t-2 border-dashed border-neutral-200 dark:border-neutral-700">
          <div className="flex justify-between text-xs font-black text-neutral-800 dark:text-neutral-200">
            <span>Registration Capacity</span>
            <span>
              {event.registrationCount} / {event.capacity} Registered ({percentFilled}%)
            </span>
          </div>
          <div className="w-full h-3 rounded-full border-2 border-neutral-900 dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isFull ? 'bg-[#EA4335]' : percentFilled > 75 ? 'bg-[#FBBC05]' : 'bg-[#34A853]'
              }`}
              style={{ width: `${percentFilled}%` }}
            />
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 text-xs font-bold">
            {error}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4 pt-2">
          {event.isRegistered ? (
            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => setShowQRModal(true)}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm border-2 border-neutral-900 dark:border-white bg-[#4285F4] text-white hover:bg-blue-600 shadow-[4px_4px_0px_0px_#1e1e1e] transition-all"
              >
                <QrCode className="w-5 h-5" />
                <span>View My QR Ticket Pass</span>
              </button>

              <button
                onClick={handleUnregister}
                disabled={actionLoading}
                className="px-5 py-3.5 rounded-2xl font-bold text-xs border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/30 text-neutral-700 dark:text-neutral-300 transition-all"
              >
                Cancel Registration
              </button>
            </div>
          ) : (
            <button
              onClick={handleRegister}
              disabled={actionLoading || isFull}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-black text-base border-3 border-neutral-900 dark:border-white shadow-[4px_4px_0px_0px_#1e1e1e] transition-all active:translate-x-0.5 active:translate-y-0.5 ${
                isFull
                  ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-500 cursor-not-allowed border-neutral-400'
                  : 'bg-[#34A853] text-white hover:bg-emerald-600'
              }`}
            >
              <Sparkles className="w-5 h-5" />
              <span>{isFull ? 'Event Full — Sold Out' : 'Register Now (Free Entry)'}</span>
            </button>
          )}

          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Event link copied to clipboard!');
              }
            }}
            className="p-3.5 rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 shadow-[2px_2px_0px_0px_#1e1e1e]"
            title="Share Event"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

      </div>

      {event.isRegistered && (
        <QRPassModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          ticket={{
            registrationId: event.registrationId || '',
            qrToken: event.qrToken || '',
            userName: currentUser?.name || 'GDG Member',
            userEmail: currentUser?.email || '',
            eventTitle: event.title,
            eventDate: event.date,
            eventTime: event.time,
            eventVenue: event.venue,
            eventCategory: event.category,
            registeredAt: new Date().toISOString(),
          }}
        />
      )}

    </div>
  );
}
