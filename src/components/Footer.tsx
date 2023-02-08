import { ButtonGroup, Container, Divider, HStack, IconButton, Stack, Text } from "@chakra-ui/react";
import Logo from "./Logo";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from "next/link";

const Footer = () => (
	<Container as="footer" role="contentinfo" py={{ base: "4" }}>
		<HStack py={{ base: "4" }}>
			<Divider />
		</HStack>

		<Stack spacing={{ base: "4" }}>
			<Stack justify="space-between" direction="row" align="center">
				<Link href={"/"} title="Github Repo Search">
					<Logo height={30} showSlogan={false} />
				</Link>
				<ButtonGroup variant="ghost">
					<IconButton
						as="a"
						href="https://github.com/mladimatija/nextjs-github-repo-search"
						target="_blank"
						aria-label="GitHub"
						title="GitHub"
						icon={<FaGithub fontSize="1.25rem" />}
						marginRight={-3}
						_hover={{ color: "blue.500" }}
					/>
					<IconButton
						as="a"
						href="https://www.linkedin.com/in/matijaculjak"
						target="_blank"
						title="LinkedIn"
						aria-label="LinkedIn"
						icon={<FaLinkedin fontSize="1.25rem" />}
						marginRight={-3}
						_hover={{ color: "blue.500" }}
					/>
				</ButtonGroup>
			</Stack>
			<Text fontSize="sm" color="subtle" marginTop={0} align={{ base: "center", md: "left" }}>
				&copy; {new Date().getFullYear()} Github Repo Search
			</Text>
		</Stack>
	</Container>
);

export default Footer;
