import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Info,
  FolderArchive,
  Gamepad2,
  Wrench,
  BookOpen,
  Map,
  Camera,
  Shield,
  Zap,
  ChevronDown,
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  guardName,
  guardId,
  onOpenProfile,
}) {
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Sinkronisasi OFFICE POWER dengan baterai asli laptop via Battery Status API
  useEffect(() => {
    let batteryManager = null;

    const updateBatteryInfo = (battery) => {
      setBatteryLevel(Math.round(battery.level * 100));
      setIsCharging(battery.charging);
    };

    if ('getBattery' in navigator) {
      navigator.getBattery().then((battery) => {
        batteryManager = battery;
        updateBatteryInfo(battery);

        battery.addEventListener('levelchange', () => updateBatteryInfo(battery));
        battery.addEventListener('chargingchange', () => updateBatteryInfo(battery));
      });
    }

    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);

    return () => {
      clearInterval(clockTimer);
      if (batteryManager) {
        batteryManager.removeEventListener('levelchange', () => updateBatteryInfo(batteryManager));
        batteryManager.removeEventListener('chargingchange', () => updateBatteryInfo(batteryManager));
      }
    };
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'archives', label: 'Archives', icon: FolderArchive },
    { id: 'series', label: 'Series Game', icon: Gamepad2 },
    { id: 'tools', label: 'Tools', icon: Wrench },
    { id: 'story', label: 'Story Game', icon: BookOpen },
    { id: 'map', label: 'Map', icon: Map },
    { id: 'about', label: 'About', icon: Info },
  ];

  const getPowerColor = () => {
    if (isCharging) return 'text-emerald-400';
    if (batteryLevel <= 20) return 'text-red-500 animate-pulse';
    if (batteryLevel <= 50) return 'text-amber-400';
    return 'text-[#EA580C]';
  };

  // Ambil inisial dari guardName (misal "Mike Schmidt" -> "MS")
  const initials = (guardName || 'MS')
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <header className="bg-[#0E0E0E] border-b border-[#2E2E2E] sticky top-0 z-40">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <button
          type="button"
          onClick={() => setActiveTab('dashboard')}
          className="flex items-center gap-3 text-left cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-lg bg-[#1F1F1F] border border-[#EA580C]/60 flex items-center justify-center text-[#EA580C] group-hover:shadow-[0_0_15px_rgba(234,88,12,0.4)] transition-all">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-extrabold tracking-wider text-[#F5F5F5] uppercase font-['Chakra_Petch',sans-serif]">
                FAZBEAR ARCHIVES
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#EA580C]/20 border border-[#EA580C]/50 text-[10px] font-mono text-[#FB923C] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-pulse" />
                NIGHT SHIFT
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#737373]">
              Security Management System
            </p>
          </div>
        </button>

        {/* Right Header: Tombol Kamera + Real-Time Battery Power + User Profile Button */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Tombol Cepat Kamera */}
          <button
            type="button"
            onClick={() => setActiveTab('camera')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono uppercase tracking-wider border transition-all cursor-pointer ${activeTab === 'camera'
                ? 'bg-[#EA580C] text-white border-[#EA580C] font-bold shadow-[0_0_15px_rgba(234,88,12,0.45)]'
                : 'bg-[#141414] text-[#F5F5F5] border-[#2E2E2E] hover:border-[#EA580C] hover:text-[#FB923C]'
              }`}
          >
            <Camera className="w-4 h-4 text-current" />
            <span>Kamera</span>
          </button>

          {/* Office Power (Sinkron dengan Baterai Laptop) */}
          <div className="hidden md:block text-right font-mono border-l border-[#2E2E2E] pl-4">
            <div className="text-[10px] text-[#737373] uppercase">SYS STATUS:</div>
            <div className="text-xs font-bold flex items-center justify-end gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${isCharging
                    ? 'bg-emerald-400 animate-ping'
                    : batteryLevel <= 20
                      ? 'bg-red-500 animate-ping'
                      : 'bg-[#EA580C]'
                  }`}
              />
              <span className="text-[#A3A3A3]">OFFICE POWER:</span>
              <span className={getPowerColor()}>{batteryLevel}%</span>
              {isCharging && <Zap className="w-3 h-3 text-emerald-400" />}
            </div>
          </div>

          {/* Security Guard Profile Badge (Bisa diklik untuk membuka ProfilePopup) */}
          <button
            type="button"
            onClick={onOpenProfile}
            className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg bg-[#141414] hover:bg-[#1F1F1F] border border-[#2E2E2E] hover:border-[#EA580C]/60 transition-colors cursor-pointer text-left"
          >
            <div className="relative w-8 h-8 rounded-lg bg-[#1F1F1F] border border-[#2E2E2E] flex items-center justify-center text-xs font-mono font-bold text-[#F5F5F5]">
              {initials}
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#EA580C] border-2 border-[#141414]" />
            </div>
            <div className="hidden sm:block leading-tight">
              <div className="text-xs font-semibold text-[#F5F5F5]">
                {guardName || 'Mike Schmidt'}
              </div>
              <div className="text-[10px] font-mono text-[#737373]">
                {guardId || 'FAZ-8701'}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#737373] hidden sm:block" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="border-t border-[#1F1F1F] bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 overflow-x-auto">
          <nav className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`inline-flex items-center gap-2 px-3.5 py-3 text-xs font-mono uppercase tracking-wider border-b-2 transition-all whitespace-nowrap cursor-pointer ${isActive
                      ? 'border-[#EA580C] text-[#EA580C] font-bold bg-[#141414]/60'
                      : 'border-transparent text-[#A3A3A3] hover:text-[#F5F5F5]'
                    }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Status Kanan Bawah */}
          <div className="hidden xl:flex items-center gap-3 text-[11px] font-mono text-[#737373] whitespace-nowrap">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              CAM-NET: ONLINE
            </span>
            <span>|</span>
            <span>
              SYSTEM TIME:{' '}
              <span className="text-[#A3A3A3]">
                {currentTime.toLocaleTimeString('id-ID', { hour12: false })}
              </span>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}