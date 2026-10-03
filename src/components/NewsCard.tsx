import React from 'react';
import { NewsArticle } from '../types/news.js';
import { 
  FileDown, 
  Bookmark, 
  ExternalLink, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Square, 
  CheckSquare,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import { exportArticleToPdf } from '../utils/pdfExport.js';

interface NewsCardProps {
  article: NewsArticle;
  onRead: (article: NewsArticle) => void;
  isSaved: boolean;
  onToggleSave: (article: NewsArticle) => void;
  isSelectedForDossier: boolean;
  onToggleDossierSelect: (articleId: string) => void;
  isFeatured?: boolean;
}

export const NewsCard: React.FC<NewsCardProps> = ({
  article,
  onRead,
  isSaved,
  onToggleSave,
  isSelectedForDossier,
  onToggleDossierSelect,
  isFeatured = false,
}) => {
  const handlePdfExport = (e: React.MouseEvent) => {
    e.stopPropagation();
    exportArticleToPdf(article);
  };

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleSave(article);
  };

  const handleSelectDossier = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleDossierSelect(article.id);
  };

  const handleOpenSource = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(article.sourceUrl, '_blank', 'noopener,noreferrer');
  };

  // State badge styling
  const getStateBadgeColor = (state: string) => {
    switch (state) {
      case 'CE':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800';
      case 'BA':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-300 dark:border-blue-800';
      case 'PE':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/80 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800';
      case 'MA':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-300 dark:border-amber-800';
      case 'RN':
        return 'bg-teal-100 text-teal-800 dark:bg-teal-950/80 dark:text-teal-300 border-teal-300 dark:border-teal-800';
      case 'PB':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border-cyan-300 dark:border-cyan-800';
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-300 dark:border-slate-700';
    }
  };

  if (isFeatured) {
    return (
      <article
        onClick={() => onRead(article)}
        className="group relative bg-gradient-to-br from-white via-white to-orange-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 rounded-2xl p-6 sm:p-7 border-2 border-orange-300 dark:border-orange-500/40 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer mb-6"
      >
        {/* Top Badges & Select Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="bg-orange-600 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md uppercase tracking-wider shadow-xs">
              Manchete Principal
            </span>
            <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${getStateBadgeColor(article.state)}`}>
              {article.state} {article.city ? `• ${article.city}` : ''}
            </span>
            <span className="text-[11px] font-semibold text-orange-700 dark:text-orange-400 bg-orange-100 dark:bg-orange-950/80 px-2 py-0.5 rounded-md border border-orange-200 dark:border-orange-900/60">
              {article.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleSelectDossier}
              className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-md transition-colors"
              title="Incluir no Dossiê PDF do dia"
            >
              {isSelectedForDossier ? (
                <CheckSquare className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              ) : (
                <Square className="w-4 h-4 text-slate-400" />
              )}
              <span className="text-[11px] hidden sm:inline">Incluir no PDF</span>
            </button>
            <button
              onClick={handleSaveToggle}
              className={`p-1.5 rounded-lg transition-colors ${
                isSaved
                  ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isSaved ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-bold font-serif text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug mb-3">
          {article.title}
        </h2>

        {/* Summary */}
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {article.summary}
        </p>

        {/* Key Takeaways */}
        {article.keyPoints && article.keyPoints.length > 0 && (
          <div className="bg-slate-50 dark:bg-slate-950/70 rounded-xl p-4 mb-4 border border-slate-200/90 dark:border-slate-800">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-orange-500" />
              <span>Pontos de Impacto & Indicadores Chave:</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-200">
              {article.keyPoints.map((kp, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />
                  <span>{kp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Bottom Metadata & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.publishedAt}
            </span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <button
              onClick={handleOpenSource}
              className="flex items-center gap-1 text-slate-600 dark:text-slate-300 hover:text-orange-600 dark:hover:text-orange-400 font-medium underline underline-offset-2"
              title="Verificar no Google Search"
            >
              <span>{article.source}</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePdfExport}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-medium transition-colors"
              title="Baixar esta notícia em PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>PDF</span>
            </button>

            <button
              onClick={() => onRead(article)}
              className="flex items-center gap-1 px-3.5 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white font-semibold transition-colors shadow-xs"
            >
              <span>Ler Matéria</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </article>
    );
  }

  // Standard News Card
  return (
    <article
      onClick={() => onRead(article)}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 hover:border-orange-400 dark:hover:border-orange-500/50 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between"
    >
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${getStateBadgeColor(article.state)}`}>
              {article.state}
            </span>
            <span className="text-[10px] font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md line-clamp-1 border border-slate-200/60 dark:border-slate-750">
              {article.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSelectDossier}
              className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md transition-colors"
              title="Incluir no Dossiê PDF"
            >
              {isSelectedForDossier ? (
                <CheckSquare className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              ) : (
                <Square className="w-3.5 h-3.5 text-slate-400" />
              )}
            </button>
            <button
              onClick={handleSaveToggle}
              className={`p-1 rounded-md transition-colors ${
                isSaved
                  ? 'text-orange-600 dark:text-orange-400'
                  : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
              title={isSaved ? 'Remover dos favoritos' : 'Salvar nos favoritos'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
            </button>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold font-serif text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors leading-snug mb-2 line-clamp-2">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 mb-3">
          {article.summary}
        </p>

        {/* Key bullet point snippet */}
        {article.keyPoints && article.keyPoints.length > 0 && (
          <div className="text-[11px] text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-950/60 p-2.5 rounded-xl mb-3 border border-slate-100 dark:border-slate-800 line-clamp-2">
            <span className="font-semibold text-orange-600 dark:text-orange-400 mr-1">Destaque:</span>
            {article.keyPoints[0]}
          </div>
        )}
      </div>

      {/* Footer info & actions */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs mt-auto">
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
          <span>{article.publishedAt}</span>
          <span>•</span>
          <span className="truncate max-w-[100px]">{article.source}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePdfExport}
            className="p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
            title="Salvar esta notícia em PDF"
          >
            <FileDown className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onRead(article)}
            className="text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-0.5"
          >
            <span>Ler</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
};
