"use client";
// packages
import cn from "@/lib/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
// hooks
import { useState } from "react";
// icons
import { IoSettingsOutline } from "react-icons/io5";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineInventory2 } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";
import { FaFileInvoiceDollar } from "react-icons/fa";
import useStateData from "@/hooks/useStateData";

const Sidebar = () => {
  const { sidebar } = useStateData();

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 flex min-h-screen flex-col justify-between whitespace-nowrap border-r border-gray-300 bg-gray-200 shadow-md duration-300 dark:border-gray-700 dark:bg-gray-800",
        sidebar ? "w-36" : "max-sm:-left-full md:w-[43px]",
      )}
    >
      <nav className="mt-[42px] p-1.5">
        <ul className="flex w-full flex-col gap-2">
          <SidebarItem
            path="/admin/dashboard"
            textShow={sidebar}
            icon={<LuLayoutDashboard />}
          >
            Deshboard
          </SidebarItem>
          <SidebarDropdown
            path="/admin/inventory"
            textShow={sidebar}
            icon={<MdOutlineInventory2 />}
            title="Inventory"
          >
            <SidebarDropdownItem path="/admin/inventory/add_product">
              Add Product
            </SidebarDropdownItem>
            <SidebarDropdownItem path="/admin/inventory/all_products">
              All Products
            </SidebarDropdownItem>
          </SidebarDropdown>
          <SidebarDropdown
            path="/admin/invoice"
            textShow={sidebar}
            icon={<FaFileInvoiceDollar />}
            title="Invoice"
          >
            <SidebarDropdownItem path="/admin/invoice/add_invoice">
              Add Invoice
            </SidebarDropdownItem>
            <SidebarDropdownItem path="/admin/invoice/all_invoices">
              All Invoices
            </SidebarDropdownItem>
          </SidebarDropdown>
        </ul>
      </nav>
    </div>
  );
};

const style = {
  base: "inline-flex w-full items-center cursor-pointer rounded border px-2 py-1 text-sm duration-100",
  active:
    "bg-gray-50 border-gray-300 dark:bg-gray-700 dark:border-gray-600 shadow",
  inActive:
    "border-gray-300 hover:bg-gray-50 dark:border-gray-600 hover:dark:bg-gray-700",
};

const SidebarItem = ({ children, path, icon, textShow }) => {
  const pathName = usePathname();
  return (
    <li>
      <Link
        className={cn(
          style.base,
          pathName === path ? style.active : style.inActive,
          textShow || "justify-center",
        )}
        href={path}
      >
        <span>{icon}</span>
        <span className={cn(textShow ? "ml-1" : "w-0 overflow-hidden")}>
          {children}
        </span>
      </Link>
    </li>
  );
};

const SidebarDropdown = ({ children, path, title, icon, textShow }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathName = usePathname();
  const isActive = pathName.startsWith(path);
  return (
    <li className="group relative">
      <div
        onClick={() => setDropdownOpen((l) => !l)}
        className={cn(
          style.base,
          isActive ? style.active : style.inActive,
          textShow || "justify-center",
        )}
      >
        <span>{icon}</span>
        <span className={cn(textShow ? "ml-1" : "w-0 overflow-hidden")}>
          {title}
        </span>
        {textShow && (
          <span
            className={cn(
              "ml-auto transition duration-300",
              dropdownOpen ? "rotate-180" : "rotate-0",
            )}
          >
            <IoIosArrowDown />
          </span>
        )}
      </div>
      {textShow ? (
        <div
          className={cn(
            "ml-5 grid transition-all duration-300 ease-in-out",
            dropdownOpen
              ? "mt-1 grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <ul className="divide-y divide-gray-300 overflow-hidden border-b border-gray-300 dark:divide-gray-600 dark:border-gray-600">
            {children}
          </ul>
        </div>
      ) : (
        <div
          className={cn(
            "absolute left-full top-0 z-[200] w-24 whitespace-nowrap",
            dropdownOpen
              ? "visible opacity-100"
              : "invisible opacity-0 group-hover:visible group-hover:opacity-100",
          )}
        >
          <ul className="divide-y divide-gray-300 border border-gray-300 bg-gray-200 dark:divide-gray-700 dark:border-gray-700 dark:bg-gray-800">
            {children}
          </ul>
        </div>
      )}
    </li>
  );
};

const SidebarDropdownItem = ({ path, children }) => {
  const pathName = usePathname();
  const isActive = pathName.startsWith(path);
  return (
    <li>
      <Link
        className={cn(
          "block w-full cursor-pointer px-2 py-1 text-xs hover:bg-gray-50 hover:dark:bg-gray-700",
          isActive && "bg-gray-50 dark:bg-gray-700",
        )}
        href={path}
      >
        {children}
      </Link>
    </li>
  );
};

export default Sidebar;
