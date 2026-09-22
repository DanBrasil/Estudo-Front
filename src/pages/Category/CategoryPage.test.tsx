import { Route, Routes } from "react-router-dom";
import { routes } from "@/app/routes";
import * as catalogService from "@/services/catalogService";
import { renderWithProviders, screen } from "@/test/render";
import type { Category, Topic } from "@/types/catalog";
import { CategoryPage } from "./CategoryPage";

const category: Category = {
  id: "c1",
  slug: "cat-um",
  title: "Categoria Um",
  description: "Descricao",
  order: 1,
};

const topics: Topic[] = [
  {
    kind: "concept",
    id: "t1",
    slug: "topico-um",
    categoryId: "c1",
    title: "Topico Um",
    summary: "Resumo um",
    howTo: [],
    challenge: [],
    answer: [],
  },
];

const renderAt = (route: string) =>
  renderWithProviders(
    <Routes>
      <Route path={routes.category} element={<CategoryPage />} />
    </Routes>,
    { route },
  );

describe("CategoryPage", () => {
  it("lista os topicos da categoria com link e status", async () => {
    vi.spyOn(catalogService, "getCategoryWithTopics").mockResolvedValue({
      category,
      topics,
    });

    renderAt("/categoria/cat-um");

    expect(
      await screen.findByRole("heading", { name: "Categoria Um" }),
    ).toBeInTheDocument();
    const link = screen.getByRole("link", { name: /Topico Um/ });
    expect(link).toHaveAttribute("href", "/categoria/cat-um/topico-um");
    expect(screen.getByText("Nao iniciado")).toBeInTheDocument();
    expect(screen.getByText("Conceito")).toBeInTheDocument();
  });

  it("mostra 404 quando a categoria nao existe", async () => {
    vi.spyOn(catalogService, "getCategoryWithTopics").mockResolvedValue(null);

    renderAt("/categoria/nao-existe");

    expect(
      await screen.findByRole("heading", { name: /pagina nao encontrada/i }),
    ).toBeInTheDocument();
  });

  it("mostra estado vazio quando a categoria nao tem topicos", async () => {
    vi.spyOn(catalogService, "getCategoryWithTopics").mockResolvedValue({
      category,
      topics: [],
    });

    renderAt("/categoria/cat-um");

    expect(
      await screen.findByRole("heading", { name: /ainda nao tem topicos/i }),
    ).toBeInTheDocument();
  });
});
