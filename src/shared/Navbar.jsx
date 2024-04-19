"use client";
import Image from "next/image";
import siteLogo from "../../public/site-logo.png";
import Link from "next/link";
import { navLinks } from "@/staticData";
import { usePathname } from "next/navigation";
import cn from "@/lib/utils/cn";
import { Avatar, Popover, Spinner } from "keep-react";
import { LuMenuSquare } from "react-icons/lu";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import ThemeChange from "@/components/ThemeChange";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const { data, status } = useSession();

  const renderNavLink = navLinks.map((nav, idx) => (
    <li key={"nav-link" + idx}>
      <NavLink path={nav.path}>{nav.navName}</NavLink>
    </li>
  ));

  return (
    <nav className="bg-gray-300 p-2 dark:bg-tint-blue">
      <div className="container flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
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
        <div className="flex items-center gap-4">
          <ul className="hidden items-center gap-3 md:flex">{renderNavLink}</ul>
          <Button
            href="/#contact"
            className="rounded-full max-md:hidden"
            variant="primary-outline"
          >
            Contact us
          </Button>
          <ThemeChange />
          {status === "loading" ? (
            <Spinner color="info" />
          ) : status === "authenticated" ? (
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

                <Link
                  className="my-1 block w-full rounded p-1 text-center text-sm hover:bg-gray-300"
                  href="/admin/dashboard"
                >
                  Dashboard
                </Link>
                <Button
                  onClick={async () => await signOut()}
                  className="w-full"
                  variant="cancel"
                  size="xs"
                >
                  Logout
                </Button>
              </Popover.Content>
            </Popover>
          ) : (
            <Button
              className="max-sm:hidden"
              variant="primary"
              href="/authentication/login"
            >
              Login
            </Button>
          )}
          <Button
            onClick={() => setMenu((prop) => !prop)}
            className="md:hidden"
            shape="icon-button"
            variant="primary"
          >
            <LuMenuSquare size={25} />
          </Button>
        </div>
        {menu && (
          <div className="w-full flex-shrink-0 flex-grow space-y-2 p-2 text-center md:hidden">
            <ul className="space-y-2">{renderNavLink}</ul>
            <div>
              <Button
                href="/#contact"
                className="inline-block rounded-full"
                variant="primary-outline"
              >
                Contact us
              </Button>
            </div>
            <div>
              <Button
                className="inline-block"
                variant="primary"
                href="/authentication/login"
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const NavLink = ({ children, path }) => {
  const pathName = usePathname();
  return (
    <Link
      className={cn(
        "text-base font-medium",
        pathName === path ? "opacity-100" : "opacity-50 hover:opacity-100",
      )}
      href={path}
    >
      {children}
    </Link>
  );
};

export default Navbar;
