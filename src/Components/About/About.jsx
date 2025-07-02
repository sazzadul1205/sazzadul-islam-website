import React from "react";

// Import Next.js components
import Image from "next/image";
import Link from "next/link";

// Import Social Icons
import gmail from "../../../public/SocialLogos/gmail.png";
import facebook from "../../../public/SocialLogos/facebook.png";
import github from "../../../public/SocialLogos/github.png";
import twitter from "../../../public/SocialLogos/twitter.png";
import linkedin from "../../../public/SocialLogos/linkedin.png";

// Packages
import { Tooltip } from "react-tooltip";

const About = () => {
  return (
    <div className="bg-gray-200/80 min-h-screen px-6">
      {/* Title */}
      <h3 className="uppercase text-center font-semibold font-poppins text-black py-3 pt-16 text-4xl font-sans">
        About Me
      </h3>

      {/* Divider */}
      <p className="bg-blue-500 w-10 py-1 mx-auto text-center rounded-full mb-6" />

      {/* Main Description */}
      <p className="text-center text-lg leading-8 max-w-4xl mx-auto text-gray-700 font-poppins">
        I'm a passionate and self-motivated full stack web developer with a
        strong interest in building efficient, scalable, and visually appealing
        web applications. From crafting interactive frontend experiences to
        handling backend logic and APIs, I enjoy working across the full
        development stack.
      </p>

      {/* Detail Section */}
      <div className="flex flex-col md:flex-row mx-auto max-w-7xl gap-16 mt-10 text-black">
        {/* Personal Description */}
        <div className="md:w-1/2 py-5">
          <h2 className="text-2xl font-semibold font-poppins mb-4">
            Get to know me!
          </h2>

          <p className="text-lg leading-7 text-gray-700 font-poppins">
            I specialize in both frontend and backend technologies, working with
            tools like React, Tailwind CSS, Node.js, Express, and MongoDB. I use{" "}
            <span className="text-black font-semibold">GitHub</span> to manage
            my projects, collaborate with others, and continuously refine my
            code through version control.
            <br />
            <br />I believe in continuous learning and sharing. I'm actively
            growing my knowledge and documenting what I learn to support others
            in the dev community. You can find my projects and contributions on
            GitHub, and I also share coding tips on{" "}
            <span className="text-blue-600 hover:scale-105 underline cursor-pointer">
              LinkedIn
            </span>{" "}
            and{" "}
            <span className="text-pink-500 underline cursor-pointer">
              GitHub
            </span>
            .
            <br />
            <br />
            I'm open to internships, freelance projects, and junior full stack
            roles. If you're looking for a developer who's eager to learn,
            collaborate, and create — feel free to reach out!
          </p>

          <div className="flex items-center gap-2 pt-5">
            <button className="px-14 py-3 bg-linear-to-bl hover:bg-linear-to-tr from-blue-500 to-blue-700 text-white font-semibold rounded-xl uppercase text-lg cursor-pointer font-poppins ">
              Contact
            </button>

            <div className="flex items-center gap-3 pl-5">
              {/* Gmail */}
              <>
                <Link
                  href="mailto:Psazzadul@gmail.com"
                  aria-label="Google"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="google-link"
                >
                  <Image
                    src={gmail}
                    alt="Logo"
                    className="hover:scale-110 transition-transform"
                    width={40}
                    height={40}
                    priority
                  />
                </Link>

                <Tooltip anchorSelect="#google-link" content="Email Me" />
              </>

              {/* Facebook */}
              <>
                <Link
                  href="https://www.facebook.com/sazzadul.islam.pritom/"
                  aria-label="Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="facebook-link"
                >
                  <Image
                    src={facebook}
                    alt="Logo"
                    className="hover:scale-110 transition-transform"
                    width={40}
                    height={40}
                    priority
                  />
                </Link>

                <Tooltip anchorSelect="#facebook-link" content="Message Me" />
              </>

              {/* Tweeter */}
              <>
                <Link
                  href="https://x.com/sazzadu84352084"
                  aria-label="x"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="x-link"
                >
                  <Image
                    src={twitter}
                    alt="Logo"
                    className="hover:scale-110 transition-transform"
                    width={40}
                    height={40}
                    priority
                  />
                </Link>

                <Tooltip anchorSelect="#x-link" content="Tweet Me" />
              </>

              {/* Tweeter */}
              <>
                <Link
                  href="https://github.com/sazzadul1205"
                  aria-label="GitHub"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="github-link"
                >
                  <Image
                    src={github}
                    alt="Logo"
                    className="hover:scale-110 transition-transform"
                    width={40}
                    height={40}
                    priority
                  />
                </Link>

                <Tooltip anchorSelect="#github-link" content="Help Me" />
              </>

              {/* Tweeter */}
              <>
                <Link
                  href="https://www.linkedin.com/in/sazzadul-islam-molla-6905b3293/"
                  aria-label="LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="linkedin-link"
                >
                  <Image
                    src={linkedin}
                    alt="Logo"
                    className="hover:scale-110 transition-transform"
                    width={40}
                    height={40}
                    priority
                  />
                </Link>

                <Tooltip anchorSelect="#linkedin-link" content="Contact Me" />
              </>
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
            {[
              "HTML5",
              "CSS3",
              "JavaScript",
              "ReactJS",
              "NextJS",
              "NodeJS",
              "ExpressJS",
              "MongoDB",
              "Tailwind",
              "DaisyUI",
              "Bootstrap",
              "Vercel",
              "Firebase",
              "VueJS",
              "MySQL",
              "GitHub",
            ].map((skill) => (
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
