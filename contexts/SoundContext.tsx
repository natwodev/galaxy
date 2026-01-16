import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface SoundContextType {
  isEnabled: boolean;
  toggleSound: () => void;
  playHover: () => void;
  playClick: () => void;
  playTyping: () => void;
  playSuccess: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isEnabled, setIsEnabled] = useState(true);

  // Helper to create oscillators (No external assets needed!)
  const playTone = useCallback((freq: number, type: OscillatorType, duration: number, vol: number = 0.05) => {
    if (!isEnabled) return;
    try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;
        
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        
        gain.gain.setValueAtTime(vol, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        console.error("Audio error", e);
    }
  }, [isEnabled]);

  const toggleSound = () => setIsEnabled(prev => !prev);

  // Define Sci-Fi SFX
  const playHover = () => playTone(800, 'sine', 0.05, 0.02);
  const playClick = () => playTone(1200, 'square', 0.1, 0.03);
  const playTyping = () => playTone(600, 'triangle', 0.03, 0.01);
  const playSuccess = () => {
    if (!isEnabled) return;
    playTone(800, 'sine', 0.1, 0.05);
    setTimeout(() => playTone(1200, 'sine', 0.2, 0.05), 100);
  };

  return (
    <SoundContext.Provider value={{ isEnabled, toggleSound, playHover, playClick, playTyping, playSuccess }}>
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (context === undefined) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};