import { Route, Routes } from "react-router-dom";
import { routes } from "@/app/routes";
import * as catalogService from "@/services/catalogService";
import { loadProgress } from "@/services/progressService";
import { renderWithProviders, screen, userEvent } from "@/test/render";
import type { Category, ConceptTopic, ExerciseTopic } from "@/types/catalog";
import { TopicPage } from "./TopicPage";

const category: Category = {
  id: "c1",
  slug: "cat-um",
  title: "Categoria Um",
  description: "Descricao",
  order: 1,
};

const conceptTopic: ConceptTopic = {
  kind: "concept",
  id: "t-concept",
  slug: "conceito",
  categoryId: "c1",
  title: "Um Conceito",
  summary: "Resumo do conceito",
  howTo: [{ type: "paragraph", text: "Texto do como fazer." }],
  challenge: [{ type: "paragraph", text: "Texto do desafio." }],
  answer: [{ type: "paragraph", text: "Texto da resposta." }],
};

const exerciseTopic: ExerciseTopic = {
  kind: "exercise",
  id: "t-exercise",
  slug: "exercicio",
  categoryId: "c1",
  title: "Um Exercicio",
  summary: "Resumo do exercicio",
  howTo: [],
  statement: [{ type: "paragraph", text: "Texto do enunciado." }],
  starterCode: "export const solve = () => {};",
  testCases: [{ input: "1", expectedOutput: "2", description: "soma um" }],
  solution: [{ type: "paragraph", text: "Texto da solucao." }],
};

const renderAt = (route: string) =>
  renderWithProviders(
    <Routes>
      <Route path={routes.topic} element={<TopicPage />} />
    </Routes>,
    { route },
  );

describe("TopicPage", () => {
  it("mostra o como fazer por padrao e o desafio na outra aba", async () => {
    vi.spyOn(catalogService, "getTopicBySlug").mockResolvedValue({
      category,
      topic: conceptTopic,
    });

    renderAt("/categoria/cat-um/conceito");

    expect(
      await screen.findByRole("heading", { name: "Um Conceito" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Texto do como fazer.")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("tab", { name: /Faca voce/ }));

    expect(screen.getByText("Texto do desafio.")).toBeInTheDocument();
    expect(screen.queryByText("Texto da resposta.")).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /revelar resposta/i }),
    );
    expect(screen.getByText("Texto da resposta.")).toBeInTheDocument();
  });

  it("exercicio mostra enunciado, casos de teste e solucao revelavel", async () => {
    vi.spyOn(catalogService, "getTopicBySlug").mockResolvedValue({
      category,
      topic: exerciseTopic,
    });

    renderAt("/categoria/cat-um/exercicio");

    await screen.findByRole("heading", { name: "Um Exercicio" });
    await userEvent.click(screen.getByRole("tab", { name: /Faca voce/ }));

    expect(screen.getByText("Texto do enunciado.")).toBeInTheDocument();
    expect(screen.getByText("soma um")).toBeInTheDocument();
    expect(screen.queryByText("Texto da solucao.")).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /revelar solucao/i }),
    );
    expect(screen.getByText("Texto da solucao.")).toBeInTheDocument();
  });

  it("marca como concluido e persiste o progresso", async () => {
    vi.spyOn(catalogService, "getTopicBySlug").mockResolvedValue({
      category,
      topic: conceptTopic,
    });

    renderAt("/categoria/cat-um/conceito");

    await screen.findByRole("heading", { name: "Um Conceito" });
    expect(screen.getByText("Nao iniciado")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /marcar como concluido/i }),
    );

    expect(screen.getByText("Concluido")).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /marcar como concluido/i }),
    ).not.toBeInTheDocument();
    expect(loadProgress()).toEqual([
      expect.objectContaining({ topicId: "t-concept", status: "completed" }),
    ]);
  });

  it("mostra 404 quando o topico nao existe", async () => {
    vi.spyOn(catalogService, "getTopicBySlug").mockResolvedValue(null);

    renderAt("/categoria/cat-um/nao-existe");

    expect(
      await screen.findByRole("heading", { name: /pagina nao encontrada/i }),
    ).toBeInTheDocument();
  });
});
