import { type AppType } from "next/app";
import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";

import { theme as proTheme } from "@chakra-ui/pro-theme";
import { extendTheme, theme as baseTheme } from "@chakra-ui/react";
import "@fontsource/inter/variable.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const theme = extendTheme(
	{
		colors: { ...baseTheme.colors, brand: baseTheme.colors.blue },
	},
	proTheme
);

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false, // default: true
		},
	},
});

const App: AppType = ({ Component, pageProps }) => (
	<QueryClientProvider client={queryClient}>
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	</QueryClientProvider>
);

export default App;
