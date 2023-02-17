import { Container, Flex } from "@chakra-ui/react";
import Link from "next/link";
import Logo from "./Logo";
import Image from "next/image";

const Header = () => (
	<Container
		as="header"
		bg="bg-surface"
		boxShadow="sm"
		maxWidth="100%"
		p={{ base: "4" }}
		style={{ position: "sticky" }}
		data-testid="header"
	>
		<Flex justify="space-between" align="center">
			<Link href={"/"} title="Github Repo Search">
				<Logo />
			</Link>

			<Link href="https://github.com/mladimatija/nextjs-github-repo-search" target="_blank">
				<Image
					width="100"
					height="100"
					alt="GitHub Repo stars"
					src="https://img.shields.io/github/stars/mladimatija/nextjs-github-repo-search?logoColor=blue&style=social"
					priority={true}
					unoptimized={true}
				></Image>
			</Link>
		</Flex>
	</Container>
);

export default Header;
