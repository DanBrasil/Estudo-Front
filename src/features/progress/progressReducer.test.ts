import {
  fromList,
  initialProgressState,
  progressReducer,
  toList,
} from "./progressReducer";

const now = "2026-01-01T00:00:00.000Z";

describe("progressReducer", () => {
  it("hydrate substitui o estado pela lista", () => {
    const state = progressReducer(initialProgressState, {
      type: "hydrate",
      items: [{ topicId: "a", status: "completed", updatedAt: now }],
    });

    expect(state).toEqual({
      a: { topicId: "a", status: "completed", updatedAt: now },
    });
  });

  it("setStatus cria a entrada quando nao existe", () => {
    const state = progressReducer(initialProgressState, {
      type: "setStatus",
      topicId: "a",
      status: "in_progress",
      now: now,
    });

    expect(state.a).toEqual({
      topicId: "a",
      status: "in_progress",
      updatedAt: now,
    });
  });

  it("setStatus atualiza status e data sem tocar nas outras entradas", () => {
    const before = fromList([
      { topicId: "a", status: "in_progress", updatedAt: now },
      { topicId: "b", status: "completed", updatedAt: now },
    ]);

    const after = progressReducer(before, {
      type: "setStatus",
      topicId: "a",
      status: "completed",
      now: "2026-02-01T00:00:00.000Z",
    });

    expect(after.a.status).toBe("completed");
    expect(after.a.updatedAt).toBe("2026-02-01T00:00:00.000Z");
    expect(after.b).toBe(before.b);
  });

  it("setStatus com o mesmo status devolve a mesma referencia", () => {
    const before = fromList([
      { topicId: "a", status: "completed", updatedAt: now },
    ]);

    const after = progressReducer(before, {
      type: "setStatus",
      topicId: "a",
      status: "completed",
      now: "2026-02-01T00:00:00.000Z",
    });

    expect(after).toBe(before);
  });

  it("nao muta o estado anterior", () => {
    const before = fromList([
      { topicId: "a", status: "in_progress", updatedAt: now },
    ]);
    const snapshot = structuredClone(before);

    progressReducer(before, {
      type: "setStatus",
      topicId: "a",
      status: "completed",
      now: now,
    });

    expect(before).toEqual(snapshot);
  });

  it("toList e fromList sao inversas", () => {
    const items = [
      { topicId: "a", status: "completed" as const, updatedAt: now },
      { topicId: "b", status: "in_progress" as const, updatedAt: now },
    ];
    expect(toList(fromList(items))).toEqual(items);
  });
});
