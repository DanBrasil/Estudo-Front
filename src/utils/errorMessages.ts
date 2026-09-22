import { HttpError } from "@/services/http/HttpError";

export const userMessages = {
  network:
    "Nao foi possivel carregar os dados. Verifique sua conexao e tente novamente.",
  serverError:
    "O servidor esta indisponivel no momento. Tente novamente em instantes.",
  notFound: "Nao encontramos o que voce procurava.",
  unexpected: "Algo deu errado. Tente novamente.",
} as const;

export const getUserErrorMessage = (error: unknown): string => {
  if (error instanceof HttpError) {
    if (error.status === 404) return userMessages.notFound;
    if (error.status >= 500) return userMessages.serverError;
    return userMessages.network;
  }
  return userMessages.unexpected;
};
