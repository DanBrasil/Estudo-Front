import type { TopicProgress, TopicStatus } from "@/types/progress";

export type ProgressState = Record<string, TopicProgress>;

export type ProgressAction =
  | { type: "hydrate"; items: TopicProgress[] }
  | { type: "setStatus"; topicId: string; status: TopicStatus; now: string };

export const initialProgressState: ProgressState = {};

export const fromList = (items: TopicProgress[]): ProgressState =>
  Object.fromEntries(items.map((item) => [item.topicId, item]));

export const toList = (state: ProgressState): TopicProgress[] =>
  Object.values(state);

export const progressReducer = (
  state: ProgressState,
  action: ProgressAction,
): ProgressState => {
  switch (action.type) {
    case "hydrate":
      return fromList(action.items);

    case "setStatus": {
      const current = state[action.topicId];
      if (current?.status === action.status) return state;

      return {
        ...state,
        [action.topicId]: {
          topicId: action.topicId,
          status: action.status,
          updatedAt: action.now,
        },
      };
    }
  }
};
