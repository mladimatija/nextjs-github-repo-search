import type { PaginationExtendedProps } from "./Pagination";
import Pagination from "./Pagination";
import { Box, Container, Divider, HStack } from "@chakra-ui/react";
import type { FC } from "react";

const PaginationContainer: FC<PaginationContainerProps> = ({
	pages,
	currentPage,
	itemsPerPage,
	itemsCount,
	resultsTotal,
	isFetching,
	onPageChange,
}) => {
	return (
		<div data-testid="pagination-container">
			<Container py={{ base: "4", md: "8" }}>
				<HStack>
					<Divider />
				</HStack>
			</Container>

			<Container>
				{!isFetching && resultsTotal !== 0 ? (
					<Box textAlign="center">
						<PaginationResultsText
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
							pages={pages}
							resultsTotal={resultsTotal}
						/>
					</Box>
				) : null}

				<Pagination
					pagesCount={pages.length}
					currentPage={currentPage}
					onPageChange={onPageChange}
					pages={pages}
					isFetching={isFetching}
					resultsTotal={resultsTotal}
					itemsCount={itemsCount}
				/>
			</Container>
		</div>
	);
};

export default PaginationContainer;

interface PaginationContainerProps extends Omit<PaginationExtendedProps, "pagesCount"> {
	itemsPerPage: number;
}

export const PaginationResultsText: FC<PaginationResultsTextProps> = ({
	currentPage,
	itemsPerPage,
	pages,
	resultsTotal,
}) => {
	const from = currentPage === 1 ? 1 : currentPage * itemsPerPage + 1;

	let to;
	if (currentPage === pages.length) {
		to = resultsTotal;
	} else {
		if (currentPage === 1) {
			to = pages.length === 1 ? resultsTotal : itemsPerPage;
		} else {
			to = currentPage * itemsPerPage + itemsPerPage;
		}
	}

	return (
		<span data-testid="pagination-results-text">
			Showing <strong>{from}</strong> - <strong>{to}</strong> of <strong>{resultsTotal}</strong> results.
		</span>
	);
};

type PaginationResultsTextProps = Omit<PaginationContainerProps, "isFetching" | "onPageChange" | "itemsCount">;
