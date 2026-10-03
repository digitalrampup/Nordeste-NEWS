import React, { useState } from 'react';
import { RegionalIndicator } from '../types/news.js';
import { TrendingUp, Award, Zap, Users, ShoppingCart, ChevronDown, ChevronUp, Info } from 'lucide-react';

interface IndicatorsBarProps {
  indicators: RegionalIndicator[];
  onSelectIndicatorCategory?: (category: string) => void;
}

export const IndicatorsBar: React.FC<IndicatorsBarProps> = ({
  indicators,
  onSelectIndicatorCategory,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  if (!indicators || indicators.length === 0) return null;

  return (
    <div className="mb-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 shadow-xs overflow-hidden">
      {/* Header with toggle */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-4 py-2.5 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-2">
          <div className="p-1 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <TrendingUp className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200">
            Indicadores Econômicos & Dados Estratégicos do Nordeste
          </span>
          <span className="hidden sm:inline bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">
            IBGE • IPECE • SUDENE • ONS
          </span>
        </div>

        <button 
          className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
          aria-label={isExpanded ? 'Recolher indicadores' : 'Expandir indicadores'}
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Grid of Indicator Cards */}
      {isExpanded && (
        <div className="p-3 sm:p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {indicators.map((ind) => (
            <div
              key={ind.id}
              onClick={() => onSelectIndicatorCategory?.(ind.category)}
              className="p-3 rounded-xl bg-slate-50/70 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700/60 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50/20 dark:hover:bg-slate-800/80 transition-all cursor-pointer group"
            >
              <div className="text-[11px] font-medium text-slate-500 dark:text-slate-400 line-clamp-1 mb-1">
                {ind.title}
              </div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono tracking-tight group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                {ind.value}
              </div>
              <div className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5 line-clamp-1">
                <span>{ind.variation}</span>
              </div>
              <div className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 line-clamp-1">
                {ind.period}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
