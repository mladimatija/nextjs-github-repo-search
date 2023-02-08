import { Icon, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react";
import { FiDelete, FiSearch } from "react-icons/fi";

const SearchBar = ({
	searchValue,
	setSearchValue,
}: {
	searchValue: string;
	setSearchValue: (value: string) => void;
}) => (
	<InputGroup maxW={{ base: "lg", md: "md", lg: "lg" }}>
		<InputLeftElement pointerEvents="none">
			<Icon as={FiSearch} color="muted" boxSize="7" />
		</InputLeftElement>
		<Input
			placeholder="Search by name, description, tags..."
			onChange={(e) => setSearchValue(e.target.value)}
			value={searchValue}
		/>
		{searchValue && (
			<InputRightElement cursor="pointer" title="Clear search" onClick={() => setSearchValue("")}>
				<Icon as={FiDelete} color="muted" boxSize="7" _hover={{ color: "blue.500" }} />
			</InputRightElement>
		)}
	</InputGroup>
);

export default SearchBar;
