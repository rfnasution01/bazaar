import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { StyleProps } from "../props";
import { Button } from ".";

interface PaginationProps extends StyleProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  limit: number;
  setOffset: Dispatch<SetStateAction<number>>;
  disabled?: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}

export function Pagination({
  page,
  setPage,
  limit,
  setOffset,
  disabled,
  setLoading,
}: PaginationProps) {
  const nextButton = () => {
    const newPage = page + 1;
    const newOffset = calcNewOffset(newPage, limit);
    setLoading(true);
    setPage(newPage);
    setOffset(newOffset);
  };

  const prevButton = () => {
    const newPage = page - 1;
    const newOffset = calcNewOffset(newPage, limit);
    setLoading(true);
    setPage(newPage);
    setOffset(newOffset);
  };

  const calcNewOffset = (page = 0, limit = 0) => {
    return page * limit - limit;
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "end",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <button
        style={{
          backgroundColor: page <= 1 ? "#f2f8ff" : "white",
          color: page <= 1 ? "#333" : "inherit",
          cursor: page <= 1 ? "not-allowed" : "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "8px",
          borderRadius: "8px",
          transition: "background-color 0.3s ease",
        }}
        disabled={page <= 1}
        type="button"
        onClick={prevButton}
      >
        <ChevronLeft />
      </button>
      <h5 className="text-[14px] font-medium tracking-wide">Halaman {page}</h5>
      <button
        style={{
          backgroundColor: disabled ? "#f2f8ff" : "white",
          color: disabled ? "#333" : "inherit",
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          padding: "8px",
          borderRadius: "8px",
          transition: "background-color 0.3s ease",
        }}
        disabled={disabled}
        type="button"
        onClick={nextButton}
      >
        <ChevronRight />
      </button>
    </div>
  );
}
