import React, { useState } from 'react';
import { KeyRound, User, AlertTriangle, Lock, Terminal } from 'lucide-react';
import { validateCredentials, formatSecurityId, formatGuardName } from '../utils/security';

export default function LoginPage({ onLogin }) {
  const [guardName, setGuardName] = useState('');
  const [securityId, setSecurityId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');

    const validation = validateCredentials(guardName, securityId);
    if (!validation.isValid) {
      setErrorMessage(validation.error || 'Akses ditolak: Data tidak valid.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      onLogin({
        name: formatGuardName(guardName),
        id: formatSecurityId(securityId),
      });
      setIsSubmitting(false);
    }, 300);
  };

  const handleQuickDemo = (demoName, demoId) => {
    setGuardName(demoName);
    setSecurityId(demoId);
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-4 relative overflow-hidden select-none">
      {/* Industrial carbon-black grid & orange ambient backlight */}
      <div className="absolute inset-0 bg-[radial-gradient(#222222_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
      <div className="absolute w-[500px] h-[500px] bg-[#EA580C]/8 rounded-full blur-[120px] pointer-events-none -top-24 -left-24" />
      <div className="absolute w-[400px] h-[400px] bg-[#EA580C]/5 rounded-full blur-[100px] pointer-events-none -bottom-20 -right-20" />
      <div className="crt-overlay absolute inset-0 pointer-events-none" />

      {/* Top system terminal bar */}
      <div className="w-full max-w-md mb-4 flex items-center justify-between text-xs text-[#A3A3A3] font-mono border-b border-[#2E2E2E] pb-2">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#EA580C] animate-pulse inline-block shadow-[0_0_8px_#EA580C]" />
          SEC_TERMINAL_07 // LIVE
        </span>
        <span className="text-[#FB923C]/90">PROTOCOL 1987-REV4</span>
      </div>

      {/* Main Login Card */}
      <div className="w-full max-w-md bg-[#141414] border border-[#2E2E2E] hover:border-[#EA580C]/40 rounded-xl shadow-2xl p-6 sm:p-8 relative z-10 transition-colors">
        {/* Fazbear Archives Logo & Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-[#1F1F1F] border border-[#2E2E2E] text-[#EA580C] mb-3 relative group shadow-inner">
            {/* Stylized Fazbear Top Hat & Shield Emblem in Orange & Black */}
            <svg
              className="w-10 h-10 transition-transform group-hover:scale-105"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-label="Fazbear Archives Logo"
              role="img"
            >
              {/* Outer Security Shield */}
              <path
                d="M32 4L12 12V28C12 43.5 20.5 53 32 58C43.5 53 52 43.5 52 28V12L32 4Z"
                stroke="#EA580C"
                strokeWidth="2.5"
                fill="#0A0A0A"
              />
              {/* Bear Ears */}
              <circle cx="21" cy="22" r="5" fill="#EA580C" />
              <circle cx="43" cy="22" r="5" fill="#EA580C" />
              <circle cx="21" cy="22" r="2.5" fill="#141414" />
              <circle cx="43" cy="22" r="2.5" fill="#141414" />
              {/* Bear Head Silhouette */}
              <path
                d="M20 29C20 22.3726 25.3726 17 32 17C38.6274 17 44 22.3726 44 29C44 35.6274 38.6274 41 32 41C25.3726 41 20 35.6274 20 29Z"
                fill="#1F1F1F"
                stroke="#EA580C"
                strokeWidth="1.5"
              />
              {/* Top Hat */}
              <rect x="25" y="10" width="14" height="10" rx="1.5" fill="#0A0A0A" stroke="#F5F5F5" strokeWidth="1" />
              <line x1="21" y1="20" x2="43" y2="20" stroke="#F5F5F5" strokeWidth="2" strokeLinecap="round" />
              <rect x="25" y="17" width="14" height="2" fill="#EA580C" />
              {/* Snout & Nose */}
              <ellipse cx="32" cy="33" rx="6" ry="4" fill="#141414" />
              <polygon points="32,30 30,32 34,32" fill="#EA580C" />
              {/* Eye Glow */}
              <circle cx="27" cy="27" r="1.5" fill="#FB923C" />
              <circle cx="37" cy="27" r="1.5" fill="#FB923C" />
            </svg>
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#EA580C] rounded-full border-2 border-[#141414] shadow-[0_0_6px_#EA580C]" />
          </div>

          <h1 className="text-2xl font-bold tracking-wider text-[#F5F5F5] uppercase font-['Chakra_Petch',sans-serif]">
            Fazbear Archives
          </h1>
          <p className="text-xs font-mono uppercase tracking-widest text-[#EA580C] mt-0.5 font-semibold">
            Security Management System
          </p>
          <p className="text-xs text-[#A3A3A3] mt-1">
            Fazbear Entertainment Inc. // Internal Security Terminal
          </p>
        </div>

        {/* Validation Error Banner */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-5 p-3 rounded-lg bg-[#EA580C]/15 border border-[#EA580C] flex items-start gap-2.5 text-xs text-[#F5F5F5]"
          >
            <AlertTriangle className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#EA580C] block uppercase tracking-wider">Access Denied</span>
              <span>{errorMessage}</span>
            </div>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Guard Name Input */}
          <div>
            <label
              htmlFor="guard-name-input"
              className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-mono"
            >
              Guard Name <span className="text-[#EA580C]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A3A3]">
                <User className="w-4 h-4" />
              </div>
              <input
                id="guard-name-input"
                type="text"
                value={guardName}
                onChange={(e) => {
                  setGuardName(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter Guard Full Name (e.g. Mike Schmidt)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#2E2E2E] rounded-lg text-sm text-[#F5F5F5] placeholder-[#A3A3A3]/60 focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-colors"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Security ID Number Input */}
          <div>
            <label
              htmlFor="security-id-input"
              className="block text-xs font-semibold uppercase tracking-wider text-[#A3A3A3] mb-1.5 font-mono"
            >
              Security ID Number <span className="text-[#EA580C]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#A3A3A3]">
                <KeyRound className="w-4 h-4" />
              </div>
              <input
                id="security-id-input"
                type="text"
                value={securityId}
                onChange={(e) => {
                  setSecurityId(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Enter Security ID (e.g. FAZ-8701)"
                className="w-full pl-10 pr-4 py-2.5 bg-[#1F1F1F] border border-[#2E2E2E] rounded-lg text-sm text-[#F5F5F5] font-mono placeholder-[#A3A3A3]/60 uppercase focus:outline-none focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C] transition-colors"
                autoComplete="off"
              />
            </div>
          </div>

          {/* Access System Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full mt-2 py-3 px-4 bg-[#EA580C] hover:bg-[#C2410C] active:scale-[0.99] text-[#F5F5F5] font-bold text-sm uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 border border-[#EA580C] shadow-lg shadow-[#EA580C]/25 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <Lock className="w-4 h-4" />
            <span>{isSubmitting ? 'Verifying Authorization...' : 'Access System'}</span>
          </button>
        </form>

        {/* Quick Demo Credentials */}
        <div className="mt-5 pt-4 border-t border-[#2E2E2E] text-xs">
          <p className="text-[#A3A3A3] mb-2 flex items-center gap-1.5 font-mono">
            <Terminal className="w-3.5 h-3.5 text-[#EA580C]" />
            Quick Demo Personnel:
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleQuickDemo('Nearbys', 'FAZ-0001')}
              className="p-2 rounded bg-[#1F1F1F] hover:bg-[#2A2A2A] hover:border-[#EA580C]/50 border border-[#2E2E2E] text-left transition-colors text-[11px] cursor-pointer"
            >
              <div className="font-semibold text-[#F5F5F5]">Nearbys</div>
              <div className="text-[#FB923C] font-mono">FAZ-0001</div>
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemo('Michael Afton', 'FAZ-0005')}
              className="p-2 rounded bg-[#1F1F1F] hover:bg-[#2A2A2A] hover:border-[#EA580C]/50 border border-[#2E2E2E] text-left transition-colors text-[11px] cursor-pointer"
            >
              <div className="font-semibold text-[#F5F5F5]">Michael Afton</div>
              <div className="text-[#FB923C] font-mono">FAZ-0005</div>
            </button>
          </div>
        </div>

        {/* Security Notice Footer */}
        <div className="mt-5 pt-3 border-t border-[#2E2E2E]/50 text-center">
          <p className="text-[10px] text-[#A3A3A3] leading-tight font-mono">
            UNAUTHORIZED ACCESS IS STRICTLY MONITORED.
            <br />
            FAZBEAR ENTERTAINMENT HOLDS NO LIABILITY FOR ON-DUTY ACCIDENTS.
          </p>
        </div>
      </div>

      {/* Terminal copyright & shift note */}
      <footer className="mt-6 text-center text-xs text-[#A3A3A3] font-mono">
        Fazbear Entertainment Security Division &copy; 1987-Present. All rights reserved.
      </footer>
    </div>
  );
}
