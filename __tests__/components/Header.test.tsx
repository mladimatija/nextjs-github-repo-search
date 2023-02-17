import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "../../src/components/Header";
import { renderWithTheme } from "../../test-utils";

describe("Header", () => {
	it("should render", () => {
		renderWithTheme(<Header />);
		const elem = screen.getByTestId("header");
		expect(elem).toBeInTheDocument();
	});
});
