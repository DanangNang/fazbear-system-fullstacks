import React from 'react';
import { LayoutDashboard, Info } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'about',
      label: 'About',
      icon: Info,
    },
  ];

  return (
    <nav className="bg-[#141414] border-b border-[#2E2E2E] px-4 sm:px-6 lg:px-8 select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Navigation Tabs */}
        <div className="flex space-x-1 sm:space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`relative py-3.5 px-4 font-semibold text-sm flex items-center gap-2 cursor-pointer transition-colors ${
                  isActive
                    ? 'text-[#F5F5F5]'
                    : 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#1F1F1F]/60'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon
                  className={`w-4 h-4 transition-colors ${
                    isActive ? 'text-[#EA580C]' : 'text-[#A3A3A3]'
                  }`}
                />
                <span className="tracking-wide uppercase font-['Chakra_Petch',sans-serif] text-xs sm:text-sm">
                  {item.label}
                </span>

                {/* Active Indicator Bar with Orange Glow */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#EA580C] shadow-[0_0_10px_rgba(234,88,12,0.8)]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Live system clock / date simulation */}
        <div className="hidden md:flex items-center gap-2 text-xs font-mono text-[#A3A3A3]">
          <span className="inline-block w-2 h-2 rounded-full bg-[#EA580C] animate-ping" />
          <span className="text-[#F5F5F5]">CAM-NET: ONLINE</span>
          <span className="text-[#2E2E2E]">|</span>
          <span className="text-[#FB923C]">SYSTEM TIME: 12:00 AM</span>
        </div>
      </div>
    </nav>
  );
}
