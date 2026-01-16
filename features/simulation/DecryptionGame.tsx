import React, { useState, useEffect, useCallback } from 'react';
import { Cpu, Lock, Unlock, RefreshCw, Play } from 'lucide-react';
import GlassCard from '../../components/ui/GlassCard';
import NeonButton from '../../components/ui/NeonButton';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSound } from '../../contexts/SoundContext';
import { useNotification } from '../../contexts/NotificationContext';

const SYMBOLS = ['α', 'β', 'γ', 'δ', 'ε', 'ζ', 'η', 'θ', 'λ'];

const DecryptionGame: React.FC = () => {
  const { t } = useLanguage();
  const { playClick, playSuccess, playHover } = useSound();
  const { addNotification } = useNotification();

  const [level, setLevel] = useState(1);
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [isPlayingSequence, setIsPlayingSequence] = useState(false);
  const [gameState, setGameState] = useState<'IDLE' | 'PLAYING' | 'SUCCESS' | 'FAIL'>('IDLE');
  const [activeButtonIndex, setActiveButtonIndex] = useState<number | null>(null);

  // Generate sequence based on level
  const startLevel = useCallback(() => {
    const newSeq = [];
    for (let i = 0; i < level + 2; i++) {
        newSeq.push(Math.floor(Math.random() * 9));
    }
    setSequence(newSeq);
    setPlayerSequence([]);
    setGameState('PLAYING');
    setIsPlayingSequence(true);
    playClick();
  }, [level, playClick]);

  // Playback logic
  useEffect(() => {
    if (isPlayingSequence && sequence.length > 0) {
        let i = 0;
        const interval = setInterval(() => {
            if (i >= sequence.length) {
                clearInterval(interval);
                setIsPlayingSequence(false);
                setActiveButtonIndex(null);
                return;
            }
            setActiveButtonIndex(sequence[i]);
            // Play a sound for the "flash"
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                const ctx = new AudioContext();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(200 + sequence[i] * 100, ctx.currentTime);
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.3);
            }

            // Clear highlight shortly after
            setTimeout(() => setActiveButtonIndex(null), 400);
            i++;
        }, 800);
        return () => clearInterval(interval);
    }
  }, [isPlayingSequence, sequence]);

  const handlePadClick = (index: number) => {
    if (isPlayingSequence || gameState !== 'PLAYING') return;

    playClick();
    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);

    // Check correctness
    if (newPlayerSeq[newPlayerSeq.length - 1] !== sequence[newPlayerSeq.length - 1]) {
        setGameState('FAIL');
        addNotification(t('sim_fail'), 'Sequence mismatch detected. Lockdown initiated.', 'error');
        // Play fail sound (simple tone)
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(100, ctx.currentTime);
        osc.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
    } else if (newPlayerSeq.length === sequence.length) {
        setGameState('SUCCESS');
        playSuccess();
        addNotification(t('sim_success'), `Level ${level} firewall breached. Data extracted.`, 'success');
        setTimeout(() => {
            setLevel(prev => prev + 1);
            setGameState('IDLE');
        }, 2000);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 flex items-center justify-center font-mono-tech">
       <GlassCard variant="heavy" className="w-full max-w-xl p-8 relative">
           
           <div className="text-center mb-8">
               <h2 className="text-3xl font-bold text-white mb-2 flex justify-center items-center gap-3">
                   {gameState === 'SUCCESS' ? <Unlock className="text-green-400" /> : <Lock className="text-red-400" />}
                   {t('sim_title')}
               </h2>
               <p className="text-cyan-500 tracking-widest text-sm">{t('sim_desc')}</p>
               <div className="mt-4 inline-block px-4 py-1 rounded bg-white/10 border border-white/10 text-xs">
                   {t('sim_level')}: {level}
               </div>
           </div>

           {/* Game Grid */}
           <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto">
               {SYMBOLS.map((sym, idx) => (
                   <button
                        key={idx}
                        onClick={() => handlePadClick(idx)}
                        className={`
                            h-20 rounded-xl border text-2xl font-bold transition-all duration-100
                            ${activeButtonIndex === idx 
                                ? 'bg-cyan-400 text-black shadow-[0_0_20px_cyan] scale-105' 
                                : 'bg-black/40 border-cyan-500/30 text-cyan-500 hover:bg-cyan-900/30'}
                            ${gameState === 'FAIL' && activeButtonIndex === idx ? 'bg-red-500 shadow-[0_0_20px_red]' : ''}
                        `}
                   >
                       {sym}
                   </button>
               ))}
           </div>

           {/* Controls */}
           <div className="flex justify-center gap-4">
               {gameState === 'IDLE' || gameState === 'FAIL' || gameState === 'SUCCESS' ? (
                   <NeonButton onClick={startLevel} variant={gameState === 'FAIL' ? 'purple' : 'cyan'}>
                       {gameState === 'FAIL' ? <><RefreshCw size={14} className="mr-2 inline"/> RETRY</> : <><Play size={14} className="mr-2 inline"/> {t('sim_start')}</>}
                   </NeonButton>
               ) : (
                   <div className="text-yellow-400 animate-pulse text-sm tracking-widest">
                       {isPlayingSequence ? 'OBSERVE SEQUENCE...' : 'AWAITING INPUT...'}
                   </div>
               )}
           </div>

       </GlassCard>
    </div>
  );
};

export default DecryptionGame;