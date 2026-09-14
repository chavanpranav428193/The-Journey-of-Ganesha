import React, { useEffect, useState, useRef } from 'react';
import { Clock } from 'lucide-react';

interface TimerProps {
  isActive: boolean;
  onTimeUpdate?: (seconds: number) => void;
  className?: string;
}

export const Timer: React.FC<TimerProps> = ({ isActive, onTimeUpdate, className = '' }) => {
  const [seconds, setSeconds] = useState(0);
  const onTimeUpdateRef = useRef(onTimeUpdate);

  useEffect(() => {
    onTimeUpdateRef.current = onTimeUpdate;
  }, [onTimeUpdate]);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
      if (onTimeUpdateRef.current) {
        onTimeUpdateRef.current(1);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [isActive]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formatted = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  return (
    <div className={`flex items-center gap-1.5 bg-stone-900/80 border border-amber-500/30 px-3 py-1 rounded-full text-xs font-mono text-amber-200 shadow-sm ${className}`}>
      <Clock className="w-3.5 h-3.5 text-amber-400" />
      <span>{formatted}</span>
    </div>
  );
};
