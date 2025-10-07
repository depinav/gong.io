import { QueryClient } from "@tanstack/react-query";
import { getByTestId } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { renderWithClient } from "../../tests/utils.tsx";
import { TextInput } from "./TextInput.tsx";

describe("TextInput", () => {
	it("renders the TextInput component", () => {
		function Page() {
			return <TextInput label="Test" onChange={() => {}} />;
		}
		const queryClient = new QueryClient();
		const rendered = renderWithClient(queryClient, <Page />);
		expect(
			getByTestId(rendered.container, "text-input-container"),
		).toBeInTheDocument();
	});
	it("changes the value when a user types", async () => {
		const user = userEvent.setup();
		function Page() {
			return <TextInput label="Test" onChange={() => {}} />;
		}
		const queryClient = new QueryClient();
		const rendered = renderWithClient(queryClient, <Page />);

		const input = rendered.getByTestId("input-field");

		expect(input).not.toHaveValue();

		await user.type(input, "Hello");

		expect(input).toHaveValue("Hello");
	});
});
