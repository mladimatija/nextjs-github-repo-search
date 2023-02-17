import { act, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainContent from "../../src/components/MainContent";
import { renderWithTheme } from "../../test-utils";
import type { FC17 } from "react";
import React from "react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("MainContent", () => {
	const CreateQueryWrapper: FC17 = ({ children }) => {
		// creates a new QueryClient for each test
		const queryClient = new QueryClient();
		return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	};

	test("renders search bar and heading", () => {
		renderWithTheme(
			<CreateQueryWrapper>
				<MainContent />
			</CreateQueryWrapper>
		);

		expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Discover interesting open-source projects");
		expect(screen.getByPlaceholderText("Search by name, description, tags...")).toBeInTheDocument();
	});

	// TODO fix failing tests

	/*test("displays items when search is performed", async () => {
		const mockData = [
			{ id: 1, name: "repo1" },
			{ id: 2, name: "repo2" },
		];
		const mockOctokit = {
			request: jest.fn().mockResolvedValueOnce({ data: { items: mockData, total_count: 2 } }),
		};
		jest.spyOn(React, "useMemo").mockImplementation((fn) => fn());

		renderWithTheme(
			<CreateQueryWrapper>
				<MainContent />
			</CreateQueryWrapper>
		);
		await userEvent.type(screen.getByPlaceholderText("Search by name, description, tags..."), "react");

		expect(mockOctokit.request).toHaveBeenCalledWith("GET /search/repositories", { q: "react", per_page: 12, page: 1 });
		expect(screen.getByText("1-2 of 2 results")).toBeInTheDocument();
		expect(screen.getAllByRole("listitem")).toHaveLength(2);
	});

	test("displays 'No results found' when search has no results", async () => {
		const mockOctokit = {
			request: jest.fn().mockResolvedValueOnce({ data: { items: [], total_count: 0 } }),
		};
		jest.spyOn(React, "useMemo").mockImplementation((fn) => fn());

		renderWithTheme(
			<CreateQueryWrapper>
				<MainContent />
			</CreateQueryWrapper>
		);

		fireEvent.change(screen.getByPlaceholderText("Search by name, description, tags..."), {
			target: { value: "some non-existent search term" },
		});

		await act(async () => {
			await new Promise((resolve) => setTimeout(resolve, 2000));
		});

		expect(mockOctokit.request).toHaveBeenCalledWith("GET /search/repositories", {
			q: "some non-existent search term",
			per_page: 12,
			page: 1,
		});
		expect(screen.getByText("No results found for 'some non-existent search term'")).toBeInTheDocument();
	});*/
});
