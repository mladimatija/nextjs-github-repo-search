import { Box, SimpleGrid, SkeletonCircle, SkeletonText, useBreakpoint, useBreakpointValue } from "@chakra-ui/react";

const SkeletonLoader = () => {
	const columnsNumber = useBreakpointValue(
		{
			base: 1,
			md: 2,
			lg: 3,
		},
		{
			fallback: "lg",
		},
	);
	const breakpoint = useBreakpoint({ ssr: false });

	return (
		<SimpleGrid columns={columnsNumber} gap={10} data-testid="skeleton-loader" width="100%">
			<Box padding="6" boxShadow="lg" bg="white">
				<SkeletonCircle size="10" />
				<SkeletonText mt="4" noOfLines={4} gap="4" />
			</Box>
			<Box padding="6" boxShadow="lg" bg="white">
				<SkeletonCircle size="10" />
				<SkeletonText mt="4" noOfLines={4} gap="4" />
			</Box>
			{breakpoint !== "md" && (
				<Box padding="6" boxShadow="lg" bg="white">
					<SkeletonCircle size="10" />
					<SkeletonText mt="4" noOfLines={4} gap="4" />
				</Box>
			)}
		</SimpleGrid>
	);
};

export default SkeletonLoader;
