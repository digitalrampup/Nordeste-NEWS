import React, { useState } from 'react';
import { X, Check, SlidersHorizontal, MapPin, Layers, Sparkles } from 'lucide-react';
import { NewsCategory, UserPreferences } from '../types/news.js';
import { CATEGORIES } from './CategoryFilter.js';

interface PersonalPreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
  preferences: UserPreferences;
  onSavePreferences: (prefs: UserPreferences) => void;
}

export const PersonalPreferencesModal: React.FC<PersonalPreferencesModalProps> = ({
  isOpen,
  onClose,
  preferences,
  onSavePreferences,
}) => {
  const [selectedCats, setSelectedCats] = useState<NewsCategory[]>(preferences.activeCategories);
  const [selectedState, setSelectedState] = useState<string>(preferences.selectedState);
  const [highImpactOnly, setHighImpactOnly] = useState<boolean>(preferences.highImpactOnly);

  if (!isOpen) return null;

  const toggleCategory = (cat: NewsCategory) => {
    if (selectedCats.includes(cat)) {
      if (selectedCats.length > 1) {
        setSelectedCats(selectedCats.filter((c) => c !== cat));
      }
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const selectAll = () => {
    setSelectedCats(CATEGORIES.map((c) => c.id));
  };

  const handleSave = () => {
    onSavePreferences({
      activeCategories: selectedCats,
      selectedState,
      selectedCity: 'TODAS',
      highImpactOnly,
    });
    onClose();
  };

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-600/30 text-orange-400 border border-orange-500/30">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                Categorias de Interesse Pessoal
              </h2>
              <p className="text-xs text-slate-400">
                Personalize os temas e regiões prioritárias do seu feed diário
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Categories Selector */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Temas de Interesse ({selectedCats.length} selecionados)
              </label>
              <button
                type="button"
                onClick={selectAll}
                className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline"
              >
                Selecionar Todos
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {CATEGORIES.map((cat) => {
                const isChecked = selectedCats.includes(cat.id);
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => toggleCategory(cat.id)}
                    className={`flex items-start gap-2.5 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isChecked
                        ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-400 text-orange-950 dark:text-orange-200'
                        : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded-md border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                        isChecked
                          ? 'bg-orange-600 border-orange-600 text-white'
                          : 'border-slate-400 dark:border-slate-600'
                      }`}
                    >
                      {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold">{cat.label}</div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                        {cat.description}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Regional focus */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Estado de Foco Prioritário
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {STATES.map((st) => (
                <button
                  key={st.code}
                  type="button"
                  onClick={() => setSelectedState(st.code)}
                  className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                    selectedState === st.code
                      ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent font-bold shadow-xs'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <div>{st.code}</div>
                  <div className="text-[9px] text-slate-400 truncate">{st.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* High Impact Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Filtrar apenas notícias de Alto Impacto
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Foca em grandes movimentações econômicas, balanços e decisões de governo
              </div>
            </div>

            <button
              type="button"
              onClick={() => setHighImpactOnly(!highImpactOnly)}
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                highImpactOnly ? 'bg-orange-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full bg-white shadow-xs absolute top-1 transition-transform ${
                  highImpactOnly ? 'left-6' : 'left-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 text-xs font-bold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white rounded-xl shadow-md transition-all cursor-pointer"
          >
            Salvar Preferências
          </button>
        </div>
      </div>
    </div>
  );
};
