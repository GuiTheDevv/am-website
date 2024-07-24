import Image from "next/image";
import Hero from "@/app/components/hero";
import AboutUs from "./components/aboutUs";
import Portfolio from "./components/portfolio";
import Testimonials from "./components/testimonials";
import Footer from "./components/footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutUs />
      <Portfolio />
      <Testimonials />
      <Footer />
    </main>
  );
}
