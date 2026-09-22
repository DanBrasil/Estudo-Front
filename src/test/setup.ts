import "@testing-library/jest-dom/vitest";

vi.mock("@/services/http/config", () => ({
  fakeHttpConfig: { minDelayMs: 0, maxDelayMs: 0, failureRate: 0 },
}));

afterEach(() => {
  window.localStorage.clear();
});
