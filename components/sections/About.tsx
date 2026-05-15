"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import {
  ShieldCheck,
  Globe,
  Zap,
  Award,
  ArrowUpRight,
  TrendingUp,
  MapPin,
  Clock,
  ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   Animated Counter
───────────────────────────────────────────────────────────── */
const Counter = ({
  value,
  duration = 2.2,
}: {
  value: string;
  duration?: number;
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.replace(/[0-9.]/g, "");
  const decimals = (value.match(/\.\d+/) ?? [""])[0].length - 1;

  useEffect(() => {
    if (!isInView) return;
    let frame = 0;
    const totalFrames = Math.round(duration * 60);
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      const raw = numericValue * eased;
      setCount(parseFloat(raw.toFixed(Math.max(decimals, 0))));
      if (frame >= totalFrames) {
        setCount(numericValue);
        clearInterval(timer);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, numericValue, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

/* ─────────────────────────────────────────────────────────────
   Pulse Ring
───────────────────────────────────────────────────────────── */
const PulseRing = ({ className = "" }: { className?: string }) => (
  <span className={`relative flex h-3 w-3 ${className}`}>
    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
  </span>
);

/* ─────────────────────────────────────────────────────────────
   Main About Component
───────────────────────────────────────────────────────────── */
export const About = () => {
  const t = useTranslations("Index.about");
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.8]);

  const stats = [
    {
      icon: ShieldCheck,
      value: "99.9%",
      label: t("reliability"),
      sub: t("success"),
      color: "from-blue-500 to-blue-700",
      glow: "shadow-blue-500/20",
    },
    {
      icon: Globe,
      value: "120+",
      label: t("network"),
      sub: t("hubs"),
      color: "from-indigo-500 to-violet-700",
      glow: "shadow-indigo-500/20",
    },
    {
      icon: Zap,
      value: "98%",
      label: "On-Time",
      sub: "Delivery Rate",
      color: "from-cyan-500 to-blue-600",
      glow: "shadow-cyan-500/20",
    },
    {
      icon: TrendingUp,
      value: "15+",
      label: t("excellence"),
      sub: "Years of Trust",
      color: "from-violet-500 to-indigo-600",
      glow: "shadow-violet-500/20",
    },
  ];

  const milestones = [
    { year: "2009", label: "Founded", desc: "Started as a local transport provider" },
    { year: "2014", label: "Expansion", desc: "Launched international freight operations" },
    { year: "2018", label: "Technology", desc: "Integrated real-time GPS tracking platform" },
    { year: "2024", label: "Global", desc: "120+ hubs across 40+ countries" },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#f8fafc] dark:bg-[#04080f] py-14 md:py-20"
    >
      {/* ── Layered background ── */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 pointer-events-none select-none"
      >
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07] [background-image:linear-gradient(rgba(37,99,235,1)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,1)_1px,transparent_1px)] [background-size:60px_60px]" />

        {/* Radial glow blobs */}
        <div className="absolute top-0 right-1/4 w-[700px] h-[700px] bg-blue-600/5 dark:bg-blue-600/8 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 dark:bg-indigo-500/8 rounded-full blur-[120px]" />

        {/* Diagonal stripe accent */}
        <div className="absolute inset-0 opacity-[0.015] dark:opacity-[0.04] bg-[repeating-linear-gradient(-45deg,#2563eb,#2563eb_1px,transparent_1px,transparent_40px)]" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container mx-auto px-6 md:px-12 lg:px-20 xl:px-28 max-w-[1500px] relative z-10"
      >
        {/* ══════════════════════════════════════════════
            TOP BADGE + HEADLINE
        ══════════════════════════════════════════════ */}
        <div className="mb-10 md:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-600/5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400" />
              <span className="text-blue-700 dark:text-blue-400 text-[11px] font-bold tracking-[0.3em] uppercase">
                {t("tag")}
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h2 className="text-4xl sm:text-5xl md:text-5xl xl:text-6xl font-bold font-outfit tracking-tighter leading-[0.9] text-gray-900 dark:text-white">
                Pioneering
                <br />
                <span
                  className="relative inline-block text-transparent bg-clip-text"
                  style={{
                    backgroundImage:
                      "linear-gradient(135deg, #2563eb 0%, #6366f1 50%, #0ea5e9 100%)",
                  }}
                >
                  Logistics.
                  {/* Underline stroke */}
                  <span className="absolute -bottom-2 left-0 w-full h-[3px] rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 opacity-60" />
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="lg:mb-3"
            >
              <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base leading-relaxed mb-5 border-l-2 border-blue-500/40 pl-5">
                {t("desc")}
              </p>
              <a
                href="#"
                className="group inline-flex items-center gap-3 text-blue-600 dark:text-blue-400 font-bold text-sm tracking-[0.2em] uppercase hover:gap-4 transition-all duration-300"
              >
                Our Full Story
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600/10 dark:bg-blue-600/15 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════
            MAIN CONTENT — IMAGE + STATS SPLIT
        ══════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8 items-stretch mb-10">

          {/* ─── Left: Cinematic Image Column ─── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative"
            ref={imageRef}
          >
            {/* Main image frame */}
            <div className="relative h-[320px] md:h-[420px] rounded-3xl overflow-hidden border border-gray-200/80 dark:border-white/5 shadow-2xl shadow-gray-900/10 dark:shadow-black/40 group">
              <motion.div style={{ y: imageY }} className="absolute inset-0 scale-110">
                <Image
                  src="/about_premium.png"
                  alt="Taksh Logistics Premium Facility"
                  fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover transition-transform duration-[2s] group-hover:scale-105"
                  priority
                />
              </motion.div>

              {/* Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Corner bracket decorations */}
              <div className="absolute top-5 left-5 w-10 h-10 border-t-2 border-l-2 border-white/30 rounded-tl-xl" />
              <div className="absolute bottom-5 right-5 w-10 h-10 border-b-2 border-r-2 border-white/20 rounded-br-xl" />

              {/* Live badge */}
              <motion.div
                initial={{ opacity: 0, y: -12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                className="absolute top-5 right-5 flex items-center gap-2.5 bg-black/35 dark:bg-black/50 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2.5"
              >
                <PulseRing />
                <span className="text-white/85 text-[10px] font-bold tracking-[0.25em] uppercase">
                  Live Tracking Active
                </span>
              </motion.div>

              {/* Bottom caption bar */}
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <div>
                  <div className="text-white/50 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                    Primary Operations Hub
                  </div>
                  <div className="text-white font-bold text-sm font-outfit tracking-tight">
                    Taksh Logistics Center
                  </div>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-xs font-medium">
                  <MapPin className="w-3 h-3 text-blue-400" />
                  Global Operations
                </div>
              </div>
            </div>

            {/* ── Achievement float card ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, type: "spring", stiffness: 110, damping: 18 }}
              className="absolute -bottom-7 -right-5 z-20 hidden md:block"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 blur-lg opacity-40" />
                <div className="relative bg-white dark:bg-[#0a1020] border border-white/80 dark:border-white/10 rounded-2xl p-4 shadow-2xl min-w-[140px]">
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/30">
                      <Award className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest leading-tight">
                      Years of
                      <br />
                      Excellence
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white font-outfit leading-none">
                    15<span className="text-blue-600 dark:text-blue-400 text-2xl">+</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* ─── Right: Stats + Timeline ─── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col gap-4"
          >
            {/* Stats grid — 2x2 */}
            <div className="grid grid-cols-2 gap-4 flex-1">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  className={`group relative rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-white/3 p-4 cursor-default shadow-sm hover:shadow-xl ${stat.glow} hover:shadow-lg transition-all duration-300`}
                >
                  {/* Gradient bg on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`} />

                  {/* Icon */}
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <stat.icon className="w-4 h-4 text-white" size={16} />
                  </div>

                  {/* Number */}
                  <div className="text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white font-outfit leading-none mb-1">
                    <Counter value={stat.value} />
                  </div>

                  {/* Label */}
                  <div className="text-gray-600 dark:text-gray-400 font-semibold text-sm leading-tight">
                    {stat.label}
                  </div>
                  <div className="text-gray-400 dark:text-gray-600 text-xs mt-0.5">
                    {stat.sub}
                  </div>

                  {/* Corner accent line */}
                  <div className={`absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r ${stat.color} transition-all duration-500 rounded-b-2xl`} />
                </motion.div>
              ))}
            </div>

            {/* ── Operational status card ── */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.55 }}
              className="relative rounded-2xl overflow-hidden border border-gray-100 dark:border-white/5 bg-white dark:bg-white/3 p-5 shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 dark:from-blue-600/8 dark:to-indigo-600/8" />
              <div className="relative flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.25em] mb-1.5">
                    System Status
                  </div>
                  <div className="text-gray-900 dark:text-white font-bold text-sm">
                    All Systems Operational
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <PulseRing />
                    <span className="text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                      Live · 24/7 Active
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-500">
                    <Clock className="w-3 h-3" />
                    <span>Response &lt; 15 min</span>
                  </div>
                  <div className="text-xl font-bold font-outfit text-gray-900 dark:text-white">
                    99.9%
                    <span className="text-xs font-normal text-gray-400 dark:text-gray-500 ml-1">
                      uptime
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4 h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: "99.9%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, delay: 0.6, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-500"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* ══════════════════════════════════════════════
            TIMELINE ROW
        ══════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-10 relative"
        >
          {/* Section label */}
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-8 bg-blue-600/40" />
            <span className="text-[10px] font-bold tracking-[0.35em] text-blue-600 dark:text-blue-400 uppercase">
              Our Journey
            </span>
            <div className="flex-1 h-[1px] bg-gray-200 dark:bg-white/5" />
          </div>

          {/* Timeline track */}
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-0">
            {/* Connecting line */}
            <div className="absolute top-5 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent hidden md:block" />

            {milestones.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.12 }}
                className="relative flex flex-col items-start md:items-center md:text-center px-4 md:px-6 mb-8 md:mb-0 group"
              >
                {/* Year node */}
                <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white dark:bg-[#0a1020] border-2 border-blue-200 dark:border-blue-500/30 group-hover:border-blue-600 dark:group-hover:border-blue-400 group-hover:bg-blue-600 dark:group-hover:bg-blue-600 transition-all duration-300 mb-4 shadow-lg shadow-blue-500/5 z-10">
                  <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 group-hover:text-white transition-colors duration-300">
                    {i + 1}
                  </span>
                </div>

                <div className="text-blue-600 dark:text-blue-400 font-bold text-sm font-outfit mb-1">
                  {m.year}
                </div>
                <div className="text-gray-900 dark:text-white font-bold text-sm mb-1">
                  {m.label}
                </div>
                <div className="text-gray-500 dark:text-gray-500 text-xs leading-relaxed">
                  {m.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
};
