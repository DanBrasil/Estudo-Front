import type { Topic } from "@/types/catalog";

const CATEGORY_ID = "react-ecosystem";

export const reactEcosystemTopics: Topic[] = [
  {
    kind: "concept",
    id: "state-management",
    slug: "gerenciamento-de-estado",
    categoryId: CATEGORY_ID,
    title: "Gerenciamento de estado",
    summary: "Context API, useReducer, Redux e quando cada um faz sentido.",
    howTo: [
      {
        type: "paragraph",
        text: "A primeira ferramenta e sempre useState no componente que precisa do dado. Quando dois componentes irmaos precisam do mesmo estado, ele sobe para o pai comum (lifting state up). Quando o estado precisa atravessar muitos niveis, passar props vira ruido (prop drilling) e a Context API entra: um Provider disponibiliza o valor e qualquer descendente le com useContext.",
      },
      {
        type: "paragraph",
        text: "useReducer organiza estado com muitas transicoes: em vez de varios setState espalhados, uma funcao pura (reducer) recebe o estado e uma acao e devolve o proximo estado. Context + useReducer e o que este projeto usa para o progresso, e e exatamente o modelo mental do Redux.",
      },
      {
        type: "code",
        language: "tsx",
        code: `// A mesma ideia nos dois mundos
// useReducer (React puro)
const [state, dispatch] = useReducer(reducer, initial);
dispatch({ type: "setStatus", topicId, status });

// Redux Toolkit
const store = configureStore({ reducer: { progress: progressSlice.reducer } });
dispatch(setStatus({ topicId, status }));`,
      },
      {
        type: "paragraph",
        text: "Redux (hoje via Redux Toolkit) adiciona o que o Context nao tem: um store unico fora da arvore, DevTools com historico de acoes, middlewares, e re-render seletivo (useSelector so re-renderiza quem usa a fatia que mudou). Compensa em apps grandes com muito estado compartilhado. Para estado de servidor (dados de API), bibliotecas como TanStack Query resolvem cache, loading e refetch melhor que qualquer uma das opcoes acima.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Pergunta de entrevista frequente: 'Context substitui Redux?'. Resposta curta: Context e um mecanismo de injecao de dependencia, nao de gerenciamento de estado; ele nao otimiza re-render. Para estado pequeno e pouco frequente, sim; para estado grande e frequente, nao.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Um app tem um Context unico com { user, theme, cart, notifications } no mesmo value. Ao adicionar um item ao carrinho, o header (que so usa theme) re-renderiza. Explique por que e proponha a reestruturacao.",
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "Todo consumidor de um Context re-renderiza quando o value muda de referencia, e o value muda sempre que qualquer campo muda. O header consome o contexto para ler theme, entao mudar cart tambem o re-renderiza. A reestruturacao e dividir por taxa de mudanca e responsabilidade: ThemeContext (quase nunca muda), UserContext, CartContext (muda muito). Cada componente consome so o que precisa. Se cart for muito frequente e consumido em varios lugares, e o candidato a Redux ou Zustand.",
      },
    ],
  },
  {
    kind: "concept",
    id: "routing",
    slug: "roteamento",
    categoryId: CATEGORY_ID,
    title: "Roteamento",
    summary:
      "Rotas declarativas, parametros, rotas aninhadas e navegacao programatica.",
    howTo: [
      {
        type: "paragraph",
        text: "Numa SPA existe um HTML so; o roteador le a URL e decide qual componente renderizar, sem recarregar a pagina. O react-router faz isso de forma declarativa: um mapa de caminho para elemento.",
      },
      {
        type: "code",
        language: "tsx",
        code: `<BrowserRouter>
  <Routes>
    {/* rota de layout: AppLayout renderiza <Outlet /> onde a filha entra */}
    <Route element={<AppLayout />}>
      <Route path="/" element={<HomePage />} />
      <Route path="/categoria/:categorySlug" element={<CategoryPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
</BrowserRouter>

// Dentro de CategoryPage: le o parametro da URL
const { categorySlug } = useParams();

// Navegacao: <Link to="..."> para o usuario, useNavigate() para codigo
const navigate = useNavigate();
navigate("/categoria/react-essencial");`,
      },
      {
        type: "paragraph",
        text: "Duas praticas que evitam dor: centralizar os caminhos em constantes com funcoes builder (nenhum componente escreve a string da rota), e tratar 'nao encontrado' como um caso normal, com uma pagina 404 dentro do layout. Em producao, o servidor precisa devolver o index.html para qualquer caminho (fallback de SPA), senao o F5 numa rota interna da 404 do servidor.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Este projeto centraliza rotas em src/app/routes.ts com routes e buildTopicPath. Repare que o teste de rotas garante que os builders batem com os padroes.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Um usuario reporta: 'quando aperto F5 na pagina de um topico, aparece 404 do servidor; mas navegando pelo app funciona'. Explique a causa e a solucao, e diga por que isso nao acontece no npm run dev.",
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "Navegando pelo app, a URL muda via History API sem pedir nada ao servidor. No F5 o navegador pede /categoria/x/y ao servidor, que procura um arquivo nesse caminho e nao encontra. A solucao e configurar o servidor (nginx, Vercel, Netlify) para devolver index.html em qualquer rota desconhecida; o roteador entao le a URL e renderiza a pagina certa. O servidor de desenvolvimento do Vite ja faz esse fallback, por isso o problema so aparece em producao.",
      },
    ],
  },
  {
    kind: "concept",
    id: "frameworks",
    slug: "frameworks",
    categoryId: CATEGORY_ID,
    title: "Frameworks sobre React",
    summary:
      "Next.js, Remix e o que adicionam: SSR, rotas por arquivo, server components.",
    howTo: [
      {
        type: "paragraph",
        text: "React puro com Vite gera uma SPA: o HTML chega vazio e o JavaScript monta tudo no navegador. Frameworks como Next.js e Remix adicionam renderizacao no servidor (SSR): o HTML chega pronto, o usuario ve conteudo antes do JavaScript carregar, e buscadores indexam a pagina. Depois o React 'hidrata' o HTML, ligando os eventos.",
      },
      {
        type: "paragraph",
        text: "Eles tambem trazem roteamento por sistema de arquivos (a pasta app/blog/[slug]/page.tsx vira a rota /blog/:slug), carregamento de dados integrado a rota, e otimizacoes de imagem e fonte. O Next.js adiciona Server Components: componentes que rodam so no servidor, acessam banco de dados direto e nao mandam JavaScript para o cliente.",
      },
      {
        type: "code",
        language: "tsx",
        code: `// Next.js App Router: Server Component (roda no servidor, sem useState)
export default async function TopicPage({ params }: { params: { slug: string } }) {
  const topic = await db.topics.findBySlug(params.slug); // acesso direto
  return <Article topic={topic} />;
}

// Componente interativo precisa da diretiva
"use client";
export const RevealButton = () => {
  const [open, setOpen] = useState(false);
  /* ... */
};`,
      },
      {
        type: "callout",
        tone: "info",
        text: "Quando usar: conteudo publico que precisa de SEO e primeira carga rapida (sites, e-commerce, blogs). Quando nao precisa: app interno atras de login, dashboards, ferramentas, onde SPA com Vite e mais simples de hospedar e de manter.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Este projeto (EstudoFront) deveria migrar para Next.js? Argumente os dois lados considerando: quem usa, onde e hospedado, o que ganha e o que perde.",
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "A favor: conteudo de estudo e publico e textual, exatamente o que SEO e SSR favorecem; se o objetivo for outras pessoas encontrarem os topicos pelo Google, Next.js entrega isso. Contra: hoje o app e local, de uma pessoa, com dados estaticos e progresso no localStorage; SSR nao traz beneficio para esse uso e adiciona servidor Node, build mais complexa e a distincao server/client component para aprender. A resposta honesta: nao agora; migrar quando existir a necessidade de publicar para outros. E um bom exercicio ter argumentos dos dois lados prontos para uma entrevista.",
      },
    ],
  },
];
