"use client";

// app/privacy/page.js
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  FiShield,
  FiLock,
  FiEye,
  FiMail,
  FiGlobe,
  FiClock,
  FiAlertCircle,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

const PrivacyPolicy = () => {
  const lastUpdated = "March 1, 2026";

  const sections = [
    {
      id: "information",
      icon: FiEye,
      title: "Information We Collect",
      content:
        "When you visit my portfolio website, I may collect the following types of information:",
      points: [
        "Contact information (name and email) when you fill out the contact form",
        "Technical data including IP address, browser type, and device information",
        "Usage data about how you interact with the website",
        "Cookies and similar tracking technologies",
      ],
    },
    {
      id: "usage",
      icon: FiGlobe,
      title: "How We Use Your Information",
      content: "Your information is used for the following purposes:",
      points: [
        "To respond to your inquiries and messages",
        "To improve website functionality and user experience",
        "To analyze website traffic and performance",
        "To protect against fraudulent or unauthorized activity",
      ],
    },
    {
      id: "cookies",
      icon: FiClock,
      title: "Cookies Policy",
      content:
        "This website uses cookies to enhance your browsing experience. Cookies are small text files stored on your device that help us:",
      points: [
        "Remember your preferences and settings",
        "Understand how you use the website",
        "Improve website performance and loading speed",
        "Analyze traffic patterns (Google Analytics)",
      ],
    },
    {
      id: "third party",
      icon: FiShield,
      title: "Third-Party Services",
      content:
        "I use the following third-party services that may collect information:",
      points: [
        "Vercel - for website hosting and analytics",
        "Google Analytics - for anonymous traffic analysis",
        "GitHub - for project repository links",
        "Email service provider - for contact form processing",
      ],
    },
    {
      id: "rights",
      icon: FiLock,
      title: "Your Rights",
      content: "You have the following rights regarding your personal data:",
      points: [
        "Right to access your personal information",
        "Right to correct inaccurate data",
        "Right to request deletion of your data",
        "Right to opt-out of marketing communications",
        "Right to withdraw consent at any time",
      ],
    },
    {
      id: "security",
      icon: FiAlertCircle,
      title: "Data Security",
      content: "I take reasonable precautions to protect your information:",
      points: [
        "SSL/HTTPS encryption for all data transmission",
        "Regular security updates and monitoring",
        "Limited access to personal information",
        "Secure data storage practices",
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
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <FiShield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your privacy is important to me. This policy explains how I collect,
            use, and protect your personal information.
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Last Updated: {lastUpdated}
          </div>
        </motion.div>

        {/* Introduction */}
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-2xl shadow-lg p-8 mb-8 border border-gray-100"
        >
          <p className="text-gray-700 leading-relaxed">
            This Privacy Policy describes how Sazzadul Islam (&quot;I&quot;,
            &quot;me&quot;, or &quot;my&quot;) collects, uses, and discloses
            your information when you visit my portfolio website. By using this
            website, you agree to the collection and use of information in
            accordance with this policy.
          </p>
        </motion.div>

        {/* Main Sections */}
        <div className="space-y-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={section.id}
                variants={itemVariants}
                className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-50 rounded-xl">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 mb-4">{section.content}</p>
                    <ul className="space-y-3">
                      {section.points.map((point, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-start gap-2 text-gray-600"
                        >
                          <FiChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Contact Section */}
        <motion.div
          variants={itemVariants}
          className="mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white"
        >
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                <FiMail className="w-6 h-6" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-2">
                Questions About Privacy?
              </h2>
              <p className="text-white/90 mb-4">
                If you have any questions about this Privacy Policy or how your
                data is handled, please feel free to contact me.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/#contacts"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                >
                  Contact Me
                  <FiChevronRight className="w-4 h-4" />
                </Link>
                <a
                  href="mailto:sazzadul.islam@example.com"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
                >
                  <FiMail className="w-4 h-4" />
                  Email Directly
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          variants={itemVariants}
          className="mt-8 text-center text-sm text-gray-500"
        >
          <p>
            This policy is effective as of {lastUpdated} and will remain in
            effect except with respect to any changes in its provisions in the
            future.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link
              href="/terms"
              className="hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-blue-600 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PrivacyPolicy;
