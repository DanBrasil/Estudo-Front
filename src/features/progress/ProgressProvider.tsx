import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import { loadProgress, saveProgress } from "@/services/progressService";
import type { TopicStatus } from "@/types/progress";
import { ProgressContext, type ProgressContextValue } from "./progressContext";
import {
  fromList,
  progressReducer,
  toList,
  type ProgressState,
} from "./progressReducer";

interface ProgressProviderProps {
  children: ReactNode;
}

export const ProgressProvider = ({ children }: ProgressProviderProps) => {
  const [state, dispatch] = useReducer(
    progressReducer,
    undefined,
    (): ProgressState => fromList(loadProgress()),
  );

  useEffect(() => {
    saveProgress(toList(state));
  }, [state]);

  const getStatus = useCallback(
    (topicId: string): TopicStatus => state[topicId]?.status ?? "not_started",
    [state],
  );

  const setStatus = useCallback((topicId: string, status: TopicStatus) => {
    dispatch({
      type: "setStatus",
      topicId,
      status,
      now: new Date().toISOString(),
    });
  }, []);

  const countCompleted = useCallback(
    (topicIds: string[]) =>
      topicIds.filter((id) => state[id]?.status === "completed").length,
    [state],
  );

  const value = useMemo<ProgressContextValue>(
    () => ({ getStatus, setStatus, countCompleted }),
    [getStatus, setStatus, countCompleted],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};
