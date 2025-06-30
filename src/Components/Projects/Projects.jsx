"use client";

// data/projects.json
const projects = [
  {
    id: "seven-gym",
    title: "Seven Gym",
    description:
      "A full-featured gym management web application designed to streamline class bookings, handle membership management, and help users monitor their fitness progress efficiently. It offers both member and admin dashboards with real-time updates and session control.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/vCRwV9ps/Seven-Gym1.png",
    visit: "https://seven-gym-1885e.web.app",
    github: "https://github.com/sazzadul1205/Seven-Gym-Client",
  },
  {
    id: "master-job-shop",
    title: "Master Job Shop",
    description:
      "A comprehensive job portal that connects job seekers with employers. It features job listings, application tracking, and user profiles to enhance the job search experience. The platform is designed to be user-friendly and efficient for both job seekers and recruiters.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co.com/YWKnB5V/masterbanner.png",
    visit: "https://master-job-shop.web.app/",
    github: "https://github.com/sazzadul1205/Master-Job-Shop-Client",
  },
  {
    id: "mobile-brand-shop",
    title: "Mobile Brand Shop",
    description:
      "An e-commerce platform specializing in mobile phones and accessories. It allows users to browse products, add them to their cart, and manage their orders. The site is designed with a focus on user experience and seamless navigation.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co.com/dQzD7Ss/Screenshot-6.png",
    visit: "https://mobile-brand-shop.web.app/",
    github: "https://github.com/sazzadul1205/Mobile-Brand-Shop-Client",
  },
  {
    id: "electron-e-commerce",
    title: "Electron E-commerce",
    description:
      "An e-commerce platform built with Electron, allowing users to shop for a variety of products. It features a user-friendly interface, product management, and secure payment options. The application is designed to work seamlessly on desktop environments.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co.com/FBwzD67/Web-Image7.png",
    visit: "https://electon-ecommerce-cd299.web.app",
    github:
      "https://github.com/sazzadul1205/Electron-E-Commerce-Website-Client",
  },
  {
    id: "nexcent",
    title: "Nexcent",
    description:
      "A modern e-commerce website that offers a wide range of products with a focus on user experience. It includes features like product search, filtering, and a secure checkout process. The site is built to be responsive and accessible across devices.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/nBFLRvS/Web-Image6.png",
    visit: "https://nexcent-88b82.web.app/",
    github: "https://github.com/sazzadul1205/Nexcentt",
  },
  {
    id: "convert-me",
    title: "Convert Me",
    description:
      "A versatile unit conversion web application that allows users to convert between various measurement units, including length, weight, temperature, and more. The app is designed to be intuitive and user-friendly, making conversions quick and easy.",
    technologies: ["React", "Tailwind CSS"],
    image: "https://i.ibb.co/FKdvnmj/Web-Image5.png",
    visit: "https://convert-me-f361a.web.app/",
    github: "https://github.com/sazzadul1205/Convert-Me-client",
  },
  {
    id: "task-manager",
    title: "Task Manager",
    description:
      "A simple yet effective task management application that helps users organize their tasks efficiently. It features task creation, editing, and deletion functionalities, along with a clean and responsive design to enhance productivity.",
    technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
    image: "https://i.ibb.co/qJfV3nB/Web-Image4.png",
    visit: "https://task-manager-ea274.web.app/",
    github: "https://github.com/sazzadul1205/Brand-shop-client",
  },
];

// pages/projects/index.jsx
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

// icons
import { FaExternalLinkAlt, FaGithub, FaInfoCircle } from "react-icons/fa";

// Data
import { getProjects } from "./getProjects";

const Projects = () => {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const Projects = await getProjects();

        setProjects(Projects);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="bg-gradient-to-tr from-blue-500 to-purple-600 text-white min-h-screen flex justify-center items-center">
        <p>Loading . . . . </p>
      </div>
    );
  }

  console.log("Projects Data:", projects);

  return (
    <div className="bg-white/80 min-h-screen px-6">
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
        {/* {projects.map((project, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={project.id}
              className={`flex ${
                isEven ? "flex-row" : "flex-row-reverse"
              } justify-between gap-20`}
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
                    href={`/projects/${project.id}`}
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
        })} */}
      </div>
    </div>
  );
};

export default Projects;

// Later, you can add [id].jsx under pages/projects/ for dynamic project details page.
