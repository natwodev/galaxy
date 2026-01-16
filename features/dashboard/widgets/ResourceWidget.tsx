import React from 'react';
import { Cpu } from 'lucide-react';
import GlassCard from '../../../components/ui/GlassCard';
import { useSystemMonitor } from '../../../hooks/useSystemMonitor';
import { useLanguage } from '../../../contexts/LanguageContext';

const ResourceWidget: React.FC = () => {
  const { stats } = useSystemMonitor();
  const { t } = useLanguage();

  const items = [
    { label: 'Quantum Core', value: stats.cpu, color: 'bg-cyan-500' },
    { label: 'Hull Integrity', value: stats.shield, color: 'bg-green-500' },
    { label: 'Hyperdrive', value: 88, color: 'bg-purple-500' },
    { label: 'Life Support', value: 99, color: 'bg-blue-500' },
  ];

  return (
    <GlassCard className="p-6 border-t-2 border-t-purple-500">
        <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            <Cpu size={16} className="text-purple-400" /> {t('deck_cpu')}
        </h3>
        <div className="space-y-4">
            {items.map((stat, idx) => (
                <div key={idx}>
                    <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-400">{stat.label}</span>
                        <span className="text-white font-mono">{Math.round(stat.value)}%</span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                            className={`h-full ${stat.color} transition-all duration-500`} 
                            style={{ width: `${stat.value}%` }}
                        ></div>
                    </div>
                </div>
            ))}
        </div>
    </GlassCard>
  );
};

export default ResourceWidget;