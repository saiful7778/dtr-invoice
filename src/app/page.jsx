import Banner from "@/shared/Banner";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";

import Contact from "@/sections/Contact";
import Features from "@/sections/Features";
import HowWeWork from "@/sections/HowWeWork";

const HomePage = () => {
  return (
    <>
      <header>
        <Navbar />
        <Banner />
      </header>
      <main>
        <HowWeWork />
        <Features />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
