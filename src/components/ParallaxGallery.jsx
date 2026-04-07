"use client";

import { useEffect, useRef, useState } from "react";
import galleryData from "../data/galleryImages.json";

const ParallaxGallery = () => {
  const [scrollY, setScrollY] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(1024);
  const sectionRef = useRef(null);
  const rafRef = useRef(null); // To store requestAnimationFrame ID

  // Track scroll position with requestAnimationFrame for smooth 60fps updates
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Calculate sliding offset based on scroll with seamless looping
  const getSlideOffset = (direction, imageWidth, totalImages) => {
    if (!sectionRef.current) return 0;

    const rect = sectionRef.current.getBoundingClientRect();
    const scrollProgress = -rect.top;

    // Calculate scroll-based offset
    const speed = 0.6;
    const rawOffset = scrollProgress * speed;

    // Calculate total width of one set of images (including gaps)
    const gap = viewportWidth < 768 ? 16 : 24;
    const totalWidth = (imageWidth + gap) * totalImages;

    // Apply direction - continuous scrolling
    const offset = direction === "left" ? -rawOffset : rawOffset;

    // Use modulo for seamless looping
    return (((offset % totalWidth) + totalWidth) % totalWidth) - totalWidth;
  };

  // Create duplicates for seamless infinite scroll
  const allImages = galleryData.images;
  const repeats = 20; // Enough repeats to always fill the screen
  const topRowImages = Array(repeats).fill(allImages).flat();

  // Bottom row starts from last image (reversed)
  const reversedImages = [...allImages].reverse();
  const bottomRowImages = Array(repeats).fill(reversedImages).flat();

  // Calculate approximate image width (including padding and gap)
  const imageWidth =
    viewportWidth < 640 ? 200 : viewportWidth < 768 ? 240 : 304;

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-b from-dark-bg via-gray-900 to-dark-bg"
    >
      {/* Title Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
            Dipercaya oleh Berbagai Produksi
          </h2>
          <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            Menyediakan equipment untuk film, iklan, video klip, dan berbagai
            produksi media lainnya
          </p>
        </div>
      </div>

      {/* Film Roll Gallery - Two Sliding Rows */}
      <div className="space-y-6 md:space-y-8">
        {/* Top Row - Slides Left */}
        <div className="relative">
          <div
            className="flex gap-4 md:gap-6"
            style={{
              transform: `translate3d(${getSlideOffset(
                "left",
                imageWidth,
                allImages.length,
              )}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {topRowImages.map((image, idx) => (
              <div key={`top-${idx}`} className="flex-shrink-0 group">
                {/* Film Frame Style */}
                <div className="relative bg-black p-2 md:p-3 shadow-2xl rounded-sm">
                  {/* Film perforations top */}
                  <div className="absolute -top-1 left-0 right-0 flex justify-around px-2">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-2 bg-gray-700 rounded-sm"
                      ></div>
                    ))}
                  </div>

                  <div className="w-48 h-32 sm:w-56 sm:h-36 md:w-72 md:h-48 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Film perforations bottom */}
                  <div className="absolute -bottom-1 left-0 right-0 flex justify-around px-2">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-2 bg-gray-700 rounded-sm"
                      ></div>
                    ))}
                  </div>

                  {/* Film number label */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-mono">
                    #{String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Row - Slides Right */}
        <div className="relative">
          <div
            className="flex gap-4 md:gap-6"
            style={{
              transform: `translate3d(${getSlideOffset(
                "right",
                imageWidth,
                allImages.length,
              )}px, 0, 0)`,
              willChange: "transform",
            }}
          >
            {bottomRowImages.map((image, idx) => (
              <div key={`bottom-${idx}`} className="flex-shrink-0 group">
                {/* Film Frame Style */}
                <div className="relative bg-black p-2 md:p-3 shadow-2xl rounded-sm">
                  {/* Film perforations top */}
                  <div className="absolute -top-1 left-0 right-0 flex justify-around px-2">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-2 bg-gray-700 rounded-sm"
                      ></div>
                    ))}
                  </div>

                  <div className="w-48 h-32 sm:w-56 sm:h-36 md:w-72 md:h-48 overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>

                  {/* Film perforations bottom */}
                  <div className="absolute -bottom-1 left-0 right-0 flex justify-around px-2">
                    {[...Array(8)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 h-2 bg-gray-700 rounded-sm"
                      ></div>
                    ))}
                  </div>

                  {/* Film number label */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded font-mono">
                    #{String(idx + 1).padStart(2, "0")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gradient fade edges */}
      <div className="absolute top-0 left-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-dark-bg to-transparent pointer-events-none z-10"></div>
      <div className="absolute top-0 right-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-dark-bg to-transparent pointer-events-none z-10"></div>
    </section>
  );
};

export default ParallaxGallery;
