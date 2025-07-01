"use client";

import { useState, useEffect } from "react";
import Projects from "@/Components/Projects/Projects";
import Contact from "@/Components/Contact/Contact";
import About from "@/Components/About/About";
import Hero from "@/Components/Hero/Hero";

export default function Home() {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/APIs/Projects");
        if (!res.ok) throw new Error("Failed to fetch projects");
        const data = await res.json();
        setProjectsData(Array.isArray(data) ? data : [data]);
      } catch (err) {
        console.error("Error fetching projects:", err.message || err);
        setError("Something went wrong while loading the projects.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-lg text-gray-700">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-50 text-red-600 text-lg font-semibold px-4 text-center">
        {error}
      </div>
    );
  }

  // ✅ Normal page render
  return (
    <div
      className="bg-fixed bg-cover bg-center min-h-screen"
      style={{
        backgroundImage: "url('/WhiteWallpaper.jpg')",
      }}
    >
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="projects">
        <Projects projectsData={projectsData} />
      </section>

      <section id="contacts">
        <Contact />
      </section>
    </div>
  );
}
