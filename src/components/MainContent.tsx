import { Box, Container, Heading, Stack } from "@chakra-ui/react";
import { useState, useMemo } from "react";
import { useDebouncedQuery } from "../hooks/useDebouncedQuery";
import { Octokit } from "octokit";
import SkeletonLoader from "./SkeletonLoader";

import { usePagination } from "@ajna/pagination";
import NoResultsText from "./NoResultsText";
import type { Repository } from "./ItemsContainer";
import ItemsContainer from "./ItemsContainer";
import SearchBar from "./SearchBar";
import PaginationContainer from "./PaginationContainer";

const MainContent = () => {
	const itemsPerPage = 12;
	const [searchValue, setSearchValue] = useState("");
	const [data, setData] = useState<Repository[]>([]);
	const [resultsTotal, setResultsTotal] = useState<number>(0);
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

	// searchQuery.data.data - a bit of a weird structure but first "data" obj comes from tanstack-query while second one is from Github's REST API
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
			onSuccess: (result) => {
				const items = result?.data.items;
				setData(items ?? []);

				if (items?.length) {
					setResultsTotal(result?.data?.total_count || 0);
				}
			},
		},
		// TODO api error handling
		() => ({ data: { items: [] } }),
		1000
	);

	const handlePageChange = (nextPage: number): void => setCurrentPage(nextPage);

	return (
		<Box as="main" height="100vh" overflowY="auto">
			<Container pt={{ base: "8", lg: "12" }} pb={{ base: "8" }}>
				<Stack spacing={{ base: "8", lg: "6" }} align="center">
					<Heading size={{ base: "xs", md: "md", lg: "lg" }} fontWeight="bold" textAlign="center">
						Discover interesting open-source projects
					</Heading>

					<SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
				</Stack>

				{!!searchValue.length && (
					<PaginationContainer
						pagesCount={pagesCount}
						currentPage={currentPage}
						onPageChange={handlePageChange}
						pages={pages}
						isFetching={searchQuery.isFetching}
						itemsPerPage={itemsPerPage}
						resultsTotal={resultsTotal}
						currentItemsLength={data?.length}
					/>
				)}

				<Container py={{ base: "4", md: "8" }} justifyItems="center">
					<Stack spacing={{ base: "8", lg: "6" }}>
						{searchQuery.isFetching && searchValue.length && <SkeletonLoader />}
					</Stack>

					{!searchQuery.isFetching && searchValue.length && data?.length ? <ItemsContainer items={data} /> : null}

					{!searchQuery.isFetching && searchValue.length && data?.length === 0 ? (
						<NoResultsText highlight={searchValue} />
					) : null}
				</Container>

				{!!searchValue.length && !searchQuery.isFetching && (
					<PaginationContainer
						pagesCount={pagesCount}
						currentPage={currentPage}
						onPageChange={handlePageChange}
						pages={pages}
						isFetching={searchQuery.isFetching}
						itemsPerPage={itemsPerPage}
						resultsTotal={resultsTotal}
						currentItemsLength={data?.length}
					/>
				)}
			</Container>
		</Box>
	);
};

export default MainContent;
