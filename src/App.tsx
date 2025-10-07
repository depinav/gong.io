import { cva, type VariantProps } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import { useLoginQuery } from "@/hooks/useLoginQuery";
import { Hierarchy } from "@/routes/Hierarchy";
import { Login } from "@/routes/Login";

const appVariants = cva(["flex", "justify-center"]);

export interface AppVariants extends VariantProps<typeof appVariants> {}

export const app = (variants: AppVariants) => twMerge(appVariants(variants));

function App() {
	const { data: userId, isFetching } = useLoginQuery({ secret: null });

	return (
		<div className={app({})}>
			{!isFetching ? userId ? <Hierarchy /> : <Login /> : <>Loading...</>}
		</div>
	);
}

export default App;
