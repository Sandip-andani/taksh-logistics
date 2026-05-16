"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

/* ─────────────────────────────────────────
   SplitText — staggered letter reveal
───────────────────────────────────────── */
export const SplitText = ({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) => {
  const letters = text.split("");
  return (
    <span className={`inline-block ${className}`} aria-label={text}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 40, rotateX: -90 }}
          whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: delay + i * 0.03,
            duration: 0.5,
            ease: [0.215, 0.61, 0.355, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
};

/* ─────────────────────────────────────────
   Typewriter — cycling text with cursor
───────────────────────────────────────── */
export const Typewriter = ({
  words,
  className = "",
}: {
  words: string[];
  className?: string;
}) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) {
      const t = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return () => clearTimeout(t);
    }

    const target = words[wordIndex];
    const speed = isDeleting ? 40 : 80;

    const t = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(target.slice(0, displayed.length + 1));
        if (displayed.length + 1 === target.length) setIsPaused(true);
      } else {
        setDisplayed(target.slice(0, displayed.length - 1));
        if (displayed.length === 0) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(t);
  }, [displayed, isDeleting, isPaused, wordIndex, words]);

  return (
    <span className={`${className} inline-flex items-center`}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="ml-1 inline-block w-[3px] h-[0.85em] bg-blue-500 rounded-sm align-middle"
      />
    </span>
  );
};

/* ─────────────────────────────────────────
   ShimmerText — metallic shine sweep
───────────────────────────────────────── */
export const ShimmerText = ({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) => (
  <span className={`relative inline-block overflow-hidden ${className}`}>
    {text}
    <motion.span
      className="absolute inset-0 pointer-events-none"
      style={{
        background:
          "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.55) 50%, transparent 70%)",
        backgroundSize: "200% 100%",
      }}
      animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
      transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: "linear" }}
    />
  </span>
);
