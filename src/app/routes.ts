export const routes = {
  home: "/",
  category: "/categoria/:categorySlug",
  topic: "/categoria/:categorySlug/:topicSlug",
} as const;

export const buildCategoryPath = (categorySlug: string) =>
  `/categoria/${categorySlug}`;

export const buildTopicPath = (categorySlug: string, topicSlug: string) =>
  `/categoria/${categorySlug}/${topicSlug}`;
