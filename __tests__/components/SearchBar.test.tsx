import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SearchBar from '../../src/components/SearchBar';
import { renderWithTheme } from '../../test-utils';

describe('SearchBar', () => {
	it('renders the search input', () => {
		renderWithTheme(<SearchBar searchValue="" setSearchValue={jest.fn()} />);
		expect(screen.getByPlaceholderText('Search by name, description, tags...')).toBeInTheDocument();
	});

	it('does not render the clear button when searchValue is empty', () => {
		renderWithTheme(<SearchBar searchValue="" setSearchValue={jest.fn()} />);
		expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
	});

	it('renders the clear button when searchValue is non-empty', () => {
		renderWithTheme(<SearchBar searchValue="react" setSearchValue={jest.fn()} />);
		expect(screen.getByLabelText('Clear search')).toBeInTheDocument();
	});

	it('calls setSearchValue with empty string when clear button is clicked', async () => {
		const setSearchValue = jest.fn();
		renderWithTheme(<SearchBar searchValue="react" setSearchValue={setSearchValue} />);
		await userEvent.click(screen.getByLabelText('Clear search'));
		expect(setSearchValue).toHaveBeenCalledWith('');
	});

	it('calls setSearchValue with input value on change', async () => {
		const setSearchValue = jest.fn();
		renderWithTheme(<SearchBar searchValue="" setSearchValue={setSearchValue} />);
		await userEvent.type(screen.getByPlaceholderText('Search by name, description, tags...'), 'next');
		expect(setSearchValue).toHaveBeenCalled();
	});
});
