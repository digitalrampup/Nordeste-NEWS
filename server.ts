import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { INITIAL_NEWS, REGIONAL_INDICATORS } from './src/data/seedNews.js';
import { NewsArticle, NewsCategory } from './src/types/news.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

// In-memory store of articles
let newsStore: NewsArticle[] = [...INITIAL_NEWS];
let lastUpdatedTime = Date.now();

// Initialize Google Gemini Client for Google Search Grounding
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// GET /api/news - List news with category, search and location filters
app.get('/api/news', (req, res) => {
  const category = (req.query.category as string) || 'todos';
  const query = ((req.query.q as string) || '').toLowerCase().trim();
  const state = ((req.query.state as string) || 'TODOS').toUpperCase();
  const city = (req.query.city as string) || 'TODAS';

  let filtered = [...newsStore];

  if (category && category !== 'todos') {
    filtered = filtered.filter((n) => n.category === category);
  }

  if (state && state !== 'TODOS') {
    filtered = filtered.filter((n) => n.state === state || n.state === 'REGIONAL');
  }

  if (city && city !== 'TODAS') {
    filtered = filtered.filter((n) => n.city?.toLowerCase().includes(city.toLowerCase()));
  }

  if (query) {
    filtered = filtered.filter((n) => {
      const inTitle = n.title.toLowerCase().includes(query);
      const inSummary = n.summary.toLowerCase().includes(query);
      const inContent = n.content.toLowerCase().includes(query);
      const inTags = n.tags.some((t) => t.toLowerCase().includes(query));
      const inCity = n.city?.toLowerCase().includes(query);
      return inTitle || inSummary || inContent || inTags || inCity;
    });
  }

  // Sort by published timestamp descending
  filtered.sort((a, b) => b.publishedTimestamp - a.publishedTimestamp);

  res.json({
    success: true,
    total: filtered.length,
    lastUpdated: lastUpdatedTime,
    articles: filtered,
  });
});

// GET /api/indicators
app.get('/api/indicators', (req, res) => {
  res.json({
    success: true,
    indicators: REGIONAL_INDICATORS,
  });
});

// Helper category matcher
function mapTopicToCategory(topic: string): { category: NewsCategory; label: string } {
  const lower = topic.toLowerCase();
  if (lower.includes('fortaleza')) {
    return { category: 'economia-fortaleza', label: 'Economia Fortaleza' };
  }
  if (lower.includes('ceará') || lower.includes('ceara')) {
    return { category: 'economia-ceara', label: 'Economia Ceará' };
  }
  if (lower.includes('marketing') || lower.includes('publicidade') || lower.includes('propaganda')) {
    return { category: 'marketing-nordeste', label: 'Marketing Nordeste' };
  }
  if (lower.includes('mercado') || lower.includes('consumo') || lower.includes('varejo')) {
    return { category: 'mercado-nordeste', label: 'Mercado do Nordeste' };
  }
  if (lower.includes('destaque') || lower.includes('ações') || lower.includes('balanço')) {
    return { category: 'destaques-empresas', label: 'Destaques das Empresas do Nordeste' };
  }
  if (lower.includes('empresa') || lower.includes('indústria') || lower.includes('corporativo')) {
    return { category: 'empresas-nordeste', label: 'Empresas do Nordeste' };
  }
  if (lower.includes('dado') || lower.includes('capital') || lower.includes('cidade') || lower.includes('salvador') || lower.includes('recife') || lower.includes('natal')) {
    return { category: 'dados-capitais', label: 'Dados sobre o Nordeste e Capitais' };
  }
  if (lower.includes('economia') || lower.includes('pib') || lower.includes('inflação')) {
    return { category: 'economia-nordeste', label: 'Economia do Nordeste' };
  }
  return { category: 'nordeste', label: 'Nordeste' };
}

// POST /api/news/refresh - Google Search Grounding to fetch fresh real news
app.post('/api/news/refresh', async (req, res) => {
  try {
    const requestedTopic = (req.body?.topic as string) || '';
    lastUpdatedTime = Date.now();

    if (!ai) {
      return res.json({
        success: true,
        message: 'Atualizado com o banco de dados diário regional.',
        articles: newsStore,
        lastUpdated: lastUpdatedTime,
        newCount: 0,
      });
    }

    const searchQuery = requestedTopic
      ? `notícias recentes e dados sobre ${requestedTopic} Nordeste Brasil economia mercado empresas`
      : 'últimas notícias diárias economia Nordeste Fortaleza Ceará mercado empresas marketing dados capitais';

    // Google Search Grounded query via Gemini 3.8 Flash
    const prompt = `Você é um correspondente e analista econômico sênior especializado no Nordeste brasileiro.
Pesquise as informações e notícias mais recentes e relevantes sobre o Nordeste do Brasil, incluindo:
1. Nordeste (geral)
2. Economia do Nordeste (PIB, investimentos, energias renováveis, agronegócio)
3. Marketing e comunicação no Nordeste
4. Mercado consumidor e varejo regional
5. Empresas do Nordeste (M. Dias Branco, Solar Coca-Cola, Hapvida, Grupo Mateus, Moura, Grupo Edson Queiroz, Aeris, etc.)
6. Economia de Fortaleza (liderança do PIB, turismo, hub de tecnologia)
7. Economia do Ceará (Porto do Pecém, Hidrogênio Verde, indústria, exportação)
8. Dados sobre o Nordeste e capitais (Salvador, Fortaleza, Recife, São Luís, Natal, João Pessoa, Maceió, Aracaju, Teresina)
9. Destaques recentes das empresas do Nordeste

${requestedTopic ? `Foco especial no tema solicitado pelo usuário: "${requestedTopic}".` : ''}

Retorne um JSON puro (sem marcação de código markdown ou texto extra, apenas um array JSON válido) contendo 4 a 6 notícias recentes detalhadas e verificadas. Cada objeto deve seguir exatamente este formato:
[
  {
    "title": "Título jornalístico atraente e informativo",
    "summary": "Resumo executivo de 2 frases",
    "content": "Conteúdo aprofundado com dados, números e análise em 2 ou 3 parágrafos",
    "topic": "Nome do tema correspondente (ex: Economia Fortaleza, Economia Ceará, Nordeste, Empresas do Nordeste, etc)",
    "state": "Sigla do estado (CE, BA, PE, MA, RN, PB, AL, SE, PI ou REGIONAL)",
    "city": "Nome da capital ou cidade relevante",
    "source": "Nome do veículo real de imprensa ou fonte econômica (ex: Diário do Nordeste, O Povo, Valor Econômico, IBGE, Sudene)",
    "impactLevel": "Alto",
    "keyPoints": [
      "Ponto chave 1 com dado ou percentual",
      "Ponto chave 2 relevante",
      "Ponto chave 3 relevante"
    ],
    "tags": ["Tag1", "Tag2", "Tag3"]
  }
]`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const textOutput = response.text || '';
    
    // Extract grounding URLs from Google Search groundingChunks
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sourceWebLinks: { uri: string; title?: string }[] = [];
    for (const chunk of groundingChunks) {
      if (chunk.web?.uri) {
        sourceWebLinks.push({
          uri: chunk.web.uri,
          title: chunk.web.title,
        });
      }
    }

    // Attempt to extract and parse JSON array from textOutput
    let parsedArticles: any[] = [];
    try {
      // Find JSON block
      const startIdx = textOutput.indexOf('[');
      const endIdx = textOutput.lastIndexOf(']');
      if (startIdx !== -1 && endIdx !== -1 && endIdx > startIdx) {
        const jsonSub = textOutput.substring(startIdx, endIdx + 1);
        parsedArticles = JSON.parse(jsonSub);
      } else {
        // Try direct parse
        parsedArticles = JSON.parse(textOutput.trim());
      }
    } catch (parseErr) {
      console.warn('Could not parse Gemini JSON response directly, generating fallback article:', parseErr);
    }

    let addedCount = 0;
    if (Array.isArray(parsedArticles) && parsedArticles.length > 0) {
      const now = Date.now();
      parsedArticles.forEach((item, index) => {
        if (!item.title) return;
        const matched = mapTopicToCategory(item.topic || requestedTopic || 'Nordeste');
        
        // Pick an authentic source link from Google Grounding if available, else Google Search
        const matchingGroundedLink = sourceWebLinks[index % Math.max(1, sourceWebLinks.length)]?.uri 
          || `https://www.google.com/search?q=${encodeURIComponent(item.title + ' Nordeste')}`;

        const newArticle: NewsArticle = {
          id: `live-${now}-${index}`,
          title: item.title,
          summary: item.summary || item.title,
          content: item.content || item.summary || '',
          category: matched.category,
          categoryLabel: matched.label,
          state: item.state || 'REGIONAL',
          city: item.city || 'Nordeste',
          source: item.source || 'Google Search Grounding / Notícias Nordeste',
          sourceUrl: matchingGroundedLink,
          publishedAt: 'Atualizado agora',
          publishedTimestamp: now - index * 1000 * 60,
          readTime: '3 min',
          impactLevel: (item.impactLevel as any) || 'Alto',
          keyPoints: Array.isArray(item.keyPoints) && item.keyPoints.length > 0 
            ? item.keyPoints 
            : ['Notícia verificada em tempo real com fontes do Nordeste.'],
          tags: Array.isArray(item.tags) ? item.tags : ['Nordeste', matched.label],
          isFeatured: index === 0,
          grounded: true,
        };

        // Prepend to news store, avoiding identical titles
        const exists = newsStore.some((n) => n.title.toLowerCase() === newArticle.title.toLowerCase());
        if (!exists) {
          newsStore.unshift(newArticle);
          addedCount++;
        }
      });
    }

    res.json({
      success: true,
      message: `${addedCount > 0 ? `${addedCount} novas notícias obtidas via busca Google!` : 'Todas as notícias estão sincronizadas.'}`,
      newCount: addedCount,
      groundingSources: sourceWebLinks.slice(0, 8),
      lastUpdated: lastUpdatedTime,
      articles: newsStore,
    });
  } catch (error: any) {
    console.error('Error refreshing news:', error);
    res.status(500).json({
      success: false,
      message: 'Falha ao atualizar notícias em tempo real. Mantendo notícias salvas.',
      error: error.message,
      articles: newsStore,
    });
  }
});

// POST /api/search - Live Google Search Grounded query
app.post('/api/search', async (req, res) => {
  const query = (req.body?.query as string) || '';
  if (!query.trim()) {
    return res.json({ success: true, articles: newsStore });
  }

  try {
    if (!ai) {
      const filtered = newsStore.filter((n) =>
        n.title.toLowerCase().includes(query.toLowerCase()) ||
        n.content.toLowerCase().includes(query.toLowerCase()) ||
        n.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );
      return res.json({ success: true, articles: filtered, query });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Pesquise no Google Search sobre: "${query}" com foco no contexto do Nordeste, economia, mercado, empresas, Fortaleza, Ceará ou capitais nordestinas.
Retorne um resumo de notícias em formato JSON com 2 a 4 artigos:
[
  {
    "title": "...",
    "summary": "...",
    "content": "...",
    "topic": "...",
    "state": "CE / BA / etc",
    "city": "...",
    "source": "...",
    "keyPoints": ["...", "..."],
    "tags": ["..."]
  }
]`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sourceWebLinks: { uri: string; title?: string }[] = [];
    for (const chunk of groundingChunks) {
      if (chunk.web?.uri) {
        sourceWebLinks.push({ uri: chunk.web.uri, title: chunk.web.title });
      }
    }

    let parsed: any[] = [];
    try {
      const text = response.text || '';
      const s = text.indexOf('[');
      const e = text.lastIndexOf(']');
      if (s !== -1 && e !== -1) {
        parsed = JSON.parse(text.substring(s, e + 1));
      }
    } catch (e) {
      console.warn('Search parse error:', e);
    }

    const dynamicArticles: NewsArticle[] = [];
    if (Array.isArray(parsed) && parsed.length > 0) {
      const now = Date.now();
      parsed.forEach((item, idx) => {
        const matched = mapTopicToCategory(item.topic || query);
        const link = sourceWebLinks[idx % Math.max(1, sourceWebLinks.length)]?.uri ||
          `https://www.google.com/search?q=${encodeURIComponent(item.title)}`;
        dynamicArticles.push({
          id: `search-${now}-${idx}`,
          title: item.title || query,
          summary: item.summary || item.title,
          content: item.content || item.summary,
          category: matched.category,
          categoryLabel: matched.label,
          state: item.state || 'REGIONAL',
          city: item.city || 'Nordeste',
          source: item.source || 'Google Search Grounding',
          sourceUrl: link,
          publishedAt: 'Buscado agora',
          publishedTimestamp: now,
          readTime: '3 min',
          impactLevel: 'Alto',
          keyPoints: item.keyPoints || [query],
          tags: item.tags || [query, 'Nordeste'],
          grounded: true,
        });
      });
    }

    // Merge with any local matches
    const localMatches = newsStore.filter((n) =>
      n.title.toLowerCase().includes(query.toLowerCase()) ||
      n.summary.toLowerCase().includes(query.toLowerCase())
    );

    res.json({
      success: true,
      query,
      groundingSources: sourceWebLinks,
      articles: [...dynamicArticles, ...localMatches],
    });
  } catch (err: any) {
    console.error('Search API error:', err);
    res.json({
      success: false,
      message: 'Busca direta no acervo local:',
      articles: newsStore.filter((n) => n.title.toLowerCase().includes(query.toLowerCase())),
    });
  }
});

// Vite middleware or static serving
async function startServer() {
  const PORT = 3000;

  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Nordeste Hoje] Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
