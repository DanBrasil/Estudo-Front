# EstudoFront

Aplicacao web de estudo de programacao: categorias (logica, funcoes basicas, HTTP, re-render, estados...) com topicos no formato "como fazer / faca voce".

Projeto 100% front-end. Requisicoes HTTP sao simuladas por uma camada de servico sobre localStorage.

## Stack

- React 19 + TypeScript 6 + Vite 8
- styled-components 6 (tema tipado em `src/styles/theme.ts`)
- react-router-dom 7
- Vitest 5 + Testing Library + jsdom
- Oxlint

## Scripts

| Comando                 | O que faz                                  |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Servidor de desenvolvimento                |
| `npm run build`         | Typecheck + bundle de producao em `dist/`  |
| `npm run preview`       | Serve o `dist/` localmente                 |
| `npm test`              | Testes em modo watch                       |
| `npm run test:run`      | Testes uma vez (CI)                        |
| `npm run test:coverage` | Testes com relatorio de cobertura          |
| `npm run typecheck`     | Apenas validacao de tipos                  |
| `npm run lint`          | Lint com Oxlint                            |

## Estrutura

```
src/
  app/         composicao do app: providers globais, roteador, rotas
  pages/       uma pasta por pagina (componente + teste)
  components/  componentes de UI reutilizaveis (design system)
  features/    modulos de dominio (catalogo, progresso...) com seus contexts
  services/    acesso a dados (fake HTTP sobre localStorage)
  styles/      tema, tipagem do tema e estilos globais
  types/       tipos de dominio compartilhados
  test/        setup do Vitest e helpers de teste
```

## Convencoes

- Nenhuma cor, fonte ou espacamento literal em componente: sempre `theme`.
- Nenhum caminho de rota literal: sempre `ROUTES`.
- Imports absolutos via alias `@/` (aponta para `src/`).
- Todo componente de pagina tem um teste ao lado (`*.test.tsx`).
- Testes usam `renderWithProviders` de `@/test/render`.
