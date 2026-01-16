import React, { useState } from 'react';
import { FileText, Lock, FolderOpen, Database, ChevronRight, AlertTriangle } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import TechBadge from '../../components/ui/TechBadge';
import { archiveRecords } from '../../data/archives';
import { ArchiveRecord } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSound } from '../../contexts/SoundContext';

const ArchiveTerminal: React.FC = () => {
  const { t } = useLanguage();
  const { playClick, playHover, playSuccess } = useSound();
  const [selectedRecord, setSelectedRecord] = useState<ArchiveRecord | null>(null);
  const [isDecrypting, setIsDecrypting] = useState(false);

  const handleSelect = (record: ArchiveRecord) => {
    playClick();
    if (selectedRecord?.id === record.id) return;

    setSelectedRecord(null);
    setIsDecrypting(true);
    
    // Simulate decryption delay
    setTimeout(() => {
        setIsDecrypting(false);
        setSelectedRecord(record);
        playSuccess();
    }, 800);
  };

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12 font-mono-tech">
        <div className="mb-8 flex items-center gap-4 border-b border-white/10 pb-4">
            <Database className="text-cyan-400" size={32} />
            <div>
                <h2 className="text-3xl text-white font-bold tracking-widest uppercase">{t('arch_title')}</h2>
                <p className="text-green-500 text-xs tracking-[0.3em] mt-1 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    {t('arch_access')}
                </p>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[600px]">
            
            {/* Left Panel: File List */}
            <div className="lg:col-span-4 flex flex-col gap-4 overflow-y-auto pr-2 custom-scrollbar">
                {archiveRecords.map((record) => (
                    <GlassCard 
                        key={record.id} 
                        className={`
                            p-4 cursor-pointer transition-all duration-300 group
                            ${selectedRecord?.id === record.id ? 'border-cyan-500 bg-cyan-900/20' : 'hover:border-white/30'}
                        `}
                        onClick={() => handleSelect(record)}
                        onMouseEnter={playHover}
                    >
                        <div className="flex justify-between items-start mb-2">
                             <div className="flex items-center gap-2 text-cyan-300">
                                 <FileText size={16} />
                                 <span className="text-sm font-bold tracking-wide">{record.id}</span>
                             </div>
                             {record.clearanceLevel >= 4 && <Lock size={14} className="text-red-400" />}
                        </div>
                        <div className="text-white font-bold mb-1 group-hover:text-cyan-300 transition-colors">{record.title}</div>
                        <div className="flex gap-2 mt-2">
                            <TechBadge label={record.category} color={record.category === 'ANOMALY' ? 'red' : 'purple'} />
                            <span className="text-[10px] text-gray-500 self-center">{record.date}</span>
                        </div>
                    </GlassCard>
                ))}
            </div>

            {/* Right Panel: Content Viewer */}
            <div className="lg:col-span-8">
                <GlassCard variant="heavy" className="h-full relative overflow-hidden flex flex-col">
                    
                    {/* Background Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>

                    {isDecrypting ? (
                        <div className="flex-1 flex flex-col items-center justify-center text-cyan-400">
                            <Lock size={48} className="animate-pulse mb-4" />
                            <div className="text-lg tracking-widest uppercase animate-pulse">{t('arch_decrypt')}</div>
                            <div className="w-64 h-1 bg-gray-800 mt-4 rounded-full overflow-hidden">
                                <div className="h-full bg-cyan-500 animate-[width_0.8s_ease-out_forwards] w-0"></div>
                            </div>
                        </div>
                    ) : selectedRecord ? (
                        <div className="relative z-10 p-8 flex flex-col h-full">
                            <div className="flex justify-between items-start border-b border-white/10 pb-6 mb-6">
                                <div>
                                    <h1 className="text-2xl md:text-4xl font-bold text-white mb-2">{selectedRecord.title}</h1>
                                    <div className="flex items-center gap-3 text-sm text-gray-400">
                                        <FolderOpen size={16} />
                                        <span>{selectedRecord.category}</span>
                                        <ChevronRight size={14} />
                                        <span>{selectedRecord.date}</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{t('arch_clearance')}</div>
                                    <div className={`text-2xl font-bold ${selectedRecord.clearanceLevel > 3 ? 'text-red-500' : 'text-green-500'}`}>
                                        LEVEL {selectedRecord.clearanceLevel}
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto">
                                <p className="text-lg text-cyan-100 leading-8 font-light tracking-wide">
                                    {selectedRecord.content}
                                </p>
                                
                                {selectedRecord.category === 'ANOMALY' && (
                                    <div className="mt-8 p-4 bg-red-900/20 border border-red-500/30 rounded-lg flex gap-4 items-center">
                                        <AlertTriangle size={24} className="text-red-500 shrink-0" />
                                        <p className="text-xs text-red-200 uppercase tracking-widest">
                                            Warning: This record contains hazardous memetic hazards.
                                        </p>
                                    </div>
                                )}
                            </div>
                            
                            <div className="mt-6 pt-4 border-t border-white/5 text-xs text-gray-600 font-mono flex justify-between">
                                <span>REC_HASH: {Math.random().toString(36).substring(7).toUpperCase()}</span>
                                <span>END_OF_FILE</span>
                            </div>
                        </div>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
                            <Database size={64} className="mb-4 opacity-20" />
                            <div className="text-sm tracking-widest uppercase">{t('arch_select')}</div>
                        </div>
                    )}
                </GlassCard>
            </div>
        </div>
    </div>
  );
};

export default ArchiveTerminal;