import type { Category } from "@/types/catalog";

export const categories: Category[] = [
  {
    id: "programming-logic",
    slug: "logica-de-programacao",
    title: "Logica de Programacao",
    description:
      "Nomenclatura, controle de fluxo, manipulacao de dados e os exercicios classicos de entrevista.",
    order: 1,
  },
  {
    id: "programming-paradigms",
    slug: "paradigmas-de-programacao",
    title: "Paradigmas de Programacao",
    description:
      "Procedural, orientado a objetos e funcional: formas diferentes de organizar o mesmo problema.",
    order: 2,
  },
  {
    id: "js-ts-fundamentals",
    slug: "fundamentos-js-ts",
    title: "Fundamentos de JavaScript e TypeScript",
    description:
      "Recursos do ES6 em diante, assincronismo e o que o TypeScript adiciona por cima.",
    order: 3,
  },
  {
    id: "react-core",
    slug: "react-essencial",
    title: "React Essencial",
    description:
      "JSX, props, estado, hooks e o ciclo de renderizacao: o nucleo da biblioteca.",
    order: 4,
  },
  {
    id: "react-ecosystem",
    slug: "ecossistema-react",
    title: "Ecossistema React",
    description:
      "Gerenciamento de estado, roteamento e frameworks construidos sobre o React.",
    order: 5,
  },
];
