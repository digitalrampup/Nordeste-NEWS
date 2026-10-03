import React from 'react';
import { TrendingUp, TrendingDown, Clock, RefreshCw } from 'lucide-react';
import { MARKET_TICKERS } from '../data/marketData.js';

interface MarketTickerProps {
  secondsUntilNextRefresh: number;
  isRefreshing: boolean;
  onManualRefresh: () => void;
}

export const MarketTicker: React.FC<MarketTickerProps> = ({
  secondsUntilNextRefresh,
  isRefreshing,
  onManualRefresh,
}) => {
  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Duplicate list to create a seamless infinite scrolling marquee loop
  const tickerItems = [...MARKET_TICKERS, ...MARKET_TICKERS];

  return (
    <div className="bg-slate-950 text-slate-200 border-b border-slate-800 text-[11px] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Fixed Left Badge: Dashboard de Mercado */}
        <div className="shrink-0 flex items-center gap-2 px-3 py-1.5 bg-orange-600/90 text-white font-bold tracking-wider uppercase text-[10px] z-10 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          <span>MERCADO AO VIVO</span>
        </div>

        {/* Scrolling Ticker Stream */}
        <div className="flex-1 overflow-hidden relative py-1.5">
          <div className="animate-ticker flex items-center gap-6">
            {tickerItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex items-center gap-1.5 shrink-0 px-2 font-mono">
                <span className="font-semibold text-slate-300">{item.symbol}</span>
                <span className="text-white font-bold">{item.value}</span>
                <span
                  className={`flex items-center gap-0.5 text-[10px] font-semibold px-1 py-0.2 rounded ${
                    item.isPositive
                      ? 'text-emerald-400 bg-emerald-950/60'
                      : 'text-rose-400 bg-rose-950/60'
                  }`}
                >
                  {item.isPositive ? (
                    <TrendingUp className="w-2.5 h-2.5" />
                  ) : (
                    <TrendingDown className="w-2.5 h-2.5" />
                  )}
                  {item.change}
                </span>
                <span className="text-slate-700 ml-2">|</span>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed Right: 10-Minute Countdown Clock */}
        <div 
          onClick={onManualRefresh}
          className="shrink-0 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900 border-l border-slate-800 text-[10px] text-slate-300 hover:text-white cursor-pointer transition-colors z-10"
          title="Clique para atualizar agora. Atualização automática ocorre a cada 10 minutos."
        >
          <Clock className="w-3 h-3 text-amber-400" />
          <span className="text-slate-400">Auto-refresh (10m):</span>
          <span className="font-mono font-bold text-amber-300">
            {formatCountdown(secondsUntilNextRefresh)}
          </span>
          <RefreshCw className={`w-3 h-3 text-slate-400 hover:text-orange-400 ${isRefreshing ? 'animate-spin text-orange-500' : ''}`} />
        </div>
      </div>
    </div>
  );
};
