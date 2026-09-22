import { act, renderHook, waitFor } from "@testing-library/react";
import { useAsync } from "./useAsync";

describe("useAsync", () => {
  it("comeca em loading e vai para success com o dado", async () => {
    const operation = vi.fn(() => Promise.resolve("dado"));
    const { result } = renderHook(() => useAsync(operation));

    expect(result.current.state.status).toBe("loading");

    await waitFor(() => {
      expect(result.current.state).toEqual({ status: "success", data: "dado" });
    });
    expect(operation).toHaveBeenCalledTimes(1);
  });

  it("vai para error quando a operacao rejeita", async () => {
    const failure = new Error("falhou");
    const operation = vi.fn(() => Promise.reject(failure));
    const { result } = renderHook(() => useAsync(operation));

    await waitFor(() => {
      expect(result.current.state).toEqual({ status: "error", error: failure });
    });
  });

  it("retry reexecuta a operacao", async () => {
    const operation = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error("primeira"))
      .mockResolvedValueOnce("segunda");
    const { result } = renderHook(() => useAsync(operation));

    await waitFor(() => expect(result.current.state.status).toBe("error"));

    act(() => result.current.retry());

    await waitFor(() => {
      expect(result.current.state).toEqual({
        status: "success",
        data: "segunda",
      });
    });
    expect(operation).toHaveBeenCalledTimes(2);
  });

  it("ignora resposta que chega depois do desmonte", async () => {
    let resolve!: (value: string) => void;
    const operation = () => new Promise<string>((r) => (resolve = r));
    const { result, unmount } = renderHook(() => useAsync(operation));

    unmount();
    resolve("tarde demais");
    await Promise.resolve();

    expect(result.current.state.status).toBe("loading");
  });
});
