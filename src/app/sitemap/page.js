"use client";

// app/sitemap/page.js
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiMap,
  FiHome,
  FiBriefcase,
  FiShield,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

const Sitemap = () => {
  const pages = [
    {
      category: "Main Pages",
      icon: FiHome,
      links: [
        {
          name: "Home",
          url: "/#home",
          description: "Landing page with hero section",
        },
        {
          name: "About",
          url: "/#about",
          description: "About me and my skills",
        },
        {
          name: "Projects",
          url: "/#projects",
          description: "My portfolio projects",
        },
        {
          name: "Contact",
          url: "/#contacts",
          description: "Get in touch with me",
        },
      ],
    },
    {
      category: "Legal",
      icon: FiShield,
      links: [
        {
          name: "Privacy Policy",
          url: "/privacy",
          description: "Privacy policy and data protection",
        },
        {
          name: "Terms of Service",
          url: "/terms",
          description: "Terms and conditions",
        },
        {
          name: "Sitemap",
          url: "/sitemap",
          description: "Website structure overview",
        },
      ],
    },
    {
      category: "External Links",
      icon: FiBriefcase,
      links: [
        {
          name: "GitHub",
          url: "https://github.com/sazzadulislam",
          description: "My GitHub repositories",
          external: true,
        },
        {
          name: "LinkedIn",
          url: "https://linkedin.com/in/sazzadulislam",
          description: "My LinkedIn profile",
          external: true,
        },
        {
          name: "Twitter",
          url: "https://twitter.com/sazzadulislam",
          description: "My Twitter/X profile",
          external: true,
        },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-30 px-4 sm:px-6 lg:px-8 relative"
    >
      {/* Back Button */}
      <motion.div
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="absolute top-30 left-6"
      >
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-full shadow-lg hover:shadow-xl border border-transparent font-semibold transition-all duration-300"
        >
          <FiChevronLeft className="w-5 h-5" />
          Back
        </Link>
      </motion.div>

      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-100 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-100 rounded-full filter blur-3xl opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-block p-3 bg-green-100 rounded-full mb-4">
            <FiMap className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Sitemap
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore all pages and sections available on my portfolio website.
          </p>
        </motion.div>

        {/* Sitemap Sections */}
        <div className="grid gap-8">
          {pages.map((category) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.category}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {category.category}
                  </h2>
                </div>

                <div className="grid gap-4">
                  {category.links.map((link) => (
                    <motion.div
                      key={link.url}
                      whileHover={{ x: 10 }}
                      className="border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                    >
                      {link.external ? (
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block group"
                        >
                          <div className="flex items-start gap-3">
                            <FiChevronRight className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                                {link.name}
                                <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                  External
                                </span>
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {link.description}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {link.url}
                              </p>
                            </div>
                          </div>
                        </a>
                      ) : (
                        <Link href={link.url} className="block group">
                          <div className="flex items-start gap-3">
                            <FiChevronRight className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                            <div>
                              <h3 className="text-lg font-medium text-gray-800 group-hover:text-green-600 transition-colors">
                                {link.name}
                              </h3>
                              <p className="text-sm text-gray-500 mt-1">
                                {link.description}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {link.url}
                              </p>
                            </div>
                          </div>
                        </Link>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Quick Links */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-2xl shadow-lg p-8 text-white"
        >
          <h2 className="text-2xl font-semibold mb-4">Quick Navigation</h2>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/#home"
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              About
            </Link>
            <Link
              href="/#projects"
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/#contacts"
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="px-4 py-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
            >
              Terms
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sitemap;
