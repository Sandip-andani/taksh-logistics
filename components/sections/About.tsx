"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, Globe, Award } from "lucide-react";

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      let frame = 0;
      const totalFrames = duration * 60;
      const timer = setInterval(() => {
        frame++;
        setCount(Math.floor(numericValue * (frame / totalFrames)));
        if (frame === totalFrames) clearInterval(timer);
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const About = () => {
  const t = useTranslations("Index.about");
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="py-24 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500">
      
      {/* Decorative Background Texture */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] pointer-events-none">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-repeat" />
      </div>

      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Editorial Content */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="h-[1px] w-12 bg-blue-600" />
                <span className="text-blue-600 font-bold tracking-[0.4em] uppercase text-[10px]">
                  Our Legacy & Future
                </span>
              </div>
              
              <h2 className="text-6xl md:text-8xl font-bold font-outfit tracking-tighter leading-[0.85] text-gray-900 dark:text-white mb-10">
                Pioneering <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">Logistics.</span>
              </h2>

              <p className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-xl italic border-l-2 border-blue-600/10 pl-8">
                {t("desc")}
              </p>

              {/* High-End Feature Grid */}
              <div className="grid grid-cols-2 gap-8">
                {[
                  { icon: ShieldCheck, label: "Reliability", value: "99.9%", desc: "Success Rate" },
                  { icon: Globe, label: "Network", value: "120+", desc: "Global Hubs" },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.2 }}
                    className="p-6 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-white/5 group hover:border-blue-500/20 transition-all"
                  >
                    <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white font-outfit">
                      <Counter value={item.value} />
                    </div>
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                      {item.label} — {item.desc}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Side: Immersive Visuals */}
          <div className="lg:col-span-6 relative">
            <motion.div
              style={{ y: imageY }}
              className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl group"
            >
              <Image
                src="/about_premium.png"
                alt="High-End Logistics Facility"
                fill
                className="object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Floating Achievement Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-10 -left-10 p-1 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-[3rem] shadow-2xl"
            >
              <div className="bg-white dark:bg-[#0a0a0a] backdrop-blur-2xl px-12 py-14 rounded-[2.9rem] flex flex-col items-center text-center">
                <div className="p-4 bg-blue-600/10 rounded-2xl text-blue-600 mb-6">
                  <Award className="h-8 w-8" />
                </div>
                <div className="text-7xl font-bold text-gray-900 dark:text-white font-outfit leading-none mb-2">15</div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.3em] leading-relaxed max-w-[120px]">
                  Years of Global Excellence
                </div>
              </div>
            </motion.div>

            {/* Subtle Decorative Elements */}
            <div className="absolute -top-12 -right-12 w-48 h-48 border border-blue-600/10 rounded-full animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-600/5 rounded-full blur-[100px]" />
          </div>

        </div>
      </div>
    </section>
  );
};
