import { Flex, Heading, Text } from "@radix-ui/themes";

interface EmptyStateProps {
  title: string;
  description?: string;
}

export const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <Flex direction="column" align="center" gap="2" py="8">
      <Heading as="h2" size="4">
        {title}
      </Heading>
      {description && (
        <Text color="gray" align="center">
          {description}
        </Text>
      )}
    </Flex>
  );
};
