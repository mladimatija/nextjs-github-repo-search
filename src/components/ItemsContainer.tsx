import { SimpleGrid, useBreakpointValue } from "@chakra-ui/react";
import Item from "./Item";
import type { components } from "@octokit/openapi-types";

export type Repository = components["schemas"]["repo-search-result-item"];

const ItemsContainer = ({ items }: { items: Repository[] }) => {
	const columnsNumber = useBreakpointValue(
		{
			base: 1,
			md: 2,
			lg: 3,
		},
		{
			fallback: "lg",
		}
	);

	return (
		<SimpleGrid columns={columnsNumber} spacing={10}>
			{items.map((item, i) => (
				<Item data={item} key={`search-results-item-${i}`} />
			))}
		</SimpleGrid>
	);
};

export default ItemsContainer;
