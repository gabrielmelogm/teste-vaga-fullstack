import { createContext, ReactNode, useContext, useState } from "react";

export interface DataRowProps {
	nrInst: string;
	nrAgencia: string;
	cdClient: string;
	nmClient: string;
	nrCpfCnpj: string;
	nrContrato: string;
	dtContrato: string;
	qtPrestacoes: number;
	vlTotal: number;
	cdProduto: string;
	dsProduto: string;
	cdCarteira: string;
	dsCarteira: string;
	nrProposta: string;
	nrPresta: string;
	tpPresta: string;
	nrSeqPre: string;
	dtVctPre: string;
	vlPresta: number;
	vlMora: number;
	vlMulta: number;
	vlOutAcr: number;
	vlIof: number;
	vlDescon: number;
	vlAtual: number;
	idSituac: string;
	idSitVen: string;
	errors: any;
}

type DataContextData = {
	data: DataRowProps[];
	fetchData: (file: File) => Promise<void>;
};

const Data = createContext<DataContextData>({} as DataContextData);

export function DataProvider({ children }: { children: ReactNode }) {
	const [data, setData] = useState<DataRowProps[]>([]);

	const fetchData = async (file: File) => {
		const formData = new FormData();
		if (!file) return;
		formData.append("file", file);
		const response = await fetch("http://localhost:3000", {
			method: "POST",
			body: formData,
		});

		response.body
			?.pipeThrough(new TextDecoderStream())
			.pipeThrough(parseStrToJSON())
			.pipeTo(
				new WritableStream({
					write(chunk) {
						setData(prevData => [...prevData, chunk])
					},
				}),
			);
	};

	function parseStrToJSON() {
		return new TransformStream({
			transform(chunk, controller) {
				for (const item of chunk.split("\n")) {
					if (!item.length) continue;
					try {
						controller.enqueue(JSON.parse(item));
					} catch (error) {
						console.error(error);
						continue;
					}
				}
			},
		});
	}
	return <Data.Provider value={{ data, fetchData }}>{children}</Data.Provider>;
}

export function useData() {
	const context = useContext(Data);
	return context;
}
