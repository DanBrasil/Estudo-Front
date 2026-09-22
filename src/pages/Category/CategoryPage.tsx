import { Flex, Heading, Text } from "@radix-ui/themes";
import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { routes } from "@/app/routes";
import { TopicListItem } from "@/components/catalog/TopicListItem";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { useProgress } from "@/features/progress/useProgress";
import { useAsync } from "@/hooks/useAsync";
import { getCategoryWithTopics } from "@/services/catalogService";
import { NotFoundPage } from "@/pages/NotFound/NotFoundPage";

export const CategoryPage = () => {
  const { categorySlug = "" } = useParams<{ categorySlug: string }>();
  const { getStatus } = useProgress();

  const load = useCallback(
    () => getCategoryWithTopics(categorySlug),
    [categorySlug],
  );
  const { state, retry } = useAsync(load);

  switch (state.status) {
    case "loading":
      return <LoadingState label="Carregando categoria..." />;
    case "error":
      return <ErrorState error={state.error} onRetry={retry} />;
    case "success": {
      if (!state.data) return <NotFoundPage />;
      const { category, topics } = state.data;

      return (
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="2">
            <Text size="2" color="gray">
              <Link to={routes.home}>Categorias</Link> / {category.title}
            </Text>
            <Heading as="h2" size="7">
              {category.title}
            </Heading>
            <Text color="gray">{category.description}</Text>
          </Flex>

          {topics.length === 0 ? (
            <EmptyState
              title="Esta categoria ainda nao tem topicos"
              description="Os topicos aparecem aqui assim que forem cadastrados."
            />
          ) : (
            <Flex direction="column" gap="3">
              {topics.map((topic) => (
                <TopicListItem
                  key={topic.id}
                  topic={topic}
                  categorySlug={category.slug}
                  status={getStatus(topic.id)}
                />
              ))}
            </Flex>
          )}
        </Flex>
      );
    }
  }
};
