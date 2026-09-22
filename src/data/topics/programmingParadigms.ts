import type { Topic } from "@/types/catalog";

const CATEGORY_ID = "programming-paradigms";

export const programmingParadigmsTopics: Topic[] = [
  {
    kind: "concept",
    id: "procedural",
    slug: "procedural",
    categoryId: CATEGORY_ID,
    title: "Programacao procedural",
    summary:
      "Sequencia de instrucoes e funcoes que operam sobre dados compartilhados.",
    howTo: [
      {
        type: "paragraph",
        text: "No estilo procedural o programa e uma sequencia de passos. Dados ficam em variaveis e funcoes (procedimentos) leem e alteram esses dados. E o jeito mais direto de escrever um script e por isso e por onde todo mundo comeca.",
      },
      {
        type: "code",
        language: "ts",
        code: `let balance = 100;

function deposit(amount: number) {
  balance += amount;
}

function withdraw(amount: number) {
  if (amount > balance) throw new Error("Saldo insuficiente");
  balance -= amount;
}

deposit(50);
withdraw(30);
console.log(balance); // 120`,
      },
      {
        type: "paragraph",
        text: "O problema aparece quando o programa cresce: qualquer funcao pode alterar balance, e para entender um bug voce precisa rastrear todas. Os outros paradigmas existem para controlar quem pode mexer em qual dado.",
      },
      {
        type: "callout",
        tone: "info",
        text: "Procedural nao e ruim. Scripts, funcoes utilitarias e a maior parte do codigo de um reducer sao procedurais. O erro e usar estado global compartilhado sem controle.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "O codigo acima tem um bug latente: withdraw pode ser chamada com valor negativo e virar um deposito. Identifique o que mais pode dar errado quando duas partes do programa usam balance, e proponha como reduzir o risco sem mudar de paradigma.",
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "Alem do valor negativo, qualquer modulo que importe balance pode atribuir um valor direto, sem passar pelas funcoes. Sem mudar de paradigma, o caminho e fechar o acesso: tornar balance privado ao modulo (nao exportar), validar amount > 0 nas duas funcoes, e expor uma funcao getBalance() para leitura. Isso ja e encapsulamento, o primeiro passo em direcao a orientacao a objetos.",
      },
      {
        type: "code",
        language: "ts",
        code: `let balance = 100; // nao exportado: so este modulo enxerga

export const getBalance = () => balance;

export function deposit(amount: number) {
  if (amount <= 0) throw new Error("Valor invalido");
  balance += amount;
}`,
      },
    ],
  },
  {
    kind: "concept",
    id: "oop",
    slug: "orientacao-a-objetos",
    categoryId: CATEGORY_ID,
    title: "Orientacao a objetos",
    summary:
      "Classes, encapsulamento, heranca, polimorfismo e quando nao usar.",
    howTo: [
      {
        type: "paragraph",
        text: "Orientacao a objetos junta dados e as operacoes sobre eles numa unidade: o objeto. Encapsulamento significa que o estado interno so muda por metodos do proprio objeto. Isso resolve o problema do exemplo procedural: ninguem altera o saldo por fora.",
      },
      {
        type: "code",
        language: "ts",
        code: `class Account {
  #balance: number; // campo privado de verdade (JS moderno)

  constructor(initial: number) {
    this.#balance = initial;
  }

  get balance() {
    return this.#balance;
  }

  deposit(amount: number) {
    if (amount <= 0) throw new Error("Valor invalido");
    this.#balance += amount;
  }
}

const account = new Account(100);
account.deposit(50);
account.balance; // 150
account.#balance; // erro de sintaxe: privado`,
      },
      {
        type: "paragraph",
        text: "Heranca (extends) permite que uma classe reaproveite outra, mas cria acoplamento forte: mudar a classe base afeta todas as filhas. Na maioria dos casos, composicao (um objeto tem outro objeto) e mais flexivel que heranca (um objeto e outro objeto). Polimorfismo e o que permite tratar objetos diferentes pela mesma interface: qualquer coisa com o metodo area() pode ser somada numa lista de formas.",
      },
      {
        type: "callout",
        tone: "warning",
        text: "Em React moderno, componentes sao funcoes e classes quase nao aparecem. OOP no front-end e mais util em servicos, modelos de dominio e clientes de API do que em componentes.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "Voce precisa de Dog e Cat, ambos com name e um metodo speak(). Dog tambem tem fetch(). Um colega sugere Cat extends Dog para reaproveitar name e speak(). Explique por que isso e errado e proponha duas alternativas: uma com heranca correta e outra com composicao ou interface.",
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "Cat extends Dog faz o gato herdar fetch(), um comportamento que ele nao tem, e diz semanticamente que todo gato e um cachorro. Heranca modela relacao 'e um'. A versao correta com heranca cria uma base comum (Animal com name e speak abstrato) e as duas classes estendem ela. A versao com interface dispensa heranca: uma interface Speaker { name; speak(): string } e cada classe implementa; o codigo que precisa de 'algo que fala' depende so da interface.",
      },
      {
        type: "code",
        language: "ts",
        code: `interface Speaker {
  name: string;
  speak(): string;
}

class Dog implements Speaker {
  constructor(public name: string) {}
  speak() { return "Au"; }
  fetch() { /* ... */ }
}

class Cat implements Speaker {
  constructor(public name: string) {}
  speak() { return "Miau"; }
}

const chorus = (animals: Speaker[]) => animals.map((a) => a.speak());`,
      },
    ],
  },
  {
    kind: "concept",
    id: "functional",
    slug: "funcional",
    categoryId: CATEGORY_ID,
    title: "Programacao funcional",
    summary:
      "Funcoes puras, imutabilidade, composicao e funcoes de alta ordem.",
    howTo: [
      {
        type: "paragraph",
        text: "Funcao pura e a que, para a mesma entrada, devolve sempre a mesma saida e nao altera nada fora dela: nao muta argumentos, nao escreve em variavel global, nao faz requisicao. Pura e sinonimo de previsivel e testavel. Imutabilidade e o complemento: em vez de alterar um dado, voce cria um novo com a mudanca.",
      },
      {
        type: "code",
        language: "ts",
        code: `// Impura: muta o argumento e depende de Date
function markDone(task: Task) {
  task.done = true;
  task.doneAt = new Date();
}

// Pura: devolve um objeto novo, recebe a data de fora
function markDone(task: Task, now: Date): Task {
  return { ...task, done: true, doneAt: now };
}`,
      },
      {
        type: "paragraph",
        text: "Funcao de alta ordem e a que recebe ou devolve funcao. map, filter e reduce sao exemplos; useCallback e um hook de alta ordem. Composicao e encadear funcoes pequenas: a saida de uma e a entrada da proxima. E o que torna o pipeline filter/map/reduce legivel.",
      },
      {
        type: "callout",
        tone: "info",
        text: "React e fortemente funcional: componentes devem ser funcoes puras das props, estado e imutavel (setState com objeto novo), e reducers sao funcoes puras por definicao. O reducer de progresso deste projeto e um exemplo.",
      },
    ],
    challenge: [
      {
        type: "paragraph",
        text: "A funcao abaixo esta em um reducer do React e nao dispara re-render quando chamada. Explique por que e corrija mantendo a funcao pura.",
      },
      {
        type: "code",
        language: "ts",
        code: `function addItem(state: { items: string[] }, item: string) {
  state.items.push(item);
  return state;
}`,
      },
    ],
    answer: [
      {
        type: "paragraph",
        text: "push muta o array existente e a funcao devolve o mesmo objeto state. O React compara a referencia anterior com a nova (Object.is); como e a mesma, ele conclui que nada mudou e nao re-renderiza. A correcao devolve um objeto novo com um array novo.",
      },
      {
        type: "code",
        language: "ts",
        code: `function addItem(state: { items: string[] }, item: string) {
  return { ...state, items: [...state.items, item] };
}`,
      },
    ],
  },
];
