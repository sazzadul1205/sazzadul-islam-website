import "./globals.css";
import Navbar from "@/Shared/Navbar";
import Footer from "@/Shared/Footer";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import Providers from "./providers"; // Import the Providers component

// Font configs with display swap for better performance
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Use environment variable with fallback
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://sazzadul-islam.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sazzadul Islam | Full Stack Web Developer (MERN & Laravel)",
    template: "%s | Sazzadul Islam",
  },
  description:
    "I'm Sazzadul Islam, a passionate full stack web developer specializing in both MERN (MongoDB, Express.js, React, Node.js) and Laravel (PHP, MySQL) stacks. Building efficient, scalable, and visually appealing web applications.",
  keywords: [
    "Sazzadul Islam",
    "Full Stack Developer",
    "Web Developer",
    "MERN Stack Developer",
    "Laravel Developer",
    "PHP Developer",
    "MySQL Expert",
    "React Developer",
    "Next.js Expert",
    "Node.js Developer",
    "Express.js",
    "MongoDB",
    "JavaScript Developer",
    "Frontend Developer",
    "Backend Developer",
    "PHP Laravel",
    "MySQL Database",
    "phpMyAdmin",
    "RESTful APIs",
    "API Development",
    "Database Design",
    "Full Stack Portfolio",
    "Bangladesh Web Developer",
  ],
  authors: [{ name: "Sazzadul Islam", url: siteUrl }],
  creator: "Sazzadul Islam",
  publisher: "Sazzadul Islam",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  openGraph: {
    title: "Sazzadul Islam | Full Stack Web Developer (MERN & Laravel)",
    description:
      "Full stack web developer specializing in MERN stack (MongoDB, Express.js, React, Node.js) and Laravel (PHP, MySQL). Check out my portfolio and projects spanning both modern JavaScript and PHP ecosystems.",
    url: siteUrl,
    siteName: "Sazzadul Islam Portfolio | MERN & Laravel Developer",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sazzadul Islam - Full Stack Web Developer specializing in MERN and Laravel",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sazzadul Islam | Full Stack Web Developer (MERN & Laravel)",
    description:
      "Full stack web developer specializing in MERN stack (MongoDB, Express, React, Node.js) and Laravel (PHP, MySQL).",
    images: ["/og-image.png"],
    creator: "@sazzadu84352084",
    site: "@sazzadu84352084",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/file.svg" },
      { url: "/file.svg", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/og-image.png", sizes: "180x180", type: "image/png" }],
  },

  alternates: {
    canonical: siteUrl,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f9fafb" },
    { media: "(prefers-color-scheme: dark)", color: "#111827" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }) {
  // Structured data for better SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sazzadul Islam",
    url: siteUrl,
    sameAs: [
      "https://github.com/sazzadulislam",
      "https://linkedin.com/in/sazzadulislam",
      "https://twitter.com/sazzadulislam",
    ],
    jobTitle: "Full Stack Web Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    knowsAbout: [
      "MERN Stack",
      "Laravel",
      "PHP",
      "MySQL",
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Next.js",
      "RESTful APIs",
      "Database Design",
      "phpMyAdmin",
      "Frontend Development",
      "Backend Development",
    ],
    description:
      "Full stack web developer specializing in both MERN (MongoDB, Express.js, React, Node.js) and Laravel (PHP, MySQL) stacks. Building efficient, scalable web applications with modern technologies.",
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Structured data for rich snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />

        {/* Additional structured data for skills */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ItemList",
              name: "Technical Skills",
              description: "Full Stack Development Technologies",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "MERN Stack",
                  description: "MongoDB, Express.js, React, Node.js",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Laravel Stack",
                  description: "PHP, Laravel, MySQL, phpMyAdmin",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Databases",
                  description: "MySQL, MongoDB, phpMyAdmin",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Frontend",
                  description: "React, Next.js, Vue.js, Tailwind CSS",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Skip to main content
        </a>

        <Navbar />

        {/* Wrap everything with Providers */}
        <Providers>
          <main
            id="main-content"
            className="flex-grow bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
          >
            {children}
          </main>
        </Providers>

        <Footer />
      </body>
    </html>
  );
}
