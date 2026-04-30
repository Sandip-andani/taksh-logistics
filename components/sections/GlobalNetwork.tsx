"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Target, Globe, Shield } from "lucide-react";
import { useTranslations } from "next-intl";

export const GlobalNetwork = () => {
  const t = useTranslations("Index.network");

  const hubs = [
    { label: t("reach"), value: "120+", icon: Globe },
    { label: t("ports"), value: "350+", icon: Target },
    { label: t("uptime"), value: "99.9%", icon: Shield },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      
      {/* Background Grid & Texture */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat opacity-20" />
      </div>

      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px] relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-10">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[1px] w-10 bg-blue-600" />
              <span className="text-blue-600 font-bold tracking-[0.4em] uppercase text-[10px]">
                {t("tag")}
              </span>
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-bold font-outfit text-gray-900 dark:text-white tracking-tighter leading-none">
              {t("title").split(".")[0]} <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                {t("title").split(".")[1]}.
              </span>
            </h2>
          </div>
          
          {/* Real-time Status Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="p-6 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 rounded-3xl shadow-xl flex items-center gap-6"
          >
            <div className="relative">
              <div className="h-3 w-3 bg-green-500 rounded-full animate-ping" />
              <div className="absolute inset-0 h-3 w-3 bg-green-500 rounded-full" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{t("statusLabel")}</div>
              <div className="text-xl font-bold text-gray-900 dark:text-white font-outfit">{t("status")}</div>
            </div>
          </motion.div>
        </div>

        {/* Main Content: Map Area focused on Surat */}
        <div className="relative w-full h-[400px] md:h-[550px] rounded-[3.5rem] overflow-hidden border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-[#080808]">
          
          <div className="absolute inset-0 opacity-40 dark:opacity-50">
            <Image
              src="/global_map_new.png"
              alt="Global Map"
              fill
              sizes="100vw"
              className="object-cover grayscale dark:grayscale-0 dark:sepia dark:hue-rotate-[180deg] dark:brightness-110"
            />
          </div>

          <div className="absolute inset-0 pointer-events-none hidden dark:block">
            <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-blue-600/20 blur-[150px]" />
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px]" />
          </div>

          <motion.div
            animate={{ left: ["-10%", "110%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-blue-500 to-transparent shadow-[0_0_20px_#3b82f6] z-10 opacity-30"
          />

          {/* Surat Marker Only */}
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: "44%", left: "68%" }}
          >
            <div className="relative group">
              <motion.div 
                animate={{ scale: [1, 3], opacity: [0.8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-blue-500"
              />
              <div className="h-5 w-5 bg-blue-600 rounded-full border-2 border-white shadow-xl relative z-10" />
            </div>
          </div>

          {/* Hub Detail Card - Fixed on Surat */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-10 left-10 w-80 md:w-96 z-20"
          >
            <div className="glass p-8 rounded-[2.5rem] border border-blue-500/20 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-10">
                <Target className="h-16 w-16 text-blue-600" />
              </div>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                  {t("hq")}
                </span>
              </div>
              
              <h3 className="text-4xl font-bold font-outfit text-gray-900 dark:text-white mb-2 leading-none">
                Surat, Gujarat
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-light leading-relaxed">
                {t("hqDesc")}
              </p>

              <div className="flex gap-4 mt-8">
                <div className="px-6 py-2 bg-blue-600 text-white rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/20">
                  {t("hq")}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Core Stats Overlay */}
          <div className="absolute top-10 right-10 hidden xl:flex flex-col gap-4 z-20">
            {hubs.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-4 min-w-[200px]"
              >
                <div className="p-2 bg-blue-600/10 rounded-lg text-blue-600">
                  <stat.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</div>
                  <div className="text-lg font-bold text-gray-900 dark:text-white font-outfit">{stat.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};
