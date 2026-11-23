import React, { useState, useEffect } from 'react';
import LoginPage from './components/LoginPage';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import ArchivesSection from './components/ArchivesSection';
import AboutSection from './components/AboutSection';
import ProfilePopup from './components/ProfilePopup';
import SeriesGameSection from './components/SeriesGameSection';
import ToolsSection from './components/ToolsSection';
import StoryGameSection from './components/StoryGameSection';
import MapSection from './components/MapSection';
import CameraSection from './components/CameraSection';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [guardName, setGuardName] = useState('');
  const [guardId, setSecurityId] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [animatronics, setAnimatronics] = useState(() => {
    const saved = localStorage.getItem('fazbear_animatronics');
    return saved ? JSON.parse(saved) : [];
  });
  const [tools, setTools] = useState(() => {
    const saved = localStorage.getItem('fazbear_tools');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('fazbear_animatronics', JSON.stringify(animatronics));
  }, [animatronics]);

  useEffect(() => {
    localStorage.setItem('fazbear_tools', JSON.stringify(tools));
  }, [tools]);

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

      {/* Gabungan Topbar + Navbar Tabs */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        guardName={guardName}
        guardId={guardId}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
        {activeTab === 'dashboard' && (
          <Dashboard
            guardName={guardName}
            guardId={guardId}
            onNavigateAbout={() => setActiveTab('about')}
          />
        )}
        {activeTab === 'archives' && (
          <ArchivesSection
            animatronics={animatronics}
            setAnimatronics={setAnimatronics}
          />
        )}
        {activeTab === 'about' && <AboutSection />}

        {activeTab === 'series' && (
          <SeriesGameSection
            animatronics={animatronics}
            onNavigateArchives={() => setActiveTab('archives')}
          />
        )}

        {activeTab === 'tools' && (
          <ToolsSection tools={tools} setTools={setTools} />
        )}

        {activeTab === 'story' && (
          <StoryGameSection
            animatronicsCount={animatronics.length}
            onNavigateArchives={() => setActiveTab('archives')}
          />
        )}
        {activeTab === 'map' && <MapSection animatronics={animatronics} />}
        {activeTab === 'camera' && <CameraSection />}
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