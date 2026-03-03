"use client";

// app/terms/page.js
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiFileText,
  FiCheckCircle,
  FiAlertTriangle,
  FiCopy,
  FiCode,
  FiMail,
  FiChevronRight,
} from "react-icons/fi";

const TermsOfService = () => {
  const lastUpdated = "March 1, 2026";

  const sections = [
    {
      id: "acceptance",
      icon: FiCheckCircle,
      title: "Acceptance of Terms",
      content:
        "By accessing and using this portfolio website, you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use this website.",
    },
    {
      id: "use",
      icon: FiCopy,
      title: "Use of Content",
      content:
        "All content on this website, including but not limited to text, graphics, logos, images, and code samples, is the property of Sazzadul Islam and is protected by intellectual property laws.",
      points: [
        "You may view and download content for personal, non-commercial use",
        "You may not reproduce, distribute, or modify content without explicit permission",
        "Code snippets provided in projects are for educational purposes",
        "Attribution is required when sharing or referencing my work",
      ],
    },
    {
      id: "projects",
      icon: FiCode,
      title: "Project Code",
      content: "Regarding the projects showcased on this website:",
      points: [
        "Project code on GitHub is subject to its respective license",
        "You may use code examples for learning purposes",
        "Commercial use requires prior written consent",
        "Some projects may include third-party libraries with their own licenses",
      ],
    },
    {
      id: "conduct",
      icon: FiAlertTriangle,
      title: "User Conduct",
      content:
        "When interacting with this website or contacting me, you agree to:",
      points: [
        "Provide accurate and truthful information",
        "Not engage in any unlawful or harmful activities",
        "Not attempt to gain unauthorized access to the website",
        "Not use the contact form for spam or malicious purposes",
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
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-30 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-orange-100 rounded-full filter blur-3xl opacity-20" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-yellow-100 rounded-full filter blur-3xl opacity-20" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
            <FiFileText className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Please read these terms carefully before using my portfolio website.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last Updated: {lastUpdated}
          </div>
        </motion.div>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-orange-50 rounded-xl">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{section.content}</p>
                    {section.points && (
                      <ul className="space-y-3">
                        {section.points.map((point, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-2 text-gray-600"
                          >
                            <FiChevronRight className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </motion.li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-2xl shadow-lg p-8 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FiMail className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">
                Questions About Terms?
              </h2>
              <p className="text-white/90 mb-4">
                If you have any questions about these Terms of Service, please
                contact me.
              </p>
              <Link
                href="/#contacts"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-orange-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Contact Me
                <FiChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <div className="flex justify-center gap-6">
            <Link href="/" className="hover:text-orange-600 transition-colors">
              Home
            </Link>
            <Link
              href="/privacy"
              className="hover:text-orange-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-orange-600 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TermsOfService;
