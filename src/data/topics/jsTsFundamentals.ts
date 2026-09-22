import type { Topic } from "@/types/catalog";

const CATEGORY_ID = "js-ts-fundamentals";

export const jsTsFundamentalsTopics: Topic[] = [
  {
    kind: "concept",
    id: "es6-features",
    slug: "recursos-es6",
    categoryId: CATEGORY_ID,
    title: "Recursos do ES6+",
    summary:
      "let/const, arrow functions, destructuring, spread, modulos, template strings.",
    howTo: [
      {
        type: "paragraph",
        text: "ES6 (2015) e a versao que transformou JavaScript na linguagem que se usa hoje. Os recursos abaixo aparecem em praticamente toda linha de codigo React.",
      },
      {
        type: "code",
        language: "ts",
        code: `// Arrow function: sintaxe curta e "this" lexico (herda do escopo)
const double = (n: number) => n * 2;

// Destructuring: extrai campos de objetos e arrays
const { name, age = 0 } = user; // com valor padrao
const [first, ...rest] = list; // rest junta o restante

// Spread: copia rasa de objeto/array, base da imutabilidade
const updated = { ...user, age: 30 };
const merged = [...listA, ...listB];

// Template string: interpolacao e multiplas linhas
const greeting = "Ola, " + name; // antes
const greeting2 = \`Ola, \${name}\`; // depois

// Optional chaining e nullish coalescing (ES2020)
const city = user.address?.city ?? "Nao informada";`,
      },
      {
        type: "paragraph",
        text: "Modulos ES (import/export) substituem require. Cada arquivo e um escopo proprio; so o que e exportado fica visivel. Prefira exports nomeados a default: renomear e refatorar fica mais seguro e o autocomplete funciona melhor.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Spread faz copia RASA: { ...user } copia a referencia de user.address, nao o objeto. Alterar updated.address.city altera o original tambem. Para aninhados, espalhe cada nivel ou use structuredClone.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Sem executar, diga o que e impresso e por que.",
      },
      {
        type: "code",
        language: "js",
        code: `const original = { name: "Ana", tags: ["a"] };
const copy = { ...original };
copy.name = "Bia";
copy.tags.push("b");
console.log(original.name, original.tags);`,
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "Imprime Ana ['a', 'b']. name e uma string (valor primitivo), entao a copia e independente e original.name continua Ana. tags e um array (referencia), e o spread copiou a referencia, nao o array: copy.tags e original.tags sao o MESMO array, e o push aparece nos dois.",
      },
    ],
  },
  {
    kind: "concept",
    id: "asynchronism",
    slug: "assincronismo",
    categoryId: CATEGORY_ID,
    title: "Assincronismo",
    summary:
      "Event loop, callbacks, Promises, async/await e tratamento de erro.",
    howTo: [
      {
        type: "paragraph",
        text: "JavaScript executa em uma thread so. Operacoes demoradas (rede, timer, disco) nao bloqueiam: elas sao entregues ao ambiente, e quando terminam o resultado entra numa fila. O event loop pega itens dessa fila e executa quando a pilha principal esta vazia. Por isso um setTimeout de 0 ms roda DEPOIS do codigo sincrono que vem depois dele.",
      },
      {
        type: "code",
        language: "ts",
        code: `console.log("1");
setTimeout(() => console.log("2"), 0);
Promise.resolve().then(() => console.log("3"));
console.log("4");
// Saida: 1, 4, 3, 2
// Promises (microtasks) tem prioridade sobre timers (macrotasks)`,
      },
      {
        type: "paragraph",
        text: "Promise e um objeto que representa um valor futuro: pendente, resolvido ou rejeitado. async/await e acucar sintatico sobre Promises: await pausa a funcao async ate a Promise resolver, sem bloquear a thread. Erro em Promise e rejeicao; com await, vira excecao e se trata com try/catch.",
      },
      {
        type: "code",
        language: "ts",
        code: `async function loadUser(id: string): Promise<User> {
  try {
    const response = await fetch(\`/api/users/\${id}\`);
    if (!response.ok) throw new HttpError("Falha ao carregar", response.status);
    return await response.json();
  } catch (error) {
    // trata ou relanca; nunca engula silenciosamente
    throw error;
  }
}

// Em paralelo: nao faca await um por um se nao dependem entre si
const [user, orders] = await Promise.all([loadUser(id), loadOrders(id)]);`,
      },
      {
        type: "callout",
        tone: "warning",
        text: "fetch so rejeita em erro de rede. Resposta 404 ou 500 resolve normalmente; e sua responsabilidade checar response.ok.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "A funcao abaixo deveria carregar tres usuarios. Ela funciona, mas tem um problema de desempenho e um de tratamento de erro. Identifique os dois e corrija.",
      },
      {
        type: "code",
        language: "ts",
        code: `async function loadThree(ids: string[]) {
  const users = [];
  for (const id of ids) {
    const user = await loadUser(id);
    users.push(user);
  }
  return users;
}`,
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "Desempenho: o await dentro do loop faz as requisicoes em serie; tres requisicoes de 300 ms levam 900 ms. Como nao dependem uma da outra, Promise.all dispara as tres juntas e leva 300 ms. Erro: se uma falhar, as anteriores ja carregadas sao descartadas e nenhuma mensagem diz qual id falhou. Com Promise.allSettled voce recebe o resultado de cada uma e decide o que fazer com as falhas.",
      },
      {
        type: "code",
        language: "ts",
        code: `async function loadThree(ids: string[]) {
  const results = await Promise.allSettled(ids.map(loadUser));
  return results.flatMap((r) => (r.status === "fulfilled" ? [r.value] : []));
}`,
      },
    ],
  },
  {
    kind: "concept",
    id: "typescript-basics",
    slug: "typescript-essencial",
    categoryId: CATEGORY_ID,
    title: "TypeScript essencial",
    summary:
      "Tipos, interfaces, unions, genericos e narrowing: o que o TS adiciona ao JS.",
    howTo: [
      {
        type: "paragraph",
        text: "TypeScript e JavaScript com anotacoes de tipo que sao verificadas em compilacao e apagadas no build. Ele nao muda como o codigo roda; muda quantos erros voce pega antes de rodar.",
      },
      {
        type: "code",
        language: "ts",
        code: `// interface para formato de objeto; type para o resto (unions, aliases)
interface User { id: string; name: string; email?: string }
type Status = "active" | "paused"; // union de literais

// Generico: o tipo e um parametro
function first<T>(list: T[]): T | undefined {
  return list[0];
}
first([1, 2]); // T inferido como number

// Narrowing: o TS estreita o tipo dentro de checagens
function describe(value: string | number) {
  if (typeof value === "string") return value.toUpperCase(); // aqui e string
  return value.toFixed(2); // aqui e number
}`,
      },
      {
        type: "paragraph",
        text: "Union discriminada e o recurso mais poderoso para modelar 'ou isso ou aquilo': cada variante tem um campo literal (kind, type, status) e um switch nesse campo libera os campos certos. Este projeto usa isso em Topic (kind), ContentBlock (type) e AsyncState (status).",
      },
      {
        type: "callout",
        tone: "warning",
        text: "any desliga o TypeScript naquele ponto. Prefira unknown quando nao sabe o tipo: ele obriga a verificar antes de usar. O progressService faz isso ao ler o localStorage.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "A funcao abaixo compila, mas em runtime pode quebrar com 'Cannot read properties of undefined'. Explique por que o TypeScript nao pegou e corrija com tipos, sem usar any.",
      },
      {
        type: "code",
        language: "ts",
        code: `function getCity(user: { address: { city: string } }) {
  return user.address.city;
}

const data = JSON.parse(localStorage.getItem("user") ?? "{}");
getCity(data);`,
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "JSON.parse devolve any, e any e compativel com qualquer tipo, entao getCity(data) passa sem reclamacao mesmo que data seja {}. A correcao e tratar o resultado como unknown e validar em runtime antes de usar, com um type guard (funcao que devolve 'value is Tipo').",
      },
      {
        type: "code",
        language: "ts",
        code: `interface UserWithAddress { address: { city: string } }

const isUserWithAddress = (value: unknown): value is UserWithAddress =>
  typeof value === "object" &&
  value !== null &&
  typeof (value as { address?: { city?: unknown } }).address?.city === "string";

const data: unknown = JSON.parse(localStorage.getItem("user") ?? "{}");
if (isUserWithAddress(data)) getCity(data);`,
      },
    ],
  },
];
