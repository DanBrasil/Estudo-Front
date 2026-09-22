import { HttpError } from "@/services/http/HttpError";
import { getUserErrorMessage, userMessages } from "./errorMessages";

describe("getUserErrorMessage", () => {
  it("HttpError 5xx vira mensagem de servidor indisponivel", () => {
    expect(getUserErrorMessage(new HttpError("x", 503))).toBe(
      userMessages.serverError,
    );
  });

  it("HttpError 404 vira mensagem de nao encontrado", () => {
    expect(getUserErrorMessage(new HttpError("x", 404))).toBe(
      userMessages.notFound,
    );
  });

  it("outro HttpError vira mensagem de rede", () => {
    expect(getUserErrorMessage(new HttpError("x", 400))).toBe(
      userMessages.network,
    );
  });

  it("erro desconhecido vira mensagem generica, nunca a mensagem tecnica", () => {
    const message = getUserErrorMessage(
      new Error("TypeError: undefined is not a function"),
    );
    expect(message).toBe(userMessages.unexpected);
    expect(message).not.toContain("TypeError");
  });

  it("aceita valores que nem sao Error", () => {
    expect(getUserErrorMessage("string qualquer")).toBe(
      userMessages.unexpected,
    );
    expect(getUserErrorMessage(undefined)).toBe(userMessages.unexpected);
  });
});
