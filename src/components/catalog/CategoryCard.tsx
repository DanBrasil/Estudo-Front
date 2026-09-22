import { Card, Flex, Heading, Progress, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { buildCategoryPath } from "@/app/routes";
import type { CategorySummary } from "@/services/catalogService";
import styles from "./CategoryCard.module.css";

interface CategoryCardProps {
  category: CategorySummary;
  completedCount: number;
}

export const CategoryCard = ({
  category,
  completedCount,
}: CategoryCardProps) => {
  const total = category.topicIds.length;
  const percent = total === 0 ? 0 : Math.round((completedCount / total) * 100);

  return (
    <Card asChild size="3" className={styles.clickableCard}>
      <Link to={buildCategoryPath(category.slug)}>
        <Flex direction="column" gap="3" height="100%">
          <Heading as="h2" size="4">
            {category.title}
          </Heading>
          <Text size="2" color="gray" style={{ flex: 1 }}>
            {category.description}
          </Text>
          <Flex direction="column" gap="1">
            <Progress
              value={percent}
              aria-label={`Progresso em ${category.title}`}
            />
            <Text size="1" color="gray">
              {completedCount} de {total} topicos concluidos
            </Text>
          </Flex>
        </Flex>
      </Link>
    </Card>
  );
};
