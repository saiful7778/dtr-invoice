"use client";
import useStateData from "@/hooks/useStateData";
import cn from "@/lib/utils/cn";

const ClientAdminLayout = ({ children }) => {
  const { sidebar } = useStateData();

  return (
    <main
      className={cn(
        "mt-[42px] p-2 duration-300",
        sidebar ? "md:ml-36" : "md:ml-[43px]",
      )}
    >
      <div className="rounded border border-gray-300 bg-gray-200 p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
        {children}
      </div>
    </main>
  );
};

export default ClientAdminLayout;
