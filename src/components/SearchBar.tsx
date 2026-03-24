import { Icon, Input, Group } from "@chakra-ui/react";
import { FiDelete, FiSearch } from "react-icons/fi";

const SearchBar = ({
	searchValue,
	setSearchValue,
}: {
	searchValue: string;
	setSearchValue: (value: string) => void;
}) => (
	<Group maxW={{ base: "lg", md: "md", lg: "lg" }} width="100%">
		<Input
			placeholder="Search by name, description, tags..."
			onChange={(e) => setSearchValue(e.target.value)}
			value={searchValue}
			ps="10"
			pe={searchValue ? "10" : "4"}
		/>
		<Icon
			as={FiSearch}
			color="fg.muted"
			position="absolute"
			left="3"
			top="50%"
			transform="translateY(-50%)"
			pointerEvents="none"
			zIndex={1}
		/>
		{searchValue && (
			<Icon
				as={FiDelete}
				color="fg.muted"
				position="absolute"
				right="3"
				top="50%"
				transform="translateY(-50%)"
				cursor="pointer"
				onClick={() => setSearchValue("")}
				_hover={{ color: "blue.500" }}
				zIndex={1}
			/>
		)}
	</Group>
);

export default SearchBar;
