import { DataRowProps } from "@/hooks/useData";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<DataRowProps>[] = [
	{
		accessorKey: "nrCpfCnpj",
		header: "CPF/CNPJ"
	},
	{
		accessorKey: "vlPresta",
		header: "Vlr. Prestação"
	},
	{
		accessorKey: "qtPrestacoes",
		header: "Qtd. Prestações"
	},
	{
		accessorKey: "vlTotal",
		header: "Vlr. Total"
	},
]
