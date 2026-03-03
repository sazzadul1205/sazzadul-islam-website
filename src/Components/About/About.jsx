"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import {
  FiMail,
  FiDownload,
  FiExternalLink
} from "react-icons/fi";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
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

const skillVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
      delay: i * 0.05,
    },
  }),
  hover: {
    scale: 1.1,
    y: -5,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const renderAboutDescription = (descArray) =>
  descArray.map((item, i) => {
    if (typeof item === "string") {
      const parts = item.split("\n\n");
      return parts.map((part, idx) => (
        <React.Fragment key={`${i}-${idx}`}>
          {part}
          {idx < parts.length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </React.Fragment>
      ));
    } else {
      let className = "";
      switch (item.style) {
        case "bold":
          className = "text-black font-semibold";
          break;
        case "blueUnderlineHover":
          className = "text-blue-600 hover:scale-105 underline cursor-pointer inline-block transition-transform";
          break;
        case "pinkUnderline":
          className = "text-pink-500 underline cursor-pointer";
          break;
      }
      return (
        <motion.span
          key={i}
          className={className}
          whileHover={item.style === "blueUnderlineHover" ? { scale: 1.1 } : {}}
        >
          {item.text}
        </motion.span>
      );
    }
  });

const About = ({ aboutData }) => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = React.useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleContactClick = () => {
    document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    // Add your resume download logic here
    window.open("/resume.pdf", "_blank");
  };

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-gray-100 to-gray-200/80 min-h-screen px-4 sm:px-6 lg:px-8 py-16 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 right-20 w-64 h-64 bg-blue-200 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title Section */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <motion.h3
            variants={itemVariants}
            className="uppercase font-bold font-poppins text-black text-4xl md:text-5xl mb-4"
          >
            {aboutData?.title || "About Me"}
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"
          />
        </motion.div>

        {/* Intro Description */}
        <motion.p
          variants={itemVariants}
          className="text-center text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-gray-700 font-poppins mb-16"
        >
          {aboutData?.description || ""}
        </motion.p>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column - Description */}
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 relative"
            >
              Get to know me!
              <motion.div
                className="absolute -bottom-2 left-0 w-16 h-1 bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.h2>

            <motion.div
              variants={itemVariants}
              className="text-gray-700 text-lg leading-relaxed space-y-4"
            >
              {renderAboutDescription(aboutData?.aboutDescription)}
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center gap-5 pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-lg shadow-lg overflow-hidden"
              >
                <motion.span
                  className="absolute inset-0 bg-white/20"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative flex items-center gap-2">
                  <FiMail className="w-5 h-5" />
                  Contact Me
                </span>
              </motion.button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pt-4"
            >
              <span className="text-gray-500 font-medium">Follow me:</span>
              <div className="flex gap-3">
                {aboutData?.socialLinks?.map(({ id, href, tooltip, src }, index) => (
                  <motion.div
                    key={id}
                    variants={skillVariants}
                    custom={index}
                    whileHover="hover"
                  >
                    <Link
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      id={id}
                      className="block"
                    >
                      <Image
                        src={src}
                        alt={tooltip}
                        width={45}
                        height={45}
                        className="rounded-lg shadow-md hover:shadow-xl transition-all"
                      />
                    </Link>
                    <Tooltip anchorSelect={`#${id}`} content={tooltip} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Skills */}
          <motion.div
            variants={itemVariants}
            className="lg:w-1/2 space-y-6"
          >
            <motion.h2
              variants={itemVariants}
              className="text-3xl md:text-4xl font-bold font-poppins text-gray-800 relative"
            >
              My Skills
              <motion.div
                className="absolute -bottom-2 left-0 w-16 h-1 bg-indigo-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="text-gray-600 text-lg"
            >
              Technologies I've mastered while building full-stack applications:
            </motion.p>

            <motion.div
              variants={containerVariants}
              className="flex flex-wrap gap-3"
            >
              {aboutData?.skills?.map((skill, i) => (
                <motion.span
                  key={skill}
                  custom={i}
                  variants={skillVariants}
                  whileHover="hover"
                  className="group relative px-5 py-3 bg-white text-gray-700 text-base font-medium rounded-lg shadow-md cursor-pointer overflow-hidden"
                >
                  {/* Skill background effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600"
                    initial={{ y: "100%" }}
                    whileHover={{ y: 0 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Skill text */}
                  <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                    {skill}
                  </span>

                  {/* Skill icon indicator */}
                  <motion.span
                    className="absolute top-1 right-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    initial={{ rotate: -90 }}
                    whileHover={{ rotate: 0 }}
                  >
                    <FiExternalLink className="w-3 h-3" />
                  </motion.span>
                </motion.span>
              ))}
            </motion.div>

            {/* Skill Categories */}
            <motion.div
              variants={itemVariants}
              className="mt-8 grid grid-cols-2 gap-4"
            >
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200"
              >
                <h4 className="font-semibold text-blue-600 mb-2">Frontend</h4>
                <p className="text-sm text-gray-600">React, Next.js, Vue, Tailwind</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-200"
              >
                <h4 className="font-semibold text-indigo-600 mb-2">Backend</h4>
                <p className="text-sm text-gray-600">Node.js, Laravel, PHP, MySQL</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-8 border-t border-gray-300"
        >
          {[
            { label: "Projects Completed", value: "20+" },
            { label: "Technologies", value: "15+" },
            { label: "Happy Clients", value: "10+" },
            { label: "Years Experience", value: "3+" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-3xl font-bold text-blue-600 mb-1"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;