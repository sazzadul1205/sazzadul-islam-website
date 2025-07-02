"use client";

import { useState, useEffect } from "react";

// Components
import Projects from "@/Components/Projects/Projects";
import Contact from "@/Components/Contact/Contact";
import About from "@/Components/About/About";
import Hero from "@/Components/Hero/Hero";
import DragonCursor from "@/Components/DragonCursor/DragonCursor";
import Loader from "@/Shared/Loader/Loader";

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
    return <Loader />;
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
      className="bg-fixed bg-cover bg-center min-h-screen cursor-none"
      style={{
        backgroundImage: "url('/WhiteWallpaper.jpg')",
      }}
    >
      <DragonCursor />
      <section className="cursor-none" id="home">
        <Hero />
      </section>

      <section className="cursor-none" id="about">
        <About aboutData={aboutData} />
      </section>

      <section className="cursor-none" id="projects">
        <Projects projectsData={projectsData} />
      </section>

      <section className="cursor-none" id="contacts">
        <Contact />
      </section>
    </div>
  );
}
