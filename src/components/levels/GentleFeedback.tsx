import React from 'react';
import { CheckCircle2, AlertCircle, Info, Sparkles } from 'lucide-react';

interface GentleFeedbackProps {
  message: string | null;
  type?: 'success' | 'warning' | 'info';
  onDismiss?: () => void;
  className?: string;
}

export const GentleFeedback: React.FC<GentleFeedbackProps> = ({
  message,
  type = 'info',
  onDismiss,
  className = ''
}) => {
  if (!message) return null;

  const typeConfig = {
    success: {
      bg: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
    },
    warning: {
      bg: 'bg-amber-950/80 border-amber-500/50 text-amber-200',
      icon: <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
    },
    info: {
      bg: 'bg-stone-900/90 border-amber-500/30 text-stone-200',
      icon: <Sparkles className="w-4 h-4 text-yellow-400 shrink-0" />
    }
  };

  const current = typeConfig[type];

  return (
    <div
      className={`p-3 rounded-2xl border flex items-start gap-2.5 shadow-lg backdrop-blur-sm animate-fade-in ${current.bg} ${className}`}
    >
      <div className="mt-0.5">{current.icon}</div>
      <div className="flex-1 text-xs leading-relaxed font-medium">
        {message}
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="text-stone-400 hover:text-stone-200 text-xs px-1.5 py-0.5"
        >
          ✕
        </button>
      )}
    </div>
  );
};
