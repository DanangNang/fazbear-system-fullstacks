import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Topbar from './components/Topbar';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AboutSection from './components/AboutSection';
import ProfilePopup from './components/ProfilePopup';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guardName, setGuardName] = useState('');
  const [guardId, setSecurityId] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogin = ({ name, id }) => {
    setGuardName(name);
    setSecurityId(id);
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setGuardName('');
    setSecurityId('');
    setIsProfileOpen(false);
    setActiveTab('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F5] flex flex-col relative selection:bg-[#EA580C] selection:text-white">
      {/* Background CRT and grid scanline atmosphere with subtle amber/orange glow */}
      <div className="fixed inset-0 bg-[radial-gradient(#222222_1px,transparent_1px)] [background-size:24px_24px] opacity-35 pointer-events-none" />
      <div className="crt-overlay fixed inset-0 pointer-events-none" />

      {/* Topbar */}
      <Topbar
        guardName={guardName}
        guardId={guardId}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Navbar Tabs */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {activeTab === 'dashboard' ? (
          <Dashboard
            guardName={guardName}
            guardId={guardId}
            onNavigateAbout={() => setActiveTab('about')}
          />
        ) : (
          <AboutSection />
        )}
      </main>

      {/* Profile Popup Modal */}
      <ProfilePopup
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        guardName={guardName}
        guardId={guardId}
        onLogout={handleLogout}
      />

      {/* Footer */}
      <footer className="bg-[#141414] border-t border-[#2E2E2E] py-4 px-4 sm:px-6 lg:px-8 mt-auto relative z-10 text-center text-xs text-[#A3A3A3] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Fazbear Archives // Security Management System v1.987</span>
          <span className="text-[#EA580C] font-semibold">STAY ALERT // 12:00 AM - 06:00 AM</span>
        </div>
      </footer>
    </div>
  );
}
