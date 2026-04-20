"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const About = () => {
  return (
    <section className="py-32 bg-gray-50 dark:bg-[#050505] overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-sm mb-6 block">
              The Taksh Identity
            </span>
            <h2 className="text-5xl md:text-8xl font-bold font-outfit tracking-tighter leading-[0.9] dark:text-white mb-10">
              Moving the <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400">Future of Trade.</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <p className="text-gray-500 text-xl leading-relaxed font-light">
                We believe logistics isn't just about moving cargo—it's about building the infrastructure of tomorrow. Our approach combines brutal efficiency with elegant technology.
              </p>
              <div className="space-y-6">
                <div className="flex flex-col">
                  <span className="text-4xl font-bold dark:text-white font-outfit">99.9%</span>
                  <span className="text-gray-500 uppercase tracking-widest text-xs font-bold mt-1">On-Time Delivery</span>
                </div>
                <div className="h-[1px] w-full bg-gray-200 dark:bg-gray-800" />
                <div className="flex flex-col">
                  <span className="text-4xl font-bold dark:text-white font-outfit">120+</span>
                  <span className="text-gray-500 uppercase tracking-widest text-xs font-bold mt-1">Global Hubs</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl">
              <Image
                src="/hero_1.png"
                alt="Logistics Future"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
            </div>
            
            {/* Floating Element */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 bg-white dark:bg-gray-900 p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-white/5"
            >
              <div className="text-blue-600 font-bold text-5xl mb-2">15</div>
              <div className="text-gray-500 uppercase tracking-widest text-xs font-bold">Years of Innovation</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
