"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pathname = usePathname();

  return (
    <div className="flex justify-center mt-8 space-x-4">
      <Link
        href={`${pathname}?page=${Math.max(1, currentPage - 1)}`}
        className={`px-4 py-2 bg-blue-600 text-white rounded ${
          currentPage === 1
            ? "pointer-events-none bg-gray-300"
            : "hover:bg-blue-800"
        }`}
      >
        Prev
      </Link>
      <span className="self-center text-gray-700">
        Page {currentPage} of {totalPages}
      </span>
      <Link
        href={`${pathname}?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`px-4 py-2 bg-blue-600 text-white rounded ${
          currentPage === totalPages
            ? "pointer-events-none bg-gray-300"
            : "hover:bg-blue-800"
        }`}
      >
        Next
      </Link>
    </div>
  );
}

export default Pagination;
