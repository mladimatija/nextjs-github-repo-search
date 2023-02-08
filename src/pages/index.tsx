import { type NextPage } from "next";
import Head from "next/head";
import Footer from "../components/Footer";
import Header from "../components/Header";
import MainContent from "../components/MainContent";

const Home: NextPage = () => (
	<>
		<Head>
			<title>Github Repo Search</title>
			<meta name="description" content="Search Github repositories by keywords" />
			<link rel="icon" href="/favicon.svg" />
		</Head>

		<Header />
		<MainContent />
		<Footer />
	</>
);

export default Home;
