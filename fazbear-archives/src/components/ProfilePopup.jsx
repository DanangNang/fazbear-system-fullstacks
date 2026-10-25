import React, { useEffect } from 'react';
import { X, LogOut, ShieldCheck, User, Clock, BadgeCheck } from 'lucide-react';
import { getClearanceLevel } from '../utils/security';

export default function ProfilePopup({ isOpen, onClose, guardName, guardId, onLogout }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const initials = guardName
    ? guardName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'SG';

  const clearance = getClearanceLevel(guardId);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Card in Deep Black & Security Orange */}
      <div className="relative w-full max-w-md bg-[#141414] border border-[#2E2E2E] rounded-xl shadow-2xl p-6 sm:p-7 z-10 select-none">
        {/* Header & Close Button */}
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#2E2E2E]">
          <div className="flex items-center gap-2">
            <BadgeCheck className="w-4 h-4 text-[#EA580C]" />
            <h2
              id="profile-popup-title"
              className="text-sm font-bold uppercase tracking-wider text-[#F5F5F5] font-['Chakra_Petch',sans-serif]"
            >
              Security Personnel Dossier
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close profile popup"
            className="p-1.5 rounded-lg text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#1F1F1F] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Profile Card Center */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-[#1F1F1F] border border-[#2E2E2E] mb-5">
          {/* Avatar Default */}
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-xl bg-[#141414] border-2 border-[#EA580C] flex items-center justify-center text-xl font-bold font-mono text-[#F5F5F5] shadow-[0_0_12px_rgba(234,88,12,0.3)]">
              {initials}
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#EA580C] border-2 border-[#1F1F1F] shadow-[0_0_6px_#EA580C]"
              title="Online / Active Shift"
            />
          </div>

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-[#F5F5F5] truncate font-['Chakra_Petch',sans-serif]">
                {guardName || 'Security Guard'}
              </span>
            </div>

            <div className="text-xs text-[#A3A3A3] font-mono mt-0.5">
              ID: <span className="text-[#FB923C] font-semibold">{guardId || 'SEC-0000'}</span>
            </div>

            {/* Status: Authorized Personnel in Orange / Gold Amber */}
            <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-orange-950/60 border border-orange-500/40 text-[#FB923C] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse shadow-[0_0_6px_#EA580C]" />
              <span>Authorized Personnel</span>
            </div>
          </div>
        </div>

        {/* Security Meta Breakdown */}
        <div className="space-y-2 mb-6 text-xs font-mono">
          <div className="flex items-center justify-between p-2.5 rounded bg-[#1F1F1F]/60 border border-[#2E2E2E]">
            <span className="text-[#A3A3A3] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#EA580C]" />
              Shift Assignment:
            </span>
            <span className="text-[#F5F5F5] font-semibold">Night Shift (12AM - 6AM)</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded bg-[#1F1F1F]/60 border border-[#2E2E2E]">
            <span className="text-[#A3A3A3] flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C]" />
              Clearance Level:
            </span>
            <span className="text-[#F5F5F5] font-semibold">{clearance}</span>
          </div>

          <div className="flex items-center justify-between p-2.5 rounded bg-[#1F1F1F]/60 border border-[#2E2E2E]">
            <span className="text-[#A3A3A3] flex items-center gap-2">
              <User className="w-3.5 h-3.5 text-[#EA580C]" />
              Facility Station:
            </span>
            <span className="text-[#F5F5F5] font-semibold">Main Security Office</span>
          </div>
        </div>

        {/* Actions: Log Out in Orange */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#F5F5F5] rounded-lg text-xs font-semibold uppercase tracking-wider border border-[#2E2E2E] transition-colors cursor-pointer"
          >
            Tutup
          </button>
          <button
            type="button"
            onClick={onLogout}
            className="flex-1 py-2.5 px-4 bg-[#EA580C] hover:bg-[#C2410C] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 border border-[#EA580C] transition-colors shadow-md shadow-[#EA580C]/25 cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Log Out</span>
          </button>
        </div>

        {/* Notice */}
        <p className="mt-4 text-[10px] text-center text-[#A3A3A3] font-mono">
          Logging out terminates the active security session and returns to login terminal.
        </p>
      </div>
    </div>
  );
}
