import { usePagination, DOTS } from "../hooks/usePagination";
import { cn } from "../lib/utils";
import "./pagination.css";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}: {
  onPageChange: (page: number) => void;
  totalCount: number;
  siblingCount?: number;
  currentPage: number;
  pageSize: number;
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  }) as (string | number)[];

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  const lastPage = paginationRange[paginationRange.length - 1];

  return (
    <ul className="flex items-center justify-center gap-8">
      {/* Left navigation arrow */}
      <li
        className={cn("pagination-item", currentPage === 1 ? "disabled" : null)}
        onClick={onPrevious}
      >
        <div className="arrow left" />
      </li>
      {paginationRange.map((pageNumber, idx) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={idx} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li
            key={idx}
            className={cn(
              "pagination-item",
              pageNumber === currentPage ? "selected" : null,
            )}
            onClick={() => onPageChange(pageNumber as number)}
          >
            {pageNumber}
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={cn(
          "pagination-item",
          currentPage === lastPage ? "disabled" : null,
        )}
        onClick={onNext}
      >
        <div className="arrow right" />
      </li>
    </ul>
  );
};

export default Pagination;
