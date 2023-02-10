// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
	dir: "./",
});

// Add any custom config to be passed to Jest
const customJestConfig = {
	collectCoverage: true,
	// on node 14.x coverage provider v8 offers good speed and more or less good report
	coverageProvider: "v8",
	collectCoverageFrom: [
		"**/*.{js,jsx,ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
		"!<rootDir>/out/**",
		"!<rootDir>/.next/**",
		"!<rootDir>/*.config.js",
		"!<rootDir>/coverage/**",
	],
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
	moduleNameMapper: {
		// Handle CSS imports (with CSS modules)
		// https://jestjs.io/docs/webpack#mocking-css-modules
		"^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy",

		// Handle CSS imports (without CSS modules)
		"^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",

		// Handle image imports
		// https://jestjs.io/docs/webpack#handling-static-assets
		"^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i": `<rootDir>/__mocks__/fileMock.js`,

		// Handle module aliases (this will be automatically configured for you soon)
		"^@/components/(.*)$": "<rootDir>/components/$1",
		"^@/pages/(.*)$": "<rootDir>/pages/$1",
	},
	testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
	testEnvironment: "jest-environment-jsdom",
	transform: {
		// Use babel-jest to transpile tests with the next/babel preset
		// https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
		"^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
	},
	transformIgnorePatterns: ["/node_modules/", "^.+\\.module\\.(css|sass|scss)$"],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);