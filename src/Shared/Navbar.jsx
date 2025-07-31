"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "../../public/logo.png";

const links = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Contacts", href: "#contacts" },
];

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("#home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      for (const link of links) {
        const section = document.querySelector(link.href);
        if (
          section instanceof HTMLElement &&
          section.offsetTop <= scrollPosition + 100 &&
          section.offsetTop + section.offsetHeight > scrollPosition + 100
        ) {
          setActiveLink(link.href);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="navbar bg-white/80 text-black shadow-sm px-4 fixed top-0 w-full z-50">
      <div className="navbar-start opacity-100">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-white rounded-box w-52 text-base font-poppins font-medium"
          >
            {links.map(({ name, href }) => (
              <li key={href}>
                <a
                  href={href}
                  className={`transition-colors duration-300 ${
                    activeLink === href
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                  }`}
                >
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-3 px-4">
          <Image
            src={logo}
            alt="Logo"
            width={70}
            height={70}
            className="rounded-full border-2 border-blue-500"
            priority
          />
          <p className="whitespace-nowrap text-lg font-semibold text-gray-800 hover:text-blue-800 transition-colors duration-300 font-poppins">
            Sazzadul Islam
          </p>
        </div>
      </div>

      <div className="navbar-end hidden lg:flex">
        <ul className="flex gap-14 font-poppins font-semibold">
          {links.map(({ name, href }) => (
            <li key={href}>
              <a
                href={href}
                className={`transition-colors duration-300 ${
                  activeLink === href
                    ? "text-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
