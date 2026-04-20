"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export const Loader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations("Index.loader");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-white dark:bg-black"
        >
          <div className="relative w-64 h-32 overflow-hidden">
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute top-1/2 -translate-y-1/2"
            >
              {/* Simple Truck SVG */}
              <svg
                width="80"
                height="40"
                viewBox="0 0 80 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0" y="10" width="50" height="20" fill="currentColor" className="text-blue-600" />
                <rect x="52" y="15" width="20" height="15" fill="currentColor" className="text-blue-600" />
                <rect x="74" y="20" width="5" height="10" fill="currentColor" className="text-blue-600" />
                <circle cx="10" cy="35" r="5" fill="currentColor" className="text-gray-800 dark:text-gray-200" />
                <circle cx="40" cy="35" r="5" fill="currentColor" className="text-gray-800 dark:text-gray-200" />
                <circle cx="62" cy="35" r="5" fill="currentColor" className="text-gray-800 dark:text-gray-200" />
              </svg>
            </motion.div>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-4 text-xl font-medium tracking-widest text-blue-600 dark:text-blue-400 font-outfit"
          >
            {t("text")}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
