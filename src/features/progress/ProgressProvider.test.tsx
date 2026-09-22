import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { loadProgress } from "@/services/progressService";
import { ProgressProvider } from "./ProgressProvider";
import { useProgress } from "./useProgress";

const wrapper = ({ children }: { children: ReactNode }) => (
  <ProgressProvider>{children}</ProgressProvider>
);

describe("ProgressProvider + useProgress", () => {
  it("lanca erro claro fora do Provider", () => {
    expect(() => renderHook(() => useProgress())).toThrow(
      /dentro de <ProgressProvider>/,
    );
  });

  it("status padrao e not_started", () => {
    const { result } = renderHook(() => useProgress(), { wrapper });
    expect(result.current.getStatus("qualquer")).toBe("not_started");
  });

  it("setStatus atualiza o status e persiste", () => {
    const { result } = renderHook(() => useProgress(), { wrapper });

    act(() => {
      result.current.setStatus("hooks", "completed");
    });

    expect(result.current.getStatus("hooks")).toBe("completed");
    expect(loadProgress()).toEqual([
      expect.objectContaining({ topicId: "hooks", status: "completed" }),
    ]);
  });

  it("carrega o progresso salvo na montagem", () => {
    window.localStorage.setItem(
      "estudofront:progress:v1",
      JSON.stringify([
        {
          topicId: "jsx",
          status: "in_progress",
          updatedAt: "2026-01-01T00:00:00.000Z",
        },
      ]),
    );

    const { result } = renderHook(() => useProgress(), { wrapper });
    expect(result.current.getStatus("jsx")).toBe("in_progress");
  });

  it("countCompleted conta so os concluidos da lista informada", () => {
    const { result } = renderHook(() => useProgress(), { wrapper });

    act(() => {
      result.current.setStatus("a", "completed");
      result.current.setStatus("b", "in_progress");
      result.current.setStatus("c", "completed");
    });

    expect(result.current.countCompleted(["a", "b", "c", "d"])).toBe(2);
    expect(result.current.countCompleted(["b"])).toBe(0);
  });
});
