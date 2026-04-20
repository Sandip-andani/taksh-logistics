"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Package, Ship, MapPin, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export const Process = () => {
  const t = useTranslations("Index.process");

  const steps = [
    {
      title: t("steps.0.title"),
      desc: t("steps.0.desc"),
      icon: Search,
      color: "from-blue-600 to-blue-400"
    },
    {
      title: t("steps.1.title"),
      desc: t("steps.1.desc"),
      icon: Package,
      color: "from-indigo-600 to-indigo-400"
    },
    {
      title: t("steps.2.title"),
      desc: t("steps.2.desc"),
      icon: Ship,
      color: "from-blue-500 to-indigo-500"
    },
    {
      title: t("steps.3.title"),
      desc: t("steps.3.desc"),
      icon: MapPin,
      color: "from-blue-700 to-blue-500"
    },
  ];

  return (
    <section className="py-32 bg-white dark:bg-[#030303] relative overflow-hidden transition-colors duration-500">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px] relative z-10">
        
        {/* Editorial Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-24 gap-12">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-[2px] w-10 bg-blue-600" />
              <span className="text-blue-600 font-bold tracking-[0.4em] uppercase text-[10px]">
                {t("subtitle")}
              </span>
            </motion.div>
            
            <h2 className="text-6xl md:text-8xl font-bold font-outfit text-gray-900 dark:text-white tracking-tighter leading-[0.85]">
              Optimized <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Workflow.</span>
            </h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-md border-l-2 border-blue-600/10 pl-8"
          >
            {t("desc")}
          </motion.p>
        </div>

        {/* Process Flow */}
        <div className="relative">
          
          {/* Animated Connector Path (SVG) */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] hidden xl:block -translate-y-1/2 opacity-20">
            <svg width="100%" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="0" y1="1" x2="100%" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="8 8" className="text-blue-600" />
            </svg>
            <motion.div 
              animate={{ left: ["0%", "100%"] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 w-40 h-full bg-gradient-to-r from-transparent via-blue-600 to-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group ${i % 2 !== 0 ? "xl:translate-y-12" : ""}`}
              >
                {/* Step Card */}
                <div className="relative z-10 h-full p-10 rounded-[3rem] bg-gray-50/50 dark:bg-white/[0.02] backdrop-blur-3xl border border-gray-100 dark:border-white/10 hover:border-blue-500/30 transition-all duration-500 flex flex-col items-center text-center group-hover:shadow-2xl group-hover:shadow-blue-500/5">
                  
                  {/* Icon with Animated Background */}
                  <div className="relative mb-10">
                    <motion.div 
                      whileHover={{ rotate: 90 }}
                      className={`h-24 w-24 rounded-3xl bg-gradient-to-br ${step.color} p-[1px] shadow-2xl shadow-blue-600/20`}
                    >
                      <div className="h-full w-full rounded-[1.4rem] bg-white dark:bg-gray-950 flex items-center justify-center text-blue-600 dark:text-blue-400">
                        <step.icon className="h-10 w-10" />
                      </div>
                    </motion.div>
                    
                    {/* Floating Number */}
                    <div className="absolute -top-4 -right-4 h-10 w-10 rounded-full bg-gray-900 dark:bg-white text-white dark:text-black font-bold font-outfit flex items-center justify-center text-sm shadow-xl border-4 border-white dark:border-gray-950">
                      {i + 1}
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold mb-4 font-outfit tracking-tight text-gray-900 dark:text-white">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-light leading-relaxed mb-8">
                    {step.desc}
                  </p>

                  <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Phase {i + 1} Details</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>

                  {/* Large Background Number Decor */}
                  <div className="absolute -bottom-4 -left-4 text-9xl font-black text-gray-900/[0.02] dark:text-white/[0.02] select-none pointer-events-none">
                    0{i + 1}
                  </div>
                </div>

                {/* Vertical Connector for Mobile */}
                {i < steps.length - 1 && (
                  <div className="h-12 w-[1px] bg-blue-600/20 mx-auto xl:hidden" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Global Progress Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 flex flex-wrap justify-center gap-12 border-t border-gray-100 dark:border-white/5 pt-16"
        >
          {[
            { label: "On-Time Dispatch", value: "99.8%" },
            { label: "Route Efficiency", value: "94.5%" },
            { label: "Real-time Tracking", value: "100%" },
          ].map((metric, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-3xl font-bold font-outfit text-gray-900 dark:text-white">{metric.value}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-2">{metric.label}</span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

