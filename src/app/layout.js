import { Outfit } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ToastContainer from "../components/ToastContainer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
});

export const metadata = {
  title: "DriveFleet - Premium Car Rentals & Listings",
  description: "Rent premium luxury vehicles or list your own car on the ultimate modern car-sharing platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${outfit.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col font-sans bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-50 selection:bg-indigo-500 selection:text-white">
        <AuthProvider>
          <Navbar />
          <main className="flex-1 w-full flex flex-col">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
