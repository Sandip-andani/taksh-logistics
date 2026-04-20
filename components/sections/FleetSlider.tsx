"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Shield, Zap, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export const FleetSlider = () => {
  const t = useTranslations("Index.fleet");

  const fleetItems = [
    { 
      title: t("items.0.title"), 
      category: t("items.0.category"), 
      img: "/fleet_truck.png",
      stats: ["40T Capacity", "Euro 6 Tech"],
      icon: Zap
    },
    { 
      title: t("items.1.title"), 
      category: t("items.1.category"), 
      img: "/fleet_warehouse.png",
      stats: ["Automated", "24/7 Security"],
      icon: Shield
    },
    { 
      title: t("items.2.title"), 
      category: t("items.2.category"), 
      img: "/fleet_ship.png",
      stats: ["Worldwide", "Port Logistics"],
      icon: Globe
    },
    { 
      title: t("items.3.title"), 
      category: t("items.3.category"), 
      img: "/fleet_van.png",
      stats: ["Urban Experts", "Fast Dispatch"],
      icon: Zap
    },
  ];

  return (
    <section className="pt-10 pb-20 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/5 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full bg-indigo-600/5 blur-[150px] -z-10" />

      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px]">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-8 bg-blue-600" />
              <span className="text-blue-600 dark:text-blue-500 font-bold tracking-[0.4em] uppercase text-[10px]">
                {t("tag")}
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold font-outfit text-gray-900 dark:text-white tracking-tighter leading-none"
            >
              {t("title")} <span className="text-blue-600">{t("subtitle")}</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-light max-w-sm border-l border-gray-100 dark:border-white/10 pl-8 mb-4"
          >
            {t("desc")}
          </motion.p>
        </div>

        {/* Premium Grid Layout - 4 Columns in one line on large screens */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-6">
          {fleetItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group relative h-[400px] md:h-[450px] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all duration-700 shadow-sm hover:shadow-2xl"
            >
              {/* Image Layer */}
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0 opacity-60 dark:opacity-40 group-hover:opacity-100"
              />
              
              {/* Gradient & Glass Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 dark:from-black via-black/20 to-transparent" />
              
              {/* Content Panel */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <div className="mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-blue-600/10 p-2 rounded-lg backdrop-blur-md">
                      <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-blue-600 dark:text-blue-400 font-bold tracking-widest uppercase text-[9px]">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold font-outfit text-white leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Stats Peek */}
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 translate-y-5 group-hover:translate-y-0 transition-all duration-500">
                  {item.stats.map((stat, si) => (
                    <div 
                      key={si}
                      className="px-3 py-1 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-[8px] font-bold text-white uppercase tracking-widest"
                    >
                      {stat}
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="absolute top-6 right-6">
                <div className="h-10 w-10 rounded-full bg-white text-black flex items-center justify-center scale-0 group-hover:scale-100 transition-all duration-500 shadow-xl">
                  <ArrowUpRight className="h-5 w-5" />
                </div>
              </div>

              {/* Number Accent */}
              <div className="absolute top-8 left-8 text-white/5 text-7xl font-black font-outfit pointer-events-none group-hover:text-blue-600/10 transition-colors">
                0{i + 1}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
