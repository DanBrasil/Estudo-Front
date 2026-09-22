import { renderWithProviders, screen } from "@/test/render";
import { NotFoundPage } from "./NotFoundPage";

describe("NotFoundPage", () => {
  it("oferece caminho de volta para a home", () => {
    renderWithProviders(<NotFoundPage />);

    expect(
      screen.getByRole("heading", { name: /pagina nao encontrada/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /voltar/i })).toHaveAttribute(
      "href",
      "/",
    );
  });
});
