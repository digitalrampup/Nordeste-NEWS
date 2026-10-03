import React, { useState } from 'react';
import { Search, Sparkles, X, Globe, ArrowRight } from 'lucide-react';

interface GoogleSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onExecuteSearch: (query: string) => void;
  isSearching: boolean;
}

const QUICK_TOPICS = [
  'Economia Fortaleza',
  'Hidrogênio Verde Pecém',
  'M. Dias Branco',
  'Marketing Nordeste',
  'PIB Capitais',
  'Grupo Mateus',
  'Agronegócio Matopiba',
  'Porto Digital Recife',
  'Baterias Moura',
  'Energia Eólica RN',
];

export const GoogleSearchBar: React.FC<GoogleSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onExecuteSearch,
  isSearching,
}) => {
  const [inputValue, setInputValue] = useState(searchQuery);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onExecuteSearch(inputValue.trim());
    }
  };

  const handleChipClick = (topic: string) => {
    setInputValue(topic);
    onSearchChange(topic);
    onExecuteSearch(topic);
  };

  const handleClear = () => {
    setInputValue('');
    onSearchChange('');
    onExecuteSearch('');
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-stone-900 text-white rounded-2xl p-4 sm:p-6 shadow-xl mb-6 border border-slate-700/60 relative overflow-hidden">
      {/* Decorative background blur */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            {/* Google colored logo badge */}
            <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/15 text-xs font-semibold">
              <span className="font-bold tracking-tight">
                <span className="text-blue-400">G</span>
                <span className="text-red-400">o</span>
                <span className="text-yellow-400">o</span>
                <span className="text-blue-400">g</span>
                <span className="text-green-400">l</span>
                <span className="text-red-400">e</span>
              </span>
              <span className="text-slate-300 ml-1">Buscador Oficial</span>
            </div>
            <span className="text-xs text-slate-400 hidden md:inline">
              Pesquise dados, balanços, mercado e notícias em tempo real
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-amber-300/90 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Busca com Grounding ao Vivo</span>
          </div>
        </div>

        {/* Input bar */}
        <form onSubmit={handleSubmit} className="relative flex items-center">
          <div className="absolute left-4 text-slate-400 pointer-events-none flex items-center">
            <Search className="w-5 h-5 text-slate-400" />
          </div>

          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onSearchChange(e.target.value);
            }}
            placeholder="Pesquisar por economia, Fortaleza, Ceará, empresas, capitais ou dados do Nordeste..."
            className="w-full pl-12 pr-28 py-3.5 bg-slate-950/80 border border-slate-700/80 focus:border-orange-500 rounded-xl text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all shadow-inner"
          />

          <div className="absolute right-2 flex items-center gap-1.5">
            {inputValue && (
              <button
                type="button"
                onClick={handleClear}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                title="Limpar pesquisa"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              type="submit"
              disabled={isSearching}
              className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 active:scale-95 text-white font-medium text-xs rounded-lg shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              {isSearching ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>Buscar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick topic pills */}
        <div className="mt-3 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
          <span className="text-slate-400 text-[11px] font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <Globe className="w-3 h-3 text-orange-400" />
            Tendências:
          </span>
          {QUICK_TOPICS.map((topic) => (
            <button
              key={topic}
              type="button"
              onClick={() => handleChipClick(topic)}
              className="shrink-0 px-2.5 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all text-[11px]"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
