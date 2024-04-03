"use client";
// import Button from "@/components/utilities/Button";
import siteLogo from "../../public/site-logo.png";
// import { IoSunnyOutline } from "react-icons/io5";
import { LuMenuSquare } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { Button } from "keep-react";
import useStateData from "@/hooks/useStateData";

const Topbar = () => {
  const { handleSidebar } = useStateData();

  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <div className="flex items-center justify-between border border-gray-400 bg-gray-300 p-1 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <Button
            className="ml-0.5 size-7"
            onClick={handleSidebar}
            shape="icon"
            size="xs"
            color="primary"
          >
            <LuMenuSquare size={17} />
          </Button>
          <Image
            src={siteLogo}
            alt="site logo"
            width={30}
            height={30}
            title="DTR-Invoice"
          />
          <Link
            href="/admin/dashboard"
            className="text-lg font-bold max-sm:hidden"
          >
            DTR-Invoice
          </Link>
        </div>
        <div>
          {/* <Button onClick={handleTheme} shape="icon">
            <IoSunnyOutline size={18} />
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
