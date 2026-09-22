import { useCallback, useEffect, useState } from "react";

export type AsyncState<T> =
  | { status: "loading" }
  | { status: "error"; error: unknown }
  | { status: "success"; data: T };

interface UseAsyncResult<T> {
  state: AsyncState<T>;
  retry: () => void;
}

interface SettledResult<T> {
  operation: () => Promise<T>;
  attempt: number;
  state: AsyncState<T>;
}

const loading: AsyncState<never> = { status: "loading" };

export const useAsync = <T>(operation: () => Promise<T>): UseAsyncResult<T> => {
  const [attempt, setAttempt] = useState(0);
  const [settled, setSettled] = useState<SettledResult<T> | null>(null);

  useEffect(() => {
    let cancelled = false;

    operation()
      .then((data) => {
        if (!cancelled) {
          setSettled({
            operation,
            attempt,
            state: { status: "success", data },
          });
        }
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setSettled({ operation, attempt, state: { status: "error", error } });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [operation, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  const isCurrent =
    settled !== null &&
    settled.operation === operation &&
    settled.attempt === attempt;

  return { state: isCurrent ? settled.state : loading, retry };
};
