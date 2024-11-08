import { DataRowProps } from "@/hooks/useData";
import { ColumnDef } from "@tanstack/react-table";
import { TriangleAlert } from "lucide-react";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "../ui/tooltip";

export const columns: ColumnDef<DataRowProps>[] = [
	{
		accessorKey: "nrCpfCnpj",
		header: "CPF/CNPJ",
	},
	{
		accessorKey: "vlPresta",
		header: "Vlr. Prestação",
	},
	{
		accessorKey: "qtPrestacoes",
		header: "Qtd. Prestações",
	},
	{
		accessorKey: "vlTotal",
		header: "Vlr. Total",
	},
	{
		accessorKey: "errors",
		header: "Erros",
		cell: ({ row }) => {
			const errorsCol = row.getValue("errors") as any;
			return (
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div className="flex items-center gap-2 text-red-500">
								<TriangleAlert size={18} />
								{Object.entries(errorsCol).length} erros
							</div>
						</TooltipTrigger>
						<TooltipContent>
							<ul>
								{Object.entries(errorsCol).map((attr, value) => {
									return attr.map((a) => {
										return <p>{a}</p>;
									});
								})}
							</ul>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			);
		},
	},
];
