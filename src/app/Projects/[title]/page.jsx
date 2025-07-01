"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { getProjects } from "@/Components/Projects/getProjects";
import Image from "next/image";

import { FaReact, FaNodeJs, FaCss3Alt, FaTools } from "react-icons/fa";
import { SiTailwindcss, SiMongodb } from "react-icons/si";
import { MdBuild } from "react-icons/md";

// Optional: icon mapping by tech name
const techIcons = {
  React: <FaReact className="text-blue-500 w-5 h-5" />,
  "Node.js": <FaNodeJs className="text-green-600 w-5 h-5" />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-400 w-5 h-5" />,
  MongoDB: <SiMongodb className="text-green-500 w-5 h-5" />,
  CSS: <FaCss3Alt className="text-blue-600 w-5 h-5" />,
};

const ProjectDetailsPage = () => {
  const params = useParams();
  const { title } = params;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (!title || fetchedOnce.current) return;

    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        const cached = sessionStorage.getItem(`project-${title}`);
        if (cached) {
          setProject(JSON.parse(cached));
          fetchedOnce.current = true;
          setLoading(false);
          return;
        }

        const data = await getProjects(title);
        const foundProject = Array.isArray(data) ? data[0] : data;
        if (!foundProject) throw new Error("Project not found");

        sessionStorage.setItem(
          `project-${title}`,
          JSON.stringify(foundProject)
        );
        setProject(foundProject);
        fetchedOnce.current = true;
      } catch (err) {
        setError(err.message || "Failed to load project");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [title]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex items-center justify-center h-screen text-red-600 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div
      className="bg-fixed bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/WhiteWallpaper.jpg')",
      }}
    >
      {/* Header */}
      <div className="text-center mb-10 pt-32">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
          {project.title}
        </h1>
        {project.subtitle && (
          <h2 className="text-xl md:text-2xl text-gray-600 mb-4">
            {project.subtitle}
          </h2>
        )}
        <p className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed">
          {project.description}
        </p>
      </div>

      <div className="bg-linear-to-b from-white-90 to-white/50">
        {/* Image */}
        <div className="rounded-xl max-w-7xl mx-auto overflow-hidden shadow-lg mb-10">
          <Image
            src={project.image}
            alt={project.title}
            width={800}
            height={800}
            className="w-full object-cover"
          />
        </div>

        {/* Tech Stack */}
        {project.technologies && project.technologies.length > 0 && (
          <section className="mb-16 text-center">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex justify-center items-center gap-2">
              <FaTools className="text-blue-500 w-7 h-7" />
              Technologies Used
            </h3>

            <ul className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
              {project.technologies.map((tech, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 bg-white hover:bg-gray-100 text-gray-700 px-4 py-2 shadow-sm md:shadow-2xl text-sm font-medium  cursor-default "
                >
                  {techIcons[tech] || (
                    <MdBuild className="w-5 h-5 text-gray-400" />
                  )}
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Links */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Visit Button */}
          <Link
            href={project?.visit}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-tr from-blue-300 to-blue-600 text-white font-semibold px-10 py-3 rounded-2xl transition duration-200"
          >
            <FaExternalLinkAlt className="text-lg" />
            Visit
          </Link>

          {/* Front End GitHub Button */}
          <Link
            href={project?.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-tr from-gray-600 to-black text-white font-semibold px-10 py-3 rounded-2xl transition duration-200"
          >
            <FaGithub className="text-lg" />
            Front End GitHub
          </Link>

          {/* Back EndGitHub Button */}
          <Link
            href={project?.backend}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-tr from-gray-600 to-black text-white font-semibold px-10 py-3 rounded-2xl transition duration-200"
          >
            <FaGithub className="text-lg" />
            Back End GitHub
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
