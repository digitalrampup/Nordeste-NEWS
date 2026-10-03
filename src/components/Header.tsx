import React from 'react';
import { 
  Sun, 
  Moon, 
  RefreshCw, 
  SlidersHorizontal, 
  FileDown, 
  Bookmark, 
  Layers,
  MapPin,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface HeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onRefresh: () => void;
  isRefreshing: boolean;
  lastUpdated: number;
  onOpenPreferences: () => void;
  onOpenCapitals: () => void;
  onOpenDossier: () => void;
  savedCount: number;
  activeTab: 'feed' | 'saved';
  onSelectTab: (tab: 'feed' | 'saved') => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onRefresh,
  isRefreshing,
  lastUpdated,
  onOpenPreferences,
  onOpenCapitals,
  onOpenDossier,
  savedCount,
  activeTab,
  onSelectTab,
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

  return (
    <header className="border-b transition-colors duration-200 sticky top-0 z-30 backdrop-blur-md bg-white/95 dark:bg-slate-900/95 border-slate-200 dark:border-slate-800">
      {/* Top Banner: Date, live status & regional intelligence */}
      <div className="bg-slate-900 dark:bg-black text-slate-300 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-white uppercase tracking-wider text-[11px]">
              Edição Diária em Tempo Real
            </span>
            <span className="text-slate-500">|</span>
            <span className="capitalize text-slate-300 hidden sm:inline">
              {currentDateFormatted}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <span className="text-slate-400 hidden md:inline">
              Sincronizado com <strong className="text-white">Google Search Grounding</strong>
            </span>
            <div className="flex items-center gap-1.5 text-slate-400">
              <span className="text-slate-500">Última atualização:</span>
              <span className="font-medium text-amber-400">{formattedTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Logo and Tagline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectTab('feed')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-600 via-orange-600 to-rose-700 flex items-center justify-center shadow-md shadow-orange-500/20 text-white font-black text-xl tracking-tighter">
              NE
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-serif">
                  NORDESTE <span className="text-orange-600 dark:text-orange-500 font-sans font-bold">HOJE</span>
                </h1>
                <span className="bg-orange-100 dark:bg-orange-950/80 text-orange-800 dark:text-orange-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-orange-300/40">
                  ECONOMIA & DIÁRIO
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Notícias, Negócios, Ceará, Fortaleza e Capitais Nordestinas
              </p>
            </div>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-1 md:hidden">
            <button
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Alternar tema escuro/claro"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-50"
              title="Atualizar Notícias"
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-orange-600' : ''}`} />
            </button>
          </div>
        </div>

        {/* Action Buttons & Navigation Controls */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Feed / Salvas switch */}
          <div className="flex p-0.5 rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
            <button
              onClick={() => onSelectTab('feed')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all ${
                activeTab === 'feed'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Feed Geral
            </button>
            <button
              onClick={() => onSelectTab('saved')}
              className={`px-3 py-1.5 rounded-md font-semibold flex items-center gap-1.5 transition-all ${
                activeTab === 'saved'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Salvas {savedCount > 0 && <span className="bg-orange-600 text-white text-[10px] px-1.5 py-0.2 rounded-full">{savedCount}</span>}
            </button>
          </div>

          {/* Capitais & Cidades Hub */}
          <button
            onClick={onOpenCapitals}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span className="hidden sm:inline">Capitais & Cidades</span>
            <span className="sm:hidden">Capitais</span>
          </button>

          {/* Preferências / Categorias Pessoais */}
          <button
            onClick={onOpenPreferences}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Personalizar categorias de interesse"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Meus Interesses</span>
          </button>

          {/* Exportar Dossiê PDF */}
          <button
            onClick={onOpenDossier}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 text-white shadow-xs transition-colors"
            title="Salvar notícias em PDF"
          >
            <FileDown className="w-3.5 h-3.5 text-amber-300" />
            <span>Salvar em PDF</span>
          </button>

          {/* Botão de Atualizar (Refresh) */}
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-orange-600 hover:bg-orange-700 active:scale-95 text-white shadow-xs transition-all disabled:opacity-60 cursor-pointer"
            title="Buscar notícias atualizadas via Google"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Atualizando...' : 'Atualizar Notícias'}</span>
          </button>

          {/* Modo Noturno / Diurno Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="hidden md:flex items-center justify-center p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={darkMode ? 'Ativar Modo Claro' : 'Ativar Modo Noturno'}
          >
            {darkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
