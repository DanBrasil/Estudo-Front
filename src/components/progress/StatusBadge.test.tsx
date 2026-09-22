import { renderWithProviders, screen } from "@/test/render";
import { StatusBadge } from "./StatusBadge";

describe("StatusBadge", () => {
  it.each([
    ["not_started", "Nao iniciado"],
    ["in_progress", "Em andamento"],
    ["completed", "Concluido"],
  ] as const)("mostra o rotulo de %s", (status, label) => {
    renderWithProviders(<StatusBadge status={status} />);
    expect(screen.getByText(label)).toBeInTheDocument();
  });
});
