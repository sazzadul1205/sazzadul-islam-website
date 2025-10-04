import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/Shared/Navbar";
import Footer from "@/Shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
});
export const metadata = {
  title: "Sazzadul Islam | Full Stack Developer",
  description:
    "I'm a passionate full stack web developer building efficient, scalable, and visually appealing web applications. Explore my portfolio, projects, skills, and contact information.",
  keywords:
    "Sazzadul Islam, Web Developer, Full Stack Developer, React, Node.js, Next.js, MongoDB, ExpressJS, Tailwind, DaisyUI, Bootstrap, Firebase, VueJS, MySQL, JavaScript, HTML5, CSS3, GitHub, Portfolio",
  authors: [{ name: "Sazzadul Islam" }],
  openGraph: {
    title: "Sazzadul Islam | Full Stack Developer",
    description:
      "I'm a passionate full stack web developer building efficient, scalable, and visually appealing web applications. Explore my portfolio, projects, skills, and contact information.",
    url: "https://yourwebsite.com", // Replace with your actual domain
    siteName: "Sazzadul Islam",
    images: [
      {
        url: "/logo.png", // Replace with a proper OG image
        width: 1200,
        height: 630,
        alt: "Sazzadul Islam Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sazzadul Islam | Full Stack Developer",
    description:
      "I'm a passionate full stack web developer building efficient, scalable, and visually appealing web applications. Explore my portfolio, projects, skills, and contact information.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased `}
      >
        <Navbar />
        <main className="min-h-screen bg-gray-400"> {children} </main>
        <Footer />
      </body>
    </html>
  );
}
