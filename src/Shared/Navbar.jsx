"use client";

import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import Link from "next/link";
import logo from "../../public/logo.png";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contacts", href: "#contacts" },
];

// Animation variants
const mobileMenuVariants = {
  hidden: {
    opacity: 0,
    x: "-100%",
    transition: {
      duration: 0.3
    }
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const mobileMenuItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

const Navbar = () => {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  const [isHovered, setIsHovered] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Handle scroll effects (only on home page)
  useEffect(() => {
    if (!isHomePage) return; // Only run on home page

    const handleScroll = () => {
      // Update scroll state for navbar styling
      setIsScrolled(window.scrollY > 20);

      // Update active link based on scroll position
      const scrollPosition = window.scrollY;

      for (const link of links) {
        const section = document.querySelector(link.href);
        if (
          section instanceof HTMLElement &&
          section.offsetTop <= scrollPosition + 100 &&
          section.offsetTop + section.offsetHeight > scrollPosition + 100
        ) {
          setActiveLink(link.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Handle Scroll Progress (only on home page)
  useEffect(() => {
    if (!isHomePage) return; // Only run on home page

    const handleScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScrollProgress);
    handleScrollProgress(); // initialize on mount

    return () => window.removeEventListener("scroll", handleScrollProgress);
  }, [isHomePage]);

  // Close mobile menu when clicking outside (only on home page)
  useEffect(() => {
    if (!isHomePage) return; // Only run on home page

    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen, isHomePage]);

  // Handle smooth scroll with offset for fixed navbar (only on home page)
  const handleSmoothScroll = useCallback((e, href) => {
    if (!isHomePage) return; // Only run on home page

    e.preventDefault();
    setIsMobileMenuOpen(false);

    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Height of navbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  }, [isHomePage]);

  // Handle navigation for non-home pages
  const handleNavigation = useCallback((e, href) => {
    if (isHomePage) {
      handleSmoothScroll(e, href);
    } else {
      // Navigate to home page with hash
      window.location.href = `/${href}`;
    }
  }, [isHomePage, handleSmoothScroll]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`navbar fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled
        ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
        : "bg-white/80 backdrop-blur-sm shadow-sm py-4"
        } text-black px-4 md:px-8`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo and Brand */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <Link href="/" className="relative">
            <Image
              src={logo}
              alt="Sazzadul Islam Logo"
              width={60}
              height={60}
              className="rounded-full border-2 border-blue-500 transition-transform duration-300 hover:rotate-12"
              priority
            />
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"
                />
              )}
            </AnimatePresence>
          </Link>

          <Link href="/">
            <motion.div
              animate={{
                color: isHovered ? "#2563eb" : "#1f2937"
              }}
              className="hidden sm:block cursor-pointer"
            >
              <p className="text-lg font-semibold font-poppins">
                Sazzadul Islam
              </p>
              <p className="text-xs text-gray-500 -mt-1">Web Developer</p>
            </motion.div>
          </Link>
        </motion.div>

        {/* Desktop Navigation - Only show on home page */}
        {isHomePage && (
          <div className="hidden lg:block">
            <ul className="flex gap-8 font-poppins font-medium">
              {links.map(({ name, href }) => (
                <motion.li
                  key={href}
                  className="relative"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <a
                    href={href}
                    onClick={(e) => handleSmoothScroll(e, href)}
                    className={`relative text-gray-700 hover:text-blue-600 transition-colors duration-300 py-2 ${activeLink === href ? "text-blue-600" : ""
                      }`}
                  >
                    {name}
                    {activeLink === href && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-blue-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Right Side - Always visible but with different behavior */}
        <div className="flex items-center gap-4">
          {/* Contact Button - Always visible but links differently based on page */}
          {isHomePage ? (
            <motion.a
              href="#contacts"
              onClick={(e) => handleSmoothScroll(e, "#contacts")}
              className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-md hover:shadow-xl transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Hire Me
            </motion.a>
          ) : (
            <Link href="/#contacts">
              <motion.span
                className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Hire Me
              </motion.span>
            </Link>
          )}

          {/* Mobile Menu Button - Only show on home page */}
          {isHomePage && (
            <motion.button
              className="btn btn-ghost lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <motion.path
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  variants={{
                    open: { d: "M6 18L18 6M6 6l12 12" },
                    closed: { d: "M4 6h16M4 12h16M4 18h16" }
                  }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            </motion.button>
          )}
        </div>
      </div>

      {/* Mobile Menu - Only show on home page */}
      {isHomePage && (
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              variants={mobileMenuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-xl mobile-menu-container"
            >
              <ul className="py-4 px-6 font-poppins font-medium">
                {links.map(({ name, href }) => (
                  <motion.li
                    key={href}
                    variants={mobileMenuItemVariants}
                    className="mb-2"
                  >
                    <a
                      href={href}
                      onClick={(e) => handleSmoothScroll(e, href)}
                      className={`block py-3 px-4 rounded-lg transition-all duration-300 ${activeLink === href
                        ? "bg-blue-50 text-blue-600 pl-6 border-l-4 border-blue-600"
                        : "text-gray-700 hover:bg-gray-50 hover:pl-6"
                        }`}
                    >
                      {name}
                    </a>
                  </motion.li>
                ))}

                {/* Mobile Contact Button */}
                <motion.li
                  variants={mobileMenuItemVariants}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <a
                    href="#contacts"
                    onClick={(e) => handleSmoothScroll(e, "#contacts")}
                    className="block py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-center font-semibold"
                  >
                    Hire Me
                  </a>
                </motion.li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Progress bar for scroll position - Only show on home page */}
      {isHomePage && (
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600"
          style={{ width: `${scrollProgress}%` }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      )}
    </motion.nav>
  );
};

export default Navbar;