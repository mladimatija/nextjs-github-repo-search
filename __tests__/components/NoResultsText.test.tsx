import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import NoResultsText from "../../src/components/NoResultsText";
import { renderWithTheme } from "../../test-utils";

describe("NoResultsText", () => {
	it("should render", () => {
		renderWithTheme(<NoResultsText highlight={""} />);
		const elem = screen.getByTestId("no-results-text");
		expect(elem).toBeInTheDocument();
	});
});
