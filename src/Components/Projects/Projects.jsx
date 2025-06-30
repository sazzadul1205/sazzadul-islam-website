"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaExternalLinkAlt, FaGithub, FaInfoCircle } from "react-icons/fa";
import projects from "@/data/projects"; // update this import path if needed

const Projects = () => {
  const [showAll, setShowAll] = useState(false);

  const toggleShow = () => setShowAll((prev) => !prev);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

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

      <div className="max-w-7xl mx-auto pt-20 space-y-16 transition-all duration-500 ease-in-out">
        {visibleProjects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={project.id}
              className={`flex ${
                isEven ? "flex-row" : "flex-row-reverse"
              } justify-between gap-20 group transition-transform duration-500`}
            >
              <div className="p-2 bg-gray-300">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1000}
                  height={1000}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div className="w-2/3">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-lg mb-4">
                  {project.description}
                </p>
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Technologies:</span>{" "}
                  {project.technologies.join(", ")}
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <Link
                    href={`/Projects/${encodeURIComponent(project.title)}`}
                    className="flex items-center gap-2 bg-gradient-to-tr from-green-300 to-green-600 text-white font-semibold px-10 py-3 rounded-2xl transition duration-200"
                  >
                    <FaInfoCircle className="text-lg" />
                    Details
                  </Link>

                  <Link
                    href={project.visit}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-gradient-to-tr from-blue-300 to-blue-600 text-white font-semibold px-10 py-3 rounded-2xl transition duration-200"
                  >
                    <FaExternalLinkAlt className="text-lg" />
                    Visit
                  </Link>

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
        })}
      </div>

      {projects.length > 4 && (
        <div className="text-center mt-10">
          <button
            onClick={toggleShow}
            className="bg-gradient-to-tr from-purple-400 to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform duration-300"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Projects;
