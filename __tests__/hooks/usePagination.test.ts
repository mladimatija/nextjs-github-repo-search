import { renderHook } from '@testing-library/react';
import { usePagination } from '../../src/hooks/usePagination';

describe('usePagination', () => {
	const config = {
		pageSize: 10,
		limits: { outer: 1, inner: 1 },
	};

	it('returns pagesCount of 0 and empty pages when total is 0', () => {
		const { result } = renderHook(() => usePagination({ ...config, total: 0, currentPage: 1 }));
		expect(result.current.pagesCount).toBe(0);
		expect(result.current.pages).toEqual([]);
	});

	it('returns all pages when total pages fit within the threshold', () => {
		// totalNumbers = inner + 2*outer + 2 = 1 + 2 + 2 = 5, so ≤5 pages → show all
		const { result } = renderHook(() => usePagination({ ...config, total: 50, currentPage: 1 }));
		expect(result.current.pagesCount).toBe(5);
		expect(result.current.pages).toEqual([1, 2, 3, 4, 5]);
	});

	it('shows only right dots (left-heavy range) when on the first page of a long list', () => {
		// 10 pages, page 1: leftSibling(1) is not > outer+2(3) → no left dots; rightSibling(2) < 8 → right dots
		const { result } = renderHook(() => usePagination({ ...config, total: 100, currentPage: 1 }));
		expect(result.current.pages).toEqual([1, 2, 3, 4, 5, -1, 10]);
	});

	it('shows only left dots (right-heavy range) when on the last page of a long list', () => {
		// 10 pages, page 10: leftSibling(9) > 3 → left dots; rightSibling(10) is not < 8 → no right dots
		const { result } = renderHook(() => usePagination({ ...config, total: 100, currentPage: 10 }));
		expect(result.current.pages).toEqual([1, -1, 6, 7, 8, 9, 10]);
	});

	it('shows both left and right dots when in the middle of a long list', () => {
		// 10 pages, page 5: leftSibling(4) > 3 → left dots; rightSibling(6) < 8 → right dots
		const { result } = renderHook(() => usePagination({ ...config, total: 100, currentPage: 5 }));
		expect(result.current.pages).toEqual([1, -1, 4, 5, 6, -2, 10]);
	});

	it('returns an empty pages array when totalPages barely exceeds threshold but neither dots condition fires', () => {
		// totalNumbers = 1 + 2*1 + 2 = 5; totalPages = 6 > 5, so enters complex logic.
		// Page 3: leftSibling=2 (not > outer+2=3), rightSibling=4 (not < 6-1-1=4) → no condition matches → []
		const { result } = renderHook(() => usePagination({ ...config, total: 60, currentPage: 3 }));
		expect(result.current.pages).toEqual([]);
	});
});
