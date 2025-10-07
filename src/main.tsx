import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const container = document.getElementById("root");

if (container) {
	const queryClient = new QueryClient();
	const root = createRoot(container);
	root.render(
		<StrictMode>
			<QueryClientProvider client={queryClient}>
				<App />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</StrictMode>,
	);
} else {
	// Handle the error, for example:
	console.error("Failed to find the root element.");
}
