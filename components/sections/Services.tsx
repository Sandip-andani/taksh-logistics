"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Package, Truck, Warehouse, ShieldCheck, ArrowRight } from "lucide-react";
import Image from "next/image";

export const Services = () => {
  const t = useTranslations("Index.services");

  const services = [
    {
      title: t("container"),
      icon: Package,
      desc: t("containerDesc"),
      size: "col-span-1 md:col-span-2",
      img: "/fleet_ship.png",
      color: "blue"
    },
    {
      title: t("freight"),
      icon: Truck,
      desc: t("freightDesc"),
      size: "col-span-1 md:col-span-1",
      img: "/fleet_truck.png",
      color: "indigo"
    },
    {
      title: t("warehousing"),
      icon: Warehouse,
      desc: t("warehouseDesc"),
      size: "col-span-1 md:col-span-1",
      img: "/fleet_warehouse.png",
      color: "cyan"
    },
    {
      title: t("fleet"),
      icon: ShieldCheck,
      desc: t("fleetDesc"),
      size: "col-span-1 md:col-span-2",
      img: "/fleet_van.png",
      color: "blue"
    },
  ];

  return (
    <section className="pt-24 pb-12 bg-gray-50 dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px]">
        
        {/* Header - Modular Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-12 bg-blue-600" />
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px]">
                {t("mainTag")}
              </span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-[0.9] text-gray-900 dark:text-white"
            >
              {t("mainTitle")} <br /> <span className="text-blue-600">{t("mainSubtitle")}</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-sm lg:mb-2 border-l border-gray-200 dark:border-white/10 pl-8"
          >
            {t("mainDesc")}
          </motion.p>
        </div>

        {/* Modular Bento Grid - Smaller Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`group relative h-[320px] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-gray-900 shadow-sm hover:shadow-2xl transition-all duration-500 ${service.size}`}
            >
              {/* Background Image Preview */}
              <div className="absolute top-0 right-0 w-1/2 h-full opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                <Image 
                  src={service.img} 
                  alt={service.title} 
                  fill 
                  className="object-cover grayscale"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-white dark:via-gray-900 to-white dark:to-gray-900" />
              </div>

              <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
                <div>
                  <div className="h-12 w-12 rounded-xl bg-blue-600/5 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <service.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-outfit mb-3 text-gray-900 dark:text-white tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed max-w-[200px]">
                    {service.desc}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                  <span>{t("learnMore")}</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Decorative Accent Glow */}
              <div className="absolute -bottom-10 -right-10 h-32 w-32 bg-blue-600/5 blur-[50px] rounded-full group-hover:bg-blue-600/10 transition-all" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
