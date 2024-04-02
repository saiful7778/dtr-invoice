import Image from "next/image";
import Link from "next/link";
import siteLogo from "../../public/site-logo.png";
import { FaFacebook, FaLinkedin, FaXTwitter } from "react-icons/fa6";
import SocialIcon from "@/components/SocialIcon";

const Footer = () => {
  const date = new Date();
  return (
    <footer>
      <div className="text-gray-100 bg-tint-blue">
        <div className="container flex flex-col justify-between gap-6 px-2 py-20 md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src={siteLogo}
                alt="site logo"
                width={30}
                height={30}
                title="DTR-Invoice"
              />
              <Link href="/" className="text-lg font-bold">
                DTR-Invoice
              </Link>
            </div>
            <p>
              Empower your business with DTR-Invoice: Simplify, organize, and
              thrive with our comprehensive management solution.
            </p>
          </div>
          <div className="w-full md:w-1/2">
            <h3>Let{`'`}s talk with us</h3>
            <p className="mt-4">We are always open to discuss your business.</p>
            <div className="mt-4 flex items-center gap-4">
              <SocialIcon href="https://www.facebook.com/Saiful.Islam.Rafi.89">
                <FaFacebook size={25} />
              </SocialIcon>
              <SocialIcon href="https://www.linkedin.com/in/saiful-islam-0471b924b">
                <FaLinkedin size={25} />
              </SocialIcon>
              <SocialIcon href="https://twitter.com/SaifulI87764986">
                <FaXTwitter size={25} />
              </SocialIcon>
            </div>
          </div>
        </div>
      </div>
      <div className="container bg-accent p-10 text-center">
        Copyright {date.getFullYear()}, All right reserved
      </div>
    </footer>
  );
};

export default Footer;
