import React, { useMemo, useEffect, useState } from 'react';

const StarBackground: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Generate random stars only once with depth
  const stars = useMemo(() => {
    const starArray = [];
    for (let i = 0; i < 150; i++) {
      starArray.push({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 2 + 1,
        animationDuration: `${Math.random() * 3 + 2}s`,
        opacity: Math.random(),
        depth: Math.random() * 0.5 + 0.5 // Depth factor for parallax
      });
    }
    return starArray;
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-galaxy-950">
      {/* Deep Space Background */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-galaxy-800 via-galaxy-900 to-black opacity-80"
        style={{
            transform: `translate(${mousePosition.x * -10}px, ${mousePosition.y * -10}px)`,
            transition: 'transform 0.2s ease-out'
        }}
      />
      
      {/* Moving Nebulas - Background Layer */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-purple-900/30 rounded-full blur-[100px] animate-spin-slow mix-blend-screen"
        style={{ transformOrigin: 'center center' }}
      />
      <div 
        className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-blue-900/20 rounded-full blur-[100px] animate-reverse-spin mix-blend-screen" 
        style={{ transformOrigin: 'center center' }}
      />

      {/* Grid Overlay for Sci-Fi Feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(18,16,255,0.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)] pointer-events-none" />

      {/* Parallax Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: star.animationDuration,
            transform: `translate(${mousePosition.x * star.depth * 20}px, ${mousePosition.y * star.depth * 20}px)`,
            transition: 'transform 0.1s linear'
          }}
        />
      ))}
      
      {/* Central Black Hole / Core Effect - Subtle */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-cyan-500/5 rounded-full blur-3xl opacity-30 animate-pulse-slow pointer-events-none" />
    </div>
  );
};

export default StarBackground;