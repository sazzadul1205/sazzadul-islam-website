"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

// Icons
import { FaExternalLinkAlt, FaGithub, FaInfoCircle } from "react-icons/fa";

const Projects = ({ projectsData }) => {
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleShow = () => setShowAll((prev) => !prev);

  // Sort projects by 'view' property
  const sortedProjects = [...projectsData].sort((a, b) => {
    const aHasView = typeof a.view === "number";
    const bHasView = typeof b.view === "number";

    if (aHasView && bHasView) {
      return a.view - b.view; // Ascending order of view
    }
    if (aHasView) {
      return -1; // a comes before b
    }
    if (bHasView) {
      return 1; // b comes before a
    }
    return 0; // both don't have view, keep original order relative to each other
  });

  const baseProjects = sortedProjects.slice(0, 4);
  const extraProjects = sortedProjects.slice(4);

  return (
    <div className="bg-white/80 min-h-screen px-4 md:px-6 pb-16">
      {/* Header Section */}
      <h3
        className="uppercase text-center font-semibold font-poppins text-black py-3 pt-16 text-4xl font-sans"
        data-aos="zoom-in"
      >
        Projects
      </h3>

      {/* Decorative Line */}
      <p
        className="bg-blue-500 w-10 py-1 mx-auto rounded-full mb-6"
        data-aos="zoom-in"
        data-aos-delay="100"
      />

      {/* Intro Text */}
      <p
        className="text-center text-lg leading-8 max-w-4xl mx-auto text-gray-700 font-poppins"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Here are some projects that I have worked on. Each one showcases my
        skills in web development, from frontend design to backend
        functionality. Feel free to explore them!
      </p>

      <div className="max-w-7xl mx-auto pt-20 space-y-16">
        {/* First 4 always visible */}
        {baseProjects.map((project, index) => {
          const isEven = index % 2 === 0;
          const direction = isEven ? "fade-right" : "fade-left";
          return (
            <div
              key={project.id || index}
              data-aos={direction}
              data-aos-delay={index * 100}
            >
              <ProjectCard project={project} isEven={isEven} />
            </div>
          );
        })}

        {/* Extra projects on toggle */}
        {showAll &&
          extraProjects.map((project, index) => {
            const actualIndex = index + 4;
            const isEven = actualIndex % 2 === 0;
            const direction = isEven ? "fade-right" : "fade-left";

            return (
              <div
                key={project.id || `extra-${index}`}
                data-aos={direction}
                data-aos-delay={index * 100}
              >
                <ProjectCard project={project} isEven={isEven} />
              </div>
            );
          })}
      </div>

      {/* Show More/Less Button */}
      <div className="w-full flex justify-center mt-20">
        <button
          onClick={toggleShow}
          className="flex items-center justify-center gap-2 bg-gradient-to-bl hover:bg-gradient-to-tr from-blue-500 to-blue-700 text-white font-semibold w-[200px] py-3 rounded-xl text-sm md:text-base transition duration-200 cursor-pointer"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      </div>
    </div>
  );
};

// Project Card Component
const ProjectCard = ({ project, isEven }) => {
  return (
    <div
      className={`flex flex-col ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } items-center justify-between gap-10 md:gap-16 group transition-transform duration-500`}
    >
      {/* Image Section */}
      <div className="w-full md:w-1/2 p-2 bg-gray-300 rounded-lg shadow-lg">
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={1000}
          className="rounded-lg object-cover"
        />
      </div>

      {/* Text Section */}
      <div className="w-full md:w-1/2">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {project.title}
        </h3>

        <p className="text-gray-600 text-base md:text-lg mb-4">
          {project.description}
        </p>

        <p className="text-gray-600 mb-4 text-sm md:text-base">
          <span className="font-semibold">Technologies:</span>{" "}
          {project.technologies.join(", ")}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          <Link
            href={`/Projects/${encodeURIComponent(project.title)}`}
            className="flex items-center justify-center gap-2 bg-gradient-to-bl hover:bg-gradient-to-tr from-blue-500 to-blue-700 text-white font-semibold w-[120px] py-2 rounded-xl text-sm md:text-base transition duration-200"
          >
            <FaInfoCircle />
            Details
          </Link>

          <Link
            href={project.visit}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-bl hover:bg-gradient-to-tr from-blue-500 to-blue-700 text-white font-semibold w-[120px] py-2 rounded-xl text-sm md:text-base transition duration-200"
          >
            <FaExternalLinkAlt />
            Visit
          </Link>

          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gradient-to-bl hover:bg-gradient-to-tr from-blue-500 to-blue-700 text-white font-semibold w-[120px] py-2 rounded-xl text-sm md:text-base transition duration-200"
          >
            <FaGithub />
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
