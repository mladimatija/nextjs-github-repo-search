import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Item from "../../src/components/Item";
import { renderWithTheme } from "../../test-utils";
import type { Repository } from "../../src/components/ItemsContainer";

describe("Item", () => {
	const mockData = {
		name: "test-repo",
		html_url: "https://github.com/test/test-repo",
		description: "This is a test repository.",
		owner: {
			login: "testuser",
			html_url: "https://github.com/testuser",
		},
		stargazers_count: 10,
		watchers_count: 5,
		forks_count: 2,
		license: {
			name: "MIT",
			url: "https://opensource.org/licenses/MIT",
		},
	} as Repository;

	let elem: HTMLElement;

	beforeEach(() => {
		renderWithTheme(<Item data={mockData} />);
		elem = screen.getByTestId("item");
	});

	it("renders without errors", () => {
		expect(elem).toBeInTheDocument();
	});

	it("updates state on mouse enter and leave", () => {
		expect(elem.style.top).toBe("0px");
		fireEvent.mouseEnter(elem);
		expect(elem.style.top).toBe("-10px");
		fireEvent.mouseLeave(elem);
		expect(elem.style.top).toBe("0px");
	});

	it("displays the repository name", () => {
		const nameElement = screen.getByText(mockData.name);
		expect(nameElement).toBeInTheDocument();
	});

	it("displays the repository description", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const descriptionElement = screen.getByText(mockData.description);
		expect(descriptionElement).toBeInTheDocument();
	});

	it("displays the repository owner", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const ownerElement = screen.getByText(mockData.owner.login);
		expect(ownerElement).toBeInTheDocument();
	});

	it("displays the number of stargazers", () => {
		const stargazersElement = screen.getByText(mockData.stargazers_count.toString());
		expect(stargazersElement).toBeInTheDocument();
	});

	it("displays the number of watchers", () => {
		const watchersElement = screen.getByText(mockData.watchers_count.toString());
		expect(watchersElement).toBeInTheDocument();
	});

	it("displays the number of forks", () => {
		const forksElement = screen.getByText(mockData.forks_count.toString());
		expect(forksElement).toBeInTheDocument();
	});

	it("displays the license", () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		const licenseElement = screen.getByText(mockData.license.name);
		expect(licenseElement).toBeInTheDocument();
	});
});
