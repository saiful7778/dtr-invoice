"use client";
import useStateData from "@/hooks/useStateData";
import cn from "@/lib/utils/cn";

const ClientAdminLayout = ({ children }) => {
  const { sidebar } = useStateData();

  return (
    <main
      className={cn(
        "mt-[42px] w-full p-2 duration-300",
        sidebar ? "md:ml-36" : "md:ml-[43px]",
      )}
    >
      {children}
    </main>
  );
};

export default ClientAdminLayout;
