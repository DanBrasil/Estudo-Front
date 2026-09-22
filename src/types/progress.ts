export type TopicStatus = "not_started" | "in_progress" | "completed";

export interface TopicProgress {
  topicId: string;
  status: TopicStatus;
  updatedAt: string;
}
