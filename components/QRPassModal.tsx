'use client';

import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { X, Printer, Download, Calendar, Clock, MapPin, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { GdgLogo } from './GdgLogo';

interface QRPassModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticket: {
    registrationId: string;
    qrToken: string;
    userName: string;
    userEmail: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventVenue: string;
    eventCategory: string;
    registeredAt: string;
  } | null;
}

export function QRPassModal({ isOpen, onClose, ticket }: QRPassModalProps) {
  const qrRef = useRef<SVGSVGElement>(null);

  if (!isOpen || !ticket) return null;

  const qrPayload = JSON.stringify({
    regId: ticket.registrationId,
    token: ticket.qrToken,
    user: ticket.userName,
    event: ticket.eventTitle,
    date: ticket.eventDate,
    valid: true,
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQR = () => {
    const svg = document.getElementById('ticket-qr-svg');
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = 500;
      canvas.height = 500;
      if (ctx) {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, 500, 500);
        ctx.drawImage(img, 25, 25, 450, 450);
        const pngFile = canvas.toDataURL('image/png');
        const downloadLink = document.createElement('a');
        downloadLink.download = `GDG-Pass-${ticket.qrToken.slice(0, 8)}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      }
    };

    img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      
      <div
        id="printable-ticket-pass"
        className="relative w-full max-w-md bg-white dark:bg-neutral-900 border-3 border-black dark:border-white rounded-3xl p-6 sm:p-7 shadow-[8px_8px_0px_0px_#000000] dark:shadow-[8px_8px_0px_0px_#4285F4] overflow-hidden"
      >
        
        <button
          onClick={onClose}
          className="no-print absolute top-4 right-4 p-2 rounded-xl border-2 border-black dark:border-neutral-600 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 text-neutral-800 dark:text-neutral-200 shadow-[2px_2px_0px_0px_#000000]"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-4">
          
          <div className="text-center pt-1 space-y-1">
            <div className="flex items-center justify-center mb-1">
              <GdgLogo className="h-6 w-auto" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border-2 border-black bg-[#34A853]/15 text-[#34A853] text-[10px] font-black uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5" />
              OFFICIAL ENTRY PASS
            </div>
            
            <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">
              GDG RBU Event Ticket
            </h2>
            <p className="text-[11px] text-neutral-500 font-semibold">
              Scan this QR code at the check-in desk
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 border-dashed border-black dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/80">
            <div className="p-3 bg-white rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_#000000]">
              <QRCodeSVG
                id="ticket-qr-svg"
                value={qrPayload}
                size={170}
                level="H"
                includeMargin={true}
                fgColor="#000000"
              />
            </div>
            <span className="mt-2.5 text-[11px] font-mono font-bold tracking-widest text-neutral-600 dark:text-neutral-400 uppercase">
              PASS ID: #{ticket.qrToken.slice(0, 8)}
            </span>
          </div>

          <div className="space-y-2.5 rounded-2xl border-2 border-black dark:border-neutral-700 p-4 bg-white dark:bg-neutral-800 text-xs font-bold">
            <div className="pb-2 border-b border-neutral-200 dark:border-neutral-700">
              <span className="text-neutral-500 uppercase tracking-wider text-[10px] block">Event</span>
              <span className="text-sm font-black text-neutral-900 dark:text-white block mt-0.5 leading-snug">
                {ticket.eventTitle}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-neutral-500 text-[10px] uppercase block">Attendee</span>
                <span className="text-neutral-900 dark:text-white">{ticket.userName}</span>
              </div>
              <div>
                <span className="text-neutral-500 text-[10px] uppercase block">Category</span>
                <span className="text-neutral-900 dark:text-white">{ticket.eventCategory}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-dashed border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                <Calendar className="w-3.5 h-3.5 text-[#4285F4]" />
                <span>{formatDate(ticket.eventDate)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-[#EA4335]" />
                <span>{ticket.eventTime}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-neutral-700 dark:text-neutral-300 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-[#34A853] flex-shrink-0" />
              <span className="truncate">{ticket.eventVenue}</span>
            </div>
          </div>

          <div className="no-print grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={handlePrint}
              className="w-full flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs font-black border-2 border-black dark:border-white bg-[#4285F4] text-white hover:bg-blue-600 shadow-[3px_3px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>Print Pass</span>
            </button>

            <button
              onClick={handleDownloadQR}
              className="w-full flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs font-black border-2 border-black dark:border-white bg-[#34A853] text-white hover:bg-emerald-600 shadow-[3px_3px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Save Image</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
