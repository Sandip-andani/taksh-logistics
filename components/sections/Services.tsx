"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Package, Truck, Warehouse, ShieldCheck, ArrowUpRight } from "lucide-react";

export const Services = () => {
  const t = useTranslations("Index.services");

  const services = [
    {
      title: t("container"),
      icon: Package,
      desc: "Revolutionizing global trade with high-precision container management and real-time transit intelligence.",
      size: "lg",
      bg: "from-blue-600/20 to-blue-600/5",
    },
    {
      title: t("freight"),
      icon: Truck,
      desc: "Agile land and air solutions for time-sensitive cargo movement.",
      size: "md",
      bg: "from-indigo-600/20 to-indigo-600/5",
    },
    {
      title: t("warehousing"),
      icon: Warehouse,
      desc: "Smart, automated storage solutions for the modern supply chain.",
      size: "md",
      bg: "from-cyan-600/20 to-cyan-600/5",
    },
    {
      title: t("fleet"),
      icon: ShieldCheck,
      desc: "Uncompromising security and asset management for your entire logistics portfolio.",
      size: "lg",
      bg: "from-blue-500/20 to-blue-500/5",
    },
  ];

  return (
    <section className="py-32 bg-white dark:bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-blue-600 font-bold tracking-[0.3em] uppercase text-sm mb-4 block"
            >
              Excellence in Motion
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-tight dark:text-white"
            >
              Logistics Solutions <br /> Redefined.
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 text-lg max-w-sm mb-2"
          >
            We blend cutting-edge technology with decades of expertise to move your business forward.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`group relative p-10 rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 ${
                service.size === "lg" ? "md:col-span-3 h-[450px]" : "md:col-span-3 lg:col-span-3 h-[450px]"
              } ${i === 1 || i === 2 ? "lg:col-span-3" : "lg:col-span-3"}`}
              // Making them all 3 for a clean grid, or 4/2 for bento
            >
              {/* Dynamic Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.bg} opacity-50 group-hover:opacity-100 transition-opacity duration-700`} />
              <div className="absolute inset-0 bg-white/40 dark:bg-black/40 backdrop-blur-3xl" />
              
              <div className="relative z-10">
                <div className="h-16 w-16 rounded-2xl bg-white dark:bg-gray-800 shadow-xl flex items-center justify-center text-blue-600 mb-8 group-hover:rotate-12 transition-transform duration-500">
                  <service.icon className="h-8 w-8" />
                </div>
                <h3 className="text-3xl font-bold font-outfit mb-4 dark:text-white leading-tight">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed max-w-xs">
                  {service.desc}
                </p>
              </div>

              <div className="relative z-10 flex items-center justify-between">
                <div className="text-sm font-bold uppercase tracking-widest text-blue-600">
                  Service 0{i + 1}
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-600 text-white flex items-center justify-center scale-0 group-hover:scale-100 transition-transform duration-500">
                  <ArrowUpRight className="h-6 w-6" />
                </div>
              </div>

              {/* Decorative Accent */}
              <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-blue-600/10 blur-[60px] rounded-full group-hover:bg-blue-600/20 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
