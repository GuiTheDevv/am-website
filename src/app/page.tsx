import Image from "next/image";
import Hero from "@/app/components/hero";
import AboutUs from "./components/aboutUs";
import Portfolio from "./components/portfolio";
import Testimonials from "./components/testimonials";
import Footer from "./components/footer";
import Pricing from "./components/pricing";
import ContactForm from "./components/contactForm";

export default function Home() {
  return (
    <main className="background">
      <AboutUs />
      <Testimonials />
      <ContactForm />
    </main>
  );
}
