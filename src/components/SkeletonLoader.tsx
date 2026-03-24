import { Box, SimpleGrid, SkeletonCircle, SkeletonText, useBreakpointValue } from '@chakra-ui/react';

const SkeletonLoader = () => {
	const columnsNumber = useBreakpointValue({ base: 1, md: 2, lg: 3 }, { fallback: 'lg' });
	const cardCount = useBreakpointValue({ base: 2, md: 2, lg: 3 }, { fallback: 'lg' }) ?? 3;

	return (
		<SimpleGrid columns={columnsNumber} gap={10} data-testid="skeleton-loader" width="100%">
			{Array.from({ length: cardCount }, (_, i) => (
				<Box key={i} padding="6" boxShadow="lg" bg="bg.panel">
					<SkeletonCircle size="10" />
					<SkeletonText mt="4" noOfLines={4} gap="4" />
				</Box>
			))}
		</SimpleGrid>
	);
};

export default SkeletonLoader;
