import { Poppins } from "next/font/google";
import "./globals.css";
import SessionContextProvider from "@/context/SessionContext";
import StateContextProvider from "@/context/StateContext";

const poppins = Poppins({
  weight: ["700", "600", "500", "400"],
  subsets: ["latin"],
});

export const metadata = {
  title: "DTR-Invoice",
  description: "This is a business management web app",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionContextProvider>
          <StateContextProvider>
            <div className="relative min-h-screen w-full overflow-x-hidden bg-gray-50 text-dark-blue duration-200 dark:bg-gray-900 dark:text-gray-50">
              {children}
            </div>
          </StateContextProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
