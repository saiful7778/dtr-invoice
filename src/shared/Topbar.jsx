"use client";
// import Button from "@/components/utilities/Button";
import siteLogo from "../../public/site-logo.png";
import { LuMenuSquare } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Spinner } from "keep-react";
import useStateData from "@/hooks/useStateData";
import { signOut, useSession } from "next-auth/react";
import ThemeChange from "@/components/ThemeChange";
import Button from "@/components/Button";
import PopOver from "@/components/PopOver";

const Topbar = () => {
  const { handleSidebar } = useStateData();
  const { data, status } = useSession();

  return (
    <div className="fixed left-0 top-0 z-50 w-full">
      <div className="flex items-center justify-between border border-gray-300 bg-gray-200 p-1 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSidebar}
            className="ml-0.5"
            shape="icon-button"
            variant="primary"
          >
            <LuMenuSquare size={22} />
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
        <div className="flex items-center gap-2">
          <ThemeChange />
          {status === "loading" ? (
            <Spinner color="info" />
          ) : (
            status === "authenticated" && (
              <PopOver
                position="bottom-end"
                buttonAction={
                  <Avatar
                    className="border-2 border-gray-500 bg-transparent"
                    size="md"
                    shape="circle"
                    img={data?.user?.image}
                  />
                }
              >
                <>
                  <ul className="text-xs">
                    <li>
                      <span className="font-semibold">Name:</span>{" "}
                      <span>{data?.user?.name}</span>
                    </li>
                    <li>
                      <span className="font-semibold">Email:</span>{" "}
                      <span>{data?.user?.email}</span>
                    </li>
                  </ul>
                  <Link
                    className="my-1 block w-full rounded p-1 text-center text-sm hover:bg-gray-300 dark:hover:bg-gray-600"
                    href="/"
                  >
                    Home
                  </Link>
                  <Button
                    onClick={async () => await signOut()}
                    className="mt-1 w-full"
                    variant="cancel"
                    size="xs"
                  >
                    Logout
                  </Button>
                </>
              </PopOver>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
