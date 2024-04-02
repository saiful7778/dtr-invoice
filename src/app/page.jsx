import PointCard from "@/components/PointCard";
import Banner from "@/shared/Banner";
import Footer from "@/shared/Footer";
import Navbar from "@/shared/Navbar";
import { keyFeature } from "@/staticData";

const HomePage = () => {
  return (
    <>
      <header>
        <Navbar />
        <Banner />
      </header>
      <main>
        <section className="container my-16 flex flex-col justify-between gap-6 p-2 md:w-4/5 md:flex-row">
          <div>
            <h2 className="text-dark-blue">How we work</h2>
            <p className="text-dark-blue">
              Effortlessly manage your business: DTR-Invoice automates
              invoicing, inventory, and more, simplifying your workflow.
            </p>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            {keyFeature.map((ele, idx) => (
              <PointCard
                key={"feature" + idx}
                point={ele.point}
                title={ele.title}
                details={ele.details}
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
