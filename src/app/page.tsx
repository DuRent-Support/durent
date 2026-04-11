"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ParallaxGallery from "@/components/ParallaxGallery";
import { openWhatsAppGeneral } from "@/utils/whatsapp";
import { Download, FileText, CheckCircle } from "lucide-react";

export default function Page() {
  const [isDownloading, setIsDownloading] = useState(false);

  // Handle pricelist download
  const handleDownloadPricelist = () => {
    if (typeof window === "undefined") return;
    setIsDownloading(true);
    setTimeout(() => {
      const link = document.createElement("a");
      link.href = "/files/DuRent Support PriceList.pdf";
      link.download = "DuRent Support PriceList.pdf";
      link.click();
      setIsDownloading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-dark-bg text-white relative overflow-hidden">
      {/* Background Elements - Lebih subtle */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[120px] animate-pulse"></div>
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-accent/3 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header onContactClick={() => openWhatsAppGeneral()} />
        <Hero />
        <ParallaxGallery />

        {/* Download Pricelist Section */}
        <section id="pricelist" className="py-20 md:py-32 relative">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              {/* Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Daftar Harga Lengkap
                </h2>
                <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
                  Download pricelist kami untuk melihat semua produk dan harga
                  terbaru Maret 2026
                </p>
              </div>

              {/* Download Card */}
              <div className="relative group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-accent/30 via-accent-light/30 to-accent/30 rounded-3xl blur-2xl opacity-50 group-hover:opacity-100 transition-all duration-700"></div>

                <div className="relative bg-gradient-to-br from-card-bg to-dark-bg-secondary rounded-3xl p-8 md:p-12 border border-gray-800 group-hover:border-accent/50 transition-all duration-500">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Icon Section */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl"></div>
                        <div className="relative bg-gradient-to-br from-accent to-accent-light p-6 rounded-2xl">
                          <FileText className="w-16 h-16 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-2xl md:text-3xl font-bold mb-3">
                        Pricelist DuRent Support
                      </h3>
                      <p className="text-gray-400 mb-6">
                        File PDF berisi informasi lengkap produk, spesifikasi,
                        dan harga rental equipment production support kami
                      </p>

                      {/* Features */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {[
                          "Daftar Produk Lengkap",
                          "Harga Terbaru 2026",
                          "Spesifikasi Detail",
                          "Syarat & Ketentuan",
                        ].map((feature, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                            <span className="text-gray-300 text-sm">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Download Button */}
                      <button
                        onClick={handleDownloadPricelist}
                        disabled={isDownloading}
                        className="bg-gradient-to-r from-accent to-accent-light hover:from-accent-light hover:to-accent text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-accent/30 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto md:mx-0"
                      >
                        <Download
                          className={`w-5 h-5 ${
                            isDownloading ? "animate-bounce" : ""
                          }`}
                        />
                        <span>
                          {isDownloading
                            ? "Mengunduh..."
                            : "Download Pricelist"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-12 text-center">
                <p className="text-gray-500 text-sm">
                  Untuk informasi lebih lanjut atau konsultasi, silakan{" "}
                  <button
                    onClick={() => openWhatsAppGeneral()}
                    className="text-accent hover:text-accent-light underline font-semibold transition-colors"
                  >
                    hubungi kami via WhatsApp
                  </button>
                </p>
              </div>
            </div>
          </div>
        </section>

        <Footer onWhatsAppClick={() => openWhatsAppGeneral()} />
      </div>
    </div>
  );
}
