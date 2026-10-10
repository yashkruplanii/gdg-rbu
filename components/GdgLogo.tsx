import React from 'react';

export function GdgLogo({ className = "h-7 w-auto" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g stroke="#1E1E1E" strokeWidth="22" strokeLinecap="round" strokeLinejoin="round">
        <line x1="56" y1="26" x2="28" y2="48" />
        <line x1="28" y1="48" x2="56" y2="70" />

        <line x1="84" y1="26" x2="112" y2="48" />
        <line x1="112" y1="48" x2="84" y2="70" />
      </g>

      <g strokeWidth="16" strokeLinecap="round" strokeLinejoin="round">
        <line x1="56" y1="26" x2="28" y2="48" stroke="#EA4335" />
        <line x1="28" y1="48" x2="56" y2="70" stroke="#4285F4" />

        <line x1="84" y1="26" x2="112" y2="48" stroke="#34A853" />
        <line x1="112" y1="48" x2="84" y2="70" stroke="#FBBC05" />
      </g>
    </svg>
  );
}
