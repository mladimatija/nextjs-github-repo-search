import {Box, Container, Heading, Stack} from "@chakra-ui/react";
import {useState, useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {useDebounce} from "use-debounce";
import {Octokit} from "octokit";
import SkeletonLoader from "./SkeletonLoader";

import {usePagination} from "../hooks/usePagination";
import NoResultsText from "./NoResultsText";
import type {Repository} from "./ItemsContainer";
import ItemsContainer from "./ItemsContainer";
import SearchBar from "./SearchBar";
import PaginationContainer from "./PaginationContainer";

const MainContent = () => {
	const itemsPerPage = 12;
	const [searchValue, setSearchValue] = useState("");
	const [debouncedSearchValue] = useDebounce(searchValue, 1000);
	// let's keep Octokit in useMemo since we don't want it to reinit on every component re-render
	const octokit = useMemo(
		() =>
			new Octokit({
				auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
			}),
		[]
	);

	// Use state for currentPage to control pagination
	const [currentPage, setCurrentPage] = useState(1);

	// searchQuery.data.data - a bit of a unique structure but first "data" obj comes from tanstack-query while the second one is from GitHub's REST API
	const searchQuery = useQuery({
		queryKey: debouncedSearchValue.length ? ["searchRepos", debouncedSearchValue, itemsPerPage, currentPage] : [],
		queryFn: async () => {
			if (debouncedSearchValue.length) {
				return await octokit.request("GET /search/repositories", {
					q: debouncedSearchValue,
					per_page: itemsPerPage,
					page: currentPage,
				})
			}
			return {data: {items: []}};
		},
		enabled: debouncedSearchValue.length > 0,
	});

	const data: Repository[] = searchQuery.data?.data.items ?? [];
	const resultsTotal = searchQuery.data?.data?.total_count || 0;

	const {pages, pagesCount} = usePagination({
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

	const handlePageChange = (nextPage: number): void => setCurrentPage(nextPage);

	return (
		<Box as="main">
			<Container pt={{base: "8", lg: "12"}} pb={{base: "8"}}>
				<Stack gap={{base: "8", lg: "6"}} align="center">
					<Heading size={{base: "xs", md: "md", lg: "lg"}} fontWeight="bold" textAlign="center">
						Discover interesting open-source projects
					</Heading>

					<SearchBar searchValue={searchValue} setSearchValue={setSearchValue}/>
				</Stack>

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

				<Container py={{base: "4", md: "8"}} justifyItems="center">
					{searchQuery.isFetching && searchValue.length && <SkeletonLoader/>}

					{!searchQuery.isFetching && searchValue.length && data?.length ?
						<ItemsContainer items={data}/> : null}

					{!searchQuery.isFetching && searchValue.length && data?.length === 0 ? (
						<NoResultsText highlight={searchValue}/>
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
