// Global test setup — polyfills and mocks applied before every test suite.

// Polyfill for structuredClone (required for Chakra UI v3)
if (typeof global.structuredClone === 'undefined') {
	global.structuredClone = (val) => {
		if (val === undefined) return undefined;
		return JSON.parse(JSON.stringify(val));
	};
}

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // Deprecated
		removeListener: jest.fn(), // Deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});
