"use client";
// import Button from "@/components/utilities/Button";
import siteLogo from "../../public/site-logo.png";
import { LuMenuSquare } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";
import { Avatar, Button, Popover, Spinner } from "keep-react";
import useStateData from "@/hooks/useStateData";
import { signOut, useSession } from "next-auth/react";
import ThemeChange from "@/components/ThemeChange";

const Topbar = () => {
  const { handleSidebar } = useStateData();
  const { data, status } = useSession();

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
        <div className="flex items-center gap-2">
          <ThemeChange />
          {status === "loading" ? (
            <Spinner color="info" />
          ) : (
            status === "authenticated" && (
              <Popover placement="bottom-end">
                <Popover.Action className="p-0">
                  <Avatar
                    className="bg-gray-300"
                    size="md"
                    shape="circle"
                    img={data?.user?.image}
                  />
                </Popover.Action>
                <Popover.Content className="z-20 rounded bg-white p-2 shadow">
                  <ul className="text-xs text-gray-500">
                    <li>Name: {data?.user?.name}</li>
                    <li>Email: {data?.user?.email}</li>
                  </ul>
                  <Button
                    onClick={() => signOut()}
                    className="w-full py-1"
                    color="error"
                    size="xs"
                  >
                    Logout
                  </Button>
                </Popover.Content>
              </Popover>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
