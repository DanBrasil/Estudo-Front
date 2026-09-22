import { simulateRequest } from "./fakeHttp";
import { HttpError } from "./HttpError";

describe("simulateRequest", () => {
  it("resolve com o valor do resolver", async () => {
    await expect(simulateRequest(() => 42)).resolves.toBe(42);
  });

  it("so chama o resolver depois do delay", async () => {
    vi.useFakeTimers();
    const resolver = vi.fn(() => "ok");

    const promise = simulateRequest(resolver, { delayMs: 100 });
    expect(resolver).not.toHaveBeenCalled();

    await vi.advanceTimersByTimeAsync(100);
    await expect(promise).resolves.toBe("ok");
    expect(resolver).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  it("rejeita com HttpError quando a falha e forcada", async () => {
    await expect(
      simulateRequest(() => "nunca", { failureRate: 1 }),
    ).rejects.toBeInstanceOf(HttpError);
  });

  it("propaga erro lancado pelo proprio resolver", async () => {
    await expect(
      simulateRequest(() => {
        throw new Error("boom");
      }),
    ).rejects.toThrow("boom");
  });
});
