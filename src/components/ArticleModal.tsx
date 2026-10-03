import React, { useState } from 'react';
import { NewsArticle } from '../types/news.js';
import { 
  X, 
  FileDown, 
  Bookmark, 
  Share2, 
  ExternalLink, 
  Clock, 
  MapPin, 
  Sparkles, 
  Check,
  Type
} from 'lucide-react';
import { exportArticleToPdf } from '../utils/pdfExport.js';

interface ArticleModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (article: NewsArticle) => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  isSaved,
  onToggleSave,
}) => {
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copied, setCopied] = useState(false);

  if (!article) return null;

  const handleDownloadPdf = () => {
    exportArticleToPdf(article);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`${article.title}\n${article.sourceUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'large':
        return 'text-lg leading-relaxed';
      case 'xlarge':
        return 'text-xl leading-loose';
      default:
        return 'text-base leading-relaxed';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Header with Action Bar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-3.5 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
              {article.categoryLabel}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {article.state} {article.city ? `(${article.city})` : ''}
            </span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Font size adjuster */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 text-xs">
              <button
                onClick={() => setFontSizeLevel('normal')}
                className={`px-2 py-1 rounded font-semibold ${fontSizeLevel === 'normal' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
                title="Tamanho padrão de fonte"
              >
                A
              </button>
              <button
                onClick={() => setFontSizeLevel('large')}
                className={`px-2 py-1 rounded font-semibold ${fontSizeLevel === 'large' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
                title="Fonte maior"
              >
                A+
              </button>
              <button
                onClick={() => setFontSizeLevel('xlarge')}
                className={`px-2 py-1 rounded font-semibold ${fontSizeLevel === 'xlarge' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500'}`}
                title="Fonte extra grande"
              >
                A++
              </button>
            </div>

            {/* Salvar em PDF */}
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
              title="Baixar notícia em PDF"
            >
              <FileDown className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salvar PDF</span>
            </button>

            {/* Favoritar */}
            <button
              onClick={() => onToggleSave(article)}
              className={`p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 transition-colors ${
                isSaved
                  ? 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/60'
                  : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              title={isSaved ? 'Remover dos favoritos' : 'Salvar favorito'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>

            {/* Compartilhar / Copiar */}
            <button
              onClick={handleShare}
              className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Copiar link"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Fechar */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors"
              title="Fechar (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl font-bold font-serif text-slate-900 dark:text-white leading-tight">
            {article.title}
          </h1>

          {/* Metadata bar */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pb-4 border-b border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              Publicado: {article.publishedAt}
            </span>
            <span>•</span>
            <span>{article.readTime}</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-orange-500" />
              {article.city || 'Nordeste Geral'}, {article.state}
            </span>
          </div>

          {/* Executive Summary Callout */}
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border-l-4 border-amber-500 p-4 rounded-r-xl">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
              Resumo Executivo
            </h4>
            <p className="text-sm font-medium text-slate-700 dark:text-slate-200 leading-relaxed italic">
              {article.summary}
            </p>
          </div>

          {/* Key Bullet Points */}
          {article.keyPoints && article.keyPoints.length > 0 && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-700/60">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span>Indicadores e Fatos Principais:</span>
              </h4>
              <ul className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
                {article.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-orange-600 mt-1.5 shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Full Article Content */}
          <div className={`space-y-4 text-slate-800 dark:text-slate-200 font-serif ${getFontSizeClass()}`}>
            {article.content.split('\n\n').map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
              <span className="text-xs text-slate-400 mr-1">Tópicos relacionados:</span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Source Attribution & Google Search Link */}
          <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <div className="font-semibold text-slate-800 dark:text-slate-200">
                Fonte apurada: {article.source}
              </div>
              <div className="text-slate-500 dark:text-slate-400 mt-0.5">
                Verificação e cobertura oficial via Google Grounding
              </div>
            </div>

            <a
              href={article.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 font-medium hover:border-orange-500 transition-colors shadow-2xs shrink-0"
            >
              <span>Ver no Google Search</span>
              <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
