import { useState, useEffect } from 'react';

export const useSystemMonitor = () => {
  const [stats, setStats] = useState({
    cpu: 34,
    shield: 100,
    latency: 12,
    bandwidth: 4.2
  });

  const [logs, setLogs] = useState<string[]>([
    '> SYSTEM_CHECK_COMPLETE... ALL_SECTORS_GREEN...',
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        cpu: Math.max(20, Math.min(95, prev.cpu + (Math.random() * 10 - 5))),
        shield: Math.max(85, Math.min(100, prev.shield + (Math.random() * 2 - 1))),
        latency: Math.max(5, Math.min(50, prev.latency + (Math.random() * 5 - 2.5))),
        bandwidth: Math.max(3.0, Math.min(5.0, prev.bandwidth + (Math.random() * 0.2 - 0.1)))
      }));

      if (Math.random() > 0.8) {
        const newLogs = [
          '> RECALIBRATING_SENSORS...',
          '> INCOMING_PACKET_VERIFIED...',
          '> OPTIMIZING_QUANTUM_GATES...',
          '> BACKGROUND_SCAN_COMPLETE...'
        ];
        const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
        setLogs(prev => [randomLog, ...prev.slice(0, 4)]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return { stats, logs };
};