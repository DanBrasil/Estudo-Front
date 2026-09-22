import { Badge } from "@radix-ui/themes";
import type { ComponentProps } from "react";
import type { TopicStatus } from "@/types/progress";

type BadgeColor = ComponentProps<typeof Badge>["color"];

const statusPresentation: Record<
  TopicStatus,
  { label: string; color: BadgeColor }
> = {
  not_started: { label: "Nao iniciado", color: "gray" },
  in_progress: { label: "Em andamento", color: "amber" },
  completed: { label: "Concluido", color: "green" },
};

interface StatusBadgeProps {
  status: TopicStatus;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  const { label, color } = statusPresentation[status];
  return (
    <Badge color={color} variant="soft">
      {label}
    </Badge>
  );
};
