import Image from "next/image";
import React from "react";

// Icons
import { FaExternalLinkAlt, FaGithub, FaInfoCircle } from "react-icons/fa";

const Projects = () => {
  return (
    <div className="bg-white/80 min-h-screen px-6">
      {/* Title */}
      <h3 className="uppercase text-center font-semibold font-poppins text-black py-3 pt-16 text-4xl font-sans">
        Projects
      </h3>

      {/* Divider */}
      <p className="bg-blue-500 w-10 py-1 mx-auto text-center rounded-full mb-6" />

      {/* Main Description */}
      <p className="text-center text-lg leading-8 max-w-4xl mx-auto text-gray-700 font-poppins">
        Here is some projects that i have worked on. Each project showcases my
        skills in web development, from frontend design to backend
        functionality. Feel free to explore them!
      </p>

      <div className="max-w-7xl mx-auto pt-20 space-y-16 ">
        {/* Project 1 */}
        <div className="flex justify-between gap-20">
          {/* Image */}
          <div className="p-2 bg-gray-300">
            <Image
              src="https://i.ibb.co/vCRwV9ps/Seven-Gym1.png"
              alt="Seven Gym Project"
              width={1000}
              height={1000}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Project Details */}
          <div className="w-2/3">
            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Seven Gym
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-4">
              A full-featured gym management web application designed to
              streamline class bookings, handle membership management, and help
              users monitor their fitness progress efficiently. It offers both
              member and admin dashboards with real-time updates and session
              control.
            </p>

            {/* Technologies Used */}
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Technologies:</span> React,
              Node.js, MongoDB, Tailwind CSS
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button className="flex items-center gap-2 bg-linear-to-bl hover:bg-linear-to-tr from-green-300 to-green-600 text-white font-semibold px-10 py-3 rounded-2xl transition duration-200 cursor-pointer">
                <FaInfoCircle className="text-lg" />
                Details
              </button>

              <button className="flex items-center gap-2 bg-linear-to-bl hover:bg-linear-to-tr from-blue-300 to-blue-600 text-white font-semibold px-10 py-3 rounded-2xl transition duration-200 cursor-pointer">
                <FaExternalLinkAlt className="text-lg" />
                Visit
              </button>

              <button className="flex items-center gap-2 bg-linear-to-bl hover:bg-linear-to-tr from-gray-500 to-black text-white font-semibold px-10 py-3 rounded-2xl transition duration-200 cursor-pointer">
                <FaGithub className="text-lg" />
                GitHub
              </button>
            </div>
          </div>
        </div>

        {/* Project 2 */}
        <div className="flex flex-row-reverse justify-between gap-20">
          {/* Image */}
          <div className="p-2 bg-gray-300">
            <Image
              src="https://i.ibb.co.com/YWKnB5V/masterbanner.png"
              alt="Seven Gym Project"
              width={1000}
              height={1000}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Project Details */}
          <div className="w-2/3">
            {/* Title */}
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Master Job Shop
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-4">
              A comprehensive job portal that connects job seekers with
              employers. It features job listings, application tracking, and
              user profiles to enhance the job search experience. The platform
              is designed to be user-friendly and efficient for both job seekers
              and recruiters.
            </p>

            {/* Technologies Used */}
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">Technologies:</span> React,
              Node.js, MongoDB, Tailwind CSS
            </p>

            <div className="flex flex-wrap gap-4 mt-4">
              <button className="flex items-center gap-2 bg-linear-to-bl hover:bg-linear-to-tr from-green-300 to-green-600 text-white font-semibold px-10 py-3 rounded-2xl transition duration-200 cursor-pointer">
                <FaInfoCircle className="text-lg" />
                Details
              </button>

              <button className="flex items-center gap-2 bg-linear-to-bl hover:bg-linear-to-tr from-blue-300 to-blue-600 text-white font-semibold px-10 py-3 rounded-2xl transition duration-200 cursor-pointer">
                <FaExternalLinkAlt className="text-lg" />
                Visit
              </button>

              <button className="flex items-center gap-2 bg-linear-to-bl hover:bg-linear-to-tr from-gray-500 to-black text-white font-semibold px-10 py-3 rounded-2xl transition duration-200 cursor-pointer">
                <FaGithub className="text-lg" />
                GitHub
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
