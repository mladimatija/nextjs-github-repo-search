import type { PaginationExtendedProps } from "./Pagination";
import Pagination from "./Pagination";
import { Box, Container, Separator, HStack } from "@chakra-ui/react";
import type { FC } from "react";

const PaginationContainer: FC<PaginationContainerProps> = ({
	pages,
	pagesCount,
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
					<Separator />
				</HStack>
			</Container>

			<Container>
				{!isFetching && resultsTotal !== 0 ? (
					<Box textAlign="center">
						<PaginationResultsText
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
							pages={pages}
							pagesCount={pagesCount}
							resultsTotal={resultsTotal}
						/>
					</Box>
				) : null}

				<Pagination
					pagesCount={pagesCount}
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

interface PaginationContainerProps extends PaginationExtendedProps {
	itemsPerPage: number;
}

export const PaginationResultsText: FC<PaginationResultsTextProps> = ({
	currentPage,
	itemsPerPage,
	pagesCount,
	resultsTotal,
}) => {
	const from = currentPage === 1 ? 1 : (currentPage - 1) * itemsPerPage + 1;

	let to;
	if (currentPage === pagesCount) {
		to = resultsTotal;
	} else {
		to = currentPage * itemsPerPage;
	}

	return (
		<span data-testid="pagination-results-text">
			Showing <strong>{from}</strong> - <strong>{to}</strong> of <strong>{resultsTotal}</strong> results.
		</span>
	);
};

type PaginationResultsTextProps = Omit<PaginationContainerProps, "isFetching" | "onPageChange" | "itemsCount">;
