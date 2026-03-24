// Skip env validation during tests — NEXT_PUBLIC_GITHUB_TOKEN is not available in CI
process.env.SKIP_ENV_VALIDATION = '1';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest');

const createJestConfig = nextJest({
	dir: './',
});

const customJestConfig = {
	collectCoverage: true,
	coverageProvider: 'v8',
	collectCoverageFrom: [
		'**/*.{js,jsx,ts,tsx}',
		'!**/*.d.ts',
		'!**/node_modules/**',
		'!<rootDir>/out/**',
		'!<rootDir>/.next/**',
		'!<rootDir>/*.config.js',
		'!<rootDir>/coverage/**',
	],
	setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
	moduleNameMapper: {
		// Handle CSS imports (with CSS modules)
		// https://jestjs.io/docs/webpack#mocking-css-modules
		'^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

		// Handle CSS imports (without CSS modules)
		'^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

		// Handle image imports
		// https://jestjs.io/docs/webpack#handling-static-assets
		'^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': `<rootDir>/__mocks__/fileMock.js`,

		// Path aliases mirroring tsconfig.json "paths"
		'^@/components/(.*)$': '<rootDir>/components/$1',
		'^@/pages/(.*)$': '<rootDir>/pages/$1',
	},
	testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
	testEnvironment: 'jest-environment-jsdom',
	transform: {
		// Use babel-jest to transpile tests with the next/babel preset
		// https://jestjs.io/docs/configuration#transform-objectstring-pathtotransformer--pathtotransformer-object
		'^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
	},
	transformIgnorePatterns: ['/node_modules/(?!(octokit|@octokit|use-debounce)/)', '^.+\\.module\\.(css|sass|scss)$'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
