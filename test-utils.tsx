import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import { ChakraProvider } from "@chakra-ui/react";

import { theme } from "./src/pages/_app";
import type { FC17, JSXElementConstructor, ReactElement } from "react";

const Wrapper: FC17 = ({ children }) => {
	return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const renderWithTheme = (ui: ReactElement<any, string | JSXElementConstructor<any>>, options?: RenderOptions) =>
	render(ui, { wrapper: Wrapper, ...options });

export { renderWithTheme };
