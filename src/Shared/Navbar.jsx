"use client";

import Image from "next/image";
import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  const [activeLink, setActiveLink] = useState("#home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Handle scroll effects
  useEffect(() => {
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
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Handle smooth scroll with offset for fixed navbar
  const handleSmoothScroll = useCallback((e, href) => {
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
  }, []);

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
          <div className="relative">
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
          </div>

          <motion.div
            animate={{
              color: isHovered ? "#2563eb" : "#1f2937"
            }}
            className="hidden sm:block"
          >
            <p className="text-lg font-semibold font-poppins cursor-default">
              Sazzadul Islam
            </p>
            <p className="text-xs text-gray-500 -mt-1">Web Developer</p>
          </motion.div>
        </motion.div>

        {/* Desktop Navigation */}
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

        {/* Right Side - Contact Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {/* Contact Button (Desktop) */}
          <motion.a
            href="#contacts"
            onClick={(e) => handleSmoothScroll(e, "#contacts")}
            className="hidden md:block px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full font-medium shadow-md hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Hire Me
          </motion.a>

          {/* Mobile Menu Button */}
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
        </div>
      </div>

      {/* Mobile Menu */}
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

      {/* Progress bar for scroll position */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600"
        style={{ width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` }}
        animate={{ width: `${(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%` }}
        transition={{ duration: 0.1 }}
      />
    </motion.nav>
  );
};

export default Navbar;