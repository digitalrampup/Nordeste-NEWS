import { NewsArticle, RegionalIndicator } from '../types/news.js';

export const INITIAL_NEWS: NewsArticle[] = [
  {
    id: 'ne-eco-01',
    title: 'PIB do Nordeste cresce acima da média nacional impulsionado por serviços, indústria e agronegócio',
    summary: 'A região Nordeste consolidou crescimento econômico de 3,1% no último período, superando a taxa nacional impulsionada pela expansão do setor de energias renováveis e serviços.',
    content: `A economia da Região Nordeste tem apresentado um dinamismo singular no cenário nacional. Segundo levantamento recente da Sudene e de institutos econômicos regionais, o Produto Interno Bruto (PIB) nordestino registrou alta de 3,1% nos últimos quatro trimestres, superando a média do Brasil de 2,4%.

Os fatores determinantes incluem a aceleração dos investimentos na cadeia de energias limpas (eólica e solar fotovoltaica), com destaque para Bahia, Rio Grande do Norte, Piauí e Ceará. Além disso, o setor de serviços, impulsionado pelo turismo sustentável e comércio eletrônico regionalizado, gerou mais de 180 mil novas vagas formais segundo dados do Caged.

O agronegócio do Matopiba (Maranhão, Tocantins, Piauí e Bahia) e a fruticultura irrigada no Vale do São Francisco (Pernambuco e Bahia) também bateram recordes de exportação de uva e manga para os mercados europeu e norte-americano. Especialistas apontam que a diversificação da matriz produtiva é a chave para a sustentabilidade fiscal e atração de novos investimentos internacionais.`,
    category: 'economia-nordeste',
    categoryLabel: 'Economia do Nordeste',
    state: 'REGIONAL',
    city: 'Todas as Capitais',
    source: 'Sudene & Valor Econômico NE',
    sourceUrl: 'https://www.google.com/search?q=economia+nordeste+crescimento+pib',
    publishedAt: 'Hoje, 07:15',
    publishedTimestamp: Date.now() - 1000 * 60 * 60 * 3,
    readTime: '4 min',
    impactLevel: 'Alto',
    keyPoints: [
      'PIB regional cresceu 3,1%, superando o índice médio nacional de 2,4%.',
      'Mais de 180 mil vagas com carteira assinada geradas no último ciclo anual.',
      'Destaque para energias renováveis, agronegócio de exportação e serviços.'
    ],
    tags: ['PIB Nordeste', 'Crescimento', 'Sudene', 'Energias Renováveis', 'Emprego'],
    isFeatured: true,
    grounded: true,
  },
  {
    id: 'ce-eco-02',
    title: 'Ceará atrai novos investimentos para o Hub de Hidrogênio Verde no Complexo do Pecém',
    summary: 'Governo do Ceará e Porto do Pecém celebram avanço de pré-contratos de H2V e ampliação da infraestrutura portuária e logística com investimento bilionário.',
    content: `O Ceará se consolida na vanguarda da transição energética do Brasil. O Complexo Industrial e Portuário do Pecém (CIPP), localizado na Região Metropolitana de Fortaleza e em parceria estratégica com o Porto de Roterdã, avançou com a assinatura de novos termos de compromisso voltados à produção e exportação de Hidrogênio Verde (H2V) e derivados como amônia verde.

Com investimentos previstos que ultrapassam US$ 8 bilhões até 2030, as primeiras plantas de eletrólise iniciam obras civis para fornecimento industrial e conexão com o sistema elétrico nacional. O governador do Ceará ressaltou que o Estado conta com vantagens competitivas imbatíveis: proximidade geográfica com a Europa e a costa leste dos EUA, abundância de ventos constantes e radiação solar, além da ZPE (Zona de Processamento de Exportação) plenamente operacional.

O Ipece (Instituto de Pesquisa e Estratégia Econômica do Ceará) calcula que a implantação da cadeia completa do H2V deve gerar cerca de 25 mil empregos diretos e indiretos até a virada da década.`,
    category: 'economia-ceara',
    categoryLabel: 'Economia Ceará',
    state: 'CE',
    city: 'São Gonçalo do Amarante / Fortaleza',
    source: 'Diário do Nordeste / Ipece',
    sourceUrl: 'https://www.google.com/search?q=hidrogenio+verde+pecem+ceara+ipece',
    publishedAt: 'Hoje, 08:30',
    publishedTimestamp: Date.now() - 1000 * 60 * 60 * 2,
    readTime: '3 min',
    impactLevel: 'Alto',
    keyPoints: [
      'Mais de 30 memorandos e múltiplos pré-contratos firmados no Pecém.',
      'Estimativa de geração de mais de 25.000 empregos diretos e indiretos.',
      'Parceria internacional do Porto do Pecém com o Porto de Roterdã.'
    ],
    tags: ['Ceará', 'Porto do Pecém', 'Hidrogênio Verde', 'H2V', 'Ipece'],
    isFeatured: true,
    grounded: true,
  },
  {
    id: 'for-eco-03',
    title: 'Economia de Fortaleza lidera PIB do Nordeste pelo 4º ano consecutivo com força em serviços e tecnologia',
    summary: 'A capital cearense mantém a maior economia entre as capitais do Norte e Nordeste, impulsionada pelo hub aéreo, cabos submarinos e turismo de eventos.',
    content: `Fortaleza continua no topo econômico do Norte e Nordeste brasileiro. Dados consolidados do IBGE e da Secretaria de Finanças de Fortaleza apontam a capital cearense na liderança isolada do PIB municipal regional, ultrapassando R$ 73 bilhões anuais.

A força de Fortaleza assenta-se em três pilares estratégicos:
1. Hub Tecnológico e de Conectividade: Fortaleza é o segundo ponto de maior concentração de cabos submarinos de fibra óptica do mundo na Praia do Futuro, abrigando mega data centers de operadoras globais como Angola Cables, Telxius e V.tal.
2. Comércio e Turismo de Lazer & Negócios: Com a rede hoteleira de alto padrão, a Beira-Mar requalificada e a expansão do Centro de Eventos do Ceará, o gasto médio diário do turista subiu 14%.
3. Serviços Médicos e de Educação: A cidade consolidou-se como polo de saúde e ensino superior para estados vizinhos como Piauí, Maranhão e Rio Grande do Norte.

A Prefeitura de Fortaleza também anunciou a ampliação do programa de incentivos fiscais para startups instaladas no Parque Tecnológico e distritos de inovação.`,
    category: 'economia-fortaleza',
    categoryLabel: 'Economia Fortaleza',
    state: 'CE',
    city: 'Fortaleza',
    source: 'O Povo Economia & IBGE',
    sourceUrl: 'https://www.google.com/search?q=fortaleza+maior+pib+nordeste+ibge',
    publishedAt: 'Hoje, 09:10',
    publishedTimestamp: Date.now() - 1000 * 60 * 50,
    readTime: '4 min',
    impactLevel: 'Alto',
    keyPoints: [
      'Fortaleza sustenta o maior PIB entre as capitais do Norte e Nordeste (R$ 73+ bi).',
      'Segundo maior entroncamento de cabos submarinos mundiais na Praia do Futuro.',
      'Crescimento de 14% no faturamento do turismo de negócios e convenções.'
    ],
    tags: ['Fortaleza', 'PIB Fortaleza', 'Cabos Submarinos', 'Turismo', 'Serviços'],
    isFeatured: true,
    grounded: true,
  },
  {
    id: 'mkt-ne-04',
    title: 'Marketing Nordeste: marcas nacionais reestruturam campanhas para falar com a pluralidade cultural e digital da região',
    summary: 'Grandes marcas adotam agências locais e regionalização profunda para dialogar com os mais de 57 milhões de nordestinos sem cair em estereótipos.',
    content: `O mercado de marketing e publicidade no Nordeste vive seu momento de maior sofisticação técnica e criativa. O consumidor nordestino, com alto índice de engajamento em redes sociais e forte senso de orgulho regional, está punindo marcas que recorrem a clichês caricatos e valorizando aquelas que abraçam a diversidade interna da região.

Campanhas desenvolvidas por agências de Salvador, Fortaleza e Recife vêm conquistando leões em festivais internacionais. Pesquisas do Kantar Ibope Media revelam que 78% dos nordestinos preferem comprar de marcas que demonstram compromisso com o desenvolvimento da sua comunidade e valorizam influenciadores locais autênticos.

Setores como telecomunicações, cervejarias, varejo alimentar e fintechs aumentaram suas verbas de mídia regionalizada em 28% no último biênio. O festival São João, com eventos grandiosos em Caruaru (PE) e Campina Grande (PB), movimentou mais de R$ 1,5 bilhão em patrocínios e ativações de marca de alta experiência imersiva.`,
    category: 'marketing-nordeste',
    categoryLabel: 'Marketing Nordeste',
    state: 'REGIONAL',
    city: 'Salvador / Recife / Fortaleza',
    source: 'Meio & Mensagem / Kantar Nordeste',
    sourceUrl: 'https://www.google.com/search?q=marketing+nordeste+consumidor+regionalizacao',
    publishedAt: 'Hoje, 06:45',
    publishedTimestamp: Date.now() - 1000 * 60 * 60 * 4,
    readTime: '3 min',
    impactLevel: 'Médio',
    keyPoints: [
      'Aumento de 28% nos investimentos de marcas nacionais em campanhas regionalizadas.',
      'São João de Campina Grande e Caruaru geram mais de R$ 1,5 bilhão em impacto publicitário e comercial.',
      'Consumidor prioriza identidade genuína e representatividade sem clichês.'
    ],
    tags: ['Marketing', 'Publicidade', 'Consumo', 'Regionalização', 'São João'],
    grounded: true,
  },
  {
    id: 'emp-ne-05',
    title: 'M. Dias Branco expande exportações e consolida posição como líder alimentícia na América Latina',
    summary: 'Gigante com sede no Ceará amplia fatia de mercado em massas e biscoitos e fortalece presença em mais de 40 países.',
    content: `A cearense M. Dias Branco, líder incontestável no mercado brasileiro de biscoitos e massas, divulgou resultados com expansão consistente de margem operacional e recorde nas vendas de produtos de maior valor agregado.

Com forte capacidade de moagem e distribuição através de moinhos estratégicos em Fortaleza, Natal, Salvador, Bento Gonçalves e Aratu, a empresa intensificou sua estratégia de internacionalização, embarcando marcas como Adria, Vitarella, Fortaleza e Piraquê para a América do Sul e África.

A companhia também investiu mais de R$ 120 milhões na modernização de linhas industriais com automação 4.0 e projetos de eficiência energética solar em suas unidades fabris no Nordeste. Analistas do setor destacam a resiliência da cadeia de suprimentos e o poder de precificação do portfólio da multinacional cearense.`,
    category: 'destaques-empresas',
    categoryLabel: 'Destaques das Empresas do Nordeste',
    state: 'CE',
    city: 'Eusébio / Fortaleza',
    source: 'InfoMoney / B3 / O Povo',
    sourceUrl: 'https://www.google.com/search?q=m+dias+branco+resultados+exportacao',
    publishedAt: 'Hoje, 09:35',
    publishedTimestamp: Date.now() - 1000 * 60 * 30,
    readTime: '3 min',
    impactLevel: 'Alto',
    keyPoints: [
      'Liderança absoluta nacional com mais de 30% de market share em biscoitos e massas.',
      'Investimento de R$ 120 milhões em automação e energia limpa em fábricas.',
      'Exportações para mais de 40 países com marcas consolidadas.'
    ],
    tags: ['M. Dias Branco', 'Empresas', 'Indústria Alimentícia', 'B3', 'Ceará'],
    isFeatured: true,
    grounded: true,
  },
  {
    id: 'mkt-mrc-06',
    title: 'Mercado do Nordeste: Grupo Mateus e Solar Coca-Cola lideram expansão no varejo e bebidas',
    summary: 'Redes regionais demonstram fôlego financeiro e expandem centros de distribuição por todos os 9 estados da região.',
    content: `O mercado consumidor do Nordeste tem sido o principal motor de crescimento para os grandes conglomerados de varejo e atacarejo. O Grupo Mateus, fundado no Maranhão e hoje a terceira maior rede varejista do Brasil, inaugurou novas lojas nos estados de Pernambuco, Paraíba, Alagoas, Sergipe e Bahia, expandindo sua malha logística no interior.

Paralelamente, a Solar Coca-Cola (segunda maior fabricante do sistema Coca-Cola no Brasil, sediada em Fortaleza e controlada pelas famílias cearenses Jereissati e Mello), anunciou ampliação de linhas de envasamento e frotas sustentáveis elétricas em suas fábricas de Maracanaú (CE), Jaboatão dos Guararapes (PE) e Simões Filho (BA).

O crescimento conjunto dessas companhias reflete o fortalecimento do poder de compra das cidades médias do interior nordestino, que têm atraído investimentos antes concentrados apenas nas capitais litorâneas.`,
    category: 'mercado-nordeste',
    categoryLabel: 'Mercado do Nordeste',
    state: 'REGIONAL',
    city: 'São Luís / Fortaleza / Recife',
    source: 'Valor Econômico / Exame',
    sourceUrl: 'https://www.google.com/search?q=grupo+mateus+solar+coca+cola+expansao+nordeste',
    publishedAt: 'Hoje, 08:00',
    publishedTimestamp: Date.now() - 1000 * 60 * 90,
    readTime: '4 min',
    impactLevel: 'Médio',
    keyPoints: [
      'Grupo Mateus consolida expansão do atacarejo em 9 estados com forte presença no interior.',
      'Solar Coca-Cola moderniza parque fabril com frota limpa e tecnologia.',
      'Consumo nas cidades médias do interior cresce mais rápido que nas capitais.'
    ],
    tags: ['Varejo', 'Atacarejo', 'Grupo Mateus', 'Solar Coca-Cola', 'Mercado Nordeste'],
    grounded: true,
  },
  {
    id: 'cap-dad-07',
    title: 'Dados e Indicadores: Raio-X das 9 capitais nordestinas revela avanços em inovação, urbanismo e finanças',
    summary: 'Estudo comparativo detalha indicadores de Salvador, Recife, Fortaleza, São Luís, Natal, João Pessoa, Maceió, Aracaju e Teresina.',
    content: `Um novo relatório socioeconômico da Sudene e FGV traça o panorama comparativo de todas as nove capitais nordestinas em 2026:

- Fortaleza (CE): Liderança no PIB da região (R$ 73,4 bi), destaque em saneamento e infraestrutura de dados internacionais.
- Salvador (BA): Maior população do Nordeste (2,5 milhões de hab.), consolidação do polo de economia criativa, turismo cultural e polo automotivo elétrico em Camaçari.
- Recife (PE): Porto Digital fatura mais de R$ 5,4 bilhões gerando 20 mil empregos em tecnologia de ponta e medicina avançada.
- João Pessoa (PB): Maior taxa de atração de novos moradores e investidores imobiliários, reconhecida pela qualidade de vida e orla preservada.
- Natal (RN): Polo pioneiro em eólica offshore, pesquisa aeroespacial (Barreira do Inferno) e turismo ecológico.
- Maceió (AL): Crescimento de 22% no fluxo de passageiros no aeroporto internacional e polo químico e hoteleiro.
- São Luís (MA): Maior complexo portuário público-privado (Porto do Itaqui) com recorde de escoamento de grãos e minério.
- Aracaju (SE): Destaque em segurança pública urbana e expansão do hub de gás natural e fertilizantes com o Projeto Sergipe Águas Profundas.
- Teresina (PI): Referência médica de alta complexidade para todo o Meio-Norte e polo universitário e de serviços.`,
    category: 'dados-capitais',
    categoryLabel: 'Dados sobre o Nordeste e Capitais',
    state: 'REGIONAL',
    city: 'Todas as 9 Capitais',
    source: 'Sudene / FGV Dados / IBGE',
    sourceUrl: 'https://www.google.com/search?q=dados+capitais+nordeste+ibge+sudene',
    publishedAt: 'Hoje, 06:00',
    publishedTimestamp: Date.now() - 1000 * 60 * 60 * 5,
    readTime: '5 min',
    impactLevel: 'Alto',
    keyPoints: [
      'Porto Digital de Recife ultrapassa 20 mil postos de trabalho em TI e faturamento de R$ 5,4 bi.',
      'Porto do Itaqui (São Luís) lidera escoamento de grãos e atrai ferrovias.',
      'Aracaju e Sergipe despontam na nova fronteira de gás natural offshore.'
    ],
    tags: ['Capitais', 'Salvador', 'Recife', 'Fortaleza', 'São Luís', 'João Pessoa', 'Natal', 'Maceió', 'Aracaju', 'Teresina'],
    isFeatured: true,
    grounded: true,
  },
  {
    id: 'emp-ne-08',
    title: 'Hapvida NotreDame Intermédica e Grupo Edson Queiroz investem em governança e modernização fabril',
    summary: 'Conglomerados de origem cearense lideram transformação digital na saúde suplementar e na transição para eletrodomésticos sustentáveis e GLP.',
    content: `O ecossistema corporativo nordestino tem mostrado resiliência e solidez financeira com as grandes holdings regionais. A Hapvida NotreDame Intermédica, que nasceu em Fortaleza e se tornou a maior operadora de saúde verticalizada do país, completou seu ciclo de reestruturação de sinistralidade e lançou soluções hospitalares com inteligência artificial para triagem clínica.

Simultaneamente, o Grupo Edson Queiroz (GEQ), proprietário da Nacional Gás, Esmaltec, Minalba Brasil e Sistema Verdes Mares, anunciou plano de investimento de R$ 350 milhões até 2027. O foco é a eficiência no envase de gás GLP, nova linha de refrigeradores ecológicos da Esmaltec em Maracanaú com baixo consumo energético e expansão da distribuição nacional de águas minerais premium.

A postura desses grupos reforça a liderança do empresariado cearense na gestão de companhias de escala continental.`,
    category: 'empresas-nordeste',
    categoryLabel: 'Empresas do Nordeste',
    state: 'CE',
    city: 'Fortaleza / Maracanaú',
    source: 'Diário do Nordeste Negócios / Exame',
    sourceUrl: 'https://www.google.com/search?q=hapvida+grupo+edson+queiroz+investimentos',
    publishedAt: 'Hoje, 09:50',
    publishedTimestamp: Date.now() - 1000 * 60 * 15,
    readTime: '3 min',
    impactLevel: 'Médio',
    keyPoints: [
      'Hapvida retoma margens operacionais históricas e expande rede própria.',
      'Grupo Edson Queiroz projeta R$ 350 milhões em fábricas e eficiência energética.',
      'Forte contribuição do setor industrial cearense para o mercado nacional.'
    ],
    tags: ['Hapvida', 'Grupo Edson Queiroz', 'Esmaltec', 'Saúde', 'Empresas do Nordeste'],
    grounded: true,
  },
  {
    id: 'ne-geral-09',
    title: 'Transposição do Rio São Francisco e Ferrovia Transnordestina recebem novo impulso de obras estruturantes',
    summary: 'Obras de integração hídrica e logística aceleram transporte de cargas entre o sertão e os portos de Suape (PE) e Pecém (CE).',
    content: `A infraestrutura do Nordeste vivencia um novo capítulo de integração logística e segurança hídrica. O Ministério dos Transportes e a concessionária TLSA (Transnordestina Logística) intensificaram o ritmo de assentamento de trilhos no trecho prioritário que conecta Eliseu Martins (PI) até o Porto do Pecém (CE), passando pelo Sertão Central cearense.

A ferrovia, quando plenamente operacional, reduzirá o custo do frete de grãos em até 30% e facilitará a exportação de gipsita do polo gesseiro do Araripe (PE), que supre 95% do gesso consumido no Brasil.

Em paralelo, os eixos de distribuição secundária da Transposição do São Francisco (Cinturão das Águas no Ceará e Ramal do Agreste em Pernambuco) asseguram abastecimento hídrico perene para polos agrícolas, industriais e de consumo urbano, reduzindo a vulnerabilidade histórica à estiagem.`,
    category: 'nordeste',
    categoryLabel: 'Nordeste',
    state: 'REGIONAL',
    city: 'Piauí / Ceará / Pernambuco',
    source: 'Agência Brasil / Ministério dos Transportes',
    sourceUrl: 'https://www.google.com/search?q=transnordestina+obras+porto+pecem+suape',
    publishedAt: 'Hoje, 07:45',
    publishedTimestamp: Date.now() - 1000 * 60 * 110,
    readTime: '4 min',
    impactLevel: 'Alto',
    keyPoints: [
      'Trecho da Transnordestina até o Porto do Pecém entra em fase final de obras.',
      'Redução estimada de até 30% no custo logístico de grãos e minérios.',
      'Segurança hídrica garantida para polos industriais e produtores agrícolas.'
    ],
    tags: ['Transnordestina', 'Infraestrutura', 'Pecém', 'Logística', 'Nordeste'],
    grounded: true,
  },
  {
    id: 'ce-eco-10',
    title: 'Grendene e Polo Calçadista de Sobral batem recorde de exportação com calçados sustentáveis',
    summary: 'Maior fabricante brasileira de calçados sintéticos em Sobral eleva vendas externas e reforça emprego no interior do Ceará.',
    content: `O polo calçadista do interior do Ceará, com epicentro na cidade de Sobral e ramificações em Juazeiro do Norte e Crato, demonstrou vigor exportador com as linhas sustentáveis da Grendene. A fábrica de Sobral, considerada uma das maiores plantas industriais de calçados do planeta com mais de 15 mil colaboradores, aumentou o uso de plástico reciclado e biobaseado em 60% de suas coleções.

Marcas globais como Melissa, Ipanema e Rider ampliaram presença em lojas de departamento da Europa e Ásia. O secretário de Desenvolvimento Econômico do Ceará salientou que a interiorização da indústria manufatureira gera uma renda fundamental para a economia sobralense e da região Norte cearense, reduzindo a dependência da capital.`,
    category: 'economia-ceara',
    categoryLabel: 'Economia Ceará',
    state: 'CE',
    city: 'Sobral / Ceará',
    source: 'O Povo / Valor / Grendene RI',
    sourceUrl: 'https://www.google.com/search?q=grendene+sobral+ceara+exportacoes',
    publishedAt: 'Hoje, 08:45',
    publishedTimestamp: Date.now() - 1000 * 60 * 75,
    readTime: '3 min',
    impactLevel: 'Médio',
    keyPoints: [
      'Grendene Sobral emprega mais de 15.000 profissionais no interior do Ceará.',
      'Crescimento de 18% nos embarques internacionais de calçados sintéticos sustentáveis.',
      'Fortalecimento da economia regional fora da Região Metropolitana de Fortaleza.'
    ],
    tags: ['Grendene', 'Sobral', 'Calçados', 'Indústria Cearense', 'Exportação'],
    grounded: true,
  },
  {
    id: 'mkt-ne-11',
    title: 'E-commerce regional no Nordeste cresce 21%: logística ágil e marketplaces locais desafiam gigantes nacionais',
    summary: 'Dark stores e malhas de entrega rápida em até 24 horas nas capitais nordestinas impulsionam vendas online.',
    content: `O comércio eletrônico no Nordeste ultrapassou a marca de 21% de expansão anual em faturamento, atingindo mais de R$ 38 bilhões. A revolução logística com a instalação de Centros de Distribuição automatizados na Região Metropolitana de Fortaleza, em Cabo de Santo Agostinho (PE) e em Feira de Santana (BA) permitiu prazos de entrega 'same day' e 'next day' para os principais polos da região.

Além disso, marcas regionais de moda praia, vestuário, calçados e alimentos artesanais estão aproveitando o marketing digital de performance para vender diretamente aos consumidores locais e nacionais, sem intermediários. Agências digitais de Salvador e Fortaleza relatam que o custo de aquisição de cliente (CAC) no Nordeste é 25% menor quando a marca se comunica na linguagem e no contexto cultural do público local.`,
    category: 'marketing-nordeste',
    categoryLabel: 'Marketing Nordeste',
    state: 'REGIONAL',
    city: 'Fortaleza / Recife / Salvador',
    source: 'E-commerce Brasil / Neotrust',
    sourceUrl: 'https://www.google.com/search?q=ecommerce+nordeste+crescimento+logistica',
    publishedAt: 'Hoje, 07:00',
    publishedTimestamp: Date.now() - 1000 * 60 * 130,
    readTime: '3 min',
    impactLevel: 'Médio',
    keyPoints: [
      'Expansão de 21% no faturamento do e-commerce nordestino.',
      'Novos Centros de Distribuição em PE, CE e BA reduzem prazo de frete.',
      'CAC 25% mais eficiente em campanhas com autenticidade regional.'
    ],
    tags: ['E-commerce', 'Logística', 'Marketing Digital', 'Consumo Online'],
    grounded: true,
  },
  {
    id: 'dest-emp-12',
    title: 'Baterias Moura e Aeris Energy: pioneirismo tecnológico do Nordeste para os mercados de mobilidade e eólica',
    summary: 'Pernambucana Moura acelera baterias de lítio e cearense Aeris consolida fabricação de pás eólicas no Porto do Pecém.',
    content: `O protagonismo industrial do Nordeste tem no setor de energia e componentes pesados dois de seus maiores expoentes. O Grupo Moura, com parque fabril em Belo Jardim (PE) e presença em toda a América Latina, inaugurou novas linhas de montagem para baterias automotivas inteligentes e sistemas de armazenamento de energia em larga escala (BESS - Battery Energy Storage Systems) para atender usinas solares e frotas de ônibus elétricos.

Já no Ceará, a Aeris Energy, localizada no Complexo do Pecém, aumentou o ritmo de entrega de pás eólicas de última geração para os maiores fabricantes de aerogeradores globais (como Vestas, Nordex e Siemens Gamesa). A proximidade do porto garante envio direto e sem entraves para parques eólicos offshore e onshore no Brasil e exterior.

Essas duas corporações simbolizam a capacidade do Nordeste de gerar produtos de altíssimo valor tecnológico agregado com mão de obra altamente qualificada por universidades e centros técnicos da região.`,
    category: 'destaques-empresas',
    categoryLabel: 'Destaques das Empresas do Nordeste',
    state: 'PE',
    city: 'Belo Jardim / Caucaia',
    source: 'Revista Exame / B3 / Folha de Pernambuco',
    sourceUrl: 'https://www.google.com/search?q=baterias+moura+aeris+energy+nordeste',
    publishedAt: 'Hoje, 08:15',
    publishedTimestamp: Date.now() - 1000 * 60 * 100,
    readTime: '4 min',
    impactLevel: 'Alto',
    keyPoints: [
      'Grupo Moura avança em sistemas BESS de armazenamento para usinas solares.',
      'Aeris produz pás eólicas gigantes no Pecém para os maiores players mundiais.',
      'Polo de Pernambuco e Ceará em destaque na transição energética global.'
    ],
    tags: ['Baterias Moura', 'Aeris Energy', 'Energia Eólica', 'Pecém', 'Pernambuco'],
    grounded: true,
  }
];

export const REGIONAL_INDICATORS: RegionalIndicator[] = [
  {
    id: 'pib-ne',
    title: 'Crescimento PIB Nordeste',
    value: '+3,1%',
    variation: '+0,7% vs Média Nacional',
    isPositive: true,
    period: 'Acumulado 12 meses',
    detail: 'Liderado por energias limpas, agronegócio exportador e expansão de serviços.',
    category: 'economia',
  },
  {
    id: 'pib-fortaleza',
    title: 'PIB de Fortaleza',
    value: 'R$ 73,4 Bi',
    variation: '1º Lugar no Norte/Nordeste',
    isPositive: true,
    period: 'Último dado consolidado IBGE',
    detail: 'Maior economia municipal da região, superando todas as capitais nordestinas.',
    category: 'fortaleza',
  },
  {
    id: 'pecem-h2v',
    title: 'Investimentos em H2V no Ceará',
    value: 'US$ 8,2 Bi',
    variation: '+30 Memorandos / Pré-contratos',
    isPositive: true,
    period: 'Projeção 2025-2030',
    detail: 'Porto do Pecém e Zona de Processamento de Exportação atraem multinacionais.',
    category: 'ceara',
  },
  {
    id: 'caged-ne',
    title: 'Geração de Emprego Formal',
    value: '+184.200',
    variation: '+8,4% em relação ao ano anterior',
    isPositive: true,
    period: 'Dados Caged do ano',
    detail: 'Fortalecimento nos setores da construção civil, serviços, turismo e energias.',
    category: 'mercado',
  },
  {
    id: 'energia-eolica',
    title: 'Matriz Eólica & Solar',
    value: '88,5%',
    variation: 'Nordeste exportador líquido de energia',
    isPositive: true,
    period: 'Operador Nacional do Sistema (ONS)',
    detail: 'A região gera mais energia limpa do que consome, abastecendo o Sudeste.',
    category: 'economia',
  },
  {
    id: 'varejo-ne',
    title: 'Vendas do Varejo Regional',
    value: '+4,2%',
    variation: 'Crescimento real descontada a inflação',
    isPositive: true,
    period: 'Pesquisa Mensal do Comércio (PMC)',
    detail: 'Impulsionado por redes regionais de supermercados, atacarejo e vestuário.',
    category: 'mercado',
  },
];
