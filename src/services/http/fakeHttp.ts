import { fakeHttpConfig } from "./config";
import { HttpError } from "./HttpError";

interface SimulateOptions {
  delayMs?: number;
  failureRate?: number;
}

const randomBetween = (min: number, max: number) =>
  min + Math.random() * (max - min);

const wait = (ms: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, ms));


export const simulateRequest = async <T>(
  resolver: () => T,
  options: SimulateOptions = {},
): Promise<T> => {
  const delayMs =
    options.delayMs ??
    randomBetween(fakeHttpConfig.minDelayMs, fakeHttpConfig.maxDelayMs);
  const failureRate = options.failureRate ?? fakeHttpConfig.failureRate;

  await wait(delayMs);

  if (Math.random() < failureRate) {
    throw new HttpError("Falha simulada de rede", 503);
  }

  return resolver();
};
