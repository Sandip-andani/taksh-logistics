"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ShieldCheck, Globe, Award, Zap, ArrowRight } from "lucide-react";

/* ─── Animated counter ───────────────────────────────────────── */
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

/* ─── Main component ─────────────────────────────────────────── */
export const About = () => {
  const t = useTranslations("Index.about");
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const stats = [
    { icon: ShieldCheck, label: t("reliability"), value: "99.9%", desc: t("success") },
    { icon: Globe,       label: t("network"),     value: "120+",  desc: t("hubs")    },
    { icon: Zap,         label: "On-Time",        value: "98%",   desc: "Delivery Rate" },
  ];

  return (
    <section
      ref={containerRef}
      className="py-24 bg-white dark:bg-[#050505] relative overflow-hidden transition-colors duration-500"
    >
      {/* ── subtle background texture ── */}
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.06] pointer-events-none select-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgb(99,102,241)_1px,_transparent_0)] [background-size:40px_40px]" />
      </div>

      {/* ── ambient glow (dark mode only) ── */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-blue-600/5 dark:bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px] relative z-10">

        {/* ── Section header ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[2px] w-12 bg-blue-600" />
              <span className="text-blue-600 font-bold tracking-[0.3em] uppercase text-[10px]">
                {t("tag")}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-[0.9] text-gray-900 dark:text-white"
            >
              {t("title").split(".")[0]}{" "}
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                {t("title").split(".")[1]}.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400 text-lg md:text-xl font-light leading-relaxed max-w-sm lg:mb-2 border-l border-gray-200 dark:border-white/10 pl-8"
          >
            {t("desc")}
          </motion.p>
        </div>

        {/* ── Main content grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* ════ LEFT — Stats + CTA ════ */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 + i * 0.12 }}
                  className="group relative rounded-[2rem] border border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-gray-900/50 p-5 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-500/5 dark:bg-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="h-9 w-9 rounded-xl bg-blue-600/8 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 mb-3 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 dark:text-white font-outfit">
                    <Counter value={item.value} />
                  </div>
                  <div className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mt-1 leading-tight">
                    {item.label}<br />
                    <span className="text-gray-300 dark:text-gray-600">— {item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA link */}
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-bold tracking-widest uppercase group w-fit"
            >
              Our Full Story
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>
          </motion.div>

          {/* ════ RIGHT — Image card ════ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-7 relative"
          >
            {/* Main image card */}
            <div className="relative aspect-[16/10] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl dark:shadow-none group">
              <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                <Image
                  src="/about_premium.png"
                  alt="Premium Logistics Facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority
                />
              </motion.div>

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Live pill badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="absolute top-6 right-6 flex items-center gap-2 bg-black/30 dark:bg-black/40 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-white/80 text-[10px] font-bold tracking-widest uppercase">
                  Live Tracking Active
                </span>
              </motion.div>

              {/* Corner accent */}
              <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/20 rounded-tl-2xl" />
            </div>

            {/* Floating achievement card — outside the image, anchored below-left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55, type: "spring", stiffness: 120 }}
              className="absolute -bottom-6 -left-6 z-20"
            >
              <div className="p-[1px] rounded-[1.75rem] bg-gradient-to-br from-blue-500 to-indigo-600 shadow-2xl shadow-blue-500/20">
                <div className="bg-white dark:bg-[#0a0f1e] backdrop-blur-2xl px-7 py-7 rounded-[calc(1.75rem-1px)] flex flex-col items-center text-center">
                  <div className="p-2.5 bg-blue-600/10 rounded-xl text-blue-600 dark:text-blue-400 mb-3">
                    <Award className="h-5 w-5" />
                  </div>
                  <div className="text-5xl font-bold text-gray-900 dark:text-white font-outfit leading-none mb-1">
                    15
                  </div>
                  <div className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.28em] leading-relaxed max-w-[80px]">
                    {t("excellence")}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Decorative ring */}
            <div className="absolute -top-8 -right-8 w-32 h-32 border border-blue-600/10 rounded-full animate-pulse hidden lg:block" />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
