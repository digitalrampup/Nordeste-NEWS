import React from 'react';
import { 
  Building2, 
  TrendingUp, 
  MapPin, 
  FileDown, 
  ExternalLink, 
  Zap, 
  ArrowUpRight,
  ShieldCheck,
  Award,
  Globe2
} from 'lucide-react';
import { RegionalIndicator, NewsCategory } from '../types/news.js';

interface MarketDashboardSidebarProps {
  indicators: RegionalIndicator[];
  onSelectCategory: (category: NewsCategory) => void;
  onSelectState: (state: string) => void;
  onOpenCapitals: () => void;
  onOpenDossier: () => void;
}

const REGIONAL_STOCKS = [
  { ticker: 'MDIA3', name: 'M. Dias Branco', price: 'R$ 38,40', change: '+1,45%', positive: true, sector: 'Alimentos & Bebidas (CE)' },
  { ticker: 'HAPV3', name: 'Hapvida', price: 'R$ 4,18', change: '+2,20%', positive: true, sector: 'Saúde Suplementar (CE)' },
  { ticker: 'GMAT3', name: 'Grupo Mateus', price: 'R$ 7,92', change: '+0,89%', positive: true, sector: 'Varejo & Atacarejo (MA)' },
  { ticker: 'AERI3', name: 'Aeris Energy', price: 'R$ 8,35', change: '+3,40%', positive: true, sector: 'Energia Eólica / Pecém (CE)' },
  { ticker: 'BNBR3', name: 'Banco do Nordeste', price: 'R$ 102,50', change: '+1,12%', positive: true, sector: 'Crédito Regional (CE)' },
];

const CAPITALS_MINI_RADAR = [
  { state: 'CE', capital: 'Fortaleza', pib: 'R$ 73,4 Bi (1º)', tag: 'Maior PIB Norte/NE' },
  { state: 'BA', capital: 'Salvador', pib: 'R$ 62,9 Bi', tag: '2,4 mi hab / Polo Camaçari' },
  { state: 'PE', capital: 'Recife', pib: 'R$ 54,9 Bi', tag: 'Porto Digital / Polo Médico' },
  { state: 'MA', capital: 'São Luís', pib: 'R$ 36,5 Bi', tag: 'Porto do Itaqui' },
  { state: 'RN', capital: 'Natal', pib: 'R$ 24,1 Bi', tag: 'Polo Eólico / Aeroespacial' },
  { state: 'PB', capital: 'João Pessoa', pib: 'R$ 22,2 Bi', tag: 'Qualidade de Vida / Construção' },
  { state: 'AL', capital: 'Maceió', pib: 'R$ 24,5 Bi', tag: 'Turismo +22% / Química' },
  { state: 'PI', capital: 'Teresina', pib: 'R$ 23,8 Bi', tag: 'Polo Médico Meio-Norte' },
  { state: 'SE', capital: 'Aracaju', pib: 'R$ 18,4 Bi', tag: 'Gás Natural Offshore' },
];

export const MarketDashboardSidebar: React.FC<MarketDashboardSidebarProps> = ({
  indicators,
  onSelectCategory,
  onSelectState,
  onOpenCapitals,
  onOpenDossier,
}) => {
  return (
    <aside className="space-y-6">
      {/* 1. Radar Corporativo B3 - Empresas do Nordeste */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/70 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-950/80 text-orange-600 dark:text-orange-400">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Radar de Empresas do Nordeste
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                Ações e balanços dos maiores conglomerados
              </p>
            </div>
          </div>

          <button
            onClick={() => onSelectCategory('destaques-empresas')}
            className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Ver todas</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        {/* Stock List */}
        <div className="space-y-2.5">
          {REGIONAL_STOCKS.map((stock) => (
            <div
              key={stock.ticker}
              onClick={() => onSelectCategory('destaques-empresas')}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/50 hover:border-orange-400 dark:hover:border-orange-500 transition-all cursor-pointer group"
            >
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-xs text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400">
                    {stock.ticker}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {stock.name}
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                  {stock.sector}
                </div>
              </div>

              <div className="text-right">
                <div className="font-mono font-bold text-xs text-slate-900 dark:text-white">
                  {stock.price}
                </div>
                <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.2 rounded font-mono">
                  {stock.change}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Dossiê Executivo Rápido - PDF Export Callout */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-stone-900 text-white rounded-2xl p-5 shadow-lg border border-slate-700 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <FileDown className="w-4 h-4" />
            <span>Relatório & Dossiê Diário</span>
          </div>

          <h4 className="text-base font-bold font-serif leading-snug mb-2">
            Exportar Notícias em PDF Executivo
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Baixe o compilado diário diagramado em A4 com análises, métricas do Ceará e Fortaleza, dados das capitais e fontes verificadas pelo Google Search.
          </p>

          <button
            onClick={onOpenDossier}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-orange-600 hover:bg-orange-500 active:scale-95 text-white font-bold text-xs shadow-md transition-all cursor-pointer"
          >
            <FileDown className="w-4 h-4" />
            <span>Gerar Dossiê em PDF Agora</span>
          </button>
        </div>
      </div>

      {/* 3. Radar Rápido das 9 Capitais */}
      <div className="bg-white dark:bg-slate-800/90 rounded-2xl p-5 border border-slate-200 dark:border-slate-700/80 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-700/70 mb-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Panorama das 9 Capitais
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400">
                PIB e especialidades municipais
              </p>
            </div>
          </div>

          <button
            onClick={onOpenCapitals}
            className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Ver dados</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>

        <div className="space-y-1.5 max-h-72 overflow-y-auto pr-1 scrollbar-thin">
          {CAPITALS_MINI_RADAR.map((cap) => (
            <div
              key={cap.capital}
              onClick={() => {
                onSelectState(cap.state);
                onSelectCategory('dados-capitais');
              }}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-orange-50/60 dark:hover:bg-slate-750 transition-colors cursor-pointer border border-transparent hover:border-orange-200 dark:hover:border-slate-600"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-mono">
                  {cap.state}
                </span>
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {cap.capital}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {cap.tag}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {cap.pib}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};
