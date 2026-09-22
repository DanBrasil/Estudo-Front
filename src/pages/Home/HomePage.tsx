import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { CategoryCard } from "@/components/catalog/CategoryCard";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ErrorState } from "@/components/feedback/ErrorState";
import { LoadingState } from "@/components/feedback/LoadingState";
import { useProgress } from "@/features/progress/useProgress";
import { useAsync } from "@/hooks/useAsync";
import { getCategoriesSummary } from "@/services/catalogService";

export const HomePage = () => {
  const { state, retry } = useAsync(getCategoriesSummary);
  const { countCompleted } = useProgress();

  return (
    <Flex direction="column" gap="6">
      <Flex direction="column" gap="2">
        <Heading as="h2" size="7">
          Categorias
        </Heading>
        <Text color="gray">
          Escolha uma trilha. Cada topico tem um "como fazer" e um "faca voce".
        </Text>
      </Flex>

      {(() => {
        switch (state.status) {
          case "loading":
            return <LoadingState label="Carregando categorias..." />;
          case "error":
            return <ErrorState error={state.error} onRetry={retry} />;
          case "success":
            if (state.data.length === 0) {
              return (
                <EmptyState
                  title="Nenhuma categoria cadastrada"
                  description="Adicione categorias em src/data/catalog.ts."
                />
              );
            }
            return (
              <Grid columns={{ initial: "1", sm: "2", lg: "3" }} gap="4">
                {state.data.map((category) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    completedCount={countCompleted(category.topicIds)}
                  />
                ))}
              </Grid>
            );
        }
      })()}
    </Flex>
  );
};
