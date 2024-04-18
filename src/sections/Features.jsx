import Feature from "@/components/Feature";
import { BiSupport } from "react-icons/bi";
import { FaFileInvoiceDollar, FaFilePdf } from "react-icons/fa6";
import { SiAuthelia } from "react-icons/si";

const Features = () => {
  const feature = [
    {
      icon: <BiSupport size={30} />,
      title: "24/7 Support",
      details:
        "Need assistance? Our dedicated support team is available 24/7 to help you succeed.",
    },
    {
      icon: <FaFileInvoiceDollar size={25} />,
      title: "Invoice making",
      details:
        "Effortlessly create and customize professional invoices with DTR-Invoice, ensuring accuracy and professionalism.",
    },
    {
      icon: <FaFilePdf size={25} />,
      title: "PDF generator",
      details:
        "Convert your invoices into PDF format seamlessly with DTR-Invoice for easy sharing and record-keeping.",
    },
    {
      icon: <SiAuthelia size={30} />,
      title: "Authentication",
      details:
        "Safeguard your data with secure authentication methods in DTR-Invoice, ensuring confidentiality and trustworthiness.",
    },
  ];
  return (
    <section>
      <div className="my-16 text-center">
        <div>Features</div>
        <h2>Our Features</h2>
      </div>
      <div className="container mb-16 grid grid-cols-1 gap-4 p-2 sm:grid-cols-2 md:w-4/5 lg:grid-cols-3">
        {feature.map((ele, idx) => (
          <Feature
            key={"feature" + idx}
            icon={ele.icon}
            title={ele.title}
            details={ele.details}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;
