"use client";

import React, { useEffect, useMemo } from "react";
import { Typewriter } from "react-simple-typewriter";
import AOS from "aos";
import "aos/dist/aos.css";

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
} from "react-icons/fa";
import {
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiTailwindcss,
  SiDaisyui,
  SiFirebase,
  SiMysql,
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
];

const generateFloatingIcons = (count = 30) => {
  return Array.from({ length: count }, () => {
    const Icon = techIcons[Math.floor(Math.random() * techIcons.length)];
    return {
      Icon,
      size: Math.random() * 40 + 20, // 20-60px
      top: Math.random() * 80 + 10,
      left: Math.random() * 80 + 10,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 5, // 8-13s per animation
      opacity: Math.random() * 0.5 + 0.3,
      rotateDirection: Math.random() > 0.5 ? 1 : -1,
    };
  });
};

const Hero = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      disable: () => window.innerWidth < 768,
    });
  }, []);

  const floatingIcons = useMemo(() => generateFloatingIcons(40), []);

  return (
    <div className="relative flex md:items-center md:justify-center bg-white/10 md:min-h-screen px-4 pt-[100px] md:pt-0 cursor-default overflow-hidden">
      {/* Floating Icons */}
      {floatingIcons.map(
        (
          { Icon, size, top, left, delay, duration, opacity, rotateDirection },
          i
        ) => (
          <Icon
            key={i}
            aria-hidden="true"
            className="absolute"
            style={{
              fontSize: size,
              top: `${top}%`,
              left: `${left}%`,
              color: `rgba(59,130,246,${opacity})`,
              animation: `float ${duration}s ease-in-out ${delay}s infinite`,
              transformOrigin: "center",
              rotate: `${rotateDirection * Math.random() * 45}deg`,
            }}
          />
        )
      )}

      {/* Content */}
      <div className="text-center space-y-5 pt-12 md:pt-0 relative z-10 bg-gray-200/30">
        <h1 className="text-5xl font-bold text-black mb-4" data-aos="zoom-in">
          Hi, I'm Sazzadul Islam
        </h1>

        <p
          className="text-xl leading-8 text-gray-700 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          A beginner web developer exploring the world of frontend and backend
          technologies. I'm also diving into writing, creativity, and building
          my personal brand step by step.
        </p>

        <h3
          className="text-2xl font-semibold font-poppins text-gray-700 mt-4 h-[60px] sm:h-auto"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span className="mr-2">I am a</span>
          <span className="text-blue-600">
            <Typewriter
              words={[
                "Beginner Front-End Developer",
                "Beginner Back-End Developer",
                "Aspiring Full Stack Developer",
                "Creative Problem Solver",
                "Learning React & Node.js",
                "Enthusiastic Web Explorer",
              ]}
              loop={Infinity}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={2000}
            />
          </span>
        </h3>

        <div data-aos="fade-up" data-aos-delay="300">
          <button
            onClick={() =>
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="relative px-10 md:px-20 py-3 md:py-3 bg-gradient-to-r from-blue-600 to-indigo-500 text-white font-semibold rounded-full uppercase  md:text-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-white/20 before:transition-all before:duration-500 hover:before:w-full cursor-pointer before:z-[-1]"
          >
            Projects
          </button>
        </div>
      </div>

      {/* Floating Animation */}
      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
          25% {
            transform: translateY(-20px) translateX(10px) rotate(10deg);
          }
          50% {
            transform: translateY(10px) translateX(-10px) rotate(-10deg);
          }
          75% {
            transform: translateY(-10px) translateX(5px) rotate(5deg);
          }
          100% {
            transform: translateY(0px) translateX(0px) rotate(0deg);
          }
        }
      `}</style>
    </div>
  );
};

export default Hero;
