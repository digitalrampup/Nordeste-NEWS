export interface MarketTickerItem {
  id: string;
  symbol: string;
  name: string;
  value: string;
  change: string;
  isPositive: boolean;
  type: 'index' | 'fx' | 'stock' | 'commodity' | 'regional';
}

export const MARKET_TICKERS: MarketTickerItem[] = [
  { id: 'ibov', symbol: 'IBOVESPA', name: 'Bolsa Brasil', value: '134.820 pts', change: '+0,68%', isPositive: true, type: 'index' },
  { id: 'usd', symbol: 'USD/BRL', name: 'Dólar Comercial', value: 'R$ 5,42', change: '-0,35%', isPositive: false, type: 'fx' },
  { id: 'selic', symbol: 'SELIC', name: 'Taxa Básica', value: '10,75% a.a.', change: 'Estável', isPositive: true, type: 'regional' },
  { id: 'pib-ne', symbol: 'PIB NORDESTE', name: 'Crescimento 12M', value: '+3,1%', change: '+0,7% vs BR', isPositive: true, type: 'regional' },
  { id: 'mdia3', symbol: 'MDIA3', name: 'M. Dias Branco', value: 'R$ 38,40', change: '+1,45%', isPositive: true, type: 'stock' },
  { id: 'hapv3', symbol: 'HAPV3', name: 'Hapvida', value: 'R$ 4,18', change: '+2,20%', isPositive: true, type: 'stock' },
  { id: 'gmat3', symbol: 'GMAT3', name: 'Grupo Mateus', value: 'R$ 7,92', change: '+0,89%', isPositive: true, type: 'stock' },
  { id: 'bnbr3', symbol: 'BNBR3', name: 'Banco do Nordeste', value: 'R$ 102,50', change: '+1,12%', isPositive: true, type: 'stock' },
  { id: 'aeri3', symbol: 'AERI3', name: 'Aeris Energy', value: 'R$ 8,35', change: '+3,40%', isPositive: true, type: 'stock' },
  { id: 'brent', symbol: 'BRENT', name: 'Petróleo Barril', value: 'US$ 74,30', change: '+0,52%', isPositive: true, type: 'commodity' },
  { id: 'soja', symbol: 'SOJA MATOPIBA', name: 'Saca 60kg', value: 'R$ 128,50', change: '+0,78%', isPositive: true, type: 'commodity' },
  { id: 'h2v', symbol: 'H2V PECÉM', name: 'Investimentos Ceará', value: 'US$ 8,2 Bi', change: '+30 Projetos', isPositive: true, type: 'regional' },
];

export interface MarketSummaryCard {
  title: string;
  badge: string;
  mainStat: string;
  subStat: string;
  insight: string;
}

export const REGIONAL_MARKET_SUMMARY: MarketSummaryCard[] = [
  {
    title: 'Hub de Fortaleza & Cabos Submarinos',
    badge: 'Conectividade Global',
    mainStat: '18 Cabos de Fibra Óptica',
    subStat: '2º Maior Hub do Planeta',
    insight: 'Praia do Futuro atrai mega data centers e consolida Fortaleza como capital tecnológica da América do Sul.',
  },
  {
    title: 'Complexo do Pecém & Hidrogênio Verde',
    badge: 'Transição Energética',
    mainStat: 'US$ 8,2 Bilhões',
    subStat: '34 Memorandos / Pré-contratos',
    insight: 'Parceria com Porto de Roterdã coloca o Ceará como principal rota de exportação de H2V e amônia verde para a Europa.',
  },
  {
    title: 'Matriz Limpa Eólica e Solar',
    badge: 'Geração Sustentável',
    mainStat: '88,5% Renovável',
    subStat: 'Exportador Líquido Nacional',
    insight: 'Nordeste abastece o Sistema Interligado Nacional gerando excedente limpo comercializado no mercado livre.',
  },
  {
    title: 'Agronegócio do Matopiba e Vale do São Francisco',
    badge: 'Exportação de Alimentos',
    mainStat: 'Recorde em Grãos & Frutas',
    subStat: 'Uva e Manga para EUA/UE',
    insight: 'Produtividade recorde em grãos no oeste da Bahia, sul do Maranhão e Piauí, com uvas de mesa do Vale do São Francisco.',
  },
];
