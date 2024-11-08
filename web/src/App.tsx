import { columns } from "./components/data/columns";
import { DataTable } from "./components/data/data-table";
import { FileUpload } from "./components/file-upload";
import { useData } from "./hooks/useData";

function App() {
	const { data } = useData();

	return (
		<main className="w-screen h-screen flex flex-col items-center justify-center">
			{data.length === 0 ? (
				<FileUpload />
			) : (
				<div className="w-[80%]">
					<h2 className="text-sm">{data.length} dados processados</h2>
					<div className="pt-2">
						<DataTable columns={columns} data={data} />
					</div>
				</div>
			)}
		</main>
	);
}

export default App;
