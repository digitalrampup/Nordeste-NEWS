import React, { useState } from 'react';
import { X, FileDown, CheckSquare, Square, FileText, Sparkles } from 'lucide-react';
import { NewsArticle } from '../types/news.js';
import { exportDossierToPdf } from '../utils/pdfExport.js';

interface DossierModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  selectedArticleIds: string[];
  onToggleArticleSelect: (articleId: string) => void;
  onSelectAll: (ids: string[]) => void;
  onDeselectAll: () => void;
}

export const DossierModal: React.FC<DossierModalProps> = ({
  isOpen,
  onClose,
  articles,
  selectedArticleIds,
  onToggleArticleSelect,
  onSelectAll,
  onDeselectAll,
}) => {
  const [dossierTitle, setDossierTitle] = useState('Dossiê Diário de Notícias do Nordeste');
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen) return null;

  // Filter articles that are checked
  const selectedArticles = articles.filter((a) => selectedArticleIds.includes(a.id));

  const handleExport = () => {
    setIsExporting(true);
    try {
      const articlesToExport = selectedArticles.length > 0 ? selectedArticles : articles;
      exportDossierToPdf(articlesToExport, dossierTitle);
      onClose();
    } catch (err) {
      console.error('Error generating PDF dossier:', err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleToggleAll = () => {
    if (selectedArticleIds.length === articles.length) {
      onDeselectAll();
    } else {
      onSelectAll(articles.map((a) => a.id));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <FileDown className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                Exportar Dossiê de Notícias em PDF
              </h2>
              <p className="text-xs text-slate-400">
                Gere um documento executivo formatado com matérias, indicadores e fontes
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

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* Dossier Title Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Título do Documento PDF
            </label>
            <input
              type="text"
              value={dossierTitle}
              onChange={(e) => setDossierTitle(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Ex: Dossiê Executivo Nordeste & Economia Ceará"
            />
          </div>

          {/* Selection Stats and Select All Button */}
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
              Matérias para o Relatório ({selectedArticleIds.length} de {articles.length} selecionadas)
            </span>
            <button
              type="button"
              onClick={handleToggleAll}
              className="text-xs font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              {selectedArticleIds.length === articles.length ? (
                <>
                  <CheckSquare className="w-3.5 h-3.5" />
                  <span>Desmarcar Todas</span>
                </>
              ) : (
                <>
                  <Square className="w-3.5 h-3.5" />
                  <span>Selecionar Todas ({articles.length})</span>
                </>
              )}
            </button>
          </div>

          {/* List of articles with checkbox */}
          <div className="max-h-64 overflow-y-auto border border-slate-200 dark:border-slate-700 rounded-2xl p-2 space-y-1 bg-slate-50/50 dark:bg-slate-800/40">
            {articles.map((art) => {
              const isSelected = selectedArticleIds.includes(art.id);
              return (
                <div
                  key={art.id}
                  onClick={() => onToggleArticleSelect(art.id)}
                  className={`flex items-start gap-3 p-2.5 rounded-xl transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800/50'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
                  }`}
                >
                  <div className="mt-0.5 text-orange-600 dark:text-orange-400">
                    {isSelected ? (
                      <CheckSquare className="w-4 h-4 fill-orange-600 text-white" />
                    ) : (
                      <Square className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mb-0.5">
                      <span className="font-bold text-orange-600 dark:text-orange-400 uppercase">
                        {art.categoryLabel}
                      </span>
                      <span>•</span>
                      <span>{art.state}</span>
                      <span>•</span>
                      <span>{art.publishedAt}</span>
                    </div>
                    <h4 className="text-xs font-semibold text-slate-900 dark:text-white leading-snug line-clamp-1">
                      {art.title}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Preview Box */}
          <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div>
              O arquivo PDF será gerado em formato A4, pronto para impressão ou compartilhamento por e-mail, contendo cabeçalho executivo, resumo, pontos de impacto e fontes verificadas de cada notícia.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            {selectedArticleIds.length > 0 ? `${selectedArticleIds.length} matérias no PDF` : `Exportar todas as ${articles.length} matérias`}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleExport}
              disabled={isExporting}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold bg-orange-600 hover:bg-orange-700 active:scale-95 text-white rounded-xl shadow-md transition-all cursor-pointer disabled:opacity-50"
            >
              <FileDown className="w-4 h-4" />
              <span>{isExporting ? 'Gerando PDF...' : 'Baixar Arquivo PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
