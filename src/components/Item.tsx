import { Box, Container, Divider, Flex, Icon, Link, Text } from "@chakra-ui/react";
import { FiExternalLink, FiEye, FiStar, FiUser } from "react-icons/fi";
import { TbLicense } from "react-icons/tb";
import { AiOutlineFork } from "react-icons/ai";
import { useState } from "react";
import type { Repository } from "./ItemsContainer";

// TODO create generator function

const Item = ({ data }: { data: Repository }) => {
	const [isHovering, setIsHovering] = useState(false);

	return (
		<Flex
			as={Box}
			padding="6"
			boxShadow="lg"
			bg="white"
			style={{
				position: "relative",
				top: isHovering ? "-10px" : "0px",
				transition: "top ease 0.3s",
			}}
			onMouseEnter={() => setIsHovering(true)}
			onMouseLeave={() => setIsHovering(false)}
		>
			<Flex direction="column" justifyContent="space-between" basis="100%" wordBreak="break-word">
				<Container px={0}>
					<Link href={data.html_url} target="_blank" _hover={{ color: "blue.500" }}>
						<Icon as={FiExternalLink} boxSize="9" verticalAlign="middle" title="Repository link" />
						<Text as="span" fontWeight={900} verticalAlign="middle" marginLeft={2}>
							{data.name}
						</Text>
					</Link>
					<Divider my={3} />
					<Text>{data.description}</Text>
				</Container>

				<Container px={0} paddingTop={2}>
					{data.owner && (
						<Box my={1}>
							<Link href={data.owner.html_url} target="_blank" _hover={{ color: "blue.500" }} title="Author">
								<Icon as={FiUser} boxSize="5" verticalAlign="middle" />
								<Text as="span" verticalAlign="middle" marginLeft={2} fontSize="sm">
									{data.owner.login}
								</Text>
							</Link>
						</Box>
					)}

					<Box my={1}>
						<Link href={data.html_url + "/stargazers"} target="_blank" _hover={{ color: "blue.500" }} title="Stars">
							<Icon as={FiStar} boxSize="5" verticalAlign="middle" />
							<Text as="span" verticalAlign="middle" marginLeft={2} fontSize="sm">
								{data.stargazers_count}
							</Text>
						</Link>
					</Box>

					<Box my={1}>
						<Link href={data.html_url + "/watchers"} target="_blank" _hover={{ color: "blue.500" }} title="Watchers">
							<Icon as={FiEye} boxSize="5" verticalAlign="middle" />
							<Text as="span" verticalAlign="middle" marginLeft={2} fontSize="sm">
								{data.watchers_count}
							</Text>
						</Link>
					</Box>

					<Box my={1}>
						<Link
							href={data.html_url + "/network/members"}
							target="_blank"
							_hover={{ color: "blue.500" }}
							title="Forks"
						>
							<Icon as={AiOutlineFork} boxSize="5" verticalAlign="middle" />
							<Text as="span" verticalAlign="middle" marginLeft={2} fontSize="sm">
								{data.forks_count}
							</Text>
						</Link>
					</Box>

					{data.license && (
						<Box my={1}>
							<Link href={data.license.url ?? ""} target="_blank" _hover={{ color: "blue.500" }} title="License">
								<Icon as={TbLicense} boxSize="5" verticalAlign="middle" />
								<Text as="span" verticalAlign="middle" marginLeft={2} fontSize="sm">
									{data.license.name}
								</Text>
							</Link>
						</Box>
					)}
				</Container>
			</Flex>
		</Flex>
	);
};

export default Item;
