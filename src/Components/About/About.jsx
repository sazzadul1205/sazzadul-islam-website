import React from "react";

// Import Next.js components
import Image from "next/image";
import Link from "next/link";

// Packages
import { Tooltip } from "react-tooltip";

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
  return (
    <div className="bg-gray-200/80 min-h-screen px-6">
      {/* Title */}
      <h3 className="uppercase text-center font-semibold font-poppins text-black py-3 pt-16 text-4xl font-sans">
        {aboutData?.title || "About Me"}
      </h3>

      {/* Divider */}
      <p className="bg-blue-500 w-10 py-1 mx-auto text-center rounded-full mb-6" />

      {/* Main Description */}
      <p className="text-center text-lg leading-8 max-w-4xl mx-auto text-gray-700 font-poppins">
        {aboutData?.description || ""}
      </p>

      {/* Detail Section */}
      <div className="flex flex-col md:flex-row mx-auto max-w-7xl gap-16 mt-10 text-black">
        {/* Personal Description */}
        <div className="md:w-1/2 py-5">
          <h2 className="text-2xl font-semibold font-poppins mb-4">
            Get to know me!
          </h2>

          <p className="text-lg leading-7 text-gray-700 font-poppins">
            {renderAboutDescription(aboutData.aboutDescription)}
          </p>

          <div className="flex items-center gap-2 pt-5">
            <button className="px-14 py-3 bg-linear-to-bl hover:bg-linear-to-tr from-blue-500 to-blue-700 text-white font-semibold rounded-xl uppercase text-lg cursor-pointer font-poppins ">
              Contact
            </button>

            <div className="flex items-center gap-3 pl-5">
              {aboutData?.socialLinks?.map(({ id, href, tooltip, src }) => (
                <React.Fragment key={id}>
                  <Link
                    href={href}
                    aria-label={tooltip}
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

        {/* Skills Section */}
        <div className="md:w-1/2 py-5">
          {/* Title */}
          <h2 className="text-2xl font-semibold font-poppins mb-4">
            My Skills
          </h2>

          {/* Subtitle */}
          <p className="text-gray-700 mb-4">
            Technologies I’ve worked with while learning full stack development:
          </p>

          {/* Skill Badges */}

          <div className="flex flex-wrap gap-5">
            {aboutData?.skills?.map((skill) => (
              <span
                key={skill}
                className="group relative inline-block px-4 py-1 bg-gray-200 text-gray-700 text-lg font-medium rounded-md shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Rainbow Glow Layer */}
                <span className="absolute inset-0 rainbow-glow bg-size-shimmer bg-no-repeat opacity-0 group-hover:opacity-100 group-hover:animate-shimmer transition-all duration-300 z-0 blur-sm rounded-md"></span>

                {/* Glint Shine */}
                <span className="badge-glint pointer-events-none absolute inset-0"></span>

                {/* Skill Text */}
                <span className="relative z-10 group-hover:text-white transition duration-200">
                  {skill}
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
