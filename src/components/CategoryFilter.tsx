import React from 'react';
import { NewsCategory } from '../types/news.js';
import { 
  Building2, 
  TrendingUp, 
  Megaphone, 
  ShoppingBag, 
  Award, 
  MapPin, 
  BarChart3, 
  Compass, 
  Landmark,
  Layers
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: NewsCategory;
  onSelectCategory: (category: NewsCategory) => void;
  selectedState: string;
  onSelectState: (state: string) => void;
  categoryCounts: Record<string, number>;
  highImpactOnly: boolean;
  onToggleHighImpact: () => void;
}

interface CategoryOption {
  id: NewsCategory;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

export const CATEGORIES: CategoryOption[] = [
  {
    id: 'todos',
    label: 'Todos os Temas',
    icon: Layers,
    description: 'Visão geral diária consolidada',
  },
  {
    id: 'nordeste',
    label: 'Nordeste',
    icon: Compass,
    description: 'Notícias gerais, infraestrutura e integração',
  },
  {
    id: 'economia-nordeste',
    label: 'Economia do Nordeste',
    icon: TrendingUp,
    description: 'PIB regional, investimentos e agronegócio',
  },
  {
    id: 'marketing-nordeste',
    label: 'Marketing Nordeste',
    icon: Megaphone,
    description: 'Campanhas, publicidade e comportamento de consumo',
  },
  {
    id: 'mercado-nordeste',
    label: 'Mercado do Nordeste',
    icon: ShoppingBag,
    description: 'Varejo, atacarejo e expansão comercial',
  },
  {
    id: 'empresas-nordeste',
    label: 'Empresas do Nordeste',
    icon: Building2,
    description: 'Indústrias, conglomerados e governança',
  },
  {
    id: 'economia-fortaleza',
    label: 'Economia Fortaleza',
    icon: Landmark,
    description: 'Maior PIB do Norte/Nordeste, turismo e hub tech',
  },
  {
    id: 'economia-ceara',
    label: 'Economia Ceará',
    icon: Award,
    description: 'Complexo do Pecém, H2V e polo industrial',
  },
  {
    id: 'dados-capitais',
    label: 'Dados & Capitais',
    icon: BarChart3,
    description: 'Indicadores das 9 capitais e cidades polo',
  },
  {
    id: 'destaques-empresas',
    label: 'Destaques Corporativos',
    icon: Award,
    description: 'M. Dias Branco, Moura, Solar, Hapvida e mais',
  },
];

const STATES = [
  { code: 'TODOS', label: 'Todos os Estados' },
  { code: 'CE', label: 'Ceará' },
  { code: 'BA', label: 'Bahia' },
  { code: 'PE', label: 'Pernambuco' },
  { code: 'MA', label: 'Maranhão' },
  { code: 'RN', label: 'Rio Grande do Norte' },
  { code: 'PB', label: 'Paraíba' },
  { code: 'AL', label: 'Alagoas' },
  { code: 'SE', label: 'Sergipe' },
  { code: 'PI', label: 'Piauí' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedState,
  onSelectState,
  categoryCounts,
  highImpactOnly,
  onToggleHighImpact,
}) => {
  return (
    <div className="mb-6 space-y-4">
      {/* Category scrollable chips */}
      <div>
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Filtrar por Tema de Interesse
          </span>
          <span className="text-xs text-slate-400">
            {CATEGORIES.length - 1} temas monitorados
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            const count = categoryCounts[cat.id] ?? 0;

            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-orange-600 text-white shadow-md shadow-orange-600/20'
                    : 'bg-white dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-orange-300 dark:hover:border-slate-600 hover:bg-orange-50/50 dark:hover:bg-slate-800'
                }`}
                title={cat.description}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-orange-600 dark:text-orange-400'}`} />
                <span>{cat.label}</span>
                {count > 0 && (
                  <span
                    className={`ml-0.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isSelected
                        ? 'bg-orange-700 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* State / Region filter & Impact toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-slate-500 dark:text-slate-400 font-semibold uppercase text-[10px] tracking-wider shrink-0 mr-1 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-orange-500" />
            Estado:
          </span>
          {STATES.map((st) => (
            <button
              key={st.code}
              onClick={() => onSelectState(st.code)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all shrink-0 ${
                selectedState === st.code
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
              }`}
              title={st.label}
            >
              {st.code}
            </button>
          ))}
        </div>

        {/* High impact filter toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleHighImpact}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg border transition-all ${
              highImpactOnly
                ? 'bg-amber-500 text-white border-amber-600 font-semibold shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${highImpactOnly ? 'bg-white' : 'bg-amber-500'}`} />
            <span>Apenas Alto Impacto</span>
          </button>
        </div>
      </div>
    </div>
  );
};
