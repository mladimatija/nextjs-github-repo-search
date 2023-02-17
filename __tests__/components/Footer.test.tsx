import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer from "../../src/components/Footer";
import { renderWithTheme } from "../../test-utils";

describe("Footer", () => {
	it("should render", () => {
		renderWithTheme(<Footer />);
		const elem = screen.getByTestId("footer");
		expect(elem).toBeInTheDocument();
	});
});
