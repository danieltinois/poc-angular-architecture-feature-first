import { formatZodError } from "@poc/shared-schema";
import { ZodError } from "zod";

export function toUserErrorMessage(error: unknown): string {
  if (error instanceof ZodError) {
    return formatZodError(error).join(" | ");
  }

  if (error instanceof SyntaxError) {
    return "JSON mal formatado.";
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "erro desconhecido";
}
