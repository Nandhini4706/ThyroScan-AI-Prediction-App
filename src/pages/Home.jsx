import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Features from "../components/home/Features";
import Technologies from "../components/home/Technologies";
import HowItWorks from "../components/home/HowItWorks";
import WhyChoose from "../components/home/WhyChoose";
import Contact from "../components/home/Contact";
import Footer from "../components/home/Footer";
import Navbar from "../components/common/DashboardNavbar";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Technologies />
      <HowItWorks />
      <WhyChoose />
      <Contact />
      <Footer />
    </>
  );
}