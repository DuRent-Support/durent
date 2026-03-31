import CtaSection from "@/components/ctasection";
import Features from "@/components/features";
import Footer from "@/components/layouts/Footer";
import Hero from "@/components/Hero";
import Marquee from "@/components/marquee";
import Navbar from "@/components/layouts/Header";
import Showcase from "@/components/showcase";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Showcase />
        <Marquee />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
