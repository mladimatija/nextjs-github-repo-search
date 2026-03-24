import { Box, Button, Flex, Spinner, Text } from "@chakra-ui/react";
import type { FC } from "react";

interface PaginationProps {
	pagesCount: number;
	currentPage: number;
	onPageChange: (page: number) => void;
}

export interface PaginationExtendedProps extends PaginationProps {
	pages: number[];
	isFetching: boolean;
	resultsTotal: number;
	itemsCount: number;
}

const Pagination: FC<PaginationExtendedProps> = ({
	pages,
	pagesCount,
	currentPage,
	itemsCount,
	resultsTotal,
	onPageChange,
	isFetching,
}) => {
	const isFirstPage = currentPage === 1;
	const isLastPage = currentPage === pagesCount;

	const handlePrevious = () => {
		if (!isFirstPage && !isFetching) {
			onPageChange(currentPage - 1);
		}
	};

	const handleNext = () => {
		if (!isLastPage && !isFetching) {
			onPageChange(currentPage + 1);
		}
	};

	return (
		<Flex align="center" justify="space-between" py={4} w="full" gap={4}>
			<Button
				onClick={handlePrevious}
				disabled={itemsCount === 0 || isFetching || isFirstPage}
				minW={100}
				bg="blue.500"
				color="white"
				_hover={{
					bg: "blue.600",
				}}
				_disabled={{
					opacity: 0.5,
					cursor: "not-allowed",
				}}
			>
				<Text>Previous</Text>
			</Button>

			{!isFetching && !!resultsTotal && (
				<Flex align="center" gap={2}>
					{pages.map((page, index) => {
						if (page === -1 || page === -2) {
							return (
								<Box key={`separator-${index}`} px={2} color="blue.300">
									...
								</Box>
							);
						}

						return (
							<Button
								key={`pagination_page_${page}`}
								onClick={() => onPageChange(page)}
								minW="40px"
								size="sm"
								variant={currentPage === page ? "solid" : "outline"}
								bg={currentPage === page ? "blue.500" : "transparent"}
								color={currentPage === page ? "white" : "blue.500"}
								borderColor="blue.500"
								_hover={{
									bg: currentPage === page ? "blue.600" : "blue.50",
								}}
							>
								{page}
							</Button>
						);
					})}
				</Flex>
			)}

			{isFetching && <Spinner color="blue.500" />}

			<Button
				onClick={handleNext}
				disabled={itemsCount === 0 || isFetching || isLastPage}
				minW={100}
				bg="blue.500"
				color="white"
				_hover={{
					bg: "blue.600",
				}}
				_disabled={{
					opacity: 0.5,
					cursor: "not-allowed",
				}}
			>
				<Text>Next</Text>
			</Button>
		</Flex>
	);
};

export default Pagination;
