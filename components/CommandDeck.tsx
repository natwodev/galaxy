import React, { useState, useEffect } from 'react';
import { Activity, Shield, Cpu, Wifi, Crosshair, BarChart3, Database, Globe } from 'lucide-react';
import { SystemStat } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

const CommandDeck: React.FC = () => {
  const { t } = useLanguage();
  const [cpuLoad, setCpuLoad] = useState(34);
  const [shieldIntegrity, setShieldIntegrity] = useState(100);
  const [networkLatency, setNetworkLatency] = useState(12);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  // Fake chart data
  const [chartData, setChartData] = useState<number[]>(new Array(20).fill(50));

  // Simulate changing data
  useEffect(() => {
    const interval = setInterval(() => {
      setCpuLoad(prev => Math.max(20, Math.min(95, prev + (Math.random() * 10 - 5))));
      setShieldIntegrity(prev => Math.max(85, Math.min(100, prev + (Math.random() * 2 - 1))));
      setNetworkLatency(prev => Math.max(5, Math.min(50, prev + (Math.random() * 5 - 2.5))));
      setCurrentTime(new Date());
      setChartData(prev => [...prev.slice(1), Math.random() * 100]);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const systemStats: SystemStat[] = [
    { label: 'Quantum Core', value: cpuLoad, color: 'bg-cyan-500' },
    { label: 'Hull Integrity', value: shieldIntegrity, color: 'bg-green-500' },
    { label: 'Hyperdrive', value: 88, color: 'bg-purple-500' },
    { label: 'Life Support', value: 99, color: 'bg-blue-500' },
  ];

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
        
        {/* Main Sector Map - Large Panel */}
        <div className="md:col-span-8 glass-panel-heavy rounded-xl p-1 sci-fi-border relative group overflow-hidden min-h-[400px]">
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
            
           {/* SVG Live Chart Overlay */}
           <div className="absolute bottom-0 left-0 right-0 h-32 opacity-20 pointer-events-none">
              <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path 
                    d={`M0,100 ${chartData.map((val, i) => `L${(i/19)*100},${100-val}`).join(' ')} L100,100 Z`} 
                    fill="url(#grad1)" 
                  />
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style={{stopColor:'rgb(6,182,212)', stopOpacity:1}} />
                      <stop offset="100%" style={{stopColor:'rgb(6,182,212)', stopOpacity:0}} />
                    </linearGradient>
                  </defs>
              </svg>
           </div>

           <div className="relative z-10 p-6 h-full flex flex-col justify-between">
              <div className="flex justify-between items-start">
                  <span className="px-2 py-1 bg-cyan-900/40 border border-cyan-500/30 text-cyan-300 text-xs rounded animate-pulse">{t('deck_radar')}</span>
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
        </div>

        {/* System Stats - Side Panel */}
        <div className="md:col-span-4 space-y-6">
            
            {/* Resource Monitor */}
            <div className="glass-panel rounded-xl p-6 border-t-2 border-t-purple-500">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Cpu size={16} className="text-purple-400" /> {t('deck_cpu')}
                </h3>
                <div className="space-y-4">
                    {systemStats.map((stat, idx) => (
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
            </div>

            {/* Network Status */}
            <div className="glass-panel rounded-xl p-6 border-t-2 border-t-cyan-500">
                <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Wifi size={16} className="text-cyan-400" /> {t('deck_net')}
                </h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5 text-center">
                        <div className="text-2xl font-bold text-white mb-1">{Math.round(networkLatency)}<span className="text-xs text-gray-500 ml-1">ms</span></div>
                        <div className="text-[10px] text-cyan-400 uppercase">Latency</div>
                    </div>
                    <div className="bg-black/30 p-3 rounded-lg border border-white/5 text-center">
                        <div className="text-2xl font-bold text-white mb-1">4.2<span className="text-xs text-gray-500 ml-1">TB/s</span></div>
                        <div className="text-[10px] text-purple-400 uppercase">Bandwidth</div>
                    </div>
                </div>
            </div>

            {/* Active Modules */}
            <div className="glass-panel rounded-xl p-6 border-t-2 border-t-green-500">
               <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Shield size={16} className="text-green-400" /> {t('deck_active')}
                </h3>
                <div className="flex flex-wrap gap-2">
                    {['Gemini-Flash', 'Nav-AI', 'Shield-Gen', 'Life-Sup'].map((mod, i) => (
                        <span key={i} className="px-2 py-1 bg-green-900/20 border border-green-500/20 text-green-400 text-xs rounded-sm">
                            {mod}
                        </span>
                    ))}
                </div>
            </div>

        </div>

        {/* Bottom Panel - Logs */}
        <div className="md:col-span-12 glass-panel p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center border border-white/5">
            <div className="shrink-0 p-3 bg-cyan-900/20 rounded-lg">
                <BarChart3 className="text-cyan-400" />
            </div>
            <div className="flex-1 w-full overflow-hidden">
                <div className="text-xs text-cyan-300/50 mb-1 uppercase tracking-widest">{t('deck_logs')}</div>
                <div className="font-mono text-sm text-cyan-100 truncate animate-pulse">
                    > SYSTEM_CHECK_COMPLETE... ALL_SECTORS_GREEN... AWAITING_INPUT_FROM_COMMANDER...
                </div>
            </div>
            <button className="px-6 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold uppercase rounded transition-colors shadow-lg shadow-cyan-600/20">
                {t('deck_diag')}
            </button>
        </div>

      </div>
    </div>
  );
};

export default CommandDeck;