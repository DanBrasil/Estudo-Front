import { categories, topics } from "./catalog";

describe("catalog data", () => {
  const uniqueValues = <T>(values: T[]) =>
    new Set(values).size === values.length;

  it("categorias tem ids unicos", () => {
    expect(uniqueValues(categories.map((c) => c.id))).toBe(true);
  });

  it("categorias tem slugs unicos", () => {
    expect(uniqueValues(categories.map((c) => c.slug))).toBe(true);
  });

  it("categorias tem ordem unica e sequencial a partir de 1", () => {
    const orders = [...categories].map((c) => c.order).sort((a, b) => a - b);
    expect(orders).toEqual(orders.map((_, index) => index + 1));
  });

  it("topicos tem ids unicos", () => {
    expect(uniqueValues(topics.map((t) => t.id))).toBe(true);
  });

  it("topicos tem slugs unicos dentro da mesma categoria", () => {
    const keys = topics.map((t) => `${t.categoryId}/${t.slug}`);
    expect(uniqueValues(keys)).toBe(true);
  });

  it("todo topico aponta para uma categoria existente", () => {
    const categoryIds = new Set(categories.map((c) => c.id));
    const orphans = topics.filter((t) => !categoryIds.has(t.categoryId));
    expect(orphans.map((t) => t.id)).toEqual([]);
  });

  it("toda categoria tem pelo menos um topico", () => {
    const usedCategoryIds = new Set(topics.map((t) => t.categoryId));
    const empty = categories.filter((c) => !usedCategoryIds.has(c.id));
    expect(empty.map((c) => c.id)).toEqual([]);
  });
});
