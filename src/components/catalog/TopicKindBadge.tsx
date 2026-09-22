import { Badge } from "@radix-ui/themes";
import type { Topic } from "@/types/catalog";

const kindLabel: Record<Topic["kind"], string> = {
  concept: "Conceito",
  exercise: "Exercicio",
};

interface TopicKindBadgeProps {
  kind: Topic["kind"];
}

export const TopicKindBadge = ({ kind }: TopicKindBadgeProps) => {
  return (
    <Badge variant="outline" color="gray">
      {kindLabel[kind]}
    </Badge>
  );
};
