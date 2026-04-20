"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Package, Ship, MapPin } from "lucide-react";

export const Process = () => {
  const steps = [
    {
      title: "Strategy & Planning",
      desc: "Custom logistics roadmap tailored to your specific trade requirements.",
      icon: Search,
    },
    {
      title: "Consolidation",
      desc: "Expert handling and safe loading of your premium container cargo.",
      icon: Package,
    },
    {
      title: "Global Transit",
      desc: "Optimized sea and land routes with 24/7 real-time GPS monitoring.",
      icon: Ship,
    },
    {
      title: "Final Delivery",
      desc: "Last-mile excellence ensuring your goods reach the destination safely.",
      icon: MapPin,
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-[#050505] relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-6 dark:text-white">Our Seamless Process</h2>
          <p className="text-gray-500 text-lg">We've refined the complexities of global logistics into a transparent, four-step journey that guarantees safety and speed.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-24 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-600/20 to-transparent" />
          
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative z-10 group"
            >
              <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 dark:border-gray-800 text-center">
                <div className="h-16 w-16 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-blue-600/20">
                  <step.icon className="h-8 w-8" />
                </div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Step 0{i + 1}</div>
                <h3 className="text-xl font-bold mb-3 font-outfit dark:text-white">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
