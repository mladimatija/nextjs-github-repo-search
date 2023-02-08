import { Box, SimpleGrid, SkeletonCircle, SkeletonText, useBreakpoint, useBreakpointValue } from "@chakra-ui/react";

const SkeletonLoader = () => {
	const columnsNumber = useBreakpointValue(
		{
			base: 1,
			md: 2,
			lg: 3,
		},
		{
			fallback: "md",
		}
	);
	const breakpoint = useBreakpoint({ ssr: false });

	return (
		<SimpleGrid columns={columnsNumber} spacing={10}>
			<Box padding="6" boxShadow="lg" bg="white">
				<SkeletonCircle size="10" />
				<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
			</Box>
			<Box padding="6" boxShadow="lg" bg="white">
				<SkeletonCircle size="10" />
				<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
			</Box>
			{breakpoint !== "md" && (
				<Box padding="6" boxShadow="lg" bg="white">
					<SkeletonCircle size="10" />
					<SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="2" />
				</Box>
			)}
		</SimpleGrid>
	);
};

export default SkeletonLoader;
