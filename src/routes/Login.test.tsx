import { QueryClient } from "@tanstack/react-query";
import { getByTestId } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { renderWithClient } from "../../tests/utils.tsx";
import { Login } from "./Login";

describe("Login", () => {
	it("renders the Login component", () => {
		function Page() {
			return <Login />;
		}
		const queryClient = new QueryClient();
		const rendered = renderWithClient(queryClient, <Page />);
		expect(getByTestId(rendered.container, "login-header")).toBeInTheDocument();
	});
});
