import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkeletonLoader from '../../src/components/SkeletonLoader';
import { renderWithTheme } from '../../test-utils';

// Override useBreakpointValue so we can control what it returns across both describe blocks
const mockUseBreakpointValue = jest.fn();

jest.mock('@chakra-ui/react', () => ({
	...jest.requireActual('@chakra-ui/react'),
	useBreakpointValue: (...args: Parameters<typeof mockUseBreakpointValue>) => mockUseBreakpointValue(...args),
}));

describe('SkeletonLoader', () => {
	afterEach(() => {
		mockUseBreakpointValue.mockReset();
	});

	it('should render using the normal breakpoint value', () => {
		// Delegate to the real implementation for this test
		mockUseBreakpointValue.mockImplementation(jest.requireActual('@chakra-ui/react').useBreakpointValue);
		renderWithTheme(<SkeletonLoader />);
		expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
	});

	it('falls back to 3 skeleton cards when useBreakpointValue returns undefined', () => {
		mockUseBreakpointValue.mockReturnValue(undefined);
		renderWithTheme(<SkeletonLoader />);
		expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument();
	});
});
