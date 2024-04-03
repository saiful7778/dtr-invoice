import { Poppins } from "next/font/google";
import "./globals.css";
import SessionContextProvider from "@/context/SessionContext";

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
        <SessionContextProvider>{children}</SessionContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;
