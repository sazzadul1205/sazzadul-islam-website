"use client";

import React from "react";

// Packages
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  return (
    <div className="flex items-center justify-center bg-white/40 min-h-screen px-4 cursor-default">
      <div className="text-center space-y-5 ">
        {/* Title */}
        <h1 className="text-5xl font-bold text-black mb-4">
          Hi, I'm Sazzadul Islam
        </h1>

        {/* Description */}
        <p className="text-xl leading-8 text-gray-700 max-w-3xl mx-auto">
          A beginner web developer exploring the world of frontend and backend
          technologies. I'm also diving into writing, creativity, and building
          my personal brand step by step.
        </p>

        {/* Typewriter */}
        <h3 className="text-2xl font-semibold font-poppins text-gray-700 mt-4">
          <span className="mr-2">I am a </span>
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
        <button
          onClick={() => {
            const section = document.getElementById("projects");
            section?.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-24 py-4 bg-linear-to-bl hover:bg-linear-to-tr from-blue-500 to-blue-700 text-white font-semibold rounded-xl uppercase text-xl cursor-pointer"
        >
          Projects
        </button>
      </div>
    </div>
  );
};

export default Hero;
