"use client";

import { ArrowUpRight } from "lucide-react";

const ProductCard = ({ product, onClick, index = 0 }) => {
  const { name, category, availability, image, description } = product;

  // Seragam dan konsisten
  const hasTopLabel = index % 3 === 0;

  return (
    <div
      onClick={() => onClick(product)}
      className="group cursor-pointer bg-card-bg rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/40 relative border border-gray-800/50 hover:border-accent/30"
    >
      {/* Accent Line */}
      <div className="absolute top-0 left-0 w-16 h-1 bg-gradient-to-r from-accent to-transparent"></div>

      {/* Image Container - no hover effect */}
      <div className="relative h-56 overflow-hidden bg-dark-bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent z-10"></div>
        <img src={image} alt={name} className="w-full h-full object-cover" />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-6">
          <div className="flex items-center gap-2 text-white font-bold text-sm px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <span>Lihat Detail</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </div>
        </div>

        {/* Category Tag - Posisi bervariasi */}
        {hasTopLabel && (
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 bg-dark-bg/80 backdrop-blur-md text-accent text-xs font-bold uppercase tracking-wider rounded-full border border-accent/30">
              {category}
            </span>
          </div>
        )}
      </div>

      {/* Content - konsisten */}
      <div className="p-5 relative">
        {!hasTopLabel && (
          <div className="mb-2">
            <span className="text-xs font-semibold text-accent/70 uppercase tracking-wider">
              {category}
            </span>
          </div>
        )}

        {/* Product Name - konsisten */}
        <h3 className="font-bold text-lg text-white mb-3 group-hover:text-accent-light transition-colors duration-300">
          {name}
        </h3>

        {/* Description - Dipotong */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors mb-4">
          {description}
        </p>

        {/* Subtle hover indicator */}
        <div className="mt-4 flex items-center justify-between text-xs text-gray-500 group-hover:text-accent transition-colors">
          <span>Klik untuk detail</span>
          <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
