import Button from "@/components/Button";
import { Input, Textarea } from "keep-react";
import Image from "next/image";
import contactBg from "../../public/contact-bg.jpg";

const Contact = () => {
  return (
    <section
      id="contact"
      className="container mb-16 flex h-[600px] flex-col items-center justify-between overflow-hidden rounded-md bg-tint-blue text-gray-100 shadow-md md:w-4/5 md:flex-row"
    >
      <div className="relative h-full w-full md:w-1/2">
        <Image
          className="h-full w-full object-cover object-center"
          src={contactBg}
          alt="contact banner image"
        />
        <div className="absolute inset-0 z-20 bg-tint-blue/50 px-10 py-16">
          <h3>Feel free to share with us</h3>
          <p>
            Empower your business with DTR-Invoice: Simplify, organize, and
            thrive with our comprehensive management solution.
          </p>
        </div>
      </div>
      <div className="h-full w-full px-10 py-16 md:w-1/2">
        <h5>Send inquiry</h5>
        <form className="my-4 space-y-4">
          <Input
            className="border-dark-blue bg-transparent"
            placeholder="Your name"
            type="text"
          />
          <Input
            className="border-dark-blue bg-transparent"
            placeholder="Email"
            type="email"
          />
          <Textarea
            className="border-dark-blue bg-transparent"
            placeholder="Write your message here."
          />
          <Button
            className="w-full rounded-full"
            variant="primary"
            type="submit"
          >
            Send an inquiry
          </Button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
