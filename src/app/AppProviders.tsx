import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { ProgressProvider } from "@/features/progress/ProgressProvider";

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <Theme
      appearance="dark"
      accentColor="blue"
      grayColor="slate"
      radius="medium"
    >
      <ProgressProvider>{children}</ProgressProvider>
    </Theme>
  );
};
