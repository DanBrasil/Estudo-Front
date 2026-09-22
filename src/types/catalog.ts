export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "code"; language: "ts" | "js" | "tsx"; code: string }
  | { type: "callout"; tone: "info" | "warning"; text: string };

export interface Category {
  id: string;
  slug: string;
  title: string;
  description: string;
  order: number;
}

interface TopicBase {
  id: string;
  slug: string;
  categoryId: string;
  title: string;
  summary: string;
  howTo: ContentBlock[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  description?: string;
}

export interface ExerciseTopic extends TopicBase {
  kind: "exercise";
  statement: ContentBlock[];
  starterCode: string;
  testCases: TestCase[];
  solution: ContentBlock[];
}

export interface ConceptTopic extends TopicBase {
  kind: "concept";
  challenge: ContentBlock[];
  answer: ContentBlock[];
}

export type Topic = ExerciseTopic | ConceptTopic;
