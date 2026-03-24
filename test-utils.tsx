import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import { ChakraProvider } from '@chakra-ui/react';

import { system } from './src/pages/_app';
import type { FC, JSXElementConstructor, ReactElement, ReactNode } from 'react';

const Wrapper: FC<{ children: ReactNode }> = ({ children }) => {
	return <ChakraProvider value={system}>{children}</ChakraProvider>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const renderWithTheme = (ui: ReactElement<any, string | JSXElementConstructor<any>>, options?: RenderOptions) =>
	render(ui, { wrapper: Wrapper, ...options });

export { renderWithTheme };
