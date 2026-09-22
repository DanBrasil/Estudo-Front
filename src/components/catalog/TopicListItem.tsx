import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import { buildTopicPath } from "@/app/routes";
import { StatusBadge } from "@/components/progress/StatusBadge";
import type { Topic } from "@/types/catalog";
import type { TopicStatus } from "@/types/progress";
import styles from "./TopicListItem.module.css";
import { TopicKindBadge } from "./TopicKindBadge";

interface TopicListItemProps {
  topic: Topic;
  categorySlug: string;
  status: TopicStatus;
}

export const TopicListItem = ({
  topic,
  categorySlug,
  status,
}: TopicListItemProps) => {
  return (
    <Card asChild className={styles.clickableCard}>
      <Link to={buildTopicPath(categorySlug, topic.slug)}>
        <Flex align="center" justify="between" gap="4" wrap="wrap">
          <Flex direction="column" gap="1">
            <Heading as="h3" size="3">
              {topic.title}
            </Heading>
            <Text size="2" color="gray">
              {topic.summary}
            </Text>
          </Flex>
          <Flex gap="2" align="center">
            <TopicKindBadge kind={topic.kind} />
            <StatusBadge status={status} />
          </Flex>
        </Flex>
      </Link>
    </Card>
  );
};
