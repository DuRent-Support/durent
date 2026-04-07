"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Hero = () => {
  const [scrolled, setScrolled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const autoRotateRef = useRef(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const services = [
    {
      title: "Equipment Rental",
      image: "/img/Equipment.jpeg",
      gradient: "from-green-600 via-emerald-500 to-teal-500",
    },
    {
      title: "Production Crew",
      image: "/img/Crew.jpeg",
      gradient: "from-blue-600 via-cyan-500 to-teal-500",
    },
    {
      title: "Transport & Logistics",
      image: "/img/Transport.jpeg",
      gradient: "from-indigo-600 via-purple-500 to-pink-500",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollThreshold = window.innerWidth < 768 ? 400 : 200;
      if (window.scrollY > scrollThreshold) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsSmallScreen(window.innerWidth < 400);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleResize();
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Auto-rotate carousel setiap 5 detik
  useEffect(() => {
    const startAutoRotate = () => {
      autoRotateRef.current = setInterval(() => {
        setIsAnimating(true);
        setRotation((prev) => prev - 72);
        setCurrentIndex((prev) => (prev + 1) % services.length);
        setTimeout(() => setIsAnimating(false), 800);
      }, 5000);
    };

    startAutoRotate();

    return () => {
      if (autoRotateRef.current) {
        clearInterval(autoRotateRef.current);
      }
    };
  }, []);

  const resetAutoRotate = () => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current);
    }
    autoRotateRef.current = setInterval(() => {
      setIsAnimating(true);
      setRotation((prev) => prev - 72);
      setCurrentIndex((prev) => (prev + 1) % services.length);
      setTimeout(() => setIsAnimating(false), 800);
    }, 5000);
  };

  const nextService = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRotation((prev) => prev - 72);
    setCurrentIndex((prev) => (prev + 1) % services.length);
    setTimeout(() => setIsAnimating(false), 800);
    resetAutoRotate();
  };

  const prevService = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setRotation((prev) => prev + 72);
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length);
    setTimeout(() => setIsAnimating(false), 800);
    resetAutoRotate();
  };

  // Handle touch events for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextService();
    }
    if (isRightSwipe) {
      prevService();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const currentService = services[currentIndex];
  const nextServiceData = services[(currentIndex + 1) % services.length];
  const prevServiceData =
    services[(currentIndex - 1 + services.length) % services.length];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-bg pt-20">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Geometric shapes with gradients */}
        <div
          className={`absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-br ${currentService.gradient} opacity-20 blur-3xl transition-all duration-1000 transform translate-x-1/3 -translate-y-1/3`}
        ></div>
        <div
          className={`absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr ${nextServiceData.gradient} opacity-15 blur-3xl transition-all duration-1000 transform -translate-x-1/3 translate-y-1/3`}
        ></div>

        {/* Diagonal geometric overlay */}
        <div className="absolute inset-0">
          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl ${currentService.gradient} opacity-10 transform skew-x-12 translate-x-1/4 transition-all duration-1000`}
          ></div>
        </div>
      </div>

      <div
        className={`container mx-auto px-6 relative z-10 py-12 transition-opacity duration-700 ${
          scrolled ? "opacity-30" : "opacity-100"
        }`}
      >
        <div className="flex flex-col md:grid md:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Text Content */}
          <div className="space-y-8 order-1 md:order-1 text-center md:text-left w-full">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-accent/10 px-4 py-2 rounded-full border border-accent/20 w-fit mx-auto md:mx-0">
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
              <span className="text-sm font-medium text-accent-light">
                One Stop Production Support
              </span>
            </div>

            {/* Dynamic Service Title with animation */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.1]">
                <span className="block text-white mb-2">Layanan</span>
                <span
                  key={currentIndex}
                  className={`block bg-gradient-to-r ${currentService.gradient} bg-clip-text text-transparent animate-fade-in-up`}
                >
                  {currentService.title}
                </span>
              </h1>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="h-px w-12 bg-accent"></div>
                <p className="text-lg md:text-xl text-gray-300 font-light">
                  Film & Media Production
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="max-w-xl mx-auto md:mx-0">
              <p className="text-base md:text-lg text-gray-400 leading-relaxed">
                Dari tenda, meja kursi, peralatan komunikasi, genset hingga
                transport. Kami menyediakan semua yang Anda butuhkan untuk
                mendukung produksi di belakang layar.
              </p>
            </div>

            {/* Service Navigation - Hidden on mobile */}
            <div className="hidden md:flex items-center justify-start gap-1 max-w-md mx-auto">
              <button
                onClick={prevService}
                className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronLeft className="w-6 h-6 text-white" />
              </button>

              <div className="flex gap-2 px-4">
                {services.map((_, index) => (
                  <div
                    key={index}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "w-12 bg-accent"
                        : "w-8 bg-gray-700"
                    }`}
                  ></div>
                ))}
              </div>

              <button
                onClick={nextService}
                className="w-12 h-12 rounded-full bg-white hover:bg-white/90 border border-white flex items-center justify-center transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="w-6 h-6 text-dark-bg" />
              </button>
            </div>

            {/* Dots Indicator for mobile */}
            <div className="flex md:hidden justify-center gap-2 mt-6">
              {services.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-accent w-8" : "bg-gray-700"
                  }`}
                ></div>
              ))}
            </div>
          </div>

          {/* Right side - 3D Carousel */}
          <div
            className="order-2 md:order-2 relative h-[400px] md:h-[600px] flex items-center justify-center w-full"
            style={{ perspective: "1200px" }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 3D Stack Container */}
            <div className="relative w-full h-full flex items-center justify-center">
              {services.map((service, index) => {
                const offset = index - currentIndex;
                const absOffset = Math.abs(offset);

                // Calculate circular carousel positioning
                // Mobile: circular carousel with all cards visible, Desktop: 3D stack
                let translateX,
                  translateY,
                  translateZ,
                  scale,
                  opacity,
                  blur,
                  rotateY;

                if (isMobile) {
                  // Mobile circular carousel - normalize offset to always show all cards
                  const normalizedOffset =
                    (offset + services.length) % services.length;
                  const adjustedOffset =
                    normalizedOffset > services.length / 2
                      ? normalizedOffset - services.length
                      : normalizedOffset;

                  // Circular positioning
                  const angle = (adjustedOffset / services.length) * 360;
                  const radius = isSmallScreen ? 100 : 150;

                  translateX = Math.sin((angle * Math.PI) / 180) * radius;
                  translateY =
                    (Math.cos((angle * Math.PI) / 180) - 1) * radius * 0.3;
                  translateZ =
                    Math.cos((angle * Math.PI) / 180) * radius * -0.5;

                  // Active card bigger, others smaller
                  scale =
                    offset === 0
                      ? isSmallScreen
                        ? 0.85
                        : 1
                      : isSmallScreen
                        ? 0.6
                        : 0.7;
                  opacity = offset === 0 ? 1 : 0.5;
                  blur = offset === 0 ? 0 : 1;
                  rotateY = adjustedOffset * 0;
                } else {
                  // Desktop 3D stack
                  translateZ = offset === 0 ? 0 : -absOffset * 150;
                  translateX = offset * 80;
                  translateY = offset * 20;
                  scale =
                    offset === 0 ? 1 : Math.max(0.6 - absOffset * 0.15, 0.3);
                  opacity =
                    offset === 0 ? 1 : Math.max(0.4 - absOffset * 0.1, 0.15);
                  blur = offset === 0 ? 0 : absOffset * 2;
                  rotateY = 0;
                }

                return (
                  <div
                    key={index}
                    className={`absolute rounded-3xl overflow-hidden shadow-2xl transition-all duration-700 ease-out ${
                      isMobile
                        ? "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                        : "left-1/2 -translate-x-1/2"
                    }`}
                    style={{
                      transform: isMobile
                        ? `translate(-50%, -50%) translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`
                        : `translateX(${translateX}px) translateY(${translateY}px) translateZ(${translateZ}px) scale(${scale}) rotateY(${rotateY}deg)`,
                      opacity: opacity,
                      filter: `blur(${blur}px)`,
                      zIndex: offset === 0 ? 30 : 20 - absOffset,
                      width: isSmallScreen
                        ? "240px"
                        : isMobile
                          ? "320px"
                          : "350px",
                      height: isSmallScreen
                        ? "240px"
                        : isMobile
                          ? "320px"
                          : "350px",
                      border:
                        offset === 0
                          ? "8px solid rgba(255, 255, 255, 0.3)"
                          : "4px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-30`}
                    ></div>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Service label on active card */}
                    {offset === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 md:p-6">
                        <p className="text-white text-lg md:text-xl font-bold">
                          {service.title}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Glow effect behind active card */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[320px] md:w-[400px] h-[320px] md:h-[400px] rounded-full pointer-events-none -z-10">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${currentService.gradient} opacity-20 blur-3xl transition-all duration-1000`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
