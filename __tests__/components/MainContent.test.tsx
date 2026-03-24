import { screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import MainContent from '../../src/components/MainContent';
import { renderWithTheme } from '../../test-utils';
import type { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Octokit } from 'octokit';

// Mock Octokit
jest.mock('octokit');

// Mock use-debounce to return value immediately in tests
jest.mock('use-debounce', () => ({
	useDebounce: (value: string) => [value],
}));

describe('MainContent', () => {
	const CreateQueryWrapper: FC<{ children: ReactNode }> = ({ children }) => {
		// creates a new QueryClient for each test with disabled retries
		const queryClient = new QueryClient({
			defaultOptions: {
				queries: {
					retry: false,
				},
			},
		});
		return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
	};

	beforeEach(() => {
		jest.clearAllMocks();
	});

	test('renders search bar and heading', () => {
		renderWithTheme(
			<CreateQueryWrapper>
				<MainContent />
			</CreateQueryWrapper>,
		);

		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Discover interesting open-source projects');
		expect(screen.getByPlaceholderText('Search by name, description, tags...')).toBeInTheDocument();
	});

	test('displays items when search is performed', async () => {
		const mockData = [
			{
				id: 1,
				name: 'repo1',
				html_url: 'https://github.com/test/repo1',
				description: 'Test repo 1',
				stargazers_count: 10,
				watchers_count: 5,
				forks_count: 2,
				owner: { login: 'testuser', html_url: 'https://github.com/testuser' },
			},
			{
				id: 2,
				name: 'repo2',
				html_url: 'https://github.com/test/repo2',
				description: 'Test repo 2',
				stargazers_count: 20,
				watchers_count: 10,
				forks_count: 5,
				owner: { login: 'testuser2', html_url: 'https://github.com/testuser2' },
			},
		];

		const mockRequest = jest.fn().mockResolvedValue({
			data: { items: mockData, total_count: 2 },
		});

		(Octokit as jest.MockedClass<typeof Octokit>).mockImplementation(
			() =>
				({
					request: mockRequest,
				}) as never,
		);

		const user = userEvent.setup();

		renderWithTheme(
			<CreateQueryWrapper>
				<MainContent />
			</CreateQueryWrapper>,
		);

		const searchInput = screen.getByPlaceholderText('Search by name, description, tags...');
		await user.clear(searchInput);
		await user.type(searchInput, 'react');

		await waitFor(() => {
			expect(mockRequest).toHaveBeenCalledWith('GET /search/repositories', {
				q: 'react',
				per_page: 12,
				page: 1,
			});
		});

		await waitFor(() => {
			expect(screen.getByText('repo1')).toBeInTheDocument();
			expect(screen.getByText('repo2')).toBeInTheDocument();
		});
	});

	test("displays 'No results found' when search has no results", async () => {
		const mockRequest = jest.fn().mockResolvedValue({
			data: { items: [], total_count: 0 },
		});

		(Octokit as jest.MockedClass<typeof Octokit>).mockImplementation(
			() =>
				({
					request: mockRequest,
				}) as never,
		);

		const user = userEvent.setup();

		renderWithTheme(
			<CreateQueryWrapper>
				<MainContent />
			</CreateQueryWrapper>,
		);

		const searchInput = screen.getByPlaceholderText('Search by name, description, tags...');
		await user.clear(searchInput);
		await user.type(searchInput, 'nonexistent');

		await waitFor(() => {
			expect(mockRequest).toHaveBeenCalledWith('GET /search/repositories', {
				q: 'nonexistent',
				per_page: 12,
				page: 1,
			});
		});

		await waitFor(() => {
			expect(screen.getByTestId('no-results-text')).toBeInTheDocument();
		});
	});
});
