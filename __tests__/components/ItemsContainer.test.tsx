import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import type { Repository } from "../../src/components/ItemsContainer";
import ItemsContainer from "../../src/components/ItemsContainer";
import { renderWithTheme } from "../../test-utils";

describe("ItemsContainer", () => {
	describe("should render", () => {
		it("empty SimpleGrid element", () => {
			renderWithTheme(<ItemsContainer items={[]} />);
			const elem = screen.getByTestId("items-container");

			expect(elem).toBeInTheDocument();
		});

		it("Item element(s)", () => {
			const testData = [
				{
					html_url: "https://sampleurl.com",
					description: "Sample description.",
					name: "Repository name",
					owner: {
						html_url: "https://sampleurl.com",
						login: "Owner username",
					},
					stargazers_count: 1,
					watchers_count: 2,
					forks_count: 3,
					license: {
						url: "https://sampleurl.com",
						name: "License name",
					},
				},
			] as Repository[];

			renderWithTheme(<ItemsContainer items={testData} />);
			const elem = screen.getByTestId("items-container");

			expect(elem).toContainElement(screen.getByTestId("item"));
		});
	});
});
