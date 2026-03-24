import { useState, useMemo } from "react";

interface PaginationConfig {
	total: number;
	limits: {
		outer: number;
		inner: number;
	};
	initialState: {
		pageSize: number;
		currentPage: number;
	};
}

interface UsePaginationReturn {
	pages: number[];
	pagesCount: number;
	currentPage: number;
	setCurrentPage: (page: number) => void;
	isDisabled: boolean;
}

export const usePagination = ({ total, limits, initialState }: PaginationConfig): UsePaginationReturn => {
	const [currentPage, setCurrentPage] = useState(initialState.currentPage);
	const { pageSize } = initialState;

	const pagesCount = useMemo(() => {
		return total > 0 ? Math.ceil(total / pageSize) : 0;
	}, [total, pageSize]);

	// Builds the visible page numbers array. Negative sentinels represent ellipsis slots:
	// -1 = left dots, -2 = right dots (distinct values so React keys don't collide).
	const pages = useMemo(() => {
		const { outer, inner } = limits;
		const totalPages = pagesCount;
		const totalNumbers = inner + 2 * outer + 2;

		if (totalPages <= totalNumbers) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const leftSiblingIndex = Math.max(currentPage - inner, 1);
		const rightSiblingIndex = Math.min(currentPage + inner, totalPages);

		const shouldShowLeftDots = leftSiblingIndex > outer + 2;
		const shouldShowRightDots = rightSiblingIndex < totalPages - outer - 1;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			const leftItemCount = 3 + 2 * inner;
			const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1);
			return [...leftRange, -1, totalPages];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			const rightItemCount = 3 + 2 * inner;
			const rightRange = Array.from({ length: rightItemCount }, (_, i) => totalPages - rightItemCount + i + 1);
			return [1, -1, ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			const middleRange = Array.from(
				{ length: rightSiblingIndex - leftSiblingIndex + 1 },
				(_, i) => leftSiblingIndex + i,
			);
			return [1, -1, ...middleRange, -2, totalPages];
		}

		return [];
	}, [currentPage, pagesCount, limits]);

	return {
		pages,
		pagesCount,
		currentPage,
		setCurrentPage,
		isDisabled: pagesCount === 0,
	};
};
