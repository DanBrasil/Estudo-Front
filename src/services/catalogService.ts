import { categories, topics } from "@/data/catalog";
import type { Category, Topic } from "@/types/catalog";
import { simulateRequest } from "./http/fakeHttp";

export interface CategorySummary extends Category {
  topicIds: string[];
}

export interface CategoryWithTopics {
  category: Category;
  topics: Topic[];
}

export interface TopicWithCategory {
  category: Category;
  topic: Topic;
}

const sortByOrder = (list: Category[]) =>
  [...list].sort((a, b) => a.order - b.order);

const findCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug) ?? null;

const findTopicsByCategoryId = (categoryId: string) =>
  topics.filter((t) => t.categoryId === categoryId);

export const getCategories = (): Promise<Category[]> =>
  simulateRequest(() => sortByOrder(categories));

export const getCategoriesSummary = (): Promise<CategorySummary[]> =>
  simulateRequest(() =>
    sortByOrder(categories).map((category) => ({
      ...category,
      topicIds: findTopicsByCategoryId(category.id).map((t) => t.id),
    })),
  );

export const getCategoryBySlug = (slug: string): Promise<Category | null> =>
  simulateRequest(() => findCategoryBySlug(slug));

export const getCategoryWithTopics = (
  slug: string,
): Promise<CategoryWithTopics | null> =>
  simulateRequest(() => {
    const category = findCategoryBySlug(slug);
    if (!category) return null;
    return { category, topics: findTopicsByCategoryId(category.id) };
  });

export const getTopicBySlug = (
  categorySlug: string,
  topicSlug: string,
): Promise<TopicWithCategory | null> =>
  simulateRequest(() => {
    const category = findCategoryBySlug(categorySlug);
    if (!category) return null;
    const topic =
      findTopicsByCategoryId(category.id).find((t) => t.slug === topicSlug) ??
      null;
    return topic ? { category, topic } : null;
  });
