import { Poppins } from "next/font/google";
import "./globals.css";

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
      <body className={poppins.className}>{children}</body>
    </html>
  );
};

export default RootLayout;
