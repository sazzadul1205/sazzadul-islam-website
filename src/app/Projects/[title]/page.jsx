"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjects } from "@/Components/Projects/getProjects";

const ProjectDetailsPage = () => {
  const params = useParams();
  const { title } = params;

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!title) return;

    setLoading(true);
    setError(null);

    const fetchProject = async () => {
      try {
        // Fetch by title, assuming your API supports it
        const data = await getProjects(title);

        // If API returns array, get the first one
        const foundProject = Array.isArray(data) ? data[0] : data;

        if (!foundProject) {
          throw new Error("Project not found");
        }

        setProject(foundProject);
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
      <div className="flex items-center justify-center h-screen bg-gray-100 text-lg text-gray-700">
        Loading...
      </div>
    );
  }

  // Full-page error state
  if (error || !project) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50 text-red-600 text-lg font-semibold">
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
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
        <p className="mb-4">{project.description}</p>
        {/* Add more project details here as needed */}
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
