import { ChangeEvent, FormEvent, useState } from "react";
import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { useData } from "@/hooks/useData";

export function FileUpload() {
	const { fetchData } = useData();
	const [file, setFile] = useState<File | null>(null);

	const fetchStreamData = async (e: FormEvent) => {
		e.preventDefault();
		if (file) {
			await fetchData(file);
		}
	};

	function onFileInputChange(e: ChangeEvent<HTMLInputElement>) {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	}

	return (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle>Extrair dados</CardTitle>
				<CardDescription>
					Faça upload do arquivo csv para extrair os dados
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="flex flex-1 flex-col gap-2" onSubmit={fetchStreamData}>
					<Input type="file" accept=".csv" onChange={onFileInputChange} />
					<Button className="w-full">Extrair</Button>
				</form>
			</CardContent>
		</Card>
	);
}
