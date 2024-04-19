import cn from "@/lib/utils/cn";

export const TableMain = ({ children }) => {
  return (
    <section className="w-full overflow-auto border border-gray-300 dark:border-gray-600">
      <div className="relative">
        <table className="w-full overflow-auto">{children}</table>
      </div>
    </section>
  );
};

export const TableCaption = ({ children }) => {
  return (
    <caption className="bg-gray-100 p-0.5 text-sm dark:bg-gray-700">
      {children}
    </caption>
  );
};

export const TableHead = ({ className, children }) => {
  return (
    <thead
      className={cn(
        "border-y border-gray-300 bg-gray-50 text-xs font-normal dark:border-gray-600 dark:bg-gray-700",
        className,
      )}
    >
      <tr className="divide-x divide-gray-300 dark:divide-gray-600">
        {children}
      </tr>
    </thead>
  );
};

export const TableHeadCell = ({ className, children }) => {
  return (
    <th className={cn("px-1 py-0.5 font-normal", className)}>{children}</th>
  );
};

export const TableBody = ({ className, children }) => {
  return (
    <tbody
      className={cn(
        "divide-y divide-gray-300 text-sm dark:divide-gray-700",
        className,
      )}
    >
      {children}
    </tbody>
  );
};

export const TableRow = ({ children }) => {
  return (
    <tr className="divide-x divide-gray-300 hover:bg-gray-50 dark:divide-gray-600 hover:dark:bg-gray-700/80">
      {children}
    </tr>
  );
};

export const TableCell = ({ className, children }) => {
  return <td className={cn("px-1.5 py-1", className)}>{children}</td>;
};
