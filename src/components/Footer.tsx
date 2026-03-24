import { ButtonGroup, Container, HStack, IconButton, Stack, Text, Separator } from '@chakra-ui/react';
import Logo from './Logo';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => (
	<Container as="footer" role="contentinfo" py={{ base: '4' }} data-testid="footer">
		<HStack py={{ base: '4' }}>
			<Separator />
		</HStack>

		<Stack gap={{ base: '4' }}>
			<Stack justify="space-between" direction="row" align="center">
				<Link href={'/'} title="Github Repo Search">
					<Logo height={30} showSlogan={false} />
				</Link>
				<ButtonGroup variant="ghost">
					<Link href="https://github.com/mladimatija/nextjs-github-repo-search" target="_blank">
						<IconButton aria-label="GitHub" title="GitHub" marginRight={-3} _hover={{ color: 'blue.500' }}>
							<FaGithub fontSize="1.25rem" />
						</IconButton>
					</Link>
					<Link href="https://www.linkedin.com/in/matijaculjak" target="_blank">
						<IconButton title="LinkedIn" aria-label="LinkedIn" marginRight={-3} _hover={{ color: 'blue.500' }}>
							<FaLinkedin fontSize="1.25rem" />
						</IconButton>
					</Link>
				</ButtonGroup>
			</Stack>
			<Text fontSize="sm" color="fg.subtle" marginTop={0} textAlign={{ base: 'center', md: 'left' }}>
				&copy; {new Date().getFullYear()} Github Repo Search
			</Text>
		</Stack>
	</Container>
);

export default Footer;
