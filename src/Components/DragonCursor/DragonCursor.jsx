"use client";

import { useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa";

const DragonCursor = () => {
  const dragonRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    document.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.1;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.1;

      if (dragonRef.current) {
        dragonRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={dragonRef}
      className="hidden md:fixed top-0 left-0 z-[9999] pointer-events-none w-16 h-16 animate-float text-black"
    >
      <FaPlus />
    </div>
  );
};

export default DragonCursor;
