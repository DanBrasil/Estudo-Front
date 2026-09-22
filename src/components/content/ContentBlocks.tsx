import { Callout, Flex, Text } from "@radix-ui/themes";
import type { ContentBlock } from "@/types/catalog";
import styles from "./ContentBlocks.module.css";

interface ContentBlocksProps {
  blocks: ContentBlock[];
}

export const ContentBlocks = ({ blocks }: ContentBlocksProps) => {
  return (
    <Flex direction="column" gap="4">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "paragraph":
            return (
              <Text key={index} as="p" size="3">
                {block.text}
              </Text>
            );
          case "code":
            return (
              <pre
                key={index}
                className={styles.codeBlock}
                data-language={block.language}
              >
                <code>{block.code}</code>
              </pre>
            );
          case "callout":
            return (
              <Callout.Root
                key={index}
                color={block.tone === "warning" ? "amber" : "blue"}
              >
                <Callout.Text>{block.text}</Callout.Text>
              </Callout.Root>
            );
          default: {
            const exhaustive: never = block;
            return exhaustive;
          }
        }
      })}
    </Flex>
  );
};
