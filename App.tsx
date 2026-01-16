import React, { useState, useEffect } from 'react';
import StarBackground from './components/StarBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import GalaxyChat from './components/GalaxyChat';
import Features from './components/Features';
import CommandDeck from './components/CommandDeck';
import PlanetarySystem from './components/PlanetarySystem';
import ArchiveTerminal from './features/archives/ArchiveTerminal';
import SettingsPanel from './features/settings/SettingsPanel';
import CommanderProfile from './features/profile/CommanderProfile';
import DecryptionGame from './features/simulation/DecryptionGame';
import { PageView } from './types';
import { useSound } from './contexts/SoundContext';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageView>(PageView.HOME);
  const [isBooting, setIsBooting] = useState(true);
  const { playSuccess } = useSound();

  // Simulated Boot Sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    switch (currentPage) {
      case PageView.HOME:
        return <Hero onNavigate={setCurrentPage} />;
      case PageView.CHAT:
        return <GalaxyChat />;
      case PageView.EXPLORE:
        return <Features />;
      case PageView.DASHBOARD:
        return <CommandDeck />;
      case PageView.GALAXY_MAP:
        return <PlanetarySystem />;
      case PageView.ARCHIVES:
        return <ArchiveTerminal />;
      case PageView.SETTINGS:
        return <SettingsPanel />;
      case PageView.PROFILE:
        return <CommanderProfile />;
      case PageView.SIMULATION:
        return <DecryptionGame />;
      default:
        return <Hero onNavigate={setCurrentPage} />;
    }
  };

  if (isBooting) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-[100] font-mono-tech">
         <div className="w-64 text-cyan-500">
            <div className="mb-4 text-xs tracking-widest border-b border-cyan-900 pb-2">NEBULA_BIOS v4.1.2</div>
            <div className="space-y-1 text-sm">
                <div className="animate-pulse">> CHECKING_MEMORY... OK</div>
                <div className="animate-pulse" style={{ animationDelay: '0.5s' }}> > LOADING_ASSETS... OK</div>
                <div className="animate-pulse" style={{ animationDelay: '1.0s' }}> > CONNECTING_CORE... OK</div>
                <div className="animate-pulse" style={{ animationDelay: '1.5s' }}> > DECRYPTING_UI... OK</div>
            </div>
            <div className="mt-6 h-1 bg-gray-900 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-500 animate-[width_2s_ease-out_forwards] w-0"></div>
            </div>
         </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white overflow-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      <StarBackground />
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="relative z-10 transition-all duration-500 ease-in-out">
        {renderContent()}
      </main>

      {/* Persistent Footer Status */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 pointer-events-none p-2 md:p-4 flex justify-between items-end text-[10px] text-gray-600 font-mono tracking-widest opacity-50 mix-blend-screen">
         <div>SECURE_CONN_SHA256</div>
         <div>NEBULA NEXUS // PROTOTYPE</div>
      </footer>
    </div>
  );
};

export default App;