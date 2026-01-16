import React, { useState, useEffect } from 'react';
import { Activity, Shield } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import RadarWidget from '../features/dashboard/widgets/RadarWidget';
import ResourceWidget from '../features/dashboard/widgets/ResourceWidget';
import NetworkWidget from '../features/dashboard/widgets/NetworkWidget';
import LogWidget from '../features/dashboard/widgets/LogWidget';
import GlassCard from './ui/GlassCard';
import TechBadge from './ui/TechBadge';

const CommandDeck: React.FC = () => {
  const { t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12 font-mono-tech">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-4">
        <div>
          <h2 className="text-3xl text-white font-bold tracking-widest uppercase flex items-center gap-3">
            <Activity className="text-cyan-400" /> {t('deck_title')}
          </h2>
          <p className="text-cyan-500/60 text-sm mt-1">{t('deck_sector')} // STATUS: GREEN</p>
        </div>
        <div className="text-right mt-4 md:mt-0">
          <div className="text-2xl font-bold text-white">{currentTime.toLocaleTimeString()}</div>
          <div className="text-xs text-gray-500 tracking-[0.2em]">{currentTime.toLocaleDateString()}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Main Sector Map */}
        <div className="md:col-span-8">
            <RadarWidget />
        </div>

        {/* System Stats - Side Panel */}
        <div className="md:col-span-4 space-y-6">
            <ResourceWidget />
            <NetworkWidget />
            
            {/* Active Modules Wrapper */}
            <GlassCard className="p-6 border-t-2 border-t-green-500">
               <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield size={16} className="text-green-400" /> {t('deck_active')}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {['Gemini-Flash', 'Nav-AI', 'Shield-Gen', 'Life-Sup'].map((mod, i) => (
                        <TechBadge key={i} label={mod} color="green" />
                    ))}
                </div>
            </GlassCard>
        </div>

        {/* Bottom Panel */}
        <div className="md:col-span-12">
            <LogWidget />
        </div>

      </div>
    </div>
  );
};

export default CommandDeck;