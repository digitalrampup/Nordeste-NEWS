export type NewsCategory =
  | 'todos'
  | 'nordeste'
  | 'economia-nordeste'
  | 'marketing-nordeste'
  | 'mercado-nordeste'
  | 'empresas-nordeste'
  | 'economia-fortaleza'
  | 'economia-ceara'
  | 'dados-capitais'
  | 'destaques-empresas';

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: NewsCategory;
  categoryLabel: string;
  state: string; // CE, BA, PE, MA, RN, PB, AL, SE, PI, REGIONAL
  city?: string;
  source: string;
  sourceUrl: string;
  publishedAt: string;
  publishedTimestamp: number;
  readTime: string;
  impactLevel: 'Alto' | 'Médio' | 'Relevante';
  keyPoints: string[];
  tags: string[];
  isFeatured?: boolean;
  grounded?: boolean;
}

export interface RegionalIndicator {
  id: string;
  title: string;
  value: string;
  variation: string;
  isPositive: boolean;
  period: string;
  detail: string;
  category: 'economia' | 'mercado' | 'ceara' | 'fortaleza';
}

export interface UserPreferences {
  activeCategories: NewsCategory[];
  selectedState: string | 'TODOS';
  selectedCity: string | 'TODAS';
  highImpactOnly: boolean;
}
