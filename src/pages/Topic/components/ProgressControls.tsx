import { Button, Flex } from "@radix-ui/themes";
import { StatusBadge } from "@/components/progress/StatusBadge";
import type { TopicStatus } from "@/types/progress";

interface ProgressControlsProps {
  status: TopicStatus;
  onChange: (status: TopicStatus) => void;
}

export const ProgressControls = ({
  status,
  onChange,
}: ProgressControlsProps) => {
  return (
    <Flex align="center" gap="3" wrap="wrap">
      <StatusBadge status={status} />
      {status !== "in_progress" && status !== "completed" && (
        <Button variant="soft" onClick={() => onChange("in_progress")}>
          Marcar em andamento
        </Button>
      )}
      {status !== "completed" && (
        <Button onClick={() => onChange("completed")}>
          Marcar como concluido
        </Button>
      )}
      {status !== "not_started" && (
        <Button
          variant="ghost"
          color="gray"
          onClick={() => onChange("not_started")}
        >
          Reiniciar
        </Button>
      )}
    </Flex>
  );
};
