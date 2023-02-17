import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SkeletonLoader from "../../src/components/SkeletonLoader";
import { renderWithTheme } from "../../test-utils";

describe("SkeletonLoader", () => {
	it("should render", () => {
		renderWithTheme(<SkeletonLoader />);
		const elem = screen.getByTestId("skeleton-loader");
		expect(elem).toBeInTheDocument();
	});
});
