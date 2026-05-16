"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TrailDot {
  id: number;
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [trail, setTrail] = useState<TrailDot[]>([]);
  const trailIdRef = useRef(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 500 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // Slower ring follows with extra lag
  const ringX = useSpring(mouseX, { damping: 20, stiffness: 150 });
  const ringY = useSpring(mouseY, { damping: 20, stiffness: 150 });

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Add trail dot
      const id = trailIdRef.current++;
      setTrail((prev) => [...prev.slice(-8), { id, x: e.clientX, y: e.clientY }]);

      // Remove old dot after timeout
      setTimeout(() => {
        setTrail((prev) => prev.filter((d) => d.id !== id));
      }, 400);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.dataset.cursor === "hover"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveMouse);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveMouse);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* Trail dots */}
      {trail.map((dot, i) => (
        <motion.div
          key={dot.id}
          className="pointer-events-none fixed left-0 top-0 z-[9997] hidden md:block rounded-full bg-blue-500"
          initial={{ opacity: 0.6, scale: 1 }}
          animate={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{
            x: dot.x - 3,
            y: dot.y - 3,
            width: 6,
            height: 6,
          }}
        />
      ))}

      {/* Outer ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
      <motion.div
          animate={{
            scale: isClicking ? 0.8 : isHovered ? 1.8 : 1,
            borderColor: isHovered
              ? "rgba(59, 130, 246, 0.6)"
              : "rgba(59, 130, 246, 0.35)",
          }}
          transition={{ duration: 0.2 }}
          className="h-10 w-10 rounded-full border-2"
          style={{
            backgroundColor: isHovered ? "rgba(59, 130, 246, 0.08)" : "rgba(0,0,0,0)",
            boxShadow: isHovered ? "0 0 16px rgba(59,130,246,0.3)" : "none",
          }}
        />
      </motion.div>

      {/* Inner dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isClicking ? 1.5 : isHovered ? 0.4 : 1,
            backgroundColor: isHovered ? "#60a5fa" : "#2563eb",
          }}
          transition={{ duration: 0.15 }}
          className="h-2 w-2 rounded-full"
          style={{ boxShadow: "0 0 8px rgba(37,99,235,0.8)" }}
        />
      </motion.div>
    </>
  );
};
