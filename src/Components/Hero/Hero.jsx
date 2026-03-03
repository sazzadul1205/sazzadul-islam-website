"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Typewriter } from "react-simple-typewriter";
import { motion } from "framer-motion";

// React icons
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaBootstrap,
  FaVuejs,
  FaGithub,
  FaPhp,
  FaLaravel,
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiDaisyui,
  SiFirebase,
  SiMysql,
  SiPostman,
  SiJquery,
  SiRedux,
} from "react-icons/si";

const techIcons = [
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  SiNextdotjs,
  FaNodeJs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiDaisyui,
  FaBootstrap,
  SiFirebase,
  FaVuejs,
  SiMysql,
  FaGithub,
  FaPhp,
  FaLaravel,
  SiPostman,
  SiJquery,
  SiRedux,
];

const generateFloatingIcons = (count = 40) => {
  return Array.from({ length: count }, () => {
    const Icon = techIcons[Math.floor(Math.random() * techIcons.length)];
    return {
      Icon,
      size: Math.random() * 40 + 20, // 20-60px
      top: Math.random() * 80 + 10,
      left: Math.random() * 80 + 10,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 5, // 8-13s per animation
      opacity: Math.random() * 0.5 + 0.2,
      rotateDirection: Math.random() > 0.5 ? 1 : -1,
      xMove: (Math.random() - 0.5) * 40,
      yMove: (Math.random() - 0.5) * 40,
    };
  });
};

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
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const Hero = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const floatingIcons = useMemo(() => generateFloatingIcons(40), []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="relative flex md:items-center md:justify-center bg-gradient-to-br from-white/5 to-transparent md:min-h-screen px-4 pt-[100px] md:pt-0 cursor-default overflow-hidden"
    >
      {/* Floating Icons with Motion */}
      {floatingIcons.map(
        (
          {
            Icon,
            size,
            top,
            left,
            delay,
            duration,
            opacity,
            rotateDirection,
            xMove,
            yMove,
          },
          i
        ) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${top}%`,
              left: `${left}%`,
            }}
            initial={{ scale: 0, rotate: 0 }}
            animate={{
              scale: [0, 1, 1, 1, 0],
              rotate: [0, 180, 360],
              x: [0, xMove, -xMove / 2, xMove / 2, 0],
              y: [0, yMove, -yMove / 2, yMove / 2, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.5,
              transition: { duration: 0.3 },
            }}
          >
            <Icon
              aria-hidden="true"
              style={{
                fontSize: size,
                color: `rgba(59, 130, 246, ${opacity})`,
              }}
              className="filter drop-shadow-lg"
            />
          </motion.div>
        )
      )}

      {/* Animated Background Gradient */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: [
            "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="text-center space-y-6 pt-12 md:pt-0 relative z-10 bg-gradient-to-b from-transparent via-gray-200/10 to-transparent p-8 rounded-3xl backdrop-blur-sm max-w-4xl mx-auto"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${mousePosition.x * 0.5}deg)`,
        }}
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-4"
        >
          <motion.span
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 50 }}
            className="inline-block"
          >
            Hi,
          </motion.span>{" "}
          <motion.span
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 50 }}
            className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
          >
            I'm Sazzadul Islam
          </motion.span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl leading-relaxed text-gray-700 max-w-3xl mx-auto"
        >
          A passionate web developer exploring both{" "}
          <motion.span
            whileHover={{ scale: 1.1, color: "#3b82f6" }}
            className="inline-block font-semibold"
          >
            MERN Stack
          </motion.span>{" "}
          and{" "}
          <motion.span
            whileHover={{ scale: 1.1, color: "#f97316" }}
            className="inline-block font-semibold"
          >
            Laravel
          </motion.span>{" "}
          with PHP. I'm also diving into writing, creativity, and building my
          personal brand step by step.
        </motion.p>

        <motion.h3
          variants={itemVariants}
          className="text-xl sm:text-2xl font-semibold font-poppins text-gray-700 mt-4 min-h-[80px] sm:min-h-[60px]"
        >
          <span className="mr-2">I am a</span>
          <motion.span
            className="text-blue-600 inline-block"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Typewriter
              words={[
                "MERN Stack Developer",
                "Laravel Developer",
                "Full Stack Developer",
                "PHP & MySQL Expert",
                "React & Node.js Developer",
                "Creative Problem Solver",
              ]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </motion.span>
        </motion.h3>

        {/* Tech Stack Pills */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mt-6"
        >
          {["MERN", "Laravel", "PHP", "MySQL", "React", "Node.js"].map(
            (tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "#3b82f6",
                  color: "white",
                }}
                className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium shadow-md cursor-default"
              >
                {tech}
              </motion.span>
            )
          )}
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative px-10 md:px-20 py-3 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-full uppercase md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer"
          >
            <motion.span
              initial={{ x: -100 }}
              whileHover={{ x: 0 }}
              className="absolute inset-0 bg-white/20"
            />
            <span className="relative z-10 flex items-center justify-center gap-2">
              View My Projects
              <motion.svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </motion.svg>
            </span>
          </button>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center gap-4 mt-8"
        >
          {[
            { icon: FaGithub, href: "https://github.com/sazzadulislam", color: "text-gray-800" },
            { icon: FaLaravel, href: "#", color: "text-red-600" },
            { icon: FaReact, href: "#", color: "text-blue-500" },
          ].map((social, index) => (
            <motion.a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`${social.color} hover:opacity-80 transition-all`}
            >
              <social.icon size={28} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Hero;