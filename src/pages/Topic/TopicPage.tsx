import { Box, Flex, Heading, Tabs, Text } from "@radix-ui/themes";
import { useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { buildCategoryPath, routes } from "@/app/routes";
import { TopicKindBadge } from "@/components/catalog/TopicKindBadge";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { useProgress } from "@/features/progress/useProgress";
import { useAsync } from "@/hooks/useAsync";
import { NotFoundPage } from "@/pages/NotFound/NotFoundPage";
import { getTopicBySlug } from "@/services/catalogService";
import type { Topic } from "@/types/catalog";
import { ConceptPractice } from "./components/ConceptPractice";
import { ExercisePractice } from "./components/ExercisePractice";
import { ProgressControls } from "./components/ProgressControls";

const PracticeSection = ({ topic }: { topic: Topic }) => {
  switch (topic.kind) {
    case "concept":
      return <ConceptPractice topic={topic} />;
    case "exercise":
      return <ExercisePractice topic={topic} />;
  }
};

export const TopicPage = () => {
  const { categorySlug = "", topicSlug = "" } = useParams<{
    categorySlug: string;
    topicSlug: string;
  }>();
  const { getStatus, setStatus } = useProgress();

  const load = useCallback(
    () => getTopicBySlug(categorySlug, topicSlug),
    [categorySlug, topicSlug],
  );
  const { state, retry } = useAsync(load);

  switch (state.status) {
    case "loading":
      return <LoadingState label="Carregando topico..." />;
    case "error":
      return <ErrorState error={state.error} onRetry={retry} />;
    case "success": {
      if (!state.data) return <NotFoundPage />;
      const { category, topic } = state.data;

      return (
        <Flex direction="column" gap="6">
          <Flex direction="column" gap="3">
            <Text size="2" color="gray">
              <Link to={routes.home}>Categorias</Link> /{" "}
              <Link to={buildCategoryPath(category.slug)}>
                {category.title}
              </Link>{" "}
              / {topic.title}
            </Text>
            <Flex align="center" gap="3" wrap="wrap">
              <Heading as="h2" size="7">
                {topic.title}
              </Heading>
              <TopicKindBadge kind={topic.kind} />
            </Flex>
            <Text color="gray">{topic.summary}</Text>
            <ProgressControls
              status={getStatus(topic.id)}
              onChange={(status) => setStatus(topic.id, status)}
            />
          </Flex>

          <Tabs.Root defaultValue="how-to">
            <Tabs.List>
              <Tabs.Trigger value="how-to">Como fazer</Tabs.Trigger>
              <Tabs.Trigger value="practice">Faca voce</Tabs.Trigger>
            </Tabs.List>
            <Box pt="5">
              <Tabs.Content value="how-to">
                <ContentBlocks blocks={topic.howTo} />
              </Tabs.Content>
              <Tabs.Content value="practice">
                <PracticeSection topic={topic} />
              </Tabs.Content>
            </Box>
          </Tabs.Root>
        </Flex>
      );
    }
  }
};
