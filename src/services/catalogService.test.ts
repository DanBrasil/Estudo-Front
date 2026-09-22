import { categories, topics } from "@/data/catalog";
import {
  getCategories,
  getCategoriesSummary,
  getCategoryBySlug,
  getCategoryWithTopics,
  getTopicBySlug,
} from "./catalogService";

const firstCategory = categories[0];
const firstTopicOfFirstCategory = topics.find(
  (t) => t.categoryId === firstCategory.id,
);

describe("catalogService", () => {
  describe("getCategories", () => {
    it("devolve as categorias ordenadas por order", async () => {
      const result = await getCategories();

      const orders = result.map((c) => c.order);
      expect(orders).toEqual([...orders].sort((a, b) => a - b));
      expect(result).toHaveLength(categories.length);
    });

    it("nao muta o array original", async () => {
      const before = categories.map((c) => c.id);
      await getCategories();
      expect(categories.map((c) => c.id)).toEqual(before);
    });
  });

  describe("getCategoriesSummary", () => {
    it("inclui os ids dos topicos de cada categoria", async () => {
      const result = await getCategoriesSummary();
      const summary = result.find((c) => c.id === firstCategory.id);

      expect(summary?.topicIds).toEqual(
        topics
          .filter((t) => t.categoryId === firstCategory.id)
          .map((t) => t.id),
      );
    });
  });

  describe("getCategoryBySlug", () => {
    it("encontra pela slug", async () => {
      await expect(getCategoryBySlug(firstCategory.slug)).resolves.toEqual(
        firstCategory,
      );
    });

    it("devolve null para slug inexistente", async () => {
      await expect(getCategoryBySlug("nao-existe")).resolves.toBeNull();
    });
  });

  describe("getCategoryWithTopics", () => {
    it("devolve categoria e seus topicos", async () => {
      const result = await getCategoryWithTopics(firstCategory.slug);

      expect(result?.category.id).toBe(firstCategory.id);
      expect(
        result?.topics.every((t) => t.categoryId === firstCategory.id),
      ).toBe(true);
    });

    it("devolve null para slug inexistente", async () => {
      await expect(getCategoryWithTopics("nao-existe")).resolves.toBeNull();
    });
  });

  describe("getTopicBySlug", () => {
    it("encontra pelo par categoria/topico", async () => {
      const result = await getTopicBySlug(
        firstCategory.slug,
        firstTopicOfFirstCategory!.slug,
      );

      expect(result?.topic.id).toBe(firstTopicOfFirstCategory!.id);
      expect(result?.category.id).toBe(firstCategory.id);
    });

    it("devolve null quando a categoria nao existe", async () => {
      await expect(
        getTopicBySlug("nao-existe", firstTopicOfFirstCategory!.slug),
      ).resolves.toBeNull();
    });

    it("devolve null quando o topico nao pertence a categoria", async () => {
      await expect(
        getTopicBySlug(firstCategory.slug, "nao-existe"),
      ).resolves.toBeNull();
    });
  });
});
