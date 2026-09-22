import { Flex, Heading } from "@radix-ui/themes";
import { ContentBlocks } from "@/components/content/ContentBlocks";
import type { ConceptTopic } from "@/types/catalog";
import { RevealSection } from "./RevealSection";

interface ConceptPracticeProps {
  topic: ConceptTopic;
}

export const ConceptPractice = ({ topic }: ConceptPracticeProps) => {
  return (
    <Flex direction="column" gap="5">
      <Flex direction="column" gap="3">
        <Heading as="h3" size="4">
          Desafio
        </Heading>
        <ContentBlocks blocks={topic.challenge} />
      </Flex>
      <RevealSection label="Revelar resposta">
        <Flex direction="column" gap="3">
          <Heading as="h3" size="4">
            Resposta
          </Heading>
          <ContentBlocks blocks={topic.answer} />
        </Flex>
      </RevealSection>
    </Flex>
  );
};
