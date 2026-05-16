"use client";

import React, { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[9998] h-[3px] origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, #1d4ed8, #2563eb, #60a5fa, #2563eb)",
        boxShadow: "0 0 12px rgba(37,99,235,0.8), 0 0 24px rgba(37,99,235,0.4)",
      }}
    />
  );
};
