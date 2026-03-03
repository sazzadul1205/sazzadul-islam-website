"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

// Critical components (loaded immediately)
import Hero from "@/Components/Hero/Hero";
import Loader from "@/Shared/Loader/Loader";

// Lazy load non-critical components with dynamic imports
const About = dynamic(() => import("@/Components/About/About"), {
  loading: () => (
    <div
      className="w-full h-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
      aria-label="Loading about section"
    />
  ),
  ssr: false, // Disable SSR for better client-side performance
});

const Projects = dynamic(() => import("@/Components/Projects/Projects"), {
  loading: () => (
    <div
      className="w-full h-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
      aria-label="Loading projects section"
    />
  ),
  ssr: false,
});

const Contact = dynamic(() => import("@/Components/Contact/Contact"), {
  loading: () => (
    <div
      className="w-full h-96 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-lg"
      aria-label="Loading contact section"
    />
  ),
  ssr: false,
});

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Clean up after visibility
        }
      },
      {
        threshold: 0.1,
        rootMargin: "200px", // Load slightly before entering viewport
        ...options,
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options]);

  return [ref, isVisible];
};

// Lazy Section Component
const LazySection = ({ children, id, className = "" }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section
      ref={ref}
      id={id}
      className={`transition-opacity duration-700 ${
        isVisible ? "opacity-100" : "opacity-0"
      } ${className}`}
      aria-label={`${id} section`}
    >
      {isVisible ? (
        children
      ) : (
        <div className="w-full h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg" />
      )}
    </section>
  );
};

// Optimized background image component
const BackgroundImage = ({ children }) => {
  const [bgLoaded, setBgLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile for background attachment optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Preload background image
    const img = new window.Image();
    img.src = "/OffWhite.jpg";
    img.onload = () => setBgLoaded(true);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Background image with progressive loading */}
      <div
        className={`fixed inset-0 bg-cover bg-center transition-opacity duration-1000 ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundImage: bgLoaded ? "url('/OffWhite.jpg')" : "none",
          backgroundAttachment: isMobile ? "scroll" : "fixed",
        }}
      />

      {/* Fallback background while loading */}
      <div
        className={`fixed inset-0 bg-gray-100 dark:bg-gray-900 transition-opacity duration-1000 ${
          bgLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

// Back to top button
const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 500);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
      aria-label="Back to top"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  ) : null;
};

export default function Home() {
  const [projectsData, setProjectsData] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch data with caching
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        // Add cache control headers
        const [projectsRes, aboutRes] = await Promise.all([
          fetch("/APIs/Projects", {
            headers: {
              "Cache-Control": "max-age=3600",
            },
          }),
          fetch("/APIs/About", {
            headers: {
              "Cache-Control": "max-age=3600",
            },
          }),
        ]);

        if (!projectsRes.ok) throw new Error("Failed to fetch projects");
        if (!aboutRes.ok) throw new Error("Failed to fetch about data");

        const projectsData = await projectsRes.json();
        const aboutData = await aboutRes.json();

        if (isMounted) {
          setProjectsData(
            Array.isArray(projectsData) ? projectsData : [projectsData],
          );
          setAboutData(aboutData);
          setDataLoaded(true);
        }
      } catch (err) {
        console.error("Error fetching data:", err.message || err);
        if (isMounted) {
          setError("Something went wrong while loading the content.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-lg font-semibold px-4 text-center">
        {error}
      </div>
    );
  }

  return (
    <BackgroundImage>
      {/* Hero section - Always visible */}
      <section id="home" className="relative">
        <Hero />
      </section>

      {/* About section - Lazy loaded */}
      <LazySection id="about">
        <About aboutData={aboutData} />
      </LazySection>

      {/* Projects section - Lazy loaded */}
      <LazySection id="projects">
        <Projects projectsData={projectsData} />
      </LazySection>

      {/* Contact section - Lazy loaded */}
      <LazySection id="contacts">
        <Contact />
      </LazySection>

      {/* Back to top button */}
      <BackToTop />

      {/* Performance metrics (optional - remove in production) */}
      {process.env.NODE_ENV === "development" && dataLoaded && (
        <div className="fixed bottom-4 left-4 text-xs bg-black/50 text-white px-2 py-1 rounded">
          Data loaded: {new Date().toLocaleTimeString()}
        </div>
      )}
    </BackgroundImage>
  );
}
