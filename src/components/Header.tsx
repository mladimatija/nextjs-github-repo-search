import { Container, Flex, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import Logo from './Logo';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

const Header = () => {
	// Lazy initializer reads localStorage once at mount — no effect needed for initial state
	const [isDark, setIsDark] = useState(() => {
		if (typeof window === 'undefined') return false;
		return localStorage.getItem('color-mode') === 'dark';
	});

	// Sync .dark class to the document whenever isDark changes (effect touches external DOM, not state)
	useEffect(() => {
		document.documentElement.classList.toggle('dark', isDark);
	}, [isDark]);

	const toggleColorMode = () => {
		const next = !isDark;
		localStorage.setItem('color-mode', next ? 'dark' : 'light');
		setIsDark(next);
	};

	return (
		<Container
			as="header"
			bg="bg.panel"
			boxShadow="sm"
			maxWidth="100%"
			p={{ base: '4' }}
			position="sticky"
			top="0"
			zIndex="sticky"
			data-testid="header"
		>
			<Flex justify="space-between" align="center">
				<Link href="/" title="Github Repo Search">
					<Logo />
				</Link>

				<Flex align="center" gap={2}>
					<IconButton
						variant="ghost"
						aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
						onClick={toggleColorMode}
					>
						{isDark ? <MdLightMode fontSize="1.25rem" /> : <MdDarkMode fontSize="1.25rem" />}
					</IconButton>

					<Link href="https://github.com/mladimatija/nextjs-github-repo-search" target="_blank">
						<Image
							width="100"
							height="100"
							alt="GitHub Repo stars"
							src="https://img.shields.io/github/stars/mladimatija/nextjs-github-repo-search?logoColor=blue&style=social"
							priority={true}
							unoptimized={true}
						/>
					</Link>
				</Flex>
			</Flex>
		</Container>
	);
};

export default Header;
