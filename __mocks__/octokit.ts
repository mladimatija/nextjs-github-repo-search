export const Octokit = jest.fn().mockImplementation(() => ({
	request: jest.fn(),
}));