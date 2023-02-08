import type { PaginationExtendedProps } from "./Pagination";
import Pagination from "./Pagination";
import { Box, Container, Divider, HStack, Spinner } from "@chakra-ui/react";
import type { FC } from "react";

const PaginationContainer: FC<PaginationContainerProps> = ({
	pages,
	pagesCount,
	currentPage,
	itemsPerPage,
	resultsTotal,
	onPageChange,
	isFetching,
	currentItemsLength,
}) => {
	const ShowingResultsText = () => {
		const from = currentPage === 1 ? 1 : currentPage * itemsPerPage + 1;
		const to = currentPage === 1 && pagesCount === 1 ? resultsTotal : currentPage * itemsPerPage + itemsPerPage;

		return (
			<span>
				Showing <strong>{from}</strong> - <strong>{to}</strong> of <strong>{resultsTotal}</strong> results.
			</span>
		);
	};

	return (
		<>
			<Container py={{ base: "4", md: "8" }}>
				<HStack>
					<Divider />
				</HStack>
			</Container>
			<Container>
				<Box textAlign="center">
					{!isFetching && resultsTotal !== 0 ? (
						<ShowingResultsText />
					) : isFetching ? (
						<Spinner color="blue.500" />
					) : null}
				</Box>

				<Pagination
					pagesCount={pagesCount}
					currentPage={currentPage}
					onPageChange={onPageChange}
					pages={pages}
					isFetching={isFetching}
					resultsTotal={resultsTotal}
					currentItemsLength={currentItemsLength}
				/>
			</Container>
		</>
	);
};

export default PaginationContainer;

interface PaginationContainerProps extends PaginationExtendedProps {
	itemsPerPage: number;
}
