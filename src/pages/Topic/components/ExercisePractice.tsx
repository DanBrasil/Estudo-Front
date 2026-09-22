import { Flex, Heading, Table, Text } from "@radix-ui/themes";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import type { ExerciseTopic } from "@/types/catalog";
import { RevealSection } from "./RevealSection";

interface ExercisePracticeProps {
  topic: ExerciseTopic;
}

export const ExercisePractice = ({ topic }: ExercisePracticeProps) => {
  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="3">
        <Heading as="h3" size="4">
          Enunciado
        </Heading>
        <ContentBlocks blocks={topic.statement} />
      </Flex>

      <Flex direction="column" gap="3">
        <Heading as="h3" size="4">
          Codigo inicial
        </Heading>
        <ContentBlocks
          blocks={[{ type: "code", language: "ts", code: topic.starterCode }]}
        />
      </Flex>

      <Flex direction="column" gap="3">
        <Heading as="h3" size="4">
          Casos de teste
        </Heading>
        {topic.testCases.length === 0 ? (
          <Text color="gray">Nenhum caso de teste cadastrado.</Text>
        ) : (
          <Table.Root variant="surface">
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>Entrada</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Saida esperada</Table.ColumnHeaderCell>
                <Table.ColumnHeaderCell>Descricao</Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {topic.testCases.map((testCase, index) => (
                <Table.Row key={index}>
                  <Table.Cell>
                    <code>{testCase.input}</code>
                  </Table.Cell>
                  <Table.Cell>
                    <code>{testCase.expectedOutput}</code>
                  </Table.Cell>
                  <Table.Cell>{testCase.description ?? "-"}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        )}
      </Flex>

      <RevealSection label="Revelar solucao">
        <Flex direction="column" gap="3">
          <Heading as="h3" size="4">
            Solucao
          </Heading>
          <ContentBlocks blocks={topic.solution} />
        </Flex>
      </RevealSection>
    </Flex>
  );
};
