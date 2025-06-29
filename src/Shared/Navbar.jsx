import Image from "next/image";
import React from "react";

import logo from "../../public/logo.png";

const menuItems = (
  <>
    <li>
      <a>Home</a>
    </li>
    <li>
      <a>About</a>
    </li>
    <li>
      <a>Projects</a>
    </li>
    <li>
      <a>Contacts</a>
    </li>
  </>
);

const Navbar = () => {
  return (
    <div className="navbar bg-white text-black shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <button tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </button>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {menuItems}
          </ul>
        </div>
        <div className="flex items-center px-5 gap-2">
          <Image
            src={logo}
            alt="My Profile Image"
            width={70}
            height={70}
            className="rounded-full border-2 border-blue-500"
          />
          <p className="text-lg font-semibold text-gray-800 hover:text-blue-800 uppercase cursor-default text-shadow-black">
            {" "}
            Sazzadul Islam
          </p>
        </div>
      </div>

      <div className="navbar-end hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{menuItems}</ul>
      </div>
    </div>
  );
};

export default Navbar;
