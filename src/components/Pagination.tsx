import { usePagination, DOTS } from "../hooks/usePagination";
import useScreen from "../hooks/useScreen";
import { cn } from "../lib/utils";
import "./pagination.css";

const Pagination = ({
  onPageChange,
  totalCount,
  siblingCount = 0,
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

  const screenWidth = useScreen();

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
        if (pageNumber === DOTS && screenWidth > 1024) {
          return (
            <li key={idx} className="pagination-item dots">
              &#8230;
            </li>
          );
        }

        return (
          <li
            key={idx}
            className={cn(
              "pagination-item pagination-number",
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
