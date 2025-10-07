import { useLoginQuery } from "@/hooks/useLoginQuery";
import { Hierarchy } from "@/routes/Hierarchy";
import { Login } from "@/routes/Login";

function App() {
	const { data: userId, isFetching } = useLoginQuery({ secret: null });

	return (
		<div className="flex justify-center">
			{isFetching && <>Loading...</>}
			{!isFetching && userId ? <Hierarchy /> : <Login />}
		</div>
	);
}

export default App;
