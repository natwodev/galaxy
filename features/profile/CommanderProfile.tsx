import React from 'react';
import { User, Award, Shield, Target, Zap, Clock } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import TechBadge from '../../components/ui/TechBadge';
import { useLanguage } from '../../contexts/LanguageContext';

const CommanderProfile: React.FC = () => {
  const { t } = useLanguage();

  const skills = [
    { name: 'Stellar Navigation', level: 92, color: 'bg-cyan-500' },
    { name: 'Tactical Analysis', level: 85, color: 'bg-red-500' },
    { name: 'Xenolinguistics', level: 78, color: 'bg-purple-500' },
    { name: 'Quantum Mechanics', level: 95, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-12 font-mono-tech">
       <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main ID Card */}
          <div className="lg:col-span-4">
             <GlassCard variant="heavy" border={true} className="p-8 flex flex-col items-center text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 animate-pulse"></div>
                
                <div className="w-40 h-40 rounded-full border-4 border-cyan-500/30 p-2 mb-6 relative group">
                    <div className="w-full h-full rounded-full bg-cyan-900/50 overflow-hidden relative">
                         <User size={80} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-300" />
                         {/* Holographic scanning effect */}
                         <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent h-1/2 w-full animate-scan opacity-50"></div>
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-black border border-cyan-500 rounded-full p-2">
                         <Shield className="text-cyan-400" size={20} />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-white tracking-widest uppercase mb-1">Commander Shepherd</h2>
                <p className="text-cyan-500 text-sm tracking-[0.2em] mb-6">ID: NBL-7734-X</p>

                <div className="w-full space-y-4">
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-gray-400 text-xs uppercase">{t('prof_rank')}</span>
                        <span className="text-purple-300 font-bold">GRAND ADMIRAL</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/5">
                        <span className="text-gray-400 text-xs uppercase">{t('prof_exp')}</span>
                        <span className="text-green-300 font-bold">12 CYCLES</span>
                    </div>
                </div>
             </GlassCard>
          </div>

          {/* Stats & Skills */}
          <div className="lg:col-span-8 space-y-6">
             
             {/* Skill Matrix */}
             <GlassCard className="p-8">
                <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                    <Target className="text-red-400" /> {t('prof_skills')}
                </h3>
                <div className="space-y-6">
                    {skills.map((skill, idx) => (
                        <div key={idx}>
                            <div className="flex justify-between text-xs uppercase tracking-wider mb-2 text-gray-300">
                                <span>{skill.name}</span>
                                <span>{skill.level}%</span>
                            </div>
                            <div className="h-3 bg-gray-800 rounded-full overflow-hidden relative">
                                <div 
                                    className={`h-full ${skill.color} relative`}
                                    style={{ width: `${skill.level}%` }}
                                >
                                    <div className="absolute top-0 right-0 h-full w-1 bg-white/50 animate-pulse"></div>
                                </div>
                                {/* Grid lines on bar */}
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_20%,rgba(0,0,0,0.5)_20%)] bg-[size:10%_100%]"></div>
                            </div>
                        </div>
                    ))}
                </div>
             </GlassCard>

             {/* Achievements */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <GlassCard className="p-6">
                    <h3 className="text-sm font-bold text-yellow-400 mb-4 flex items-center gap-2">
                        <Award /> {t('prof_achievements')}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        <TechBadge label="Void Walker" color="purple" />
                        <TechBadge label="Nebula Savior" color="cyan" />
                        <TechBadge label="First Contact" color="green" />
                        <TechBadge label="Time Traveler" color="red" />
                    </div>
                 </GlassCard>

                 <GlassCard className="p-6">
                     <h3 className="text-sm font-bold text-blue-400 mb-4 flex items-center gap-2">
                        <Clock /> ACTIVE MISSIONS
                    </h3>
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
                            <span>Survey Sector 9</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-gray-300">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span>Diplomacy: Mars</span>
                        </div>
                    </div>
                 </GlassCard>
             </div>
          </div>
       </div>
    </div>
  );
};

export default CommanderProfile;