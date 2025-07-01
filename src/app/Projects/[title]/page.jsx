"use client";

import React, { useEffect, useState, useRef } from "react";

// Next JS imports
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

// Fetch Projects Data
import { getProjects } from "@/Components/Projects/getProjects";

// Icons
import {
  FaReact,
  FaNodeJs,
  FaCss3Alt,
  FaTools,
  FaExternalLinkAlt,
  FaGithub,
  FaCcStripe,
} from "react-icons/fa";
import { MdBuild } from "react-icons/md";
import { RiReactjsFill } from "react-icons/ri";
import { SiTailwindcss, SiMongodb, SiDaisyui, SiExpress } from "react-icons/si";
import {
  FaUserShield,
  FaUserTie,
  FaUserGraduate,
  FaUser,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

// Optional: icon mapping by tech name
const techIcons = {
  React: <FaReact className="text-blue-500 w-5 h-5" />,
  "Node.js": <FaNodeJs className="text-green-600 w-5 h-5" />,
  "Tailwind CSS": <SiTailwindcss className="text-sky-400 w-5 h-5" />,
  MongoDB: <SiMongodb className="text-green-500 w-5 h-5" />,
  CSS: <FaCss3Alt className="text-blue-600 w-5 h-5" />,
  DaisyUI: <SiDaisyui className="text-orange-600 w-5 h-5" />,
  "Express.js": <SiExpress className="text-orange-600 w-5 h-5" />,
  Stripe: <FaCcStripe className="text-blue-600 w-5 h-5" />,
  ReactJs: <RiReactjsFill className="text-blue-600 w-5 h-5" />,
};

const ProjectDetailsPage = () => {
  const params = useParams();

  // Extract title from URL parameters
  const { title } = params;

  // State to hold project data, loading state, and error state
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Use a ref to track if data has been fetched once
  const fetchedOnce = useRef(false);

  // Fetch project data based on title from URL
  useEffect(() => {
    if (!title || fetchedOnce.current) return;

    const fetchProject = async () => {
      setLoading(true);
      setError(null);
      try {
        // Check sessionStorage first for cached project data
        const cached = sessionStorage.getItem(`project-${title}`);

        // If cached data exists, use it
        if (cached) {
          setProject(JSON.parse(cached));
          fetchedOnce.current = true;
          setLoading(false);
          return;
        }

        // If no cached data, fetch from API
        const data = await getProjects(title);
        const foundProject = Array.isArray(data) ? data[0] : data;
        if (!foundProject) throw new Error("Project not found");

        // Store fetched project in sessionStorage
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

  // Full-page loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-600">
        Loading...
      </div>
    );
  }

  // Full-page error state
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

      <div className="bg-linear-to-b from-white/10 to-white">
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

        {/* Links Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 py-6">
          {/* Visit Live Site */}
          {project?.visit && (
            <Link
              href={project.visit}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-linear-to-bl hover:bg-linear-to-tr from-green-300 to-green-600 text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-200"
            >
              <FaExternalLinkAlt className="text-sm" />
              Live Site
            </Link>
          )}

          {/* Frontend GitHub */}
          {project?.github && (
            <Link
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-linear-to-bl hover:bg-linear-to-tr from-gray-900 to-black text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-200"
            >
              <FaGithub className="text-sm" />
              Frontend Repo
            </Link>
          )}

          {/* Backend GitHub (optional) */}
          {project?.backend && (
            <Link
              href={project.backend}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-linear-to-bl hover:bg-linear-to-tr from-gray-900 to-black text-white px-6 py-3 rounded-lg font-medium shadow-md transition-all duration-200"
            >
              <FaGithub className="text-sm" />
              Backend Repo
            </Link>
          )}
        </div>

        {/* Demo Accounts */}
        {project.demo && (
          <section className="max-w-7xl mx-auto p-8 border-t mt-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex justify-center items-center gap-2">
              <FaUserShield className="text-blue-600" />
              Demo Access
            </h2>

            {project.demo.instructions && (
              <p className="text-gray-600 text-center font-semibold mb-6">
                {project.demo.instructions}
              </p>
            )}

            <div className="grid grid-cols-2 gap-6">
              {Object.entries(project.demo).map(([role, cred]) => {
                if (role === "instructions") return null;

                // Optional role-based icon map
                const roleIcons = {
                  admin: <FaUserShield className="text-blue-600" />,
                  trainer: <FaUserTie className="text-emerald-600" />,
                  manager: <FaUserGraduate className="text-indigo-600" />,
                  member: <FaUser className="text-pink-600" />,
                };

                return (
                  <div
                    key={role}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-2xl transition"
                  >
                    <div className="flex items-center gap-2 mb-3 text-lg font-semibold text-gray-800 capitalize">
                      {roleIcons[role] || <FaUser className="text-gray-500" />}
                      {role.replace(/([A-Z])/g, " $1")}
                    </div>

                    {typeof cred === "string" ? (
                      <p className="text-sm text-gray-600">{cred}</p>
                    ) : (
                      <div className="space-y-1 text-sm text-gray-700">
                        <p className="flex items-center gap-2">
                          <FaEnvelope className="text-blue-500" />
                          <span className="font-medium">{cred.email}</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FaLock className="text-gray-600" />
                          <span className="font-medium">{cred.password}</span>
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Features by Role */}
        {project.features && (
          <section className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              
              

              <h2 className="text-3xl font-extrabold text-gray-800 flex justify-center items-center gap-3">
                <span className="text-indigo-600 text-4xl">📦</span>
                <span>Features by Role</span>
              </h2>
              <p className="text-gray-500 font-semibold mt-2 max-w-xl mx-auto">
                Each user role has access to distinct features tailored to their
                responsibilities and permissions within the system.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {Object.entries(project.features).map(([role, features]) => (
                <div
                  key={role}
                  className="bg-white rounded-xl border border-gray-200 p-6 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <h3 className="text-xl font-semibold text-indigo-700 mb-4 capitalize flex items-center gap-2">
                    <span className="inline-block w-2.5 h-2.5 bg-indigo-500 rounded-full" />
                    {role}
                  </h3>
                  <ul className="space-y-2 text-gray-700 text-sm list-inside list-disc">
                    {features.map((feature, i) => (
                      <li key={i} className="leading-relaxed">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Project Objectives */}
        {project.objectives && (
          <div className="px-6 py-12 border-t text-center bg-white/60 rounded-xl shadow-sm mt-12 max-w-4xl mx-auto">
            <h2 className="text-3xl font-extrabold text-gray-800 mb-6 flex justify-center items-center gap-3">
              <span className="text-blue-600 text-4xl">🎯</span>
              <span>Project Objectives</span>
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3 text-base inline-block text-left mx-auto">
              {project.objectives.map((obj, i) => (
                <li key={i} className="leading-relaxed">
                  {obj}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
