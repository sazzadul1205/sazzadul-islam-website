"use client";

import React, { useEffect } from "react";

// Import Next.js components
import Image from "next/image";
import Link from "next/link";

import AOS from "aos";
import "aos/dist/aos.css";

// Packages
import { Tooltip } from "react-tooltip";

// Custom Components
const renderAboutDescription = (descArray) =>
  descArray.map((item, i) => {
    if (typeof item === "string") {
      // Replace \n\n with <br/><br/>
      const parts = item.split("\n\n");
      return parts.map((part, idx) => (
        <React.Fragment key={`${i}-${idx}`}>
          {part}
          {idx < parts.length - 1 && (
            <>
              <br />
              <br />
            </>
          )}
        </React.Fragment>
      ));
    } else {
      let className = "";
      switch (item.style) {
        case "bold":
          className = "text-black font-semibold";
          break;
        case "blueUnderlineHover":
          className = "text-blue-600 hover:scale-105 underline cursor-pointer";
          break;
        case "pinkUnderline":
          className = "text-pink-500 underline cursor-pointer";
          break;
      }
      return (
        <span key={i} className={className}>
          {item.text}
        </span>
      );
    }
  });

const About = ({ aboutData }) => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-gray-200/80 min-h-screen px-4 sm:px-6 lg:px-8 py-12">
      {/* Title */}
      <h3
        className="uppercase text-center font-semibold font-poppins text-black text-3xl sm:text-4xl mb-2"
        data-aos="zoom-in"
      >
        {aboutData?.title || "About Me"}
      </h3>

      {/* Divider */}
      <div
        className="w-10 h-1 bg-blue-500 mx-auto rounded-full mb-6"
        data-aos="zoom-in"
        data-aos-delay="100"
      />

      {/* Intro Description */}
      <p
        className="text-center text-base sm:text-lg leading-7 sm:leading-8 max-w-3xl mx-auto text-gray-700 font-poppins"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {aboutData?.description || ""}
      </p>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 max-w-7xl mx-auto mt-20 md:mt-10 text-black">
        {/* Left Column - Description */}
        <div
          className="lg:w-1/2 space-y-4"
          data-aos="fade-right"
          data-aos-delay="300"
        >
          <h2 className="text-2xl text-center md:text-left font-semibold font-poppins">
            Get to know me!
          </h2>

          <p className="text-base sm:text-lg text-center md:text-left text-gray-700 font-poppins">
            {renderAboutDescription(aboutData.aboutDescription)}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-5">
            <button className="px-8 py-3 text-white text-sm sm:text-base bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl font-semibold uppercase font-poppins w-full md:w-fit">
              Contact
            </button>

            {/* Social Links */}
            <div className="flex mx-auto md:mx-0 flex-wrap gap-3">
              {aboutData?.socialLinks?.map(({ id, href, tooltip, src }) => (
                <React.Fragment key={id}>
                  <Link
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={id}
                  >
                    <Image
                      src={src}
                      alt={tooltip}
                      className="hover:scale-110 transition-transform"
                      width={40}
                      height={40}
                      priority
                    />
                  </Link>
                  <Tooltip anchorSelect={`#${id}`} content={tooltip} />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Skills */}
        <div
          className="lg:w-1/2 space-y-4"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          {/* Title */}
          <h2 className="text-2xl text-center md:text-left font-semibold font-poppins">
            My Skills
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-center md:text-left text-gray-700 font-poppins">
            Technologies I’ve worked with while learning full stack development:
          </p>

          <div className="flex flex-wrap gap-3 sm:gap-4">
            {aboutData?.skills?.map((skill, i) => (
              <span
                key={skill}
                className="group relative px-4 py-3 bg-white text-gray-700 text-sm sm:text-base font-medium rounded-md shadow hover:shadow-lg transition duration-300 cursor-pointer"
                data-aos="zoom-in-up"
                data-aos-delay={i * 100}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
