import {
	Box,
	Container,
	Flex,
	Heading,
	Input,
	NativeSelectField,
	NativeSelectIndicator,
	NativeSelectRoot,
	Stack,
	Text,
} from '@chakra-ui/react';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { Octokit } from 'octokit';
import { useRouter } from 'next/router';
import SkeletonLoader from './SkeletonLoader';

import { usePagination } from '../hooks/usePagination';
import NoResultsText from './NoResultsText';
import type { Repository } from './ItemsContainer';
import ItemsContainer from './ItemsContainer';
import SearchBar from './SearchBar';
import PaginationContainer from './PaginationContainer';

// GitHub's search API caps results at 1,000 regardless of what total_count reports
const GITHUB_MAX_RESULTS = 1000;

type SortOption = 'best-match' | 'stars' | 'forks' | 'updated' | 'help-wanted-issues';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
	{ value: 'best-match', label: 'Best match' },
	{ value: 'stars', label: 'Most stars' },
	{ value: 'forks', label: 'Most forks' },
	{ value: 'updated', label: 'Recently updated' },
	{ value: 'help-wanted-issues', label: 'Help wanted' },
];

const MainContent = () => {
	const router = useRouter();
	const itemsPerPage = 12;

	const [searchValue, setSearchValue] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [sort, setSort] = useState<SortOption>('best-match');
	const [language, setLanguage] = useState('');

	// Read search state from URL query params once the router is ready
	const initialized = useRef(false);
	useEffect(() => {
		if (!router.isReady || initialized.current) return;
		initialized.current = true;
		const { q, page, sort: s, lang } = router.query;
		if (q) setSearchValue(String(q));
		if (page) setCurrentPage(Number(page));
		if (s && SORT_OPTIONS.some((o) => o.value === s)) setSort(s as SortOption);
		if (lang) setLanguage(String(lang));
	}, [router.isReady, router.query]);

	// Keep URL in sync with search state (shallow routing, no full page reload)
	useEffect(() => {
		if (!router.isReady || !initialized.current) return;
		const query: Record<string, string> = {};
		if (searchValue) query.q = searchValue;
		if (currentPage > 1) query.page = String(currentPage);
		if (sort !== 'best-match') query.sort = sort;
		if (language) query.lang = language;
		router.replace({ pathname: '/', query }, undefined, { shallow: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [searchValue, currentPage, sort, language]);

	const [debouncedSearchValue] = useDebounce(searchValue, 1000);
	const [debouncedLanguage] = useDebounce(language, 1000);

	// Memoised so the Octokit instance (and its auth token) is created only once per mount
	const octokit = useMemo(() => new Octokit({ auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN }), []);

	// Reset to page 1 whenever the effective search changes so stale pages aren't requested
	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedSearchValue, debouncedLanguage, sort]);

	const effectiveQuery = [debouncedSearchValue, debouncedLanguage ? `language:${debouncedLanguage}` : '']
		.filter(Boolean)
		.join(' ');

	// .data.data: the outer `data` is TanStack Query's wrapper; the inner `data` is GitHub's REST API response body
	const searchQuery = useQuery({
		queryKey: effectiveQuery.length ? ['searchRepos', effectiveQuery, sort, itemsPerPage, currentPage] : [],
		queryFn: async () => {
			if (!effectiveQuery.length) {
				return { data: { items: [], total_count: 0, incomplete_results: false } };
			}
			return await octokit.request('GET /search/repositories', {
				q: effectiveQuery,
				per_page: itemsPerPage,
				page: currentPage,
				...(sort !== 'best-match' && { sort, order: 'desc' as const }),
			});
		},
		enabled: effectiveQuery.length > 0,
	});

	const data: Repository[] = searchQuery.data?.data.items ?? [];
	// GitHub caps search results at 1,000 regardless of total_count
	const resultsTotal = Math.min(searchQuery.data?.data?.total_count ?? 0, GITHUB_MAX_RESULTS);

	const { pages, pagesCount } = usePagination({
		total: resultsTotal,
		currentPage,
		pageSize: itemsPerPage,
		limits: { outer: 1, inner: 1 },
	});

	const handlePageChange = (nextPage: number): void => setCurrentPage(nextPage);

	return (
		<Box as="main">
			<Container pt={{ base: '8', lg: '12' }} pb={{ base: '8' }}>
				<Stack gap={{ base: '8', lg: '6' }} align="center">
					<Heading size={{ base: 'xs', md: 'md', lg: 'lg' }} fontWeight="bold" textAlign="center">
						Discover interesting open-source projects
					</Heading>

					<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />

					<Flex gap={3} width="100%" maxW={{ base: 'lg', md: 'md', lg: 'lg' }} wrap="wrap">
						<NativeSelectRoot flex="1" minW="36">
							<NativeSelectField
								value={sort}
								onChange={(e) => setSort(e.target.value as SortOption)}
								aria-label="Sort results"
							>
								{SORT_OPTIONS.map((o) => (
									<option key={o.value} value={o.value}>
										{o.label}
									</option>
								))}
							</NativeSelectField>
							<NativeSelectIndicator />
						</NativeSelectRoot>

						<Input
							flex="1"
							minW="36"
							placeholder="Language (e.g. typescript)"
							value={language}
							onChange={(e) => setLanguage(e.target.value)}
							aria-label="Filter by language"
						/>
					</Flex>
				</Stack>

				{searchQuery.isError && (
					<Text color="red.500" textAlign="center" mt={6}>
						Something went wrong. Check your GitHub token or try again later.
					</Text>
				)}

				{!!searchValue.length && !!resultsTotal && (
					<PaginationContainer
						pages={pages}
						pagesCount={pagesCount}
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
						itemsCount={data?.length}
						resultsTotal={resultsTotal}
						isFetching={searchQuery.isFetching}
						onPageChange={handlePageChange}
					/>
				)}

				<Container py={{ base: '4', md: '8' }} justifyItems="center">
					{searchQuery.isFetching && searchValue.length && <SkeletonLoader />}

					{!searchQuery.isFetching && searchValue.length && data?.length ? <ItemsContainer items={data} /> : null}

					{!searchQuery.isFetching && searchValue.length && data?.length === 0 && !searchQuery.isError ? (
						<NoResultsText highlight={searchValue} />
					) : null}
				</Container>

				{!!searchValue.length && !searchQuery.isFetching && !!resultsTotal && (
					<PaginationContainer
						pages={pages}
						pagesCount={pagesCount}
						currentPage={currentPage}
						itemsPerPage={itemsPerPage}
						itemsCount={data?.length}
						resultsTotal={resultsTotal}
						isFetching={searchQuery.isFetching}
						onPageChange={handlePageChange}
					/>
				)}
			</Container>
		</Box>
	);
};

export default MainContent;
