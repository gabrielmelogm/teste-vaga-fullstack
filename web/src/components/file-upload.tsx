import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";

export function FileUpload() {
	return (
		<Card className="w-[400px]">
			<CardHeader>
				<CardTitle>Extrair dados</CardTitle>
				<CardDescription>
					Faça upload do arquivo csv para extrair os dados
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form className="flex flex-1 flex-col gap-2">
					<Input type="file" accept=".csv" />
					<Button className="w-full">Extrair</Button>
				</form>
			</CardContent>
		</Card>
	);
}
