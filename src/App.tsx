import { cva, type VariantProps } from "class-variance-authority";
import { Suspense } from "react";
import { twMerge } from "tailwind-merge";
import { Spinner } from "@/components/ui/spinner";
import { useLoginQuery } from "@/hooks/useLoginQuery";
import { Hierarchy } from "@/routes/Hierarchy";
import { Login } from "@/routes/Login";

const appVariants = cva(["flex", "justify-center"]);

export interface AppVariants extends VariantProps<typeof appVariants> {}

export const app = (variants: AppVariants) => twMerge(appVariants(variants));

function App() {
	const secret = window.localStorage.getItem("secret");
	const { data: userId } = useLoginQuery({ secret });

	return (
		<Suspense fallback={<Spinner className="size-8" />}>
			<div className={app({})}>
				{!userId && <Login />}
				{userId && <Hierarchy />}
			</div>
		</Suspense>
	);
}

export default App;
