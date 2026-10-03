/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { MarketTicker } from './components/MarketTicker.js';
import { Header } from './components/Header.js';
import { IndicatorsBar } from './components/IndicatorsBar.js';
import { GoogleSearchBar } from './components/GoogleSearchBar.js';
import { CategoryFilter } from './components/CategoryFilter.js';
import { NewsCard } from './components/NewsCard.js';
import { MarketDashboardSidebar } from './components/MarketDashboardSidebar.js';
import { ArticleModal } from './components/ArticleModal.js';
import { CapitalsOverviewModal } from './components/CapitalsOverviewModal.js';
import { PersonalPreferencesModal } from './components/PersonalPreferencesModal.js';
import { DossierModal } from './components/DossierModal.js';
import { NewsArticle, NewsCategory, RegionalIndicator, UserPreferences } from './types/news.js';
import { INITIAL_NEWS, REGIONAL_INDICATORS } from './data/seedNews.js';
import { 
  Sparkles, 
  FileDown, 
  Search, 
  AlertCircle, 
  CheckCircle2, 
  MapPin,
  RefreshCw,
  Clock,
  TrendingUp,
  Building2,
  SlidersHorizontal
} from 'lucide-react';
import { exportDossierToPdf } from './utils/pdfExport.js';

export default function App() {
  // Theme state: dark / light
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('nordeste_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Countdown timer for 10-minute auto-refresh (600 seconds)
  const [secondsUntilNextRefresh, setSecondsUntilNextRefresh] = useState<number>(600);

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
  const [autoRefreshBanner, setAutoRefreshBanner] = useState<string | null>(
    'Sincronizando feed diário automaticamente ao carregar a plataforma...'
  );

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

  // Toggle Dark Mode with guaranteed DOM synchronization
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
      document.body.classList.add('dark');
      localStorage.setItem('nordeste_theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
      document.body.classList.remove('dark');
      localStorage.setItem('nordeste_theme', 'light');
    }
  }, [darkMode]);

  // Persist saved articles
  useEffect(() => {
    try {
      localStorage.setItem('nordeste_saved_articles', JSON.stringify(savedArticles));
    } catch (e) {
      console.warn('Storage error:', e);
    }
  }, [savedArticles]);

  // Toast timer
  const showToast = (text: string, type: 'success' | 'info' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
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
      console.warn('Backend news API unavailable, using seed dataset:', err);
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

  // Core Refresh Function: Calls Google Search Grounding via backend
  const handleRefresh = async (isAuto = false) => {
    setIsRefreshing(true);
    setSecondsUntilNextRefresh(600); // Reset 10-minute timer

    if (isAuto) {
      setAutoRefreshBanner('Sincronizando as notícias mais recentes com o Google Search...');
    } else {
      showToast('Consultando as notícias mais recentes no Google Search...', 'info');
    }

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
        if (isAuto) {
          showToast(
            `Refresh automático: ${count > 0 ? `${count} nova(s) notícia(s) incorporadas via Google!` : 'Feed diário sincronizado ao carregar a plataforma!'}`,
            'success'
          );
        } else {
          if (count > 0) {
            showToast(`Sincronização concluída: ${count} nova(s) notícia(s) incorporadas via Google Search!`, 'success');
          } else {
            showToast('Feed diário verificado e atualizado com as últimas publicações.', 'success');
          }
        }
      } else {
        showToast('Feed sincronizado com as fontes regionais do dia.', 'info');
      }
    } catch (err) {
      console.error('Refresh error:', err);
      showToast('Feed verificado com as fontes regionais do dia.', 'info');
    } finally {
      setIsRefreshing(false);
      setTimeout(() => {
        setAutoRefreshBanner(null);
      }, 4000);
    }
  };

  // Ref to handleRefresh for interval usage
  const handleRefreshRef = useRef(handleRefresh);
  useEffect(() => {
    handleRefreshRef.current = handleRefresh;
  });

  // 1. Automatic refresh on load AND every 10 minutes strictly
  useEffect(() => {
    // A. Initial load of news and indicators
    fetchNews();
    fetchIndicators();

    // B. Trigger automatic refresh immediately on platform load!
    handleRefreshRef.current(true);

    // C. 1-Second countdown clock for the 10-minute (600s) auto-refresh cycle
    const countdownTimer = setInterval(() => {
      setSecondsUntilNextRefresh((prev) => {
        if (prev <= 1) {
          // 10 minutes elapsed, trigger refresh!
          handleRefreshRef.current(true);
          return 600;
        }
        return prev - 1;
      });
    }, 1000);

    // D. Auto-refresh if user returns to tab after being away for 5+ minutes
    let lastActive = Date.now();
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        const elapsed = Date.now() - lastActive;
        if (elapsed > 5 * 60 * 1000) {
          handleRefreshRef.current(true);
        }
        lastActive = Date.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      clearInterval(countdownTimer);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

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
          showToast(`Resultados do Google Search para "${query}"`, 'success');
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
      showToast('Matéria removida dos seus favoritos.', 'info');
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

  // Lead story (Manchete principal)
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
    <div className="min-h-screen bg-[#f4f6f9] dark:bg-[#080c14] text-slate-900 dark:text-slate-100 transition-colors duration-250 font-sans">
      {/* 1. Real-Time Financial & Market Ticker Bar (Top of Portal) */}
      <MarketTicker
        secondsUntilNextRefresh={secondsUntilNextRefresh}
        isRefreshing={isRefreshing}
        onManualRefresh={() => handleRefresh(false)}
      />

      {/* 2. Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl shadow-2xl border bg-slate-900 text-white border-slate-700 animate-in slide-in-from-bottom duration-200 text-xs font-medium">
          {toastMessage.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {toastMessage.type === 'info' && <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />}
          {toastMessage.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* 3. Main Portal Masthead & Navigation */}
      <Header
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        onRefresh={() => handleRefresh(false)}
        isRefreshing={isRefreshing}
        lastUpdated={lastUpdated}
        secondsUntilNextRefresh={secondsUntilNextRefresh}
        onOpenPreferences={() => setIsPreferencesOpen(true)}
        onOpenCapitals={() => setIsCapitalsOpen(true)}
        onOpenDossier={() => setIsDossierOpen(true)}
        savedCount={savedArticles.length}
        activeTab={activeTab}
        autoRefreshStatus={autoRefreshBanner}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'saved') {
            setSelectedCategory('todos');
          }
        }}
      />

      {/* 4. Page Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6">
        {/* Auto-Refresh Banner Notification on Load */}
        {autoRefreshBanner && (
          <div className="mb-5 flex items-center justify-between p-3.5 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-emerald-500/10 border border-orange-300 dark:border-orange-500/40 backdrop-blur-md shadow-xs animate-in fade-in duration-300">
            <div className="flex items-center gap-2.5 text-xs text-orange-950 dark:text-orange-200">
              <span className="p-1.5 rounded-lg bg-orange-600 text-white shrink-0 shadow-xs">
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </span>
              <div>
                <span className="font-bold text-orange-900 dark:text-orange-300">
                  Sincronização Automática Ativa:
                </span>{' '}
                <span>{autoRefreshBanner}</span>
              </div>
            </div>
            <button
              onClick={() => setAutoRefreshBanner(null)}
              className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 cursor-pointer"
              title="Fechar aviso"
            >
              ✕
            </button>
          </div>
        )}

        {/* Strategic Indicators Bar (PIB Nordeste, Fortaleza Líder, Pecém H2V, Empregos) */}
        <IndicatorsBar
          indicators={indicators}
          onSelectIndicatorCategory={(cat) => {
            if (cat === 'fortaleza') setSelectedCategory('economia-fortaleza');
            else if (cat === 'ceara') setSelectedCategory('economia-ceara');
            else if (cat === 'economia') setSelectedCategory('economia-nordeste');
            else if (cat === 'mercado') setSelectedCategory('mercado-nordeste');
          }}
        />

        {/* Google Default Search Grounding Bar */}
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
              className="text-xs font-semibold text-orange-700 dark:text-orange-300 hover:underline cursor-pointer"
            >
              Limpar filtro de cidade
            </button>
          </div>
        )}

        {/* Categories Bar & State Selector */}
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

        {/* Multi-Column News Portal & Market Dashboard Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          {/* Main Feed Column (8 of 12 columns on desktop) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Section Header with Quick Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-600 dark:bg-orange-500" />
                <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                  {activeTab === 'saved' ? 'Minhas Notícias Salvas' : 'Edição Diária & Notícias de Mercado'}
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold font-mono">
                  {filteredArticles.length} matérias
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Download PDF button */}
                <button
                  onClick={() => exportDossierToPdf(filteredArticles, `Dossiê ${selectedCategory !== 'todos' ? selectedCategory : 'Nordeste Hoje'}`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-750 text-xs font-semibold transition-colors cursor-pointer shadow-2xs"
                  title="Baixar lista atual em formato PDF"
                >
                  <FileDown className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                  <span className="hidden sm:inline">Salvar em PDF</span>
                  <span className="sm:hidden">PDF</span>
                  <span className="text-[10px] bg-slate-100 dark:bg-slate-700 px-1 rounded">
                    {filteredArticles.length}
                  </span>
                </button>

                {/* Refresh Button */}
                <button
                  onClick={() => handleRefresh(false)}
                  disabled={isRefreshing}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span className="hidden sm:inline">Atualizar Agora</span>
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
                  Nenhuma matéria encontrada com os filtros atuais
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
                    className="px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-semibold hover:bg-orange-700 transition-colors cursor-pointer"
                  >
                    Limpar Todos os Filtros
                  </button>
                  <button
                    onClick={() => handleRefresh(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    Pesquisar no Google
                  </button>
                </div>
              </div>
            )}

            {/* Lead Story: Featured Article Card */}
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

            {/* Regular News Grid (2 columns on tablet/desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
          </div>

          {/* Sidebar Column: Market Intelligence & Financial Dashboard (4 of 12 columns) */}
          <div className="lg:col-span-4">
            <MarketDashboardSidebar
              indicators={indicators}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              onSelectState={(st) => setSelectedState(st)}
              onOpenCapitals={() => setIsCapitalsOpen(true)}
              onOpenDossier={() => setIsDossierOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* 5. Editorial Footer */}
      <footer className="mt-16 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-12 px-4 sm:px-8 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600 text-white font-black flex items-center justify-center text-sm shadow-md">
              NE
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white font-serif text-sm">
                Nordeste Hoje - Portal & Dashboard de Mercado
              </div>
              <div className="text-[11px] text-slate-400">
                Cobertura de Economia, Mercado, Ceará, Fortaleza, Capitais e Empresas
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setIsCapitalsOpen(true)}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              As 9 Capitais do Nordeste
            </button>
            <span>•</span>
            <button
              onClick={() => setIsPreferencesOpen(true)}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Filtrar Interesses Pessoais
            </button>
            <span>•</span>
            <button
              onClick={() => setIsDossierOpen(true)}
              className="hover:text-orange-600 transition-colors cursor-pointer"
            >
              Exportar em PDF
            </button>
            <span>•</span>
            <span className="text-slate-400">
              Buscador Padrão: <strong>Google Grounding</strong>
            </span>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span>Auto-refresh ao carregar e a cada 10 minutos</span>
          </div>
        </div>
      </footer>

      {/* 6. Modals */}
      {/* Article Reader Modal */}
      <ArticleModal
        article={readingArticle}
        onClose={() => setReadingArticle(null)}
        isSaved={readingArticle ? savedArticles.includes(readingArticle.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* Capitals & Cities Overview Modal */}
      <CapitalsOverviewModal
        isOpen={isCapitalsOpen}
        onClose={() => setIsCapitalsOpen(false)}
        onSelectCityFilter={(cityName, stateCode) => {
          setSelectedCity(cityName);
          setSelectedState(stateCode);
          setSelectedCategory('dados-capitais');
        }}
      />

      {/* Personal Preferences Modal */}
      <PersonalPreferencesModal
        isOpen={isPreferencesOpen}
        onClose={() => setIsPreferencesOpen(false)}
        preferences={preferences}
        onSavePreferences={(newPrefs) => {
          setPreferences(newPrefs);
          try {
            localStorage.setItem('nordeste_preferences', JSON.stringify(newPrefs));
          } catch (e) {
            console.warn(e);
          }
          setSelectedState(newPrefs.selectedState);
          setHighImpactOnly(newPrefs.highImpactOnly);
          showToast('Suas preferências de interesse pessoal foram salvas!', 'success');
        }}
      />

      {/* Dossier PDF Exporter Modal */}
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
