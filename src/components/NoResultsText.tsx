import { Text } from "@chakra-ui/react";

const NoResultsText = ({ highlight }: { highlight: string }) => (
	<Text color="subtle" marginTop={0} align={{ base: "center" }} data-testid="no-results-text">
		Your search for{" "}
		<Text as="span" color="blue.500" marginTop={0} fontWeight={900} display="inline">
			{highlight}
		</Text>{" "}
		returned no results. Try again with a different keyword.
	</Text>
);

export default NoResultsText;
