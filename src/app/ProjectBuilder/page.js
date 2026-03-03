"use client";

// React
import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Next
import Link from "next/link";
import Image from "next/image";

// Motion
import { motion, AnimatePresence } from "framer-motion";

// DND Kits
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

// icons
import {
  FaGripVertical,
  FaEdit,
  FaTrash,
  FaPlus,
  FaSave,
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaArrowUp,
  FaArrowDown,
  FaSpinner,
  FaExclamationTriangle,
  FaLock,
  FaUnlock,
} from "react-icons/fa";
import { FiSearch, FiEye, FiEyeOff } from "react-icons/fi";

// sweetalert
import Swal from "sweetalert2";

// API functions
const fetchProjects = async () => {
  const response = await fetch("/api/Projects");
  if (!response.ok) throw new Error("Failed to fetch projects");
  return response.json();
};

const updateProject = async (project) => {
  const response = await fetch(`/api/Projects?id=${project._id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error("Failed to update project");
  return response.json();
};

const createProject = async (project) => {
  const response = await fetch("/api/Projects", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(project),
  });
  if (!response.ok) throw new Error("Failed to create project");
  return response.json();
};

const deleteProject = async (id) => {
  const response = await fetch(`/api/Projects?id=${id}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error("Failed to delete project");
  return response.json();
};

// Find this function around line 90 and replace it:
const reorderProjects = async (projects) => {
  const response = await fetch("/api/Projects?action=reorder", {
    // Added ?action=reorder
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ projects }),
  });
  if (!response.ok) throw new Error("Failed to reorder projects");
  return response.json();
};

// Password Modal Component
const PasswordModal = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  // Get passwords from environment variables
  const validPasswords = [
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD_1,
    process.env.NEXT_PUBLIC_ADMIN_PASSWORD_2,
  ].filter(Boolean); // Remove any undefined values

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validPasswords.includes(password)) {
      setError("");
      setPassword("");
      setAttempts(0);
      onSuccess();
    } else {
      setError("Invalid password. Please try again.");
      setAttempts((prev) => prev + 1);

      // Clear error after 3 seconds
      setTimeout(() => setError(""), 3000);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: { duration: 0.2 },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="text-black">
          {/* Blurred Backdrop */}
          <motion.div
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50"
            style={{ backdropFilter: "blur(8px)" }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative border border-gray-200">
              {/* Lock Icon */}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full shadow-lg">
                  <FaLock className="w-8 h-8 text-white" />
                </div>
              </div>

              {/* Header */}
              <div className="text-center mt-6 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Protected Area
                </h2>
                <p className="text-gray-600">
                  Enter your password to access the Project Builder
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-12"
                      placeholder="Enter password"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <FiEyeOff className="w-5 h-5" />
                      ) : (
                        <FiEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-red-600 text-sm flex items-center gap-2"
                    >
                      <FaExclamationTriangle className="w-4 h-4" />
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                {/* Attempts indicator (optional) */}
                {attempts > 0 && (
                  <p className="text-xs text-gray-500">
                    Failed attempts: {attempts}/5
                  </p>
                )}

                {/* Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors font-medium"
                  >
                    Unlock
                  </button>
                </div>
              </form>

              {/* Hint (optional) */}
              <p className="text-xs text-center text-gray-400 mt-4">
                Contact administrator if you forgot the password
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Sortable Project Card Component
const SortableProjectCard = ({
  project,
  index,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: project._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 1000 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow"
    >
      <div className="flex flex-col md:flex-row">
        {/* Drag Handle and Index */}
        <div className="flex items-center gap-2 p-4 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
          <div
            {...attributes}
            {...listeners}
            className="cursor-move p-2 hover:bg-gray-200 rounded-lg transition-colors"
          >
            <FaGripVertical className="w-5 h-5 text-gray-500" />
          </div>
          <span className="font-bold text-lg text-gray-700 w-8 text-center">
            #{index + 1}
          </span>
          <div className="flex flex-col gap-1 ml-2">
            <button
              onClick={() => onMoveUp(index)}
              disabled={isFirst}
              className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                isFirst ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              <FaArrowUp className="w-3 h-3" />
            </button>
            <button
              onClick={() => onMoveDown(index)}
              disabled={isLast}
              className={`p-1 rounded hover:bg-gray-200 transition-colors ${
                isLast ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              <FaArrowDown className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Project Content */}
        <div className="flex-1 p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Image */}
            <div className="w-full md:w-48 h-32 relative rounded-lg overflow-hidden">
              <Image
                src={project.image || "https://via.placeholder.com/200"}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500">{project.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : project.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                    View: {project.view || 0}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {project.technologies?.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies?.length > 4 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                    +{project.technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
            <Link
              href={project.visit}
              target="_blank"
              className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FaExternalLinkAlt className="w-4 h-4" />
            </Link>
            <Link
              href={project.github}
              target="_blank"
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FaGithub className="w-4 h-4" />
            </Link>
            <button
              onClick={() => onEdit(project)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(project._id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Project Form Component
const ProjectForm = ({ project, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    project || {
      title: "",
      subtitle: "",
      year: new Date().getFullYear(),
      status: "In Progress",
      category: "",
      description: "",
      objectives: [],
      technologies: [],
      image: "",
      visit: "",
      github: "",
      backend: "",
      view: 0,
    },
  );

  const [techInput, setTechInput] = useState("");
  const [objectiveInput, setObjectiveInput] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addTechnology = () => {
    if (techInput.trim()) {
      setFormData({
        ...formData,
        technologies: [...(formData.technologies || []), techInput.trim()],
      });
      setTechInput("");
    }
  };

  const removeTechnology = (index) => {
    setFormData({
      ...formData,
      technologies: formData.technologies.filter((_, i) => i !== index),
    });
  };

  const addObjective = () => {
    if (objectiveInput.trim()) {
      setFormData({
        ...formData,
        objectives: [...(formData.objectives || []), objectiveInput.trim()],
      });
      setObjectiveInput("");
    }
  };

  const removeObjective = (index) => {
    setFormData({
      ...formData,
      objectives: formData.objectives.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 text-black"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {project ? "Edit Project" : "Add New Project"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subtitle
            </label>
            <input
              type="text"
              name="subtitle"
              value={formData.subtitle}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>Completed</option>
                <option>In Progress</option>
                <option>Planned</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              View Count
            </label>
            <input
              type="number"
              name="view"
              value={formData.view}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Links and Image */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Visit URL
            </label>
            <input
              type="url"
              name="visit"
              value={formData.visit}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Backend URL
            </label>
            <input
              type="url"
              name="backend"
              value={formData.backend}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Technologies */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Technologies
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTechnology()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add technology..."
          />
          <button
            type="button"
            onClick={addTechnology}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.technologies?.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm flex items-center gap-2"
            >
              {tech}
              <button
                type="button"
                onClick={() => removeTechnology(index)}
                className="text-blue-700 hover:text-blue-900"
              >
                <FaTimes className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Objectives */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Objectives
        </label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={objectiveInput}
            onChange={(e) => setObjectiveInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addObjective()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Add objective..."
          />
          <button
            type="button"
            onClick={addObjective}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add
          </button>
        </div>
        <ul className="space-y-2">
          {formData.objectives?.map((objective, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <span className="text-sm text-gray-700">{objective}</span>
              <button
                type="button"
                onClick={() => removeObjective(index)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 mt-6">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center gap-2"
        >
          <FaSave className="w-4 h-4" />
          Save Project
        </button>
      </div>
    </motion.form>
  );
};

// Main ProjectBuilder Component
const ProjectBuilder = () => {
  const [isLocked, setIsLocked] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const queryClient = useQueryClient();

  // Fetch projects with TanStack Query
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
    enabled: !isLocked, // Only fetch when unlocked
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Project created successfully",
        timer: 2000,
      });
      setShowForm(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Project updated successfully",
        timer: 2000,
      });
      setEditingProject(null);
      setShowForm(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Project has been deleted.",
        timer: 2000,
      });
    },
  });

  const reorderMutation = useMutation({
    mutationFn: reorderProjects,
    onSuccess: () => {
      queryClient.invalidateQueries(["projects"]);
    },
  });

  // Sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Handle drag end
  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = projects.findIndex((item) => item._id === active.id);
      const newIndex = projects.findIndex((item) => item._id === over.id);
      const reordered = arrayMove(projects, oldIndex, newIndex);
      reorderMutation.mutate(reordered);
    }
  };

  // Handle manual move
  const handleMoveUp = (index) => {
    if (index > 0) {
      const reordered = arrayMove(projects, index, index - 1);
      reorderMutation.mutate(reordered);
    }
  };

  const handleMoveDown = (index) => {
    if (index < projects.length - 1) {
      const reordered = arrayMove(projects, index, index + 1);
      reorderMutation.mutate(reordered);
    }
  };

  // Handle edit
  const handleEdit = (project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  // Handle delete with confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(id);
      }
    });
  };

  // Handle save
  const handleSave = (projectData) => {
    if (editingProject) {
      updateMutation.mutate({ ...editingProject, ...projectData });
    } else {
      createMutation.mutate(projectData);
    }
  };

  // Handle successful unlock
  const handleUnlock = () => {
    setIsLocked(false);
    setShowPasswordModal(false);
  };

  // Filter projects
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || project.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Show password modal when locked
  if (isLocked) {
    return (
      <>
        <PasswordModal
          isOpen={showPasswordModal}
          onClose={() => {
            // Redirect to home or show message when cancelled
            window.location.href = "/";
          }}
          onSuccess={handleUnlock}
        />

        {/* Blurred background content */}
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 md:px-6 text-black py-30 filter blur-sm">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Project Builder
              </h1>
              <p className="text-gray-600">
                Manage, reorder, and customize your portfolio projects
              </p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaExclamationTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <p className="text-red-600 font-semibold">Error loading projects</p>
          <p className="text-gray-500 text-sm mt-2">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 md:px-6 text-black py-30">
      <div className="max-w-7xl mx-auto">
        {/* Header with Unlock Badge */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Project Builder
            </h1>
            <p className="text-gray-600">
              Manage, reorder, and customize your portfolio projects
            </p>
          </div>
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full flex items-center gap-2">
            <FaUnlock className="w-4 h-4" />
            <span className="text-sm font-medium">Unlocked</span>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Planned">Planned</option>
            </select>

            {/* Add Button */}
            <button
              onClick={() => {
                setEditingProject(null);
                setShowForm(!showForm);
              }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-colors flex items-center gap-2"
            >
              <FaPlus className="w-4 h-4" />
              {showForm ? "Close Form" : "Add Project"}
            </button>
          </div>
        </div>

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <div className="mb-8">
              <ProjectForm
                project={editingProject}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditingProject(null);
                }}
              />
            </div>
          )}
        </AnimatePresence>

        {/* Projects List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-700">
              Projects ({filteredProjects.length})
            </h2>
            <p className="text-sm text-gray-500">
              Drag and drop to reorder • Click and hold the grip icon
            </p>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={filteredProjects.map((p) => p._id)}
              strategy={verticalListSortingStrategy}
            >
              <AnimatePresence>
                {filteredProjects.map((project, index) => (
                  <SortableProjectCard
                    key={project._id}
                    project={project}
                    index={index}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onMoveUp={handleMoveUp}
                    onMoveDown={handleMoveDown}
                    isFirst={index === 0}
                    isLast={index === filteredProjects.length - 1}
                  />
                ))}
              </AnimatePresence>
            </SortableContext>
          </DndContext>

          {filteredProjects.length === 0 && !isLoading && (
            <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-500 mb-4">No projects found</p>
              <button
                onClick={() => {
                  setEditingProject(null);
                  setShowForm(true);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center gap-2"
              >
                <FaPlus className="w-4 h-4" />
                Add Your First Project
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="text-2xl font-bold text-blue-600">
              {projects.length}
            </div>
            <div className="text-sm text-gray-500">Total Projects</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="text-2xl font-bold text-green-600">
              {projects.filter((p) => p.status === "Completed").length}
            </div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="text-2xl font-bold text-yellow-600">
              {projects.filter((p) => p.status === "In Progress").length}
            </div>
            <div className="text-sm text-gray-500">In Progress</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow border border-gray-100">
            <div className="text-2xl font-bold text-purple-600">
              {projects.reduce((sum, p) => sum + (p.view || 0), 0)}
            </div>
            <div className="text-sm text-gray-500">Total Views</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectBuilder;
