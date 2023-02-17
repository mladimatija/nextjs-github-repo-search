import { act, renderHook, waitFor } from "@testing-library/react";
import { useDebouncedQuery } from "../../src/hooks/useDebouncedQuery";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { FC17 } from "react";
import React from "react";

const CreateQueryWrapper: FC17 = ({ children }) => {
	// creates a new QueryClient for each test
	const queryClient = new QueryClient();
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
jest.mock("@tanstack/react-query", () => ({
	...jest.requireActual("@tanstack/react-query"),
	useQueryClient: jest.fn(),
}));

describe("useDebouncedQuery", () => {
	const mockQueryFn = jest.fn();
	const mockNoRequestReturnFn = jest.fn();

	afterEach(() => {
		jest.resetAllMocks();
	});

	it("should debounce the query", async () => {
		renderHook(
			() =>
				useDebouncedQuery(
					{
						queryFn: mockQueryFn,
						queryKey: ["foo"],
					},
					mockNoRequestReturnFn,
					1000
				),
			{
				wrapper: CreateQueryWrapper,
			}
		);

		// Advance timers by 999ms
		jest.advanceTimersByTime(999);
		expect(mockQueryFn).not.toHaveBeenCalled();

		// Advance timers by 1ms
		jest.advanceTimersByTime(1);
		await waitFor(() => expect(mockQueryFn).toHaveBeenCalled());
	});

	it("should call the provided queryFn with the correct arguments when queryKey changes", async () => {
		const { result } = renderHook(
			() =>
				useDebouncedQuery(
					{
						queryFn: mockQueryFn,
						queryKey: ["foo"],
					},
					mockNoRequestReturnFn,
					1000
				),
			{
				wrapper: CreateQueryWrapper,
			}
		);

		await result.current.refetch();

		act(() => {
			expect(mockQueryFn).toHaveBeenCalledWith(expect.objectContaining({ queryKey: ["foo"] }));
		});
	});

	it("should not debounce the query if queryKey is the same as the previous query", async () => {
		const { result } = renderHook(
			() =>
				useDebouncedQuery(
					{
						queryFn: mockQueryFn,
						queryKey: ["foo"],
					},
					mockNoRequestReturnFn,
					1000
				),
			{
				wrapper: CreateQueryWrapper,
			}
		);

		await result.current.refetch();
		await result.current.refetch();

		await waitFor(() => {
			expect(mockQueryFn).toHaveBeenCalledTimes(2);
		});
	});

	it("should return the value of the noRequestReturnFn if queryKey is empty", async () => {
		const { result } = renderHook(
			() =>
				useDebouncedQuery(
					{
						queryFn: mockQueryFn,
						queryKey: [],
					},
					mockNoRequestReturnFn,
					1000
				),
			{
				wrapper: CreateQueryWrapper,
			}
		);

		await result.current.refetch();

		await waitFor(() => {
			expect(result.current.data).toBe(mockNoRequestReturnFn());
		});
	});
});
