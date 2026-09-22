import { Button, Callout, Flex } from "@radix-ui/themes";
import { getUserErrorMessage } from "@/utils/errorMessages";

interface ErrorStateProps {
  error: unknown;
  onRetry?: () => void;
}

export const ErrorState = ({ error, onRetry }: ErrorStateProps) => {
  return (
    <Callout.Root color="red" role="alert">
      <Flex align="center" justify="between" gap="4" wrap="wrap">
        <Callout.Text>{getUserErrorMessage(error)}</Callout.Text>
        {onRetry && (
          <Button variant="soft" color="red" onClick={onRetry}>
            Tentar novamente
          </Button>
        )}
      </Flex>
    </Callout.Root>
  );
};
