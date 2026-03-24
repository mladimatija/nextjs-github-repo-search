import { type NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@chakra-ui/react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MainContent from '../components/MainContent';

const Home: NextPage = () => (
	<>
		<Head>
			<title>Github Repo Search</title>
			<meta name="description" content="Search Github repositories by keywords" />
			<link rel="icon" href="/favicon.svg" />
		</Head>

		<Box minHeight="100vh" display="flex" flexDirection="column">
			<Header />
			<Box as="main" flex="1">
				<MainContent />
			</Box>
			<Footer />
		</Box>
	</>
);

export default Home;
