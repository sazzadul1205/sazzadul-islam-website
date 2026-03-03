"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  FaExternalLinkAlt,
  FaGithub,
  FaInfoCircle,
  FaCode,
  FaStar,
  FaEye,
  FaHeart
} from "react-icons/fa";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: -30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const cardVariants = {
  hidden: (direction) => ({
    opacity: 0,
    x: direction === "right" ? -100 : 100,
    y: 50,
  }),
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15,
      mass: 1,
    },
  },
};

const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: { scale: 0.95 },
};

const Projects = ({ projectsData }) => {
  const [showAll, setShowAll] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);
  const [likedProjects, setLikedProjects] = useState([]);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const toggleShow = () => setShowAll((prev) => !prev);

  const handleLike = (projectId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setLikedProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  // Sort projects by 'order' field (from Project Builder)
  const sortedProjects = [...projectsData].sort((a, b) => {
    // If order exists, sort by it
    if (typeof a.order === "number" && typeof b.order === "number") {
      return a.order - b.order;
    }
    // Fallback to view count if order doesn't exist
    const aHasView = typeof a.view === "number";
    const bHasView = typeof b.view === "number";
    if (aHasView && bHasView) return a.view - b.view;
    if (aHasView) return -1;
    if (bHasView) return 1;
    return 0;
  });

  // Split projects into always-visible and extra projects
  const baseProjects = sortedProjects.slice(0, 4);
  const extraProjects = sortedProjects.slice(4);

  return (
    <motion.section
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative bg-gradient-to-b from-white to-gray-50 min-h-screen px-4 md:px-6 py-16 overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute top-20 left-20 w-72 h-72 bg-blue-200 rounded-full filter blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute bottom-20 right-20 w-80 h-80 bg-indigo-200 rounded-full filter blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={headerVariants} className="text-center mb-16">
          <motion.h3
            variants={headerVariants}
            className="uppercase font-bold font-poppins text-black text-4xl md:text-5xl mb-4"
          >
            Projects
          </motion.h3>

          <motion.div
            variants={headerVariants}
            className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full mb-8"
          />

          <motion.p
            variants={headerVariants}
            className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto text-gray-700 font-poppins"
          >
            Here are some projects that I have worked on. Each one showcases my
            skills in web development, from frontend design to backend
            functionality. Feel free to explore them!
          </motion.p>
        </motion.div>

        {/* Projects Grid/List */}
        <motion.div variants={containerVariants} className="space-y-16">
          <AnimatePresence mode="wait">
            {/* Base Projects */}
            {baseProjects.map((project, index) => {
              const direction = index % 2 === 0 ? "right" : "left";
              return (
                <motion.div
                  key={project._id || project.id || index}
                  custom={direction}
                  variants={cardVariants}
                  onHoverStart={() => setHoveredProject(project._id || project.id)}
                  onHoverEnd={() => setHoveredProject(null)}
                  className="relative"
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    isEven={index % 2 === 0}
                    isHovered={hoveredProject === (project._id || project.id)}
                    likedProjects={likedProjects}
                    onLike={handleLike}
                  />
                </motion.div>
              );
            })}

            {/* Extra Projects (shown on toggle) */}
            {showAll &&
              extraProjects.map((project, index) => {
                const actualIndex = index + 4;
                const direction = actualIndex % 2 === 0 ? "right" : "left";
                return (
                  <motion.div
                    key={project._id || project.id || `extra-${index}`}
                    custom={direction}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, x: -100 }}
                    onHoverStart={() => setHoveredProject(project._id || project.id)}
                    onHoverEnd={() => setHoveredProject(null)}
                  >
                    <ProjectCard
                      project={project}
                      index={actualIndex}
                      isEven={actualIndex % 2 === 0}
                      isHovered={hoveredProject === (project._id || project.id)}
                      likedProjects={likedProjects}
                      onLike={handleLike}
                    />
                  </motion.div>
                );
              })}
          </AnimatePresence>
        </motion.div>

        {/* Show More / Show Less Button */}
        <motion.div
          variants={buttonVariants}
          className="w-full flex justify-center mt-20"
        >
          <motion.button
            onClick={toggleShow}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className="group relative px-10 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-lg shadow-lg overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative flex items-center gap-2">
              {showAll ? (
                <>
                  <FiChevronUp className="w-5 h-5" />
                  Show Less
                </>
              ) : (
                <>
                  <FiChevronDown className="w-5 h-5" />
                  Show More Projects
                </>
              )}
            </span>
          </motion.button>
        </motion.div>

        {/* Project Stats */}
        <motion.div
          variants={headerVariants}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-200"
        >
          {[
            { label: "Total Projects", value: projectsData.length, icon: FaCode },
            { label: "Completed", value: projectsData.filter(p => p.status === "Completed").length, icon: FaStar },
            { label: "In Progress", value: projectsData.filter(p => p.status === "In Progress").length, icon: FaEye },
            { label: "Liked", value: likedProjects.length, icon: FaHeart },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 + i * 0.1 }}
                className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl border border-gray-100"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="inline-block p-2 bg-blue-100 rounded-lg mb-2"
                >
                  <Icon className="w-5 h-5 text-blue-600" />
                </motion.div>
                <div className="text-2xl font-bold text-blue-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};

// Fixed Project Card Component - No expansion on hover
const ProjectCard = ({ project, index, isEven, isHovered, likedProjects, onLike }) => {
  const isLiked = likedProjects.includes(project._id || project.id);
  const projectId = project._id || project.id;

  return (
    <motion.div
      className={`flex flex-col ${isEven ? "md:flex-row" : "md:flex-row-reverse"
        } items-center justify-between gap-8 md:gap-12 group`}
    >
      {/* Image Section with subtle 3D rotation (no scale) */}
      <motion.div
        className="w-full md:w-1/2 relative"
        animate={isHovered ? { rotateY: isEven ? 3 : -3 } : { rotateY: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative p-2 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl shadow-xl overflow-hidden">
          <Image
            src={
              project.image ||
              "https://via.placeholder.com/1000x600.png?text=No+Image+Available"
            }
            alt={project.title || "Project Image"}
            width={1000}
            height={600}
            className="rounded-xl object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src =
                "https://via.placeholder.com/1000x600.png?text=No+Image+Available";
            }}
          />

          {/* Overlay with tech stack - fades in on hover */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent rounded-xl"
          >
            <div className="absolute bottom-4 left-4 right-4">
              <p className="text-white text-sm mb-2">Technologies:</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies?.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > 3 && (
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Like Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => onLike(projectId, e)}
            className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
          >
            <FaHeart
              className={`w-5 h-5 transition-colors ${isLiked ? "text-red-500" : "text-gray-400"
                }`}
            />
          </motion.button>

          {/* Project Number - Follows the order from Project Builder */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="absolute top-4 left-4 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-lg"
          >
            {index + 1}
          </motion.div>
        </div>
      </motion.div>

      {/* Text Section - subtle movement without scale */}
      <motion.div
        className="w-full md:w-1/2 space-y-4"
        animate={isHovered ? { x: isEven ? 5 : -5 } : { x: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <motion.h3
          className="text-3xl font-bold text-gray-800 mb-2"
          animate={isHovered ? { color: "#2563eb" } : { color: "#1f2937" }}
          transition={{ duration: 0.2 }}
        >
          {project.title}
        </motion.h3>

        <p className="text-gray-600 text-lg leading-relaxed">
          {project.description}
        </p>

        {/* Technologies Tags */}
        <div className="flex flex-wrap gap-2 py-2">
          {project.technologies?.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.05, y: -1 }}
              className="px-3 py-1 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-medium rounded-full border border-blue-200 cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          <Link
            href={`/Projects/${encodeURIComponent(project.title)}`}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl text-base shadow-md hover:shadow-xl transition-all hover:scale-105"
          >
            <FaInfoCircle className="w-4 h-4" />
            Details
          </Link>

          <Link
            href={project.visit}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-xl text-base shadow-md hover:shadow-xl transition-all hover:scale-105"
          >
            <FaExternalLinkAlt className="w-4 h-4" />
            Visit
          </Link>

          <Link
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-800 to-black text-white font-semibold rounded-xl text-base shadow-md hover:shadow-xl transition-all hover:scale-105"
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </Link>
        </div>

        {/* View Counter */}
        {project.view ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaEye className="w-4 h-4" />
            <span>{project.view} views</span>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FaCode className="w-4 h-4" />
            <span>Order: #{typeof project.order === 'number' ? project.order + 1 : index + 1}</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Projects;