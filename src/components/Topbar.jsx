import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function Topbar({ guardName, guardId, onOpenProfile }) {
  const initials = guardName
    ? guardName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'SG';

  return (
    <header className="bg-[#141414] border-b border-[#2E2E2E] sticky top-0 z-30 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Brand Name */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-[#EA580C] shadow-inner">
              <svg
                className="w-6 h-6"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M32 4L12 12V28C12 43.5 20.5 53 32 58C43.5 53 52 43.5 52 28V12L32 4Z"
                  stroke="#EA580C"
                  strokeWidth="3"
                  fill="#0A0A0A"
                />
                <circle cx="21" cy="22" r="4.5" fill="#EA580C" />
                <circle cx="43" cy="22" r="4.5" fill="#EA580C" />
                <path
                  d="M20 29C20 22.3726 25.3726 17 32 17C38.6274 17 44 22.3726 44 29C44 35.6274 38.6274 41 32 41C25.3726 41 20 35.6274 20 29Z"
                  fill="#1F1F1F"
                />
                <rect x="25" y="10" width="14" height="9" rx="1" fill="#0A0A0A" stroke="#F5F5F5" strokeWidth="1" />
                <line x1="21" y1="19" x2="43" y2="19" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" />
                <rect x="25" y="16" width="14" height="2" fill="#EA580C" />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-[#F5F5F5] tracking-wider uppercase font-['Chakra_Petch',sans-serif]">
                  Fazbear Archives
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-[#EA580C]/20 text-[#FB923C] border border-[#EA580C]/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse shadow-[0_0_6px_#EA580C]" />
                  NIGHT SHIFT
                </span>
              </div>
              <p className="text-xs text-[#A3A3A3] font-mono tracking-wide">
                Security Management System
              </p>
            </div>
          </div>

          {/* Right: Security Guard Profile Button */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex flex-col text-right font-mono text-xs">
              <span className="text-[#A3A3A3]">SYS STATUS:</span>
              <span className="text-[#F5F5F5] font-semibold flex items-center justify-end gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#EA580C] shadow-[0_0_6px_#EA580C]" />
                OFFICE POWER: 99%
              </span>
            </div>

            <button
              type="button"
              onClick={onOpenProfile}
              aria-label="Open Security Guard Profile"
              className="flex items-center gap-3 p-1.5 sm:px-3 sm:py-1.5 rounded-lg bg-[#1F1F1F] hover:bg-[#2A2A2A] border border-[#2E2E2E] hover:border-[#EA580C] transition-colors cursor-pointer group"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-md bg-[#141414] border border-[#2E2E2E] text-[#F5F5F5] group-hover:text-[#EA580C] font-bold text-xs flex items-center justify-center font-mono transition-colors">
                  {initials}
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#EA580C] ring-2 ring-[#1F1F1F] shadow-[0_0_6px_#EA580C]" />
              </div>

              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-[#F5F5F5] group-hover:text-white leading-tight">
                  {guardName || 'Security Guard'}
                </div>
                <div className="text-[11px] text-[#A3A3A3] font-mono leading-none">
                  {guardId || 'ID: UNKNOWN'}
                </div>
              </div>

              <ChevronDown className="w-4 h-4 text-[#A3A3A3] group-hover:text-[#F5F5F5] transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
