import { Button, Flex } from "@radix-ui/themes";
import { useState, type ReactNode } from "react";

interface RevealSectionProps {
  label: string;
  children: ReactNode;
}

export const RevealSection = ({ label, children }: RevealSectionProps) => {
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <Flex>
        <Button variant="soft" onClick={() => setRevealed(true)}>
          {label}
        </Button>
      </Flex>
    );
  }

  return <>{children}</>;
};
