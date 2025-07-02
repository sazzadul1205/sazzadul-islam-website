"use client";

import { useState, useEffect } from "react";
import Projects from "@/Components/Projects/Projects";
import Contact from "@/Components/Contact/Contact";
import About from "@/Components/About/About";
import Hero from "@/Components/Hero/Hero";

export default function Home() {
  const [projectsData, setProjectsData] = useState([]);
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both in parallel
        const [projectsRes, aboutRes] = await Promise.all([
          fetch("/APIs/Projects"),
          fetch("/APIs/About"),
        ]);

        if (!projectsRes.ok) throw new Error("Failed to fetch projects");
        if (!aboutRes.ok) throw new Error("Failed to fetch about data");

        const projectsData = await projectsRes.json();
        const aboutData = await aboutRes.json();

        setProjectsData(
          Array.isArray(projectsData) ? projectsData : [projectsData]
        );
        setAboutData(aboutData); // ✅ You need to define this state
      } catch (err) {
        console.error("Error fetching data:", err.message || err);
        setError("Something went wrong while loading the content.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        <About aboutData={aboutData} />
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
