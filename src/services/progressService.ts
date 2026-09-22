import type { TopicProgress, TopicStatus } from "@/types/progress";
import { storageKeys } from "./storage/storageKeys";

const validStatuses: readonly TopicStatus[] = [
  "not_started",
  "in_progress",
  "completed",
];

const isTopicProgress = (value: unknown): value is TopicProgress => {
  if (typeof value !== "object" || value === null) return false;
  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.topicId === "string" &&
    typeof candidate.status === "string" &&
    validStatuses.includes(candidate.status as TopicStatus) &&
    typeof candidate.updatedAt === "string"
  );
};

export const loadProgress = (): TopicProgress[] => {
  try {
    const raw = window.localStorage.getItem(storageKeys.progress);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(isTopicProgress) : [];
  } catch {
    return [];
  }
};

export const saveProgress = (items: TopicProgress[]): void => {
  try {
    window.localStorage.setItem(storageKeys.progress, JSON.stringify(items));
  } catch {
    return;
  }
};
