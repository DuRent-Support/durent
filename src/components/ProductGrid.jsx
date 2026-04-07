"use client";

import ProductCard from "./ProductCard";

const ProductGrid = ({
  products,
  onProductClick,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) => {
  const showPagination = totalPages > 1 && typeof onPageChange === "function";

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };
  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-block p-6 bg-card-bg rounded-2xl border border-gray-800">
          <p className="text-gray-400 text-lg mb-2">
            Tidak ada produk ditemukan
          </p>
          <p className="text-gray-500 text-sm">
            Coba kata kunci lain atau jelajahi semua produk
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-auto">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            onClick={onProductClick}
          />
        ))}
      </div>

      {showPagination && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="px-3 py-2 rounded-lg border border-gray-800 text-sm text-gray-300 hover:text-white hover:border-accent/40 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            const isActive = pageNumber === currentPage;

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                  isActive
                    ? "border-accent bg-accent/10 text-white"
                    : "border-gray-800 text-gray-300 hover:text-white hover:border-accent/40"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
            className="px-3 py-2 rounded-lg border border-gray-800 text-sm text-gray-300 hover:text-white hover:border-accent/40 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
