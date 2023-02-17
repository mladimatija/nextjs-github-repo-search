import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaginationContainer from "../../src/components/PaginationContainer";
import { renderWithTheme } from "../../test-utils";

describe("PaginationContainer", () => {
	it("should render", () => {
		renderWithTheme(
			<PaginationContainer
				currentPage={1}
				pages={[1]}
				isFetching={false}
				itemsCount={0}
				itemsPerPage={1}
				onPageChange={() => null}
				resultsTotal={0}
			/>
		);
		const elem = screen.getByTestId("pagination-container");
		expect(elem).toBeInTheDocument();
	});

	describe("should render the correct text", () => {
		it("with valid props", () => {
			const resultsTotal = 25;
			const currentPage = 2;
			const itemsPerPage = 10;
			const pages = [1, 2, 3];

			renderWithTheme(
				<PaginationContainer
					resultsTotal={resultsTotal}
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					pages={pages}
					isFetching={false}
					itemsCount={resultsTotal}
					onPageChange={() => null}
				/>
			);
			const elem = screen.getByTestId("pagination-results-text");

			const from = currentPage * itemsPerPage + 1;
			const to = currentPage * itemsPerPage + itemsPerPage;
			const expectedText = `Showing ${from} - ${to} of ${resultsTotal} results.`;

			expect(elem.textContent).toBe(expectedText);
		});

		it("when on the first page", () => {
			const resultsTotal = 25;
			const currentPage = 1;
			const itemsPerPage = 10;
			const pages = [1, 2, 3];

			renderWithTheme(
				<PaginationContainer
					resultsTotal={resultsTotal}
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					pages={pages}
					isFetching={false}
					itemsCount={resultsTotal}
					onPageChange={() => null}
				/>
			);
			const elem = screen.getByTestId("pagination-results-text");

			const from = 1;
			const expectedText = `Showing ${from} - ${itemsPerPage} of ${resultsTotal} results.`;

			expect(elem.textContent).toBe(expectedText);
		});

		it("when there is only one page", () => {
			const resultsTotal = 8;
			const currentPage = 1;
			const itemsPerPage = 10;
			const pages = [1];

			renderWithTheme(
				<PaginationContainer
					resultsTotal={resultsTotal}
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					pages={pages}
					isFetching={false}
					itemsCount={resultsTotal}
					onPageChange={() => null}
				/>
			);
			const elem = screen.getByTestId("pagination-results-text");

			const from = 1;
			const expectedText = `Showing ${from} - ${resultsTotal} of ${resultsTotal} results.`;

			expect(elem.textContent).toBe(expectedText);
		});

		it("when resultsTotal is less than itemsPerPage", () => {
			const resultsTotal = 5;
			const currentPage = 1;
			const itemsPerPage = 10;
			const pages = [1];

			renderWithTheme(
				<PaginationContainer
					resultsTotal={resultsTotal}
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					pages={pages}
					isFetching={false}
					itemsCount={resultsTotal}
					onPageChange={() => null}
				/>
			);

			const from = 1;
			const expectedText = `Showing ${from} - ${resultsTotal} of ${resultsTotal} results.`;
			const elem = screen.getByTestId("pagination-results-text");

			expect(elem.textContent).toBe(expectedText);
		});

		it("when itemsPerPage is less than resultsTotal", () => {
			const resultsTotal = 22;
			const currentPage = 1;
			const itemsPerPage = 10;
			const pages = [1, 2, 3];

			renderWithTheme(
				<PaginationContainer
					resultsTotal={resultsTotal}
					currentPage={currentPage}
					itemsPerPage={itemsPerPage}
					pages={pages}
					isFetching={false}
					itemsCount={25}
					onPageChange={() => null}
				/>
			);
			const elem = screen.getByTestId("pagination-results-text");

			const from = 1;
			const expectedText = `Showing ${from} - ${itemsPerPage} of ${resultsTotal} results.`;

			expect(elem.textContent).toBe(expectedText);
		});
	});
});
