import type { Topic } from "@/types/catalog";

const CATEGORY_ID = "react-core";

export const reactCoreTopics: Topic[] = [
  {
    kind: "concept",
    id: "what-is-react",
    slug: "o-que-e-react",
    categoryId: CATEGORY_ID,
    title: "O que e o React",
    summary: "Biblioteca declarativa de UI, virtual DOM e reconciliacao.",
    howTo: [
      {
        type: "paragraph",
        text: "React e uma biblioteca para construir interfaces a partir de componentes: funcoes que recebem dados (props) e devolvem a descricao do que deve aparecer na tela. Voce descreve o resultado final (declarativo) em vez de dar os passos para chegar nele (imperativo).",
      },
      {
        type: "code",
        language: "ts",
        code: `// Imperativo: voce manipula o DOM passo a passo
const li = document.createElement("li");
li.textContent = task.title;
if (task.done) li.classList.add("done");
list.appendChild(li);

// Declarativo: voce descreve como a UI deve ser para este estado
const TaskItem = ({ task }: { task: Task }) => (
  <li className={task.done ? "done" : undefined}>{task.title}</li>
);`,
      },
      {
        type: "paragraph",
        text: "Quando o estado muda, o React chama seu componente de novo, compara a nova descricao com a anterior (reconciliacao) e aplica no DOM real apenas as diferencas. A descricao intermediaria e o que se chama de virtual DOM: objetos JavaScript leves, baratos de criar e comparar.",
      },
      {
        type: "callout",
        tone: "info",
        text: "React e uma biblioteca, nao um framework: ele cuida da renderizacao e nada mais. Roteamento, dados e formularios vem de fora. Frameworks como Next.js empacotam essas escolhas.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Um colega diz: 'o virtual DOM e mais rapido que o DOM'. Essa frase esta errada. Explique o que o virtual DOM realmente resolve e em que situacao manipular o DOM direto seria mais rapido.",
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "O virtual DOM e uma camada a mais, entao ele nunca e mais rapido que uma manipulacao direta e precisa do DOM. O que ele resolve e produtividade e correcao: voce escreve a UI como funcao do estado e o React descobre o menor conjunto de mudancas, evitando o bug classico de UI dessincronizada do dado. Manipulacao direta ganha quando voce sabe exatamente qual no mudar (uma animacao de 60 fps num unico elemento, por exemplo), e para isso o React oferece useRef como valvula de escape.",
      },
    ],
  },
  {
    kind: "concept",
    id: "jsx",
    slug: "jsx",
    categoryId: CATEGORY_ID,
    title: "JSX",
    summary:
      "Sintaxe, expressoes, condicionais, listas e o que vira JavaScript por baixo.",
    howTo: [
      {
        type: "paragraph",
        text: "JSX e uma extensao de sintaxe: parece HTML, mas e transformado em chamadas de funcao JavaScript no build. Como e JavaScript, dentro das chaves vai qualquer expressao, mas nao declaracoes (if, for). Por isso condicionais usam operador ternario ou && e listas usam map.",
      },
      {
        type: "code",
        language: "tsx",
        code: `const List = ({ items, title }: Props) => (
  <section>
    {/* expressao: qualquer coisa que produz um valor */}
    <h2>{title.toUpperCase()}</h2>

    {/* condicional: ternario para dois ramos, && para um */}
    {items.length === 0 ? <p>Vazio</p> : null}
    {items.length > 0 && <p>{items.length} itens</p>}

    {/* lista: map com key estavel (id), nunca o indice */}
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  </section>
);`,
      },
      {
        type: "paragraph",
        text: "Diferencas do HTML: className no lugar de class, htmlFor no lugar de for, atributos em camelCase (onClick, tabIndex), e style recebe um objeto. Um componente so pode devolver um no raiz; para agrupar sem criar div use o fragmento <>...</>.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "O operador && tem uma armadilha: {count && <p>...</p>} com count igual a 0 renderiza o 0 na tela, porque 0 e falsy mas e um valor renderizavel. Use count > 0 && ou o ternario.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "O componente abaixo mostra um '0' indesejado quando a lista esta vazia e o React avisa sobre keys no console. Corrija os dois problemas e explique por que usar o indice como key e um problema mesmo quando 'funciona'.",
      },
      {
        type: "code",
        language: "tsx",
        code: `const Cart = ({ items }: { items: Item[] }) => (
  <div>
    {items.length && <p>{items.length} itens</p>}
    {items.map((item, index) => (
      <CartRow item={item} key={index} />
    ))}
  </div>
);`,
      },
    ],
    answer: [
      {
        type: "code",
        language: "tsx",
        code: `const Cart = ({ items }: { items: Item[] }) => (
  <div>
    {items.length > 0 && <p>{items.length} itens</p>}
    {items.map((item) => (
      <CartRow item={item} key={item.id} />
    ))}
  </div>
);`,
      },
      {
        type: "paragraph",
        text: "A key e como o React identifica cada elemento entre renders. Com o indice, remover o primeiro item faz todos os outros mudarem de key: o React acha que cada linha virou outra, re-renderiza tudo e, pior, estado interno (um input digitado dentro de CartRow) fica na posicao errada. Com o id, cada linha mantem sua identidade.",
      },
    ],
  },
  {
    kind: "concept",
    id: "props-and-state",
    slug: "props-e-estado",
    categoryId: CATEGORY_ID,
    title: "Props e estado",
    summary:
      "Fluxo de dados unidirecional, imutabilidade e quando um valor vira estado.",
    howTo: [
      {
        type: "paragraph",
        text: "Props sao os dados que o pai passa ao filho; sao somente leitura. Estado e o dado que o proprio componente possui e pode mudar; mudar estado provoca re-render. O fluxo e sempre de cima para baixo: o pai decide, o filho recebe. Para o filho 'avisar' o pai, o pai passa uma funcao como prop (callback).",
      },
      {
        type: "code",
        language: "tsx",
        code: `const Parent = () => {
  const [count, setCount] = useState(0); // estado: pertence ao Parent
  return <Counter value={count} onIncrement={() => setCount((c) => c + 1)} />;
};

// Counter nao tem estado: so mostra e avisa. Facil de testar e reutilizar.
const Counter = ({ value, onIncrement }: CounterProps) => (
  <button onClick={onIncrement}>{value}</button>
);`,
      },
      {
        type: "paragraph",
        text: "Nem tudo precisa ser estado. Se um valor pode ser calculado a partir de props ou de outro estado, calcule no render em vez de guardar: guardar copia gera dessincronizacao. A pergunta e: 'este valor muda ao longo do tempo E nao pode ser derivado?'. So entao e estado.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "setCount(count + 1) duas vezes seguidas incrementa uma vez so, porque count e o valor do render atual. setCount((c) => c + 1) usa o valor mais recente. Sempre que o novo estado depende do anterior, use a forma de funcao.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "O componente abaixo tem um bug: ao mudar o filtro, a lista filtrada nao atualiza. Encontre a causa e corrija removendo estado desnecessario.",
      },
      {
        type: "code",
        language: "tsx",
        code: `const Products = ({ products }: { products: Product[] }) => {
  const [filter, setFilter] = useState("");
  const [visible, setVisible] = useState(products);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
    setVisible(products.filter((p) => p.name.includes(filter)));
  };

  return (
    <>
      <input value={filter} onChange={handleChange} />
      {visible.map((p) => <p key={p.id}>{p.name}</p>)}
    </>
  );
};`,
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "Dois problemas. O filtro usa a variavel filter do render atual, que ainda tem o valor antigo (setFilter nao muda a variavel na hora), entao a lista atrasa um caractere. E visible e estado derivado de products e filter: guardar isso e redundante e cria dessincronizacao quando products muda por fora. A correcao elimina visible e calcula no render.",
      },
      {
        type: "code",
        language: "tsx",
        code: `const Products = ({ products }: { products: Product[] }) => {
  const [filter, setFilter] = useState("");
  const visible = products.filter((p) => p.name.includes(filter));

  return (
    <>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {visible.map((p) => <p key={p.id}>{p.name}</p>)}
    </>
  );
};`,
      },
    ],
  },
  {
    kind: "concept",
    id: "hooks",
    slug: "hooks",
    categoryId: CATEGORY_ID,
    title: "Hooks",
    summary:
      "useState, useEffect, useMemo, useCallback, useRef e as regras dos hooks.",
    howTo: [
      {
        type: "paragraph",
        text: "Hooks sao funcoes que deixam um componente de funcao guardar estado e reagir ao ciclo de vida. O React identifica cada hook pela ORDEM em que e chamado, por isso eles precisam estar sempre no topo do componente, nunca dentro de if, loop ou funcao aninhada.",
      },
      {
        type: "code",
        language: "tsx",
        code: `const Counter = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = "Cliques: " + count;
  }, [count]); // roda de novo so quando count muda

  return <button onClick={() => setCount((c) => c + 1)}>{count}</button>;
};`,
      },
      {
        type: "paragraph",
        text: "useEffect e para sincronizar com algo FORA do React: titulo da pagina, timer, assinatura, requisicao. Nao e para 'reagir a mudanca de estado' calculando outro estado; isso se faz no render. useMemo guarda o resultado de um calculo caro entre renders; useCallback guarda a identidade de uma funcao, util quando ela e dependencia de outro hook ou prop de componente memoizado. useRef guarda um valor mutavel que NAO provoca re-render, e da acesso a elementos do DOM.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Todo efeito que cria algo (timer, listener, assinatura) deve devolver uma funcao de limpeza que desfaz. Sem isso, o componente desmonta e o timer continua rodando: vazamento de memoria e setState em componente desmontado.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "O componente abaixo quebra com o erro 'Rendered more hooks than during the previous render'. Explique por que e como corrigir sem mudar o comportamento.",
      },
      {
        type: "code",
        language: "tsx",
        code: `const Profile = ({ user }: { user?: User }) => {
  if (!user) return <p>Carregando...</p>;
  const [expanded, setExpanded] = useState(false);
  return <div onClick={() => setExpanded(!expanded)}>{user.name}</div>;
};`,
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "No primeiro render (sem user) o componente retorna antes de chamar useState: zero hooks. No render seguinte (com user) ele chama um hook. O React compara a contagem entre renders e acusa a diferenca. A correcao e mover o useState para antes do return condicional, para que a ordem de hooks seja identica em todo render.",
      },
      {
        type: "code",
        language: "tsx",
        code: `const Profile = ({ user }: { user?: User }) => {
  const [expanded, setExpanded] = useState(false);
  if (!user) return <p>Carregando...</p>;
  return <div onClick={() => setExpanded(!expanded)}>{user.name}</div>;
};`,
      },
    ],
  },
  {
    kind: "concept",
    id: "rendering-and-rerender",
    slug: "renderizacao-e-re-render",
    categoryId: CATEGORY_ID,
    title: "Renderizacao e re-render",
    summary:
      "O que dispara um render, por que filhos re-renderizam e quando memo ajuda.",
    howTo: [
      {
        type: "paragraph",
        text: "Render e o React chamando sua funcao de componente. Ele acontece na montagem e sempre que o estado do componente muda, quando o pai re-renderiza, ou quando um contexto consumido muda. Render nao e o mesmo que atualizar o DOM: o React so toca o DOM se a saida mudou.",
      },
      {
        type: "paragraph",
        text: "A regra que mais surpreende: quando um componente re-renderiza, TODOS os filhos re-renderizam, mesmo que as props nao tenham mudado. Isso e barato na maioria dos casos. So vira problema quando um filho e caro, e ai entra React.memo: ele pula o render se as props forem iguais (comparacao rasa).",
      },
      {
        type: "code",
        language: "tsx",
        code: `const ExpensiveList = memo(({ items, onSelect }: Props) => {
  // so re-renderiza se items ou onSelect mudarem de referencia
  return <ul>{items.map(/* ... */)}</ul>;
});

const Parent = () => {
  const [query, setQuery] = useState("");
  const [items] = useState(bigList);

  // Sem useCallback, onSelect e uma funcao NOVA a cada render do Parent,
  // a comparacao rasa do memo falha e ExpensiveList re-renderiza sempre.
  const onSelect = useCallback((id: string) => console.log(id), []);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ExpensiveList items={items} onSelect={onSelect} />
    </>
  );
};`,
      },
      {
        type: "callout",
        tone: "info",
        text: "Context re-renderiza todos os consumidores quando o valor muda. Por isso o ProgressProvider deste projeto usa useMemo no value e separa responsabilidades em contextos distintos: um contexto gigante com tudo dentro re-renderiza o app inteiro a cada mudanca.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Nao saia colocando memo e useCallback em tudo. Eles tem custo (comparacao e memoria) e so compensam quando o render evitado e mais caro que a comparacao. Meca com o React DevTools Profiler antes de otimizar.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "No codigo abaixo, digitar no input re-renderiza o Chart pesado a cada tecla, mesmo com memo. Explique por que o memo nao esta funcionando e corrija.",
      },
      {
        type: "code",
        language: "tsx",
        code: `const Chart = memo(({ data, options }: ChartProps) => { /* caro */ });

const Dashboard = ({ data }: { data: Point[] }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Chart data={data} options={{ animate: true }} />
    </>
  );
};`,
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "options={{ animate: true }} cria um objeto novo a cada render de Dashboard. O memo compara por referencia, ve um objeto diferente e re-renderiza. A correcao e dar identidade estavel ao objeto: fora do componente se for constante, ou com useMemo se depender de algo.",
      },
      {
        type: "code",
        language: "tsx",
        code: `const CHART_OPTIONS = { animate: true }; // mesma referencia sempre

const Dashboard = ({ data }: { data: Point[] }) => {
  const [search, setSearch] = useState("");
  return (
    <>
      <input value={search} onChange={(e) => setSearch(e.target.value)} />
      <Chart data={data} options={CHART_OPTIONS} />
    </>
  );
};`,
      },
    ],
  },
];
