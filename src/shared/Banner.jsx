"use client";
import Image from "next/image";
import bannerbg from "../../public/banner-bg.png";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";

const Banner = () => {
  const router = useRouter();

  return (
    <section className="min-h-[91vh] bg-tint-blue text-gray-100">
      <div className="container flex min-h-[90vh] w-full flex-col items-center justify-between gap-4 p-2 lg:flex-row">
        <div className="w-full lg:w-1/2">
          <h1>
            Manage your <br /> business with us
          </h1>
          <p className="my-4">
            Streamline Your Business with DTR-Invoice: Simplifying Invoicing,
            Inventory, and More for Small Businesses Everywhere!
          </p>
          <div className="flex">
            <Button href="/admin/dashboard" variant="primary">
              Your Dashboard
            </Button>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <Image
            className="mx-auto"
            src={bannerbg}
            alt="banner image"
            width={600}
            height={200}
          />
        </div>
      </div>
    </section>
  );
};

export default Banner;
