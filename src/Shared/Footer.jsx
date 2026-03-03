"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

// React Icons
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiMail,
  FiMapPin,
  FiPhone,
  FiArrowUp,
  FiSend,
  FiLock,
  FiFileText,
  FiMap
} from "react-icons/fi";
import {
  FaFacebookF,
  FaInstagram,
  FaReact,
  FaNodeJs,
  FaLaravel,
  FaPhp,
  FaDatabase,
  FaCode
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiMongodb,
  SiMysql,
  SiTailwindcss,
  SiExpress
} from "react-icons/si";

// Footer data (static - no API call needed)
const footerData = {
  brand: {
    logo: "SI",
    name: "Sazzadul Islam",
    title: "Full Stack Developer",
    description: "Building scalable web applications with MERN Stack and Laravel. Passionate about creating elegant solutions to complex problems."
  },
  contact: [
    {
      type: "email",
      icon: "mail",
      value: "psazzadul@gmail.com",
      link: "mailto:psazzadul@gmail.com"
    },
    {
      type: "phone",
      icon: "phone",
      value: "+880 1917 335945",
      link: "tel:+8801917335945"
    },
    {
      type: "location",
      icon: "map",
      value: "Dhaka, Bangladesh"
    }
  ],
  quickLinks: {
    title: "Quick Links",
    links: [
      { name: "Home", url: "#home" },
      { name: "About", url: "#about" },
      { name: "Projects", url: "#projects" },
      { name: "Contact", url: "#contacts" }
    ]
  },
  services: {
    title: "Services",
    items: [
      { name: "MERN Stack Development", icon: "react" },
      { name: "Laravel Development", icon: "laravel" },
      { name: "API Integration", icon: "code" },
      { name: "Database Design", icon: "database" },
      { name: "UI/UX Implementation", icon: "tailwind" },
      { name: "PHP/MySQL Solutions", icon: "mysql" }
    ]
  },
  social: {
    title: "Connect With Me",
    links: [
      { name: "GitHub", icon: "github", url: "https://github.com/sazzadulislam", color: "#333" },
      { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/sazzadul-islam-molla-6905b3293/", color: "#0077b5" },
      { name: "Twitter", icon: "twitter", url: "https://x.com/sazzadu84352084", color: "#1da1f2" },
      { name: "Facebook", icon: "facebook", url: "https://www.facebook.com/sazzadul.islam.pritom", color: "#1877f2" }
    ]
  },
  newsletter: {
    enabled: false,
    title: "Subscribe to my newsletter",
    placeholder: "Enter your email",
    buttonText: "Subscribe"
  },
  bottomBar: {
    copyright: "© {year} Sazzadul Islam. Built with React & Next.js",
    links: [
      { name: "Privacy", url: "/privacy", icon: "lock" },
      { name: "Terms", url: "/terms", icon: "file" },
      { name: "Sitemap", url: "/sitemap", icon: "map" }
    ]
  }
};

// Map icon strings to actual React Icon components
const getIcon = (iconName, className = "w-5 h-5") => {
  const icons = {
    // Social Icons
    github: FiGithub,
    linkedin: FiLinkedin,
    twitter: FiTwitter,
    facebook: FaFacebookF,
    instagram: FaInstagram,
    mail: FiMail,

    // Tech Icons
    react: FaReact,
    nextjs: SiNextdotjs,
    nodejs: FaNodeJs,
    laravel: FaLaravel,
    php: FaPhp,
    mongodb: SiMongodb,
    mysql: SiMysql,
    express: SiExpress,
    tailwind: SiTailwindcss,
    database: FaDatabase,
    code: FaCode,

    // UI Icons
    map: FiMapPin,
    phone: FiPhone,
    send: FiSend,
    arrowUp: FiArrowUp,
    lock: FiLock,
    file: FiFileText,
    mapicon: FiMap,
  };

  const IconComponent = icons[iconName?.toLowerCase()] || FaCode;
  return <IconComponent className={className} />;
};

const Footer = () => {
  const [currentYear] = useState(new Date().getFullYear());
  const [email, setEmail] = useState("");
  const [subscribeStatus, setSubscribeStatus] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
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

  const socialIconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.2,
      rotate: 5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: { scale: 0.9 },
  };

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Add your newsletter subscription logic here
      setSubscribeStatus("success");
      setEmail("");
      setTimeout(() => setSubscribeStatus(null), 3000);
    }
  };

  const { brand, quickLinks, services, social, contact, bottomBar } = footerData;

  return (
    <motion.footer
      ref={footerRef}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={containerVariants}
      className="bg-gradient-to-b from-gray-50 to-white pt-16 pb-8 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full filter blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-100 rounded-full filter blur-3xl opacity-20 translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Content */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-gray-200"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="space-y-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                {brand?.logo}
              </div>
              <div>
                <motion.h3
                  className="text-xl font-bold text-gray-800"
                  whileHover={{ color: "#2563eb" }}
                >
                  {brand?.name}
                </motion.h3>
                <p className="text-sm text-gray-500">{brand?.title}</p>
              </div>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 leading-relaxed"
            >
              {brand?.description}
            </motion.p>

            {/* Contact Info */}
            <motion.div variants={itemVariants} className="space-y-2 text-sm text-gray-600">
              {contact?.map((item, index) => (
                <motion.p
                  key={index}
                  className="flex items-center gap-2 hover:text-blue-600 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <span className="text-blue-600">
                    {getIcon(item.icon)}
                  </span>
                  {item.link ? (
                    <a href={item.link} className="hover:underline">
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </motion.p>
              ))}
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h6 className="text-lg font-semibold text-gray-800">
              {quickLinks?.title}
            </h6>
            <ul className="space-y-2">
              {quickLinks?.links?.map((link, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={link.url}
                    className="text-gray-600 hover:text-blue-600 transition-colors duration-300 flex items-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.url)?.scrollIntoView({
                        behavior: "smooth"
                      });
                    }}
                  >
                    <span className="text-blue-400">→</span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h6 className="text-lg font-semibold text-gray-800">
              {services?.title}
            </h6>
            <ul className="space-y-2">
              {services?.items?.map((service, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  className="text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-default flex items-center gap-2"
                >
                  <span className="text-blue-400">{getIcon(service.icon, "w-4 h-4")}</span>
                  {service.name}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.nav variants={itemVariants} className="space-y-4">
            <h6 className="text-lg font-semibold text-gray-800">
              {social?.title}
            </h6>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {social?.links?.map((item, index) => (
                <motion.div
                  key={index}
                  variants={socialIconVariants}
                  whileHover="hover"
                  whileTap="tap"
                  className="relative"
                >
                  <Link
                    href={item.url}
                    aria-label={item.name}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center w-10 h-10 bg-white rounded-lg shadow-md hover:shadow-xl text-xl transition-all duration-300 border border-gray-100"
                    style={{ color: item.color }}
                  >
                    {getIcon(item.icon, "w-5 h-5")}
                  </Link>

                  <motion.div
                    className="absolute inset-0 rounded-lg bg-blue-500/10"
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Newsletter Signup */}
            {footerData.newsletter?.enabled && (
              <motion.div variants={itemVariants} className="mt-6">
                <p className="text-sm text-gray-600 mb-2">
                  {footerData.newsletter.title}
                </p>
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={footerData.newsletter.placeholder}
                    className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                    required
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 flex items-center gap-2"
                  >
                    {getIcon('send', 'w-4 h-4')}
                    {footerData.newsletter.buttonText}
                  </motion.button>
                </form>
                {subscribeStatus === "success" && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-xs mt-2"
                  >
                    Thanks for subscribing!
                  </motion.p>
                )}
              </motion.div>
            )}
          </motion.nav>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-sm text-gray-500"
        >
          <p className="flex items-center gap-2">
            {getIcon('code', 'w-4 h-4 text-blue-600')}
            {bottomBar?.copyright?.replace('{year}', currentYear)}
          </p>
          <div className="flex gap-6">
            {bottomBar?.links?.map((link, index) => (
              <Link
                key={index}
                href={link.url}
                className="hover:text-blue-600 transition-colors flex items-center gap-1"
              >
                {getIcon(link.icon, 'w-4 h-4')}
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Back to Top Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-full shadow-lg z-50 hover:shadow-xl transition-all duration-300"
          aria-label="Back to top"
        >
          {getIcon('arrowUp', 'w-6 h-6')}
        </motion.button>
      </div>
    </motion.footer>
  );
};

export default Footer;