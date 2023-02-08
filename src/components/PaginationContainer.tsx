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
}) => (
	<>
		<Container py={{ base: "4", md: "8" }}>
			<HStack>
				<Divider />
			</HStack>
		</Container>
		<Container>
			<Box textAlign="center">
				{!isFetching && resultsTotal !== 0 ? (
					<span>
						Showing <strong>{currentPage * itemsPerPage + 1}</strong> -{" "}
						<strong>{currentPage * itemsPerPage + (currentItemsLength || 0)}</strong> of <strong>{resultsTotal}</strong>{" "}
						results.
					</span>
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
				currentItemsLength={currentItemsLength || 0}
			/>
		</Container>
	</>
);

export default PaginationContainer;

interface PaginationContainerProps extends PaginationExtendedProps {
	itemsPerPage: number;
}
