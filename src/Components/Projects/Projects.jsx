"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub, FaInfoCircle } from "react-icons/fa";

const Projects = ({ projectsData }) => {
  const [showAll, setShowAll] = useState(false);
  const toggleShow = () => setShowAll((prev) => !prev);

  const baseProjects = projectsData.slice(0, 4);
  const extraProjects = projectsData.slice(4);

  return (
    <div className="bg-white/80 min-h-screen px-6 pb-16">
      <h3 className="uppercase text-center font-semibold font-poppins text-black py-3 pt-16 text-4xl font-sans">
        Projects
      </h3>
      <p className="bg-blue-500 w-10 py-1 mx-auto rounded-full mb-6" />
      <p className="text-center text-lg leading-8 max-w-4xl mx-auto text-gray-700 font-poppins">
        Here is some projects that I have worked on. Each project showcases my
        skills in web development, from frontend design to backend
        functionality. Feel free to explore them!
      </p>

      <div className="max-w-7xl mx-auto pt-20 space-y-16">
        {/* First 4 always visible */}
        {baseProjects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <ProjectCard
              key={project.id || project.title + index}
              project={project}
              isEven={isEven}
            />
          );
        })}

        {/* Show rest with delay and fade */}
        {showAll &&
          extraProjects.map((project, index) => {
            const isEven = (index + 4) % 2 === 0;
            const delay = `${index * 0.2}s`; // ⏱️ Delay increases per card

            return (
              <div
                key={project.id || project.title + "-extra-" + index}
                className="fade-in"
                style={{ animationDelay: delay }}
              >
                <ProjectCard project={project} isEven={isEven} />
              </div>
            );
          })}
      </div>

      {projectsData.length > 4 && (
        <div className="text-center mt-10">
          <button
            onClick={toggleShow}
            className="bg-gradient-to-tr from-purple-400 to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* 🔽 Scoped animation styles */}
      <style jsx>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInCard 0.6s ease-out forwards;
        }

        @keyframes fadeInCard {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const ProjectCard = ({ project, isEven }) => {
  return (
    <div
      className={`flex ${
        isEven ? "flex-row" : "flex-row-reverse"
      } justify-between gap-20 group transition-transform duration-500`}
    >
      {/* Image section */}
      <div className="p-2 bg-gray-300">
        <Image
          src={project.image}
          alt={project.title}
          width={1000}
          height={1000}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Text section */}
      <div className="w-2/3">
        {/* Only show title if it exists */}
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">
          {project.title}
        </h3>

        {/* Only show description if it exists */}
        <p className="text-gray-600 text-lg mb-4">{project.description}</p>

        {/* Only show tech stack if it exists */}
        <p className="text-gray-600 mb-4">
          <span className="font-semibold">Technologies:</span>{" "}
          {project.technologies.join(", ")}
        </p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-4">
          {/* Only show Details link if it exists */}
          <Link
            href={`/Projects/${encodeURIComponent(project.title)}`}
            className="flex items-center gap-2 bg-gradient-to-tr from-green-300 to-green-600 text-white font-semibold px-10 py-3 rounded-2xl transition duration-200"
          >
            <FaInfoCircle className="text-lg" />
            Details
          </Link>

          {/* Only show Visit link if it exists */}
          <Link
            href={project.visit}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-tr from-blue-300 to-blue-600 text-white font-semibold px-10 py-3 rounded-2xl transition duration-200"
          >
            <FaExternalLinkAlt className="text-lg" />
            Visit
          </Link>

          {/* Only show GitHub link if it exists */}
          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-tr from-gray-600 to-black text-white font-semibold px-10 py-3 rounded-2xl transition duration-200"
          >
            <FaGithub className="text-lg" />
            GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Projects;
