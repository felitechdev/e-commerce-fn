import React from "react";

export default function Pagination({ page, setPage, totalPages }) {
  const pageNumbers = [];

  // Fill page numbers (1, 2, 3, ...)
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  // Handle Prev/Next buttons
  const handlePrev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="flex justify-end space-x-2 w-full pr-6 mt-2">
      <button
        className={`bg-primary text-white p-1 rounded-md ${
          page === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handlePrev}
        disabled={page === 1}
      >
        Prev
      </button>

      {/* Render page numbers */}
      {pageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={`p-1 rounded-md ${
            page === pageNumber
              ? "bg-primary text-white"
              : "bg-white text-black"
          }`}
          onClick={() => setPage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      <button
        className={`bg-primary text-white p-1 rounded-md ${
          page === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleNext}
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
}
