import { screen } from "@testing-library/react";
import Home from "../../src/pages/index";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderWithTheme } from "../../test-utils";

describe("Home page", () => {
	it("should render", () => {
		const queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					refetchOnWindowFocus: false, // default: true
				},
			},
		});

		renderWithTheme(
			<QueryClientProvider client={queryClient}>
				<Home />
			</QueryClientProvider>
		);

		const main = screen.getByRole("main");
		expect(main).toBeInTheDocument();
	});
});
