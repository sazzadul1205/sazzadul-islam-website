import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Shared/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Sazzadul Islam Website",
  description: "Website for Sazzadul Islam",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen bg-gray-400"> {children} </main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
