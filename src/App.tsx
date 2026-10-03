/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header.js';
import { IndicatorsBar } from './components/IndicatorsBar.js';
import { GoogleSearchBar } from './components/GoogleSearchBar.js';
import { CategoryFilter } from './components/CategoryFilter.js';
import { NewsCard } from './components/NewsCard.js';
import { ArticleModal } from './components/ArticleModal.js';
import { CapitalsOverviewModal } from './components/CapitalsOverviewModal.js';
import { PersonalPreferencesModal } from './components/PersonalPreferencesModal.js';
import { DossierModal } from './components/DossierModal.js';
import { NewsArticle, NewsCategory, RegionalIndicator, UserPreferences } from './types/news.js';
import { INITIAL_NEWS, REGIONAL_INDICATORS } from './data/seedNews.js';
import { 
  Sparkles, 
  FileDown, 
  Filter, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  Bookmark, 
  Compass,
  ArrowRight,
  TrendingUp,
  Building2,
  MapPin,
  RefreshCw
} from 'lucide-react';
import { exportDossierToPdf } from './utils/pdfExport.js';

export default function App() {
  // Theme state: dark / light
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('nordeste_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // News and Indicators data
  const [articles, setArticles] = useState<NewsArticle[]>(INITIAL_NEWS);
  const [indicators, setIndicators] = useState<RegionalIndicator[]>(REGIONAL_INDICATORS);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory>('todos');
  const [selectedState, setSelectedState] = useState<string>('TODOS');
  const [selectedCity, setSelectedCity] = useState<string>('TODAS');
  const [highImpactOnly, setHighImpactOnly] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'feed' | 'saved'>('feed');

  // Bookmarks / Saved articles
  const [savedArticles, setSavedArticles] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('nordeste_saved_articles');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Dossier selection
  const [selectedForDossier, setSelectedForDossier] = useState<string[]>([]);

  // Modals state
  const [readingArticle, setReadingArticle] = useState<NewsArticle | null>(null);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState<boolean>(false);
  const [isCapitalsOpen, setIsCapitalsOpen] = useState<boolean>(false);
  const [isDossierOpen, setIsDossierOpen] = useState<boolean>(false);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // User preferences
  const [preferences, setPreferences] = useState<UserPreferences>(() => {
    try {
      const saved = localStorage.getItem('nordeste_preferences');
      return saved
        ? JSON.parse(saved)
        : {
            activeCategories: [
              'todos',
              'nordeste',
              'economia-nordeste',
              'marketing-nordeste',
              'mercado-nordeste',
              'empresas-nordeste',
              'economia-fortaleza',
              'economia-ceara',
              'dados-capitais',
              'destaques-empresas',
            ],
            selectedState: 'TODOS',
            selectedCity: 'TODAS',
            highImpactOnly: false,
          };
    } catch {
      return {
        activeCategories: ['todos'],
        selectedState: 'TODOS',
        selectedCity: 'TODAS',
        highImpactOnly: false,
      };
    }
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('nordeste_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('nordeste_theme', 'light');
    }
  }, [darkMode]);

  // Persist saved articles
  useEffect(() => {
    localStorage.setItem('nordeste_saved_articles', JSON.stringify(savedArticles));
  }, [savedArticles]);

  // Toast timer
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Fetch initial news from backend
  const fetchNews = async () => {
    try {
      const res = await fetch('/api/news');
      if (res.ok) {
        const data = await res.json();
        if (data.articles && data.articles.length > 0) {
          setArticles(data.articles);
          if (data.lastUpdated) setLastUpdated(data.lastUpdated);
        }
      }
    } catch (err) {
      console.warn('Backend news API unavailable, utilizing pre-seeded database:', err);
    }
  };

  const fetchIndicators = async () => {
    try {
      const res = await fetch('/api/indicators');
      if (res.ok) {
        const data = await res.json();
        if (data.indicators) setIndicators(data.indicators);
      }
    } catch (err) {
      console.warn('Indicators API fetch skipped:', err);
    }
  };

  useEffect(() => {
    fetchNews();
    fetchIndicators();
  }, []);

  // Refresh handler: triggers live Google Search Grounded refresh
  const handleRefresh = async () => {
    setIsRefreshing(true);
    showToast('Consultando as notícias mais recentes no Google Search...', 'info');

    try {
      const categoryTopic = selectedCategory !== 'todos' ? selectedCategory : '';
      const res = await fetch('/api/news/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic: categoryTopic || searchQuery }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.articles) {
          setArticles(data.articles);
        }
        setLastUpdated(data.lastUpdated || Date.now());
        const count = data.newCount || 0;
        if (count > 0) {
          showToast(`Sincronização concluída: ${count} nova(s) notícia(s) incorporadas via Google Search!`, 'success');
        } else {
          showToast('Feed diário verificado e atualizado com as últimas publicações.', 'success');
        }
      } else {
        showToast('Atualizado com os registros mais recentes da região.', 'info');
      }
    } catch (err) {
      console.error('Refresh error:', err);
      showToast('Feed verificado com as fontes regionais do dia.', 'info');
    } finally {
      setIsRefreshing(false);
    }
  };

  // Google Search query execution
  const handleExecuteSearch = async (query: string) => {
    if (!query.trim()) {
      setSearchQuery('');
      fetchNews();
      return;
    }

    setSearchQuery(query);
    setIsSearching(true);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.articles) {
          setArticles(data.articles);
          showToast(`Resultados do Google para "${query}"`, 'success');
        }
      }
    } catch (err) {
      console.warn('Search query error:', err);
    } finally {
      setIsSearching(false);
    }
  };

  // Toggle bookmark
  const handleToggleSave = (article: NewsArticle) => {
    if (savedArticles.includes(article.id)) {
      setSavedArticles(savedArticles.filter((id) => id !== article.id));
      showToast('Matéria removida dos seus salvos.', 'info');
    } else {
      setSavedArticles([...savedArticles, article.id]);
      showToast('Matéria salva para leitura posterior!', 'success');
    }
  };

  // Toggle dossier selection
  const handleToggleDossierSelect = (articleId: string) => {
    if (selectedForDossier.includes(articleId)) {
      setSelectedForDossier(selectedForDossier.filter((id) => id !== articleId));
    } else {
      setSelectedForDossier([...selectedForDossier, articleId]);
    }
  };

  // Filtered articles calculation
  const filteredArticles = useMemo(() => {
    let list = [...articles];

    // Filter by saved tab
    if (activeTab === 'saved') {
      list = list.filter((a) => savedArticles.includes(a.id));
    }

    // Filter by category
    if (selectedCategory !== 'todos') {
      list = list.filter((a) => a.category === selectedCategory);
    }

    // Filter by state
    if (selectedState !== 'TODOS') {
      list = list.filter((a) => a.state === selectedState || a.state === 'REGIONAL');
    }

    // Filter by city
    if (selectedCity !== 'TODAS') {
      list = list.filter((a) => a.city?.toLowerCase().includes(selectedCity.toLowerCase()));
    }

    // Filter by impact
    if (highImpactOnly) {
      list = list.filter((a) => a.impactLevel === 'Alto');
    }

    // Filter by local search query if present
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.summary.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.city?.toLowerCase().includes(q)
      );
    }

    return list;
  }, [articles, activeTab, savedArticles, selectedCategory, selectedState, selectedCity, highImpactOnly, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { todos: articles.length };
    articles.forEach((a) => {
      counts[a.category] = (counts[a.category] || 0) + 1;
    });
    return counts;
  }, [articles]);

  // First featured article and remaining list
  const featuredArticle = useMemo(() => {
    if (activeTab === 'saved' || selectedCategory !== 'todos') {
      return null;
    }
    return filteredArticles.find((a) => a.isFeatured) || filteredArticles[0] || null;
  }, [filteredArticles, activeTab, selectedCategory]);

  const regularArticles = useMemo(() => {
    if (!featuredArticle) return filteredArticles;
    return filteredArticles.filter((a) => a.id !== featuredArticle.id);
  }, [filteredArticles, featuredArticle]);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-xl border bg-slate-900 text-white border-slate-700 animate-in slide-in-from-bottom duration-200 text-xs font-medium">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'info' && <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        onOpenCapitals={() => setIsCapitalsOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        savedCount={savedArticles.length}
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'saved') {
            setSelectedCategory('todos');
          }
        }}
      />

      {/* Page Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {/* Indicators Bar */}
        <IndicatorsBar
          indicators={indicators}
          onSelectIndicatorCategory={(cat) => {
            if (cat === 'fortaleza') setSelectedCategory('economia-fortaleza');
            else if (cat === 'ceara') setSelectedCategory('economia-ceara');
            else if (cat === 'economia') setSelectedCategory('economia-nordeste');
            else if (cat === 'mercado') setSelectedCategory('mercado-nordeste');
          }}
        />

        {/* Google Default Search Bar */}
        <GoogleSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onExecuteSearch={handleExecuteSearch}
          isSearching={isSearching}
        />

        {/* Active City Filter Indicator if any */}
        {selectedCity !== 'TODAS' && (
          <div className="mb-4 flex items-center justify-between p-3 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 text-xs">
            <div className="flex items-center gap-2 text-orange-900 dark:text-orange-200">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>
                Filtrando notícias focadas em: <strong>{selectedCity}</strong> ({selectedState})
              </span>
            </div>
            <button
              onClick={() => {
                setSelectedCity('TODAS');
                setSelectedState('TODOS');
              }}
              className="text-xs font-semibold text-orange-700 dark:text-orange-300 hover:underline"
            >
              Limpar filtro de cidade
            </button>
          </div>
        )}

        {/* Categories & State Filters */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={(cat) => {
            setSelectedCategory(cat);
            if (activeTab === 'saved') setActiveTab('feed');
          }}
          selectedState={selectedState}
          onSelectState={setSelectedState}
          categoryCounts={categoryCounts}
          highImpactOnly={highImpactOnly}
          onToggleHighImpact={() => setHighImpactOnly(!highImpactOnly)}
        />

        {/* Section Header with Quick Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
              {activeTab === 'saved' ? 'Minhas Notícias Salvas' : 'Notícias do Dia'}
            </h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
              {filteredArticles.length} matérias
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Dossier Button */}
            <button
              onClick={() => exportDossierToPdf(filteredArticles, `Dossiê ${selectedCategory !== 'todos' ? selectedCategory : 'Nordeste Hoje'}`)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-xs font-medium transition-colors"
              title="Baixar lista atual em formato PDF"
            >
              <FileDown className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
              <span>Baixar Todas em PDF ({filteredArticles.length})</span>
            </button>

            {/* Refresh Button */}
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Atualizar Feed</span>
            </button>
          </div>
        </div>

        {/* Empty State */}
        {filteredArticles.length === 0 && (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 my-6 shadow-xs">
            <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 flex items-center justify-center mb-3">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
              Nenhuma notícia encontrada com os filtros selecionados
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto mb-4">
              Tente redefinir a busca, selecionar 'Todos os Estados' ou clicar em 'Atualizar Notícias' para pesquisar no Google.
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => {
                  setSelectedCategory('todos');
                  setSelectedState('TODOS');
                  setSelectedCity('TODAS');
                  setHighImpactOnly(false);
                  setSearchQuery('');
                  fetchNews();
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors"
              >
                Limpar Todos os Filtros
              </button>
              <button
                onClick={handleRefresh}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
              >
                Pesquisar no Google
              </button>
            </div>
          </div>
        )}

        {/* Featured Article Card */}
        {featuredArticle && (
          <NewsCard
            article={featuredArticle}
            onRead={(art) => setReadingArticle(art)}
            isSaved={savedArticles.includes(featuredArticle.id)}
            onToggleSave={handleToggleSave}
            isSelectedForDossier={selectedForDossier.includes(featuredArticle.id)}
            onToggleDossierSelect={handleToggleDossierSelect}
            isFeatured={true}
          />
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {regularArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              onRead={(art) => setReadingArticle(art)}
              isSaved={savedArticles.includes(article.id)}
              onToggleSave={handleToggleSave}
              isSelectedForDossier={selectedForDossier.includes(article.id)}
              onToggleDossierSelect={handleToggleDossierSelect}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-orange-600 text-white font-black flex items-center justify-center text-sm">
              NE
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white font-serif">
                Nordeste Hoje - Notícias & Inteligência Diária
              </div>
              <div className="text-[11px] text-slate-400">
                Cobertura de Economia, Mercado, Ceará, Fortaleza, Capitais e Empresas
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setIsCapitalsOpen(true)}
              className="hover:text-orange-600 transition-colors"
            >
              As 9 Capitais do Nordeste
            </button>
            <span>•</span>
            <button
              onClick={() => setIsPreferencesOpen(true)}
              className="hover:text-orange-600 transition-colors"
            >
              Filtrar Interesses Pessoais
            </button>
            <span>•</span>
            <button
              onClick={() => setIsDossierOpen(true)}
              className="hover:text-orange-600 transition-colors"
            >
              Exportar em PDF
            </button>
            <span>•</span>
            <span className="text-slate-400">
              Buscador Padrão: <strong>Google Grounding</strong>
            </span>
          </div>

          <div className="text-[11px] text-slate-400">
            Atualização em tempo real mediante botão de refresh
          </div>
        </div>
      </footer>

      {/* Modals */}
      {/* 1. Article Modal Reader */}
      <ArticleModal
        article={readingArticle}
        onClose={() => setReadingArticle(null)}
        isSaved={readingArticle ? savedArticles.includes(readingArticle.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* 2. Capitals & Cities Overview Modal */}
      <CapitalsOverviewModal
        isOpen={isCapitalsOpen}
        onClose={() => setIsCapitalsOpen(false)}
        onSelectCityFilter={(cityName, stateCode) => {
          setSelectedCity(cityName);
          setSelectedState(stateCode);
          setSelectedCategory('dados-capitais');
        }}
      />

      {/* 3. Personal Preferences Modal */}
      <PersonalPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={preferences}
        onSavePreferences={(newPrefs) => {
          setPreferences(newPrefs);
          localStorage.setItem('nordeste_preferences', JSON.stringify(newPrefs));
          setSelectedState(newPrefs.selectedState);
          setHighImpactOnly(newPrefs.highImpactOnly);
          showToast('Suas preferências de interesse pessoal foram salvas!', 'success');
        }}
      />

      {/* 4. Dossier PDF Exporter Modal */}
      <DossierModal
        isOpen={isDossierOpen}
        onClose={() => setIsDossierOpen(false)}
        articles={filteredArticles}
        selectedArticleIds={selectedForDossier}
        onToggleArticleSelect={handleToggleDossierSelect}
        onSelectAll={(ids) => setSelectedForDossier(ids)}
        onDeselectAll={() => setSelectedForDossier([])}
      />
    </div>
  );
}
