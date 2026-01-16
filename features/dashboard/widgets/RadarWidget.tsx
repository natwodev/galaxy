import React from 'react';
import { Crosshair, Globe, Database } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import TechBadge from '../../../components/ui/TechBadge';
import { useLanguage } from '../../../contexts/LanguageContext';

const RadarWidget: React.FC = () => {
  const { t } = useLanguage();

  return (
    <GlassCard variant="heavy" border={true} className="p-1 relative group overflow-hidden min-h-[400px]">
       <div className="absolute inset-0 bg-black/40 z-0"></div>
       
       {/* Radar Animation */}
       <div className="absolute inset-0 overflow-hidden flex items-center justify-center opacity-30">
         <div className="w-[600px] h-[600px] border border-cyan-500/20 rounded-full flex items-center justify-center relative">
            <div className="w-[400px] h-[400px] border border-cyan-500/20 rounded-full flex items-center justify-center">
                <div className="w-[200px] h-[200px] border border-cyan-500/20 rounded-full"></div>
            </div>
            {/* Simulated Radar Sweep */}
            <div className="absolute w-1/2 h-1/2 top-0 right-0 bg-gradient-to-t from-transparent to-cyan-500/20 animate-spin-slow origin-bottom-left" style={{ animationDuration: '4s' }}></div>
         </div>
       </div>

       <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          <div className="flex justify-between items-start">
              <TechBadge label={t('deck_radar')} animate={true} />
              <Crosshair className="text-red-500/80 animate-pulse" />
          </div>
          
          <div className="space-y-2">
             <div className="flex items-center gap-2 text-xs text-cyan-400/80">
                <Globe size={14} />
                <span>{t('deck_locked')}: ANDROMEDA_V3</span>
             </div>
             <div className="flex items-center gap-2 text-xs text-cyan-400/80">
                <Database size={14} />
                <span>{t('deck_stream')}: ENCRYPTED</span>
             </div>
          </div>
       </div>
    </GlassCard>
  );
};

export default RadarWidget;