import { Flex, Spinner, Text } from "@radix-ui/themes";

interface LoadingStateProps {
  label?: string;
}

export const LoadingState = ({
  label = "Carregando...",
}: LoadingStateProps) => {
  return (
    <Flex align="center" gap="3" py="6" role="status" aria-live="polite">
      <Spinner size="3" />
      <Text color="gray">{label}</Text>
    </Flex>
  );
};
