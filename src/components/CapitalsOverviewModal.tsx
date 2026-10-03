import React, { useState } from 'react';
import { X, MapPin, Building2, TrendingUp, Users, ExternalLink, ArrowRight } from 'lucide-react';

interface CapitalsOverviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectCityFilter: (cityName: string, stateCode: string) => void;
}

interface CapitalData {
  name: string;
  state: string;
  stateName: string;
  population: string;
  pib: string;
  economicHighlight: string;
  sectors: string[];
  description: string;
}

const CAPITALS_DATA: CapitalData[] = [
  {
    name: 'Fortaleza',
    state: 'CE',
    stateName: 'Ceará',
    population: '2,43 milhões',
    pib: 'R$ 73,4 Bilhões (1º do NE)',
    economicHighlight: 'Maior PIB do Norte/Nordeste, Hub de Cabos Submarinos, Turismo e Serviços.',
    sectors: ['Tecnologia & Data Centers', 'Turismo & Convenções', 'Saúde & Educação', 'Varejo'],
    description: 'Capital econômica mais dinâmica da região, líder isolada em geração de riqueza e conectividade global através da Praia do Futuro.',
  },
  {
    name: 'Salvador',
    state: 'BA',
    stateName: 'Bahia',
    population: '2,42 milhões',
    pib: 'R$ 62,9 Bilhões',
    economicHighlight: 'Maior mercado consumidor, Economia Criativa, Turismo Internacional e Polo de Camaçari.',
    sectors: ['Turismo Cultural', 'Automotivo Elétrico (Camaçari)', 'Logística Portuária', 'Serviços'],
    description: 'Metrópole histórica com forte expansão no turismo de experiências, polo automotivo de transição energética e economia criativa.',
  },
  {
    name: 'Recife',
    state: 'PE',
    stateName: 'Pernambuco',
    population: '1,49 milhão',
    pib: 'R$ 54,9 Bilhões',
    economicHighlight: 'Porto Digital (TI e Inovação faturando R$ 5,4 bi) e Polo Médico de Alta Complexidade.',
    sectors: ['Software & Startups', 'Complexo Hospitalar', 'Porto de Suape', 'Engenharia'],
    description: 'Capital da tecnologia e da inteligência médica do Nordeste, abrigando o maior parque tecnológico urbano da América Latina.',
  },
  {
    name: 'São Luís',
    state: 'MA',
    stateName: 'Maranhão',
    population: '1,04 milhão',
    pib: 'R$ 36,5 Bilhões',
    economicHighlight: 'Porto do Itaqui (líder em escoamento de grãos e minério) e logística ferroviária.',
    sectors: ['Logística Portuária', 'Exportação de Grãos', 'Metalurgia', 'Turismo Histórico'],
    description: 'Porta de saída do agronegócio do Matopiba e mineração nacional, com portos de águas profundas de alta tonelagem.',
  },
  {
    name: 'Natal',
    state: 'RN',
    stateName: 'Rio Grande do Norte',
    population: '751 mil',
    pib: 'R$ 24,1 Bilhões',
    economicHighlight: 'Capital das Energias Renováveis, pioneira em eólica e polo aeroespacial.',
    sectors: ['Energia Eólica & Solar', 'Turismo de Sol e Praia', 'Fruticultura de Exportação'],
    description: 'Epicentro da matriz eólica brasileira, pesquisa científica costeira e destino turístico internacional consagrado.',
  },
  {
    name: 'João Pessoa',
    state: 'PB',
    stateName: 'Paraíba',
    population: '833 mil',
    pib: 'R$ 22,2 Bilhões',
    economicHighlight: 'Líder em atração de novos moradores e investimentos imobiliários de alto padrão.',
    sectors: ['Construção Civil', 'Turismo Sustentável', 'Polo Universitário & TI'],
    description: 'A capital mais verde do Brasil, com expansão imobiliária acelerada e preservação rigorosa da orla marítima.',
  },
  {
    name: 'Maceió',
    state: 'AL',
    stateName: 'Alagoas',
    population: '957 mil',
    pib: 'R$ 24,5 Bilhões',
    economicHighlight: 'Crescimento de 22% no turismo internacional, polo químico e hoteleiro.',
    sectors: ['Hotelaria de Luxo', 'Indústria Química', 'Comércio de Varejo'],
    description: 'Destino litorâneo mais procurado do Brasil no verão, com hotelaria premium e investimentos em infraestrutura urbana.',
  },
  {
    name: 'Teresina',
    state: 'PI',
    stateName: 'Piauí',
    population: '866 mil',
    pib: 'R$ 23,8 Bilhões',
    economicHighlight: 'Referência em excelência médica para todo o Meio-Norte e polo educacional.',
    sectors: ['Medicina de Alta Complexidade', 'Serviços Financeiros', 'Polo Educacional'],
    description: 'Única capital do Nordeste não litorânea, funciona como polo de saúde e educação para mais de 5 milhões de pessoas dos estados vizinhos.',
  },
  {
    name: 'Aracaju',
    state: 'SE',
    stateName: 'Sergipe',
    population: '602 mil',
    pib: 'R$ 18,4 Bilhões',
    economicHighlight: 'Nova fronteira do Gás Natural e Fertilizantes com o projeto Sergipe Águas Profundas.',
    sectors: ['Gás Natural & Petróleo', 'Fertilizantes', 'Turismo Tranquilo & Gastronomia'],
    description: 'Capital organizada e segura, com grande expectativa de industrialização através dos megacampos de gás natural offshore.',
  },
];

const INTERIOR_CITIES = [
  { name: 'Sobral', state: 'CE', desc: 'Polo calçadista (Grendene) e referência educacional' },
  { name: 'Juazeiro do Norte', state: 'CE', desc: 'Polo comercial e religioso do Cariri' },
  { name: 'Feira de Santana', state: 'BA', desc: 'Maior entroncamento rodoviário e logístico do NE' },
  { name: 'Campina Grande', state: 'PB', desc: 'Polo tecnológico de software e Maior São João do Mundo' },
  { name: 'Caruaru', state: 'PE', desc: 'Capital do Agreste, polo têxtil e da moda' },
  { name: 'Petrolina', state: 'PE', desc: 'Vale do São Francisco, exportação mundial de uvas e vinhos' },
  { name: 'Mossoró', state: 'RN', desc: 'Polo petrolífero em terra e fruticultura irrigada' },
  { name: 'Imperatriz', state: 'MA', desc: 'Polo da celulose (Suzano) e agronegócio' },
  { name: 'Arapiraca', state: 'AL', desc: 'Capital do fumo e comércio dinâmico do Agreste alagoano' },
];

export const CapitalsOverviewModal: React.FC<CapitalsOverviewModalProps> = ({
  isOpen,
  onClose,
  onSelectCityFilter,
}) => {
  const [selectedStateTab, setSelectedStateTab] = useState<string>('TODAS');

  if (!isOpen) return null;

  const filteredCapitals = selectedStateTab === 'TODAS'
    ? CAPITALS_DATA
    : CAPITALS_DATA.filter((c) => c.state === selectedStateTab);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-orange-600/30 text-orange-400 border border-orange-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold">
                Panorama das 9 Capitais e Cidades do Nordeste
              </h2>
              <p className="text-xs text-slate-400">
                Indicadores econômicos, PIB, demografia e especialidades de cada polo
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

        {/* State tabs */}
        <div className="px-6 py-2.5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-700/80 flex items-center gap-2 overflow-x-auto text-xs scrollbar-none">
          <button
            onClick={() => setSelectedStateTab('TODAS')}
            className={`px-3 py-1.5 rounded-lg font-semibold shrink-0 transition-colors ${
              selectedStateTab === 'TODAS'
                ? 'bg-orange-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Todas as 9 Capitais
          </button>
          {CAPITALS_DATA.map((c) => (
            <button
              key={c.state}
              onClick={() => setSelectedStateTab(c.state)}
              className={`px-3 py-1.5 rounded-lg font-medium shrink-0 transition-colors ${
                selectedStateTab === c.state
                  ? 'bg-orange-600 text-white'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {c.name} ({c.state})
            </button>
          ))}
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Capitals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCapitals.map((cap) => (
              <div
                key={cap.name}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-orange-500/50 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-slate-900 dark:text-white">
                        {cap.name}
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-orange-100 dark:bg-orange-950/80 text-orange-700 dark:text-orange-400 border border-orange-200 dark:border-orange-800">
                        {cap.state}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      {cap.pib}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3 leading-relaxed">
                    {cap.description}
                  </p>

                  <div className="bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60 text-[11px] space-y-1 mb-3">
                    <div className="text-slate-700 dark:text-slate-200 font-medium">
                      <span className="text-slate-400 mr-1">Destaque:</span>
                      {cap.economicHighlight}
                    </div>
                    <div className="text-slate-500">
                      <span className="text-slate-400 mr-1">População:</span>
                      {cap.population} hab.
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-3">
                    {cap.sectors.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    onSelectCityFilter(cap.name, cap.state);
                    onClose();
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-orange-50 hover:bg-orange-600 text-orange-700 hover:text-white dark:bg-slate-700 dark:hover:bg-orange-600 dark:text-slate-200 dark:hover:text-white text-xs font-semibold transition-colors mt-2"
                >
                  <span>Ver notícias de {cap.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>

          {/* Polos do Interior do Nordeste */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Cidades Polo e Interior do Nordeste
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {INTERIOR_CITIES.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    onSelectCityFilter(city.name, city.state);
                    onClose();
                  }}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 text-left hover:border-orange-400 hover:bg-orange-50/20 dark:hover:bg-slate-800 transition-all group"
                >
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-orange-600">
                    <span>{city.name}</span>
                    <span className="text-[10px] text-slate-400">({city.state})</span>
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {city.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
