"use client";

import { X, Package } from "lucide-react";

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!isOpen || !product) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div
          className="relative bg-gradient-to-br from-card-bg via-dark-bg-secondary to-card-bg max-w-5xl w-full rounded-3xl overflow-hidden shadow-2xl animate-fade-in-scale pointer-events-auto border border-gray-800/50"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-3 bg-dark-bg/80 backdrop-blur-md hover:bg-accent/20 rounded-full transition-all duration-300 hover:rotate-90 group"
          >
            <X className="w-6 h-6 text-gray-300 group-hover:text-white" />
          </button>

          <div className="grid md:grid-cols-5 gap-0">
            {/* Image Section - Wider */}
            <div className="md:col-span-3 relative h-80 md:h-auto min-h-[500px]">
              <img
                src={product.image}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent"></div>
            </div>

            {/* Content Section */}
            <div className="md:col-span-2 p-8 md:p-10 flex flex-col">
              {/* Category */}
              <div className="flex items-center gap-2 mb-6">
                <Package className="w-4 h-4 text-accent" />
                <span className="text-xs font-bold text-accent uppercase tracking-widest">
                  {product.category}
                </span>
              </div>

              {/* Product Name */}
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {product.name}
              </h2>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Deskripsi
                </h3>
                <p className="text-gray-300 leading-relaxed text-base">
                  {product.description}
                </p>
              </div>

              {/* Specifications */}
              <div className="space-y-3 flex-grow">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Spesifikasi
                </h3>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-dark-bg/30 rounded-xl border border-gray-800/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Kategori Produk
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {product.category}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-dark-bg/30 rounded-xl border border-gray-800/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-white">Kualitas</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Peralatan profesional untuk produksi
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-dark-bg/30 rounded-xl border border-gray-800/50">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        Ketersediaan
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Hubungi kami untuk informasi lebih lanjut
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Footer */}
              <div className="mt-8 pt-6 border-t border-gray-800/50">
                <p className="text-xs text-gray-500 text-center">
                  Untuk informasi lebih detail, silakan hubungi tim kami
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductModal;
