"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const GlobalNetwork = () => {
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src="/global_map.png"
          alt="Global Network Map"
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-blue-500 font-bold tracking-[0.3em] uppercase text-sm mb-4 block">
              Worldwide Reach
            </span>
            <h2 className="text-4xl md:text-6xl font-bold font-outfit mb-8 text-white leading-tight">
              Connecting Every <br /> Corner of the Globe
            </h2>
            <div className="space-y-6">
              <p className="text-gray-400 text-lg leading-relaxed max-w-lg">
                With strategic hubs in over 120 countries, our network ensures that your cargo moves across borders as if they didn't exist.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">120+</div>
                  <div className="text-gray-500 uppercase tracking-widest text-xs">Countries Reached</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">350+</div>
                  <div className="text-gray-500 uppercase tracking-widest text-xs">Strategic Ports</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">24/7</div>
                  <div className="text-gray-500 uppercase tracking-widest text-xs">Customs Support</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-white mb-2">1M+</div>
                  <div className="text-gray-500 uppercase tracking-widest text-xs">TEU Annually</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="hidden lg:block relative h-[600px]">
            {/* Animated points on the map effect could go here */}
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 h-3 w-3 bg-blue-500 rounded-full shadow-[0_0_20px_#3b82f6]"
            />
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute top-1/2 right-1/4 h-3 w-3 bg-blue-400 rounded-full shadow-[0_0_20px_#60a5fa]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
