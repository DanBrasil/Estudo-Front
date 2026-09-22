import type { Topic } from "@/types/catalog";

const CATEGORY_ID = "programming-logic";

export const programmingLogicTopics: Topic[] = [
  {
    kind: "concept",
    id: "basic-nomenclature",
    slug: "nomenclatura-basica",
    categoryId: CATEGORY_ID,
    title: "Nomenclatura basica",
    summary: "Variavel, constante, funcao, parametro, argumento, retorno.",
    howTo: [
      {
        type: "paragraph",
        text: "Variavel e um nome que aponta para um valor e pode apontar para outro depois (let). Constante e um nome que nunca muda de alvo (const), embora o valor apontado possa ser mutavel, como um array. Funcao e um bloco nomeado que recebe entradas e devolve uma saida.",
      },
      {
        type: "code",
        language: "ts",
        code: `let count = 0; // variavel: pode receber outro valor
const limit = 10; // constante: nao pode ser reatribuida

// "a" e "b" sao PARAMETROS: os nomes na definicao
function add(a: number, b: number): number {
  return a + b; // RETORNO: a saida da funcao
}

// 2 e 3 sao ARGUMENTOS: os valores na chamada
const result = add(2, 3);`,
      },
      {
        type: "callout",
        tone: "info",
        text: "Parametro e o nome na definicao; argumento e o valor na chamada. Em entrevista essa distincao aparece com frequencia.",
      },
      {
        type: "paragraph",
        text: "Prefira const por padrao e so use let quando a reatribuicao for realmente necessaria. Isso comunica intencao: quem le sabe que aquele nome nao vai mudar. var nao deve ser usado em codigo novo: ele ignora blocos e sofre hoisting, duas fontes classicas de bug.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Sem executar, diga o que cada linha imprime e por que. Depois explique qual linha lanca erro.",
      },
      {
        type: "code",
        language: "js",
        code: `const list = [1, 2];
list.push(3);
console.log(list);

const total = 5;
total = 6;
console.log(total);`,
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "A primeira impressao e [1, 2, 3]: const impede reatribuir o nome list, nao impede mutar o array para o qual ele aponta. A linha total = 6 lanca TypeError (Assignment to constant variable) porque tenta reatribuir uma constante; o console.log seguinte nunca executa.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "const protege a referencia, nao o conteudo. Para impedir mutacao use Object.freeze ou tipos readonly no TypeScript.",
      },
    ],
  },
  {
    kind: "concept",
    id: "control-flow",
    slug: "controle-de-fluxo",
    categoryId: CATEGORY_ID,
    title: "Controle de fluxo",
    summary: "if/else, switch, loops, early return e como evitar aninhamento.",
    howTo: [
      {
        type: "paragraph",
        text: "Controle de fluxo e como o programa decide o que executar. As ferramentas sao poucas (condicionais, loops, return), mas a forma de combina-las separa codigo legivel de codigo que ninguem quer manter.",
      },
      {
        type: "code",
        language: "ts",
        code: `// Aninhado: dificil de ler, facil de errar
function shippingCost(order: Order): number {
  if (order.items.length > 0) {
    if (order.total >= 200) {
      return 0;
    } else {
      return 25;
    }
  } else {
    throw new Error("Pedido vazio");
  }
}

// Early return: trata os casos especiais primeiro e sai
function shippingCost(order: Order): number {
  if (order.items.length === 0) throw new Error("Pedido vazio");
  if (order.total >= 200) return 0;
  return 25;
}`,
      },
      {
        type: "paragraph",
        text: "Use switch quando uma unica variavel tem varios valores possiveis; com TypeScript e uma union, um switch exaustivo (com never no default) faz o compilador avisar quando um caso novo nao foi tratado. Para percorrer arrays prefira for...of ou os metodos de array (map, filter) a for com indice; o indice so e necessario quando voce realmente precisa dele.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Regra pratica: se voce precisa de mais de dois niveis de indentacao dentro de uma funcao, ha um early return ou uma funcao auxiliar esperando para ser extraida.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Reescreva a funcao abaixo usando early return, sem alterar o comportamento. Depois responda: o que acontece se status for uma string que nao esta em nenhum if?",
      },
      {
        type: "code",
        language: "ts",
        code: `function label(status: string): string {
  let result = "";
  if (status === "active") {
    result = "Ativo";
  } else {
    if (status === "paused") {
      result = "Pausado";
    } else {
      if (status === "closed") {
        result = "Encerrado";
      }
    }
  }
  return result;
}`,
      },
    ],
    answer: [
      {
        type: "code",
        language: "ts",
        code: `type Status = "active" | "paused" | "closed";

function label(status: Status): string {
  switch (status) {
    case "active":
      return "Ativo";
    case "paused":
      return "Pausado";
    case "closed":
      return "Encerrado";
  }
}`,
      },
      {
        type: "paragraph",
        text: "Na versao original, uma string desconhecida devolve string vazia silenciosamente, e a interface mostra um rotulo em branco sem ninguem perceber. Tipando status como union e usando switch, o TypeScript garante que todos os casos estao cobertos e impede a chamada com valor invalido em tempo de compilacao.",
      },
    ],
  },
  {
    kind: "exercise",
    id: "data-manipulation",
    slug: "manipulacao-de-dados",
    categoryId: CATEGORY_ID,
    title: "Manipulacao de dados",
    summary: "Percorrer, filtrar, transformar e agrupar colecoes.",
    howTo: [
      {
        type: "paragraph",
        text: "Quase toda manipulacao de lista cabe em tres operacoes: filter escolhe quais itens ficam, map transforma cada item, reduce condensa a lista em um unico valor.",
      },
      {
        type: "code",
        language: "ts",
        code: `const numbers = [1, 2, 3, 4, 5, 6];

const evens = numbers.filter((n) => n % 2 === 0); // [2, 4, 6]
const doubled = evens.map((n) => n * 2); // [4, 8, 12]
const total = doubled.reduce((sum, n) => sum + n, 0); // 24`,
      },
      {
        type: "paragraph",
        text: "reduce e o mais geral dos tres: map e filter podem ser escritos com reduce. Ele tambem serve para agrupar: o acumulador e um objeto e cada item vai para a chave certa.",
      },
      {
        type: "code",
        language: "ts",
        code: `const people = [
  { name: "Ana", city: "SP" },
  { name: "Bia", city: "RJ" },
  { name: "Caio", city: "SP" },
];

const byCity = people.reduce<Record<string, string[]>>((groups, person) => {
  (groups[person.city] ??= []).push(person.name);
  return groups;
}, {});
// { SP: ["Ana", "Caio"], RJ: ["Bia"] }`,
      },
      {
        type: "callout",
        tone: "info",
        text: "Essas funcoes nao alteram o array original: cada uma devolve um array novo. Isso e o que permite encadear sem efeitos colaterais.",
      },
    ],
    statement: [
      {
        type: "paragraph",
        text: "Implemente solve, que recebe uma lista de numeros e devolve apenas os pares, cada um multiplicado por 2, em ordem crescente.",
      },
    ],
    starterCode: `export function solve(input: number[]): number[] {
  // seu codigo aqui
  return input;
}`,
    testCases: [
      {
        input: "[1, 2, 3, 4]",
        expectedOutput: "[4, 8]",
        description: "caso base",
      },
      { input: "[5, 3, 1]", expectedOutput: "[]", description: "sem pares" },
      {
        input: "[6, 2, 4]",
        expectedOutput: "[4, 8, 12]",
        description: "precisa ordenar",
      },
      { input: "[]", expectedOutput: "[]", description: "lista vazia" },
    ],
    solution: [
      {
        type: "code",
        language: "ts",
        code: `export function solve(input: number[]): number[] {
  return input
    .filter((n) => n % 2 === 0)
    .map((n) => n * 2)
    .sort((a, b) => a - b);
}`,
      },
      {
        type: "callout",
        tone: "warning",
        text: "sort() sem comparador ordena como texto: [10, 9, 1] viraria [1, 10, 9]. Com numeros, sempre passe (a, b) => a - b.",
      },
    ],
  },
  {
    kind: "exercise",
    id: "two-sum",
    slug: "two-sum",
    categoryId: CATEGORY_ID,
    title: "Two Sum",
    summary:
      "O exercicio mais pedido em entrevistas: encontrar dois numeros que somam um alvo.",
    howTo: [
      {
        type: "paragraph",
        text: "A solucao ingenua testa todos os pares: dois loops aninhados, O(n^2). Funciona para listas pequenas e e um bom ponto de partida para explicar em voz alta numa entrevista.",
      },
      {
        type: "paragraph",
        text: "A solucao esperada usa um Map como memoria: para cada numero, calcule o complemento (alvo menos o numero) e verifique se ele ja passou. Se passou, achou o par; se nao, guarde o numero atual e siga. Uma passada so, O(n) de tempo e O(n) de memoria.",
      },
      {
        type: "code",
        language: "ts",
        code: `// Padrao "complemento no Map": aparece em dezenas de variacoes
const seen = new Map<number, number>(); // valor -> indice

for (let i = 0; i < nums.length; i++) {
  const complement = target - nums[i];
  if (seen.has(complement)) {
    // par encontrado: seen.get(complement) e i
  }
  seen.set(nums[i], i);
}`,
      },
      {
        type: "callout",
        tone: "info",
        text: "Em entrevista, diga a complexidade das duas abordagens e por que trocou tempo por memoria. Isso vale mais que o codigo em si.",
      },
    ],
    statement: [
      {
        type: "paragraph",
        text: "Dado um array de inteiros nums e um inteiro target, devolva os indices dos dois numeros cuja soma e igual a target. Cada entrada tem exatamente uma resposta e o mesmo elemento nao pode ser usado duas vezes. Devolva os indices em ordem crescente.",
      },
    ],
    starterCode: `export function twoSum(nums: number[], target: number): [number, number] {
  // seu codigo aqui
  return [0, 0];
}`,
    testCases: [
      {
        input: "[2, 7, 11, 15], 9",
        expectedOutput: "[0, 1]",
        description: "caso classico",
      },
      {
        input: "[3, 2, 4], 6",
        expectedOutput: "[1, 2]",
        description: "nao pode usar o 3 duas vezes",
      },
      {
        input: "[3, 3], 6",
        expectedOutput: "[0, 1]",
        description: "valores repetidos",
      },
      {
        input: "[-1, 5, 4], 3",
        expectedOutput: "[0, 2]",
        description: "numero negativo",
      },
    ],
    solution: [
      {
        type: "code",
        language: "ts",
        code: `export function twoSum(nums: number[], target: number): [number, number] {
  const seen = new Map<number, number>();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    const j = seen.get(complement);
    if (j !== undefined) return [j, i];
    seen.set(nums[i], i);
  }

  throw new Error("Nenhum par encontrado");
}`,
      },
      {
        type: "paragraph",
        text: "Repare que o numero atual so entra no Map depois da verificacao. Isso e o que impede usar o mesmo elemento duas vezes no caso [3, 2, 4] com alvo 6.",
      },
    ],
  },
  {
    kind: "exercise",
    id: "valid-palindrome",
    slug: "palindromo",
    categoryId: CATEGORY_ID,
    title: "Palindromo",
    summary:
      "Normalizar uma string e comparar com a inversa, ou usar dois ponteiros.",
    howTo: [
      {
        type: "paragraph",
        text: "Palindromo e uma frase que se le igual de tras para frente, ignorando espacos, pontuacao e caixa. O problema tem duas partes: normalizar a entrada e comparar.",
      },
      {
        type: "code",
        language: "ts",
        code: `// Normalizacao: so letras e numeros, tudo minusculo
const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");

// Abordagem 1: comparar com a inversa. Simples, O(n) de memoria extra.
const reversed = clean.split("").reverse().join("");
const isPalindrome = clean === reversed;

// Abordagem 2: dois ponteiros. O(1) de memoria extra.
let left = 0;
let right = clean.length - 1;
while (left < right) {
  if (clean[left] !== clean[right]) return false;
  left++;
  right--;
}`,
      },
      {
        type: "callout",
        tone: "info",
        text: "Dois ponteiros e um padrao que resolve muitos problemas de array e string ordenados: um indice de cada ponta caminhando para o centro.",
      },
    ],
    statement: [
      {
        type: "paragraph",
        text: "Implemente isPalindrome, que devolve true se a string for um palindromo considerando apenas letras e numeros, sem diferenciar maiusculas de minusculas.",
      },
    ],
    starterCode: `export function isPalindrome(text: string): boolean {
  // seu codigo aqui
  return false;
}`,
    testCases: [
      {
        input: '"A man, a plan, a canal: Panama"',
        expectedOutput: "true",
        description: "com pontuacao e espacos",
      },
      {
        input: '"race a car"',
        expectedOutput: "false",
        description: "nao e palindromo",
      },
      { input: '""', expectedOutput: "true", description: "string vazia" },
      { input: '"0P"', expectedOutput: "false", description: "numero e letra" },
    ],
    solution: [
      {
        type: "code",
        language: "ts",
        code: `export function isPalindrome(text: string): boolean {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = clean.length - 1;

  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }

  return true;
}`,
      },
      {
        type: "paragraph",
        text: "A string vazia devolve true porque o loop nem executa: nao ha par de caracteres diferente. Esse e o tipo de caso de borda que vale mencionar antes de codar.",
      },
    ],
  },
];
