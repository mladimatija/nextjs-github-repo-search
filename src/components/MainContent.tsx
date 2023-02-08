import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import { useState, useMemo, useEffect } from "react";
import { useDebouncedQuery } from "../hooks/useDebouncedQuery";
import { Octokit } from "octokit";
import SkeletonLoader from "./SkeletonLoader";

import { usePagination } from "@ajna/pagination";
import NoResultsText from "./NoResultsText";
import ItemsContainer from "./ItemsContainer";
import SearchBar from "./SearchBar";
import PaginationContainer from "./PaginationContainer";

const MainContent = () => {
	const itemsPerPage = 12;
	const [searchValue, setSearchValue] = useState("");
	const [resultsTotal, setResultsTotal] = useState<number | undefined>(undefined);
	// let's keep Octokit in useMemo since we don't want it to reinit on every component re-render
	const octokit = useMemo(
		() =>
			new Octokit({
				auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
			}),
		[]
	);

	const { pages, pagesCount, currentPage, setCurrentPage } = usePagination({
		total: resultsTotal,
		limits: {
			outer: 1,
			inner: 1,
		},
		initialState: {
			pageSize: itemsPerPage,
			currentPage: 1,
		},
	});

	const searchQuery = useDebouncedQuery(
		{
			queryKey: searchValue.length ? ["searchRepos", searchValue, itemsPerPage, currentPage] : [],
			queryFn: async () => {
				if (searchValue.length) {
					return await octokit.request("GET /search/repositories", {
						q: searchValue,
						per_page: itemsPerPage,
						page: currentPage,
					});
				}
			},
		},
		() => ({ data: { items: [] } }),
		250
	);

	const handlePageChange = (nextPage: number): void => setCurrentPage(nextPage);

	const data = useMemo(() => searchQuery?.data?.data?.items, [searchQuery?.data?.data?.items]);

	useEffect(() => {
		setResultsTotal(searchQuery?.data?.data?.total_count);
	}, [data, searchQuery?.data?.data?.total_count]);

	return (
		<Box as="main" height="100vh" overflowY="auto">
			<Container pt={{ base: "8", lg: "12" }} pb={{ base: "8" }}>
				<Stack spacing={{ base: "8", lg: "6" }} align="center">
					<Heading size={{ base: "xs", md: "md", lg: "lg" }} fontWeight="bold" textAlign="center">
						Discover interesting open-source projects
					</Heading>

					<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
				</Stack>

				<PaginationContainer
					pagesCount={pagesCount}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					pages={pages}
					isFetching={searchQuery.isFetching}
					hasData={!!searchValue.length}
					searchValue={searchValue}
					itemsPerPage={itemsPerPage}
					resultsTotal={resultsTotal}
				/>

				<Container py={{ base: "4", md: "8" }} justifyItems="center">
					<Stack spacing={{ base: "8", lg: "6" }}>
						{searchQuery.isFetching && searchValue.length && <SkeletonLoader />}
					</Stack>

					{!searchQuery.isFetching && searchValue.length && data?.length ? <ItemsContainer items={data} /> : null}

					{!searchQuery.isFetching && searchValue.length && data?.length === 0 ? (
						<NoResultsText highlight={searchValue} />
					) : null}
				</Container>

				<PaginationContainer
					pagesCount={pagesCount}
					currentPage={currentPage}
					onPageChange={handlePageChange}
					pages={pages}
					isFetching={searchQuery.isFetching}
					hasData={!!searchValue.length}
					searchValue={searchValue}
					itemsPerPage={itemsPerPage}
					resultsTotal={resultsTotal}
				/>
			</Container>
		</Box>
	);
};

export default MainContent;
