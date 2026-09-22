import type { TopicProgress } from "@/types/progress";
import { loadProgress, saveProgress } from "./progressService";
import { storageKeys } from "./storage/storageKeys";

const sample: TopicProgress = {
  topicId: "hooks",
  status: "completed",
  updatedAt: "2026-01-01T00:00:00.000Z",
};

describe("progressService", () => {
  it("devolve lista vazia quando nao ha nada salvo", () => {
    expect(loadProgress()).toEqual([]);
  });

  it("salva e carrega de volta", () => {
    saveProgress([sample]);
    expect(loadProgress()).toEqual([sample]);
  });

  it("ignora JSON corrompido", () => {
    window.localStorage.setItem(storageKeys.progress, "{nao e json");
    expect(loadProgress()).toEqual([]);
  });

  it("descarta itens com formato invalido e mantem os validos", () => {
    window.localStorage.setItem(
      storageKeys.progress,
      JSON.stringify([sample, { topicId: 1 }, { ...sample, status: "x" }]),
    );
    expect(loadProgress()).toEqual([sample]);
  });

  it("nao lanca quando o storage falha ao gravar", () => {
    const spy = vi
      .spyOn(Storage.prototype, "setItem")
      .mockImplementation(() => {
        throw new Error("QuotaExceeded");
      });

    expect(() => saveProgress([sample])).not.toThrow();

    spy.mockRestore();
  });
});
