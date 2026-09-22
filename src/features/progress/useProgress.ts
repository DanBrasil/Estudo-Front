import { useContext } from "react";
import { ProgressContext, type ProgressContextValue } from "./progressContext";

export const useProgress = (): ProgressContextValue => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useProgress deve ser usado dentro de <ProgressProvider>");
  }
  return context;
};
