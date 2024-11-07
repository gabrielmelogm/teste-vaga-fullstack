import { z } from "zod";
import { validateCpf } from "./validateCpf.service";
import { validateCnpj } from "./validateCnpj.service";

const documentValidate = z
  .string()
  .min(11, {
    message: "Cpf/Cpnj inválido",
  })
  .refine(
    (val) => {
      if (val.length >= 12 && val.length <= 13) {
        return false;
      }

      if (val.length === 11) {
        return validateCpf(val);
      }

      if (val.length === 14) {
        return validateCnpj(val);
      }
    },
    {
      message: "Cpf/Cpnj inválido",
    },
  );

export function validateDocument(document: string) {
  return documentValidate.safeParse(document);
}
