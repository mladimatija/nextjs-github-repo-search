import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Pagination from '../../src/components/Pagination';
import { renderWithTheme } from '../../test-utils';

describe('Pagination', () => {
	const defaultProps = {
		pagesCount: 5,
		currentPage: 3,
		onPageChange: jest.fn(),
		pages: [1, 2, 3, 4, 5],
		isFetching: false,
		resultsTotal: 50,
		itemsCount: 10,
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('calls onPageChange with currentPage - 1 when Previous is clicked', async () => {
		const onPageChange = jest.fn();
		renderWithTheme(<Pagination {...defaultProps} onPageChange={onPageChange} />);
		await userEvent.click(screen.getByText('Previous'));
		expect(onPageChange).toHaveBeenCalledWith(2);
	});

	it('calls onPageChange with currentPage + 1 when Next is clicked', async () => {
		const onPageChange = jest.fn();
		renderWithTheme(<Pagination {...defaultProps} onPageChange={onPageChange} />);
		await userEvent.click(screen.getByText('Next'));
		expect(onPageChange).toHaveBeenCalledWith(4);
	});

	it('does not call onPageChange when Previous is clicked on the first page', async () => {
		const onPageChange = jest.fn();
		renderWithTheme(<Pagination {...defaultProps} currentPage={1} onPageChange={onPageChange} />);
		await userEvent.click(screen.getByText('Previous'));
		expect(onPageChange).not.toHaveBeenCalled();
	});

	it('does not call onPageChange when Next is clicked on the last page', async () => {
		const onPageChange = jest.fn();
		renderWithTheme(<Pagination {...defaultProps} currentPage={5} onPageChange={onPageChange} />);
		await userEvent.click(screen.getByText('Next'));
		expect(onPageChange).not.toHaveBeenCalled();
	});

	it('renders ellipsis dots for sentinel values -1 and -2', () => {
		renderWithTheme(<Pagination {...defaultProps} pages={[1, -1, 5, -2, 10]} pagesCount={10} currentPage={5} />);
		const dots = screen.getAllByText('...');
		expect(dots).toHaveLength(2);
	});

	it('calls onPageChange with the clicked page number', async () => {
		const onPageChange = jest.fn();
		renderWithTheme(<Pagination {...defaultProps} onPageChange={onPageChange} />);
		await userEvent.click(screen.getByText('1'));
		expect(onPageChange).toHaveBeenCalledWith(1);
	});

	it('shows a spinner and hides page buttons when isFetching is true', () => {
		renderWithTheme(<Pagination {...defaultProps} isFetching={true} />);
		// Page number buttons are suppressed while fetching
		expect(screen.queryByRole('button', { name: '1' })).not.toBeInTheDocument();
		// Previous and Next are still present
		expect(screen.getByText('Previous')).toBeInTheDocument();
		expect(screen.getByText('Next')).toBeInTheDocument();
	});
});
