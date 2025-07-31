"use client";

import React, { useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";

import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // once: true prevents animation from repeating
  }, []);

  return (
    <div
      className="flex md:items-center md:justify-center bg-white/40 md:min-h-screen px-4 pt-[100px] md:pt-0 cursor-default"
      data-aos="fade-up"
    >
      <div className="text-center space-y-5 pt-12 md:pt-0">
        {/* Title */}
        <h1 className="text-5xl font-bold text-black mb-4" data-aos="zoom-in">
          Hi, I'm Sazzadul Islam
        </h1>

        {/* Description */}
        <p
          className="text-xl leading-8 text-gray-700 max-w-3xl mx-auto"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          A beginner web developer exploring the world of frontend and backend
          technologies. I'm also diving into writing, creativity, and building
          my personal brand step by step.
        </p>

        {/* Typewriter */}
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

        {/* Button */}
        <div data-aos="fade-up" data-aos-delay="300">
          <button
            onClick={() => {
              const section = document.getElementById("projects");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-20 md:px-24 py-3 md:py-4 bg-gradient-to-bl hover:bg-gradient-to-tr from-blue-500 to-blue-700 text-white font-semibold rounded-xl uppercase text-xl cursor-pointer"
          >
            Projects
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
