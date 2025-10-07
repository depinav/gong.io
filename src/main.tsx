import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App.tsx";
import "@/index.css";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";

const container = document.getElementById("root");

if (container) {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				gcTime: 1000 * 60 * 60 * 24, // 24 hours
			},
		},
	});

	const persister = createAsyncStoragePersister({
		storage: window.localStorage,
	});

	const root = createRoot(container);
	root.render(
		<StrictMode>
			<PersistQueryClientProvider
				client={queryClient}
				persistOptions={{ persister }}
			>
				<App />
				<ReactQueryDevtools initialIsOpen={false} />
			</PersistQueryClientProvider>
		</StrictMode>,
	);
} else {
	// Handle the error, for example:
	console.error("Failed to find the root element.");
}
