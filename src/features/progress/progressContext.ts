import { createContext } from "react";
import type { TopicStatus } from "@/types/progress";

export interface ProgressContextValue {
  getStatus: (topicId: string) => TopicStatus;
  setStatus: (topicId: string, status: TopicStatus) => void;
  countCompleted: (topicIds: string[]) => number;
}

export const ProgressContext = createContext<ProgressContextValue | null>(null);
