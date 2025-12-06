import { type AppType } from "next/app";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import { createSystem, defaultConfig } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const system = createSystem(defaultConfig);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

const App: AppType = ({ Component, pageProps }) => (
	<QueryClientProvider client={queryClient}>
		<ChakraProvider value={system}>
			<Component {...pageProps} />
		</ChakraProvider>
	</QueryClientProvider>
);

export default App;
