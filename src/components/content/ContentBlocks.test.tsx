import { renderWithProviders, screen } from "@/test/render";
import { ContentBlocks } from "./ContentBlocks";

describe("ContentBlocks", () => {
  it("renderiza paragrafo, codigo e callout", () => {
    renderWithProviders(
      <ContentBlocks
        blocks={[
          { type: "paragraph", text: "Um paragrafo." },
          { type: "code", language: "ts", code: "const x = 1;" },
          { type: "callout", tone: "warning", text: "Cuidado aqui." },
        ]}
      />,
    );

    expect(screen.getByText("Um paragrafo.")).toBeInTheDocument();
    expect(screen.getByText("const x = 1;")).toBeInTheDocument();
    expect(screen.getByText("Cuidado aqui.")).toBeInTheDocument();
  });

  it("renderiza nada com lista vazia, sem quebrar", () => {
    const { container } = renderWithProviders(<ContentBlocks blocks={[]} />);
    expect(container.querySelectorAll("p, pre")).toHaveLength(0);
  });
});
