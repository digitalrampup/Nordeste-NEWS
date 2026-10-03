import React from 'react';
import { 
  Sun, 
  Moon, 
  RefreshCw, 
  SlidersHorizontal, 
  FileDown, 
  Bookmark, 
  MapPin,
  TrendingUp,
  Clock,
  CloudSun,
  ShieldCheck,
  Building2
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: number;
  secondsUntilNextRefresh: number;
  onOpenPreferences: () => void;
  onOpenCapitals: () => void;
  onOpenDossier: () => void;
  savedCount: number;
  activeTab: 'feed' | 'saved';
  onSelectTab: (tab: 'feed' | 'saved') => void;
  autoRefreshStatus?: string | null;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onRefresh,
  isRefreshing,
  lastUpdated,
  secondsUntilNextRefresh,
  onOpenPreferences,
  onOpenCapitals,
  onOpenDossier,
  savedCount,
  activeTab,
  onSelectTab,
  autoRefreshStatus,
}) => {
  const currentDateFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  const formattedTime = new Date(lastUpdated).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const formatCountdown = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <header className="border-b transition-colors duration-200 sticky top-0 z-30 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800 shadow-xs">
      {/* Sub-Masthead: Editorial Date, Weather & Grounding Certification */}
      <div className="bg-slate-900 dark:bg-black text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left: Edition & Weather info */}
          <div className="flex items-center gap-3 text-[11px]">
            <span className="capitalize text-white font-medium">
              {currentDateFormatted}
            </span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="hidden md:flex items-center gap-2 text-slate-300">
              <CloudSun className="w-3.5 h-3.5 text-amber-400" />
              <span>Fortaleza 31°C</span>
              <span className="text-slate-600">|</span>
              <span>Salvador 29°C</span>
              <span className="text-slate-600">|</span>
              <span>Recife 28°C</span>
            </div>
          </div>

          {/* Right: Sincronização & Auto-Refresh Timer */}
          <div className="flex items-center gap-3 text-[11px]">
            <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Auto-Refresh Ativo (10m)</span>
            </div>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <div className="text-slate-400 hidden sm:flex items-center gap-1">
              <span>Próximo ciclo:</span>
              <span className="font-mono font-bold text-amber-400">
                {formatCountdown(secondsUntilNextRefresh)}
              </span>
            </div>
            <span className="text-slate-600">•</span>
            <div className="text-slate-400 flex items-center gap-1">
              <span>Sincronizado:</span>
              <span className="font-semibold text-slate-200">{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Masthead Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Brand Logo & Editorial Title */}
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => onSelectTab('feed')}
            title="Ir para o Feed Principal de Notícias"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-slate-900 via-orange-700 to-amber-600 flex items-center justify-center shadow-md shadow-orange-600/20 text-white font-black text-xl tracking-tighter border border-orange-500/30">
              NE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                  NORDESTE <span className="text-orange-600 dark:text-orange-500 font-sans">HOJE</span>
                </h1>
                <span className="bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-orange-300/50 uppercase tracking-wider">
                  PORTAL & DASHBOARD
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                Notícias Econômicas Diárias, Indicadores de Mercado, Ceará, Fortaleza e Capitais
              </p>
            </div>
          </div>

          {/* Mobile Quick Action Buttons */}
          <div className="flex items-center gap-1.5 md:hidden">
            {/* Dark Mode Button Mobile */}
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
              title={darkMode ? 'Mudar para Modo Claro' : 'Mudar para Modo Escuro'}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </button>
            {/* Refresh Button Mobile */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-xl bg-orange-600 text-white"
              title="Atualizar Notícias Agora"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Feed Geral / Notícias Salvas */}
          <div className="flex p-0.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => onSelectTab('feed')}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                activeTab === 'feed'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Feed Principal
            </button>
            <button
              onClick={() => onSelectTab('saved')}
              className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'saved'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Salvas</span>
              {savedCount > 0 && (
                <span className="bg-orange-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">
                  {savedCount}
                </span>
              )}
            </button>
          </div>

          {/* Capitais & Cidades Hub */}
          <button
            onClick={onOpenCapitals}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-slate-750 transition-all cursor-pointer shadow-2xs"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span>Capitais & Cidades</span>
          </button>

          {/* Categorias de Interesse Pessoal */}
          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:border-orange-400 dark:hover:border-orange-500 hover:bg-orange-50/50 dark:hover:bg-slate-750 transition-all cursor-pointer shadow-2xs"
            title="Personalizar categorias de interesse no feed"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>Meus Interesses</span>
          </button>

          {/* Exportar Dossiê em PDF */}
          <button
            onClick={onOpenDossier}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white shadow-xs transition-all cursor-pointer border border-slate-800 dark:border-slate-700"
            title="Exportar notícias em PDF formatado"
          >
            <FileDown className="w-3.5 h-3.5 text-amber-400" />
            <span>Salvar em PDF</span>
          </button>

          {/* Botão de Atualizar Notícias */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 text-xs font-bold rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-95 text-white shadow-sm transition-all disabled:opacity-60 cursor-pointer"
            title="Atualizar Notícias Imediatamente com Google Search Grounding"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Sincronizando...' : 'Atualizar Notícias'}</span>
          </button>

          {/* MODO CLARO / ESCURO (TOGGLE VISÍVEL E ROBUSTO) */}
          <button
            onClick={onToggleDarkMode}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 text-xs font-bold transition-all cursor-pointer shadow-2xs"
            title={darkMode ? 'Ativar Modo Claro' : 'Ativar Modo Noturno'}
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
                <span>Modo Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-slate-700" />
                <span>Modo Noturno</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
