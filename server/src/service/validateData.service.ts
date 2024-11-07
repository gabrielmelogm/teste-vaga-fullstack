import { z } from "zod";

const dataSchema = z.object({
  nrInst: z.string(),
  nrAgencia: z.string(),
  cdClient: z.string(),
  nmClient: z.string(),
  nrCpfCnpj: z.string(),
  nrContrato: z.string(),
  dtContrato: z.string(),
  qtPrestacoes: z.coerce.number().positive().min(1),
  vlTotal: z.coerce
    .number()
    .positive()
    .transform((value) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value),
    ),
  cdProduto: z.string(),
  dsProduto: z.string(),
  cdCarteira: z.string(),
  dsCarteira: z.string(),
  nrProposta: z.string(),
  nrPresta: z.string(),
  tpPresta: z.string(),
  nrSeqPre: z.string(),
  dtVctPre: z.string(),
  vlPresta: z.coerce
    .number()
    .positive()
    .transform((value) =>
      new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(value),
    ),
  vlMora: z.coerce.number().transform((value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value),
  ),
  vlMulta: z.coerce.number().transform((value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value),
  ),
  vlOutAcr: z.coerce.number().transform((value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value),
  ),
  vlIof: z.coerce.number().transform((value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value),
  ),
  vlDescon: z.coerce.number().transform((value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value),
  ),
  vlAtual: z.coerce.number().transform((value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value),
  ),
  idSituac: z.string(),
  idSitVen: z.string(),
});

export type DataRowProps = z.infer<typeof dataSchema>;

export function validateData(data: any) {
  return dataSchema.safeParse(data);
}
