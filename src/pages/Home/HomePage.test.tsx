import { HttpError } from "@/services/http/HttpError";
import * as catalogService from "@/services/catalogService";
import { renderWithProviders, screen, userEvent, waitFor } from "@/test/render";
import { userMessages } from "@/utils/errorMessages";
import { HomePage } from "./HomePage";

const summaries: catalogService.CategorySummary[] = [
  {
    id: "c1",
    slug: "cat-um",
    title: "Categoria Um",
    description: "Descricao um",
    order: 1,
    topicIds: ["t1", "t2"],
  },
  {
    id: "c2",
    slug: "cat-dois",
    title: "Categoria Dois",
    description: "Descricao dois",
    order: 2,
    topicIds: [],
  },
];

describe("HomePage", () => {
  it("mostra loading e depois as categorias", async () => {
    vi.spyOn(catalogService, "getCategoriesSummary").mockResolvedValue(
      summaries,
    );

    renderWithProviders(<HomePage />);

    expect(screen.getByRole("status")).toHaveTextContent(/carregando/i);

    expect(
      await screen.findByRole("heading", { name: "Categoria Um" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Categoria Dois" }),
    ).toBeInTheDocument();
    expect(screen.getByText("0 de 2 topicos concluidos")).toBeInTheDocument();
  });

  it("os cards levam para a pagina da categoria", async () => {
    vi.spyOn(catalogService, "getCategoriesSummary").mockResolvedValue(
      summaries,
    );

    renderWithProviders(<HomePage />);

    const link = await screen.findByRole("link", { name: /Categoria Um/ });
    expect(link).toHaveAttribute("href", "/categoria/cat-um");
  });

  it("mostra mensagem amigavel e tenta de novo em caso de erro", async () => {
    const spy = vi
      .spyOn(catalogService, "getCategoriesSummary")
      .mockRejectedValueOnce(new HttpError("Falha simulada de rede", 503))
      .mockResolvedValueOnce(summaries);

    renderWithProviders(<HomePage />);

    const alert = await screen.findByRole("alert");
    expect(alert).toHaveTextContent(userMessages.serverError);
    expect(alert).not.toHaveTextContent("Falha simulada");

    await userEvent.click(
      screen.getByRole("button", { name: /tentar novamente/i }),
    );

    await waitFor(() =>
      expect(
        screen.getByRole("heading", { name: "Categoria Um" }),
      ).toBeInTheDocument(),
    );
    expect(spy).toHaveBeenCalledTimes(2);
  });

  it("mostra estado vazio quando nao ha categorias", async () => {
    vi.spyOn(catalogService, "getCategoriesSummary").mockResolvedValue([]);

    renderWithProviders(<HomePage />);

    expect(
      await screen.findByRole("heading", { name: /nenhuma categoria/i }),
    ).toBeInTheDocument();
  });
});
