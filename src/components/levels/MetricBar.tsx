import React from 'react';

interface MetricBarProps {
  label: string;
  value: number; // 0 to max
  max?: number;
  icon?: React.ReactNode | string;
  variant?: 'amber' | 'emerald' | 'blue' | 'rose' | 'purple' | 'gold';
  showPercentage?: boolean;
  delta?: number | null;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const MetricBar: React.FC<MetricBarProps> = ({
  label,
  value,
  max = 100,
  icon,
  variant = 'amber',
  showPercentage = true,
  delta = null,
  className = '',
  size = 'md'
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const variantStyles = {
    amber: 'from-amber-500 to-orange-500 shadow-amber-500/20 text-amber-300',
    emerald: 'from-emerald-500 to-teal-500 shadow-emerald-500/20 text-emerald-300',
    blue: 'from-cyan-500 to-blue-500 shadow-blue-500/20 text-cyan-300',
    rose: 'from-rose-500 to-pink-500 shadow-rose-500/20 text-rose-300',
    purple: 'from-purple-500 to-indigo-500 shadow-purple-500/20 text-purple-300',
    gold: 'from-yellow-400 via-amber-400 to-orange-500 shadow-yellow-500/30 text-yellow-300'
  };

  const heightStyles = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="font-bold font-cinzel flex items-center gap-1.5 text-stone-200">
          {typeof icon === 'string' ? <span className="text-sm">{icon}</span> : icon}
          <span>{label}</span>
          {delta !== null && delta !== 0 && (
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded font-bold animate-pulse ${
                delta > 0 ? 'text-emerald-400 bg-emerald-950/60' : 'text-rose-400 bg-rose-950/60'
              }`}
            >
              {delta > 0 ? `+${delta}` : delta}
            </span>
          )}
        </span>
        <span className="font-mono text-xs font-semibold text-stone-300">
          {showPercentage ? `${percentage}%` : `${value} / ${max}`}
        </span>
      </div>

      <div className={`w-full bg-stone-950/90 rounded-full border border-stone-800 p-0.5 overflow-hidden shadow-inner`}>
        <div
          className={`rounded-full bg-gradient-to-r ${variantStyles[variant]} ${heightStyles[size]} transition-all duration-500 ease-out shadow-md`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
