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
	hasData,
	searchValue,
}) => {
	return (
		<>
			<Container py={{ base: "4", md: "8" }}>
				<HStack>
					<Divider />
				</HStack>
			</Container>
			<Container>
				<Box textAlign="center">
					{searchValue.length && hasData ? (
						<span>
							Showing <strong>{currentPage * itemsPerPage + 1}</strong> -{" "}
							<strong>{currentPage * itemsPerPage + itemsPerPage}</strong> of <strong>{resultsTotal}</strong> results.
						</span>
					) : isFetching ? (
						<Spinner color="blue.500" />
					) : null}
				</Box>

				{!!searchValue.length && (
					<Pagination
						pagesCount={pagesCount}
						currentPage={currentPage}
						onPageChange={onPageChange}
						pages={pages}
						isFetching={isFetching}
						hasData={!!searchValue.length}
					/>
				)}
			</Container>
		</>
	);
};

export default PaginationContainer;

interface PaginationContainerProps extends PaginationExtendedProps {
	searchValue: string;
	itemsPerPage: number;
	resultsTotal: number | undefined;
}
