import React from 'react';
import { Wifi } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import { useSystemMonitor } from '../../../hooks/useSystemMonitor';
import { useLanguage } from '../../../contexts/LanguageContext';

const NetworkWidget: React.FC = () => {
  const { stats } = useSystemMonitor();
  const { t } = useLanguage();

  return (
    <GlassCard className="p-6 border-t-2 border-t-cyan-500">
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Wifi size={16} className="text-cyan-400" /> {t('deck_net')}
        </h3>
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/30 p-3 rounded-lg border border-white/5 text-center">
                <div className="text-2xl font-bold text-white mb-1">{Math.round(stats.latency)}<span className="text-xs text-gray-500 ml-1">ms</span></div>
                <div className="text-[10px] text-cyan-400 uppercase">{t('lbl_latency')}</div>
            </div>
            <div className="bg-black/30 p-3 rounded-lg border border-white/5 text-center">
                <div className="text-2xl font-bold text-white mb-1">{stats.bandwidth.toFixed(1)}<span className="text-xs text-gray-500 ml-1">TB/s</span></div>
                <div className="text-[10px] text-purple-400 uppercase">{t('lbl_bandwidth')}</div>
            </div>
        </div>
    </GlassCard>
  );
};

export default NetworkWidget;