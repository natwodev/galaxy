import React from 'react';
import { BarChart3 } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import NeonButton from '../../../components/ui/NeonButton';
import { useSystemMonitor } from '../../../hooks/useSystemMonitor';
import { useLanguage } from '../../../contexts/LanguageContext';

const LogWidget: React.FC = () => {
  const { logs } = useSystemMonitor();
  const { t } = useLanguage();

  return (
    <GlassCard className="p-4 flex flex-col md:flex-row gap-4 items-center">
        <div className="shrink-0 p-3 bg-cyan-900/20 rounded-lg">
            <BarChart3 className="text-cyan-400" />
        </div>
        <div className="flex-1 w-full overflow-hidden">
            <div className="text-xs text-cyan-300/50 mb-1 uppercase tracking-widest">{t('deck_logs')}</div>
            <div className="font-mono text-sm text-cyan-100 truncate animate-pulse">
                {logs[0]}
            </div>
        </div>
        <NeonButton variant="cyan">{t('deck_diag')}</NeonButton>
    </GlassCard>
  );
};

export default LogWidget;