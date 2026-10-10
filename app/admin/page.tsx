'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Shield, Plus, Edit2, Trash2, Users, Calendar, BarChart3, CheckCircle, X, AlertCircle, Sparkles, TrendingUp } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface EventItem {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  capacity: number;
  category: string;
  featured?: boolean;
}

interface AnalyticsData {
  summary: {
    totalUsers: number;
    totalEvents: number;
    totalRegistrations: number;
    totalCapacity: number;
    overallOccupancyRate: number;
  };
  eventStats: Array<{
    id: string;
    title: string;
    category: string;
    date: string;
    capacity: number;
    registrations: number;
    occupancy: number;
  }>;
  categoryCount: Record<string, number>;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [events, setEvents] = useState<EventItem[]>([]);
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'overview' | 'events' | 'registrations'>('overview');

  const [showEventModal, setShowEventModal] = useState(false);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '2026-10-20',
    time: '03:00 PM',
    venue: 'RBU Main Auditorium',
    capacity: 100,
    category: 'Workshop',
    featured: false,
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const loadAllData = async () => {
    try {
      const meRes = await fetch('/api/auth/me');
      const meData = await meRes.json();

      if (!meData?.user || meData.user.role !== 'ADMIN') {
        router.push('/login?redirect=/admin');
        return;
      }
      setIsAdmin(true);

      const analyticsRes = await fetch('/api/admin/analytics');
      if (analyticsRes.ok) {
        const aData = await analyticsRes.json();
        setAnalytics(aData);
      }

      const eventsRes = await fetch('/api/events');
      if (eventsRes.ok) {
        const eData = await eventsRes.json();
        setEvents(eData.events || []);
      }

      const regRes = await fetch('/api/admin/registrations');
      if (regRes.ok) {
        const rData = await regRes.json();
        setRegistrations(rData.registrations || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllData();
  }, [router]);

  const handleOpenCreateModal = () => {
    setEditingEventId(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      time: '03:00 PM',
      venue: 'Ramdeobaba University, Campus A',
      capacity: 100,
      category: 'Workshop',
      featured: false,
    });
    setShowEventModal(true);
  };

  const handleOpenEditModal = (event: EventItem) => {
    setEditingEventId(event.id);
    setFormData({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      venue: event.venue,
      capacity: event.capacity,
      category: event.category,
      featured: Boolean(event.featured),
    });
    setShowEventModal(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);

    try {
      const url = editingEventId ? `/api/events/${editingEventId}` : '/api/events';
      const method = editingEventId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save event');

      setShowEventModal(false);
      await loadAllData();
    } catch (err: any) {
      setFormError(err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteEvent = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event? This will also remove its registrations.')) return;

    try {
      const res = await fetch(`/api/events/${id}`, { method: 'DELETE' });
      if (res.ok) {
        await loadAllData();
      } else {
        alert('Failed to delete event');
      }
    } catch {
      alert('Error deleting event');
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-12 space-y-6 animate-pulse">
        <div className="h-10 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-lg"></div>
        <div className="h-96 bg-neutral-200 dark:bg-neutral-800 rounded-3xl"></div>
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border-2 border-neutral-900 bg-[#EA4335] text-white shadow-[2px_2px_0px_0px_#1e1e1e] mb-1">
            <Shield className="w-3.5 h-3.5" />
            Admin Control Panel
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">
            GDG RBU Management
          </h1>
        </div>

        <button
          onClick={handleOpenCreateModal}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl font-black text-sm border-2 border-neutral-900 dark:border-white bg-[#34A853] text-white hover:bg-emerald-600 shadow-[4px_4px_0px_0px_#1e1e1e] transition-all active:translate-x-0.5 active:translate-y-0.5"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Event</span>
        </button>
      </div>

      <div className="flex gap-2 border-b-2 border-neutral-300 dark:border-neutral-700 pb-2 overflow-x-auto">
        {[
          { id: 'overview', label: 'Analytics & Overview', icon: BarChart3 },
          { id: 'events', label: `Events (${events.length})`, icon: Calendar },
          { id: 'registrations', label: `Attendee Passes (${registrations.length})`, icon: Users },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs sm:text-sm border-2 transition-all ${
                isActive
                  ? 'border-neutral-900 bg-[#4285F4] text-white shadow-[2px_2px_0px_0px_#1e1e1e]'
                  : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === 'overview' && analytics && (
        <div className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-[3px_3px_0px_0px_#1e1e1e]">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Total Registered Users</span>
              <div className="text-3xl font-black text-[#4285F4] mt-1">{analytics.summary.totalUsers}</div>
            </div>

            <div className="p-5 rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-[3px_3px_0px_0px_#1e1e1e]">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Active Events</span>
              <div className="text-3xl font-black text-[#EA4335] mt-1">{analytics.summary.totalEvents}</div>
            </div>

            <div className="p-5 rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-[3px_3px_0px_0px_#1e1e1e]">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Total Passes Issued</span>
              <div className="text-3xl font-black text-[#34A853] mt-1">{analytics.summary.totalRegistrations}</div>
            </div>

            <div className="p-5 rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 shadow-[3px_3px_0px_0px_#1e1e1e]">
              <span className="text-[10px] font-black uppercase tracking-wider text-neutral-400">Overall Occupancy</span>
              <div className="text-3xl font-black text-[#FBBC05] mt-1">{analytics.summary.overallOccupancyRate}%</div>
            </div>
          </div>

          <div className="rounded-3xl border-3 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-6 shadow-[6px_6px_0px_0px_#1e1e1e] space-y-4">
            <h3 className="font-black text-lg text-neutral-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#4285F4]" />
              Event Capacity & Occupancy Analytics
            </h3>

            <div className="space-y-4 pt-2">
              {analytics.eventStats.map((ev) => (
                <div key={ev.id} className="space-y-1.5 p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-neutral-900 dark:text-white font-black">{ev.title}</span>
                    <span className="text-neutral-600 dark:text-neutral-400">
                      {ev.registrations} / {ev.capacity} seats ({ev.occupancy}%)
                    </span>
                  </div>
                  <div className="w-full h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                    <div
                      className={`h-full ${
                        ev.occupancy >= 100
                          ? 'bg-[#EA4335]'
                          : ev.occupancy > 70
                          ? 'bg-[#FBBC05]'
                          : 'bg-[#34A853]'
                      }`}
                      style={{ width: `${ev.occupancy}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'events' && (
        <div className="rounded-3xl border-3 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden shadow-[6px_6px_0px_0px_#1e1e1e]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead className="border-b-2 border-neutral-900 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-[10px] font-black uppercase text-neutral-600 dark:text-neutral-300">
                <tr>
                  <th className="p-4">Event Title</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Schedule</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4">Capacity</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {events.map((event) => (
                  <tr key={event.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                    <td className="p-4 font-black text-neutral-900 dark:text-white">
                      {event.title}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase bg-[#FBBC05]/20 text-[#FBBC05]">
                        {event.category}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-neutral-700 dark:text-neutral-300">
                      {formatDate(event.date)} • {event.time}
                    </td>
                    <td className="p-4 text-neutral-600 dark:text-neutral-400 truncate max-w-[150px]">
                      {event.venue}
                    </td>
                    <td className="p-4 font-bold text-neutral-800 dark:text-neutral-200">
                      {event.capacity} seats
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => handleOpenEditModal(event)}
                        className="p-1.5 rounded-lg border border-neutral-900 bg-white dark:bg-neutral-800 hover:bg-neutral-100 text-neutral-800 dark:text-white"
                        title="Edit Event"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteEvent(event.id)}
                        className="p-1.5 rounded-lg border border-neutral-900 bg-red-100 hover:bg-red-200 text-red-700"
                        title="Delete Event"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'registrations' && (
        <div className="rounded-3xl border-3 border-neutral-900 dark:border-neutral-700 bg-white dark:bg-neutral-900 overflow-hidden shadow-[6px_6px_0px_0px_#1e1e1e]">
          <div className="p-4 border-b-2 border-neutral-900 dark:border-neutral-700 flex justify-between items-center bg-neutral-100 dark:bg-neutral-800">
            <h3 className="font-black text-sm text-neutral-900 dark:text-white">
              All Confirmed Event Attendees
            </h3>
            <span className="text-xs font-bold text-neutral-500">
              Total: {registrations.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-medium">
              <thead className="border-b border-neutral-200 dark:border-neutral-800 text-[10px] font-black uppercase text-neutral-500">
                <tr>
                  <th className="p-4">Attendee Name</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Event</th>
                  <th className="p-4">QR Token</th>
                  <th className="p-4">Registered On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                    <td className="p-4 font-black text-neutral-900 dark:text-white">
                      {reg.user?.name}
                    </td>
                    <td className="p-4 text-neutral-600 dark:text-neutral-400">
                      {reg.user?.email}
                    </td>
                    <td className="p-4 font-bold text-neutral-800 dark:text-neutral-200">
                      {reg.event?.title}
                    </td>
                    <td className="p-4 font-mono text-[11px] text-neutral-500">
                      {reg.qrToken.slice(0, 8)}...
                    </td>
                    <td className="p-4 text-neutral-500">
                      {new Date(reg.registeredAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border-3 border-neutral-900 dark:border-white rounded-3xl p-6 shadow-[8px_8px_0px_0px_#1e1e1e] space-y-5 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="text-xl font-black text-neutral-900 dark:text-white">
                {editingEventId ? 'Edit Event Details' : 'Create New GDG Event'}
              </h2>
              <button
                onClick={() => setShowEventModal(false)}
                className="p-1.5 rounded-lg border border-neutral-900 bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl border border-red-500 bg-red-50 dark:bg-red-950 text-red-600 text-xs font-bold">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs font-bold">
              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Flutter Deep Dive Bootcamp"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-medium"
                />
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Event overview, agenda, prerequisites..."
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g. 03:00 PM"
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-medium"
                  >
                    <option value="Workshop">Workshop</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Tech Talk">Tech Talk</option>
                    <option value="Orientation">Orientation</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Web3">Web3</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-700 dark:text-neutral-300 mb-1">Capacity</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.capacity}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-700 dark:text-neutral-300 mb-1">Venue Location</label>
                <input
                  type="text"
                  required
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  placeholder="e.g. Auditorium Hall B / Virtual Stream"
                  className="w-full px-3.5 py-2.5 rounded-xl border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 font-medium"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={formLoading}
                  className="w-full py-3 rounded-xl text-sm font-black border-2 border-neutral-900 dark:border-white bg-[#4285F4] text-white hover:bg-blue-600 shadow-[3px_3px_0px_0px_#1e1e1e]"
                >
                  {formLoading ? 'Saving Event...' : editingEventId ? 'Update Event' : 'Publish Event'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
