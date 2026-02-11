import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import HeroSearchOverlay from "@/components/home/HeroSearchOverlay";
import HomeSections from "@/components/home/HomeSections";

export default function HomePage() {
  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      <HeroSearchOverlay />
      <HomeSections />
      <Footer />
    </>
  );
}
