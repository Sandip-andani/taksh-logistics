"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [counter, setCounter] = useState(0);
  const t = useTranslations("Index.loader");

  useEffect(() => {
    // Fast counter: completes in ~400ms (step 2 every 8ms)
    const interval = setInterval(() => {
      setCounter((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 200); // was 500ms
          return 100;
        }
        return prev + 2; // was +1
      });
    }, 8); // was 20ms

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-black overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Split Background Animation (Exiting) */}
          <motion.div 
            initial={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-white dark:bg-[#050505] origin-top"
          />

          <div className="relative z-10 flex flex-col items-center">
            
            {/* Geometric Morphing Core */}
            <div className="relative w-32 h-32 mb-12">
              <motion.div
                animate={{ 
                  rotate: [0, 90, 180, 270, 360],
                  borderRadius: ["20%", "50%", "20%", "50%", "20%"]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 border-2 border-blue-600 shadow-[0_0_30px_rgba(37,99,235,0.3)]"
              />
              <motion.div
                animate={{ 
                  rotate: [360, 270, 180, 90, 0],
                  scale: [1, 0.8, 1.1, 0.9, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-4 border border-blue-400 opacity-50"
              />
              
              {/* Inner Percentage */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold font-outfit text-gray-900 dark:text-white tabular-nums tracking-tighter">
                  {counter}<span className="text-blue-600">%</span>
                </span>
              </div>
            </div>

            {/* Branded Text Reveal */}
            <div className="overflow-hidden">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="flex flex-col items-center"
              >
                <div className="text-2xl font-bold tracking-[0.4em] font-outfit text-gray-900 dark:text-white uppercase mb-2">
                  TAKSH <span className="text-blue-600">LOGISTICS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-[1px] w-8 bg-blue-600/30" />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.5em]">
                    {t("status")}
                  </span>
                  <div className="h-[1px] w-8 bg-blue-600/30" />
                </div>
              </motion.div>
            </div>

            {/* Animated Scanning Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-10">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-[1px] bg-blue-600"
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
