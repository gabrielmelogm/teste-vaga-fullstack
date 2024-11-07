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
      if (val.length === 11) {
        return !validateCpf(val);
      }
    },
    {
      message: "Formato do cpf inválido",
    },
  )
  .refine((val) => val.length >= 12 && val.length <= 13, {
    message: "Cpf/Cpnj inválido",
  })
  .refine(
    (val) => {
      if (val.length === 14) {
        return validateCnpj(val);
      }
    },
    {
      message: "Formato do cnpj inválido",
    },
  );

export function validateDocument(document: string) {
  return documentValidate.safeParse(document);
}
