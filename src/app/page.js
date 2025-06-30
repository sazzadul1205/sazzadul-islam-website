import Projects from "@/Components/Projects/Projects";
import Contact from "@/Components/Contact/Contact";
import About from "@/Components/About/About";
import Hero from "@/Components/Hero/Hero";

import getProjects from "@/Components/Projects/getProjects";

export default function Home() {
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
        <Projects />
      </section>

      <section id="contacts">
        <Contact />
      </section>
    </div>
  );
}
