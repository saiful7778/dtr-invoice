"use client";
import Image from "next/image";
import siteLogo from "../../public/site-logo.png";
import Link from "next/link";
import { navLinks } from "@/staticData";
import { usePathname } from "next/navigation";
import cn from "@/lib/utils/cn";
import { Button } from "keep-react";
import { LuMenuSquare } from "react-icons/lu";
import { useState } from "react";

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const renderNavLink = navLinks.map((nav, idx) => (
    <li key={"nav-link" + idx}>
      <NavLink path={nav.path}>{nav.navName}</NavLink>
    </li>
  ));
  return (
    <nav className="bg-tint-blue p-2 text-gray">
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
            className="rounded-full bg-transparent px-6 text-accent hover:bg-transparent hover:text-gray max-[374px]:hidden"
            size="xs"
            variant="outline"
            color="primary"
          >
            Contact us
          </Button>
          <Button
            onClick={() => setMenu((prop) => !prop)}
            className="md:hidden"
            shape="icon"
            size="sm"
            color="primary"
          >
            <LuMenuSquare size={25} />
          </Button>
        </div>
        {menu && (
          <div className="w-full flex-shrink-0 flex-grow p-2 text-center">
            <ul className="space-y-2 p-2">{renderNavLink}</ul>
            <Button
              className="mx-auto rounded-full bg-transparent px-6 text-accent hover:bg-transparent hover:text-gray min-[374px]:hidden"
              size="xs"
              variant="outline"
              color="primary"
            >
              Contact us
            </Button>
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
