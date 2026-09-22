import { buildCategoryPath, buildTopicPath, routes } from "./routes";

describe("routes", () => {
  it("monta o caminho de categoria", () => {
    expect(buildCategoryPath("react-essencial")).toBe(
      "/categoria/react-essencial",
    );
  });

  it("monta o caminho de topico", () => {
    expect(buildTopicPath("react-essencial", "hooks")).toBe(
      "/categoria/react-essencial/hooks",
    );
  });

  it("builders sao compativeis com os padroes das rotas", () => {
    expect(routes.category.replace(":categorySlug", "a")).toBe(
      buildCategoryPath("a"),
    );
    expect(
      routes.topic.replace(":categorySlug", "a").replace(":topicSlug", "b"),
    ).toBe(buildTopicPath("a", "b"));
  });
});
