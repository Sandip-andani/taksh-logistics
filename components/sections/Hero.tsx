"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { MagneticButton } from "@/components/ui/InteractiveEffects";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { HeroWorldMap } from "@/components/ui/HeroWorldMap";
import { ContainerTruck } from "@/components/ui/ContainerTruck";
import { ChevronDown, MapPin, Zap, Shield, ArrowRight, Navigation } from "lucide-react";

/* ─── Shipping lines ─── */
const SHIPPING_LINES = [
  { name: "MSC",        color: "#FF6B35", bg: "#1a1a2e", accent: "#FF6B35" },
  { name: "MAERSK",     color: "#00A8E0", bg: "#00243D", accent: "#00A8E0" },
  { name: "CMA CGM",    color: "#E63946", bg: "#1D1B2E", accent: "#E63946" },
  { name: "HAPAG",      color: "#FF8C00", bg: "#1C2340", accent: "#FF8C00" },
  { name: "ONE LINE",   color: "#E91E8C", bg: "#1A0A2E", accent: "#E91E8C" },
];

/* ─── Floating status chips ─── */
const STATUS_CHIPS = [
  { icon: MapPin,    label: "JNPT → Dubai",    status: "In Transit",  color: "#f97316" },
  { icon: Navigation,label: "Chennai → Hamburg",status: "Departed",   color: "#22d3ee" },
  { icon: Shield,    label: "Nhava Sheva",      status: "Loading",     color: "#a78bfa" },
  { icon: Zap,       label: "Mundra Port",      status: "Arrived",     color: "#4ade80" },
];

/* ─── Parallax wrapper ─── */
const useParallax = () => {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const onMove = useCallback((e: React.MouseEvent) => {
    const { clientX, clientY, currentTarget } = e;
    const { width, height, left, top } = (currentTarget as HTMLElement).getBoundingClientRect();
    mx.set(((clientX - left) / width - 0.5) * 20);
    my.set(((clientY - top) / height - 0.5) * 20);
  }, [mx, my]);
  const onLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);
  return { sx, sy, onMove, onLeave };
};

export const Hero = () => {
  const [activeContainer, setActiveContainer] = useState(0);
  const { sx, sy, onMove, onLeave } = useParallax();
  const px = useTransform(sx, v => v * 0.3);
  const py = useTransform(sy, v => v * 0.3);

  /* Auto-rotate containers */
  useEffect(() => {
    const t = setInterval(() => setActiveContainer(p => (p + 1) % SHIPPING_LINES.length), 3500);
    return () => clearInterval(t);
  }, []);

  const line = SHIPPING_LINES[activeContainer];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-start overflow-hidden bg-[#020B18] pt-28 pb-0"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* ── Radial glow bg ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#020B18] via-[#041428] to-[#0a0f1e]" />
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-600/8 blur-[100px] pointer-events-none" />
      </div>

      {/* ── World map SVG ── */}
      <div className="absolute inset-0 z-[1] opacity-70">
        <HeroWorldMap parallaxX={sx} parallaxY={sy} />
      </div>

      {/* ── Particles ── */}
      <div className="absolute inset-0 z-[2]">
        <ParticleBackground count={50} />
      </div>

      {/* ── Road + Port Scene (bottom strip) ── */}
      <div className="absolute bottom-0 left-0 right-0 z-[3] pointer-events-none select-none" style={{ height: "220px" }}>
        {/* Road surface */}
        <div className="absolute bottom-0 left-0 right-0 h-[52px]" style={{ background: "linear-gradient(180deg, #0d1117 0%, #060a10 100%)" }}>
          {/* Road markings */}
          <svg viewBox="0 0 1440 52" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Centre dashes */}
            {[...Array(24)].map((_, i) => (
              <rect key={i} x={i * 62} y="24" width="36" height="4" rx="2" fill="rgba(249,115,22,0.25)"
                style={{ animation: `roadDash 1.8s linear ${-i * 0.075}s infinite` }} />
            ))}
            {/* Kerb lines */}
            <rect x="0" y="2" width="1440" height="2" rx="1" fill="rgba(255,255,255,0.06)" />
            <rect x="0" y="48" width="1440" height="2" rx="1" fill="rgba(255,255,255,0.04)" />
          </svg>
        </div>
        {/* Cranes & containers silhouette */}
        <svg viewBox="0 0 1440 170" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[52px] left-0 w-full">
          {/* Crane L */}
          <rect x="60" y="10" width="5" height="160" fill="rgba(255,255,255,0.055)" />
          <rect x="20" y="10" width="90" height="4" fill="rgba(255,255,255,0.055)" />
          <line x1="62" y1="14" x2="20" y2="70" stroke="rgba(255,255,255,0.035)" strokeWidth="1.5"/>
          <line x1="62" y1="14" x2="110" y2="70" stroke="rgba(255,255,255,0.035)" strokeWidth="1.5"/>
          {/* Crane R */}
          <rect x="1360" y="15" width="5" height="155" fill="rgba(255,255,255,0.055)" />
          <rect x="1320" y="15" width="90" height="4" fill="rgba(255,255,255,0.055)" />
          <line x1="1362" y1="19" x2="1320" y2="75" stroke="rgba(255,255,255,0.035)" strokeWidth="1.5"/>
          <line x1="1362" y1="19" x2="1410" y2="75" stroke="rgba(255,255,255,0.035)" strokeWidth="1.5"/>
          {/* Container stacks L */}
          <rect x="130" y="110" width="55" height="42" rx="2" fill="rgba(0,168,224,0.1)" stroke="rgba(0,168,224,0.2)" strokeWidth="1"/>
          <rect x="130" y="75" width="55" height="34" rx="2" fill="rgba(0,168,224,0.07)" stroke="rgba(0,168,224,0.12)" strokeWidth="1"/>
          <rect x="190" y="120" width="50" height="32" rx="2" fill="rgba(255,107,53,0.09)" stroke="rgba(255,107,53,0.15)" strokeWidth="1"/>
          {/* Container stacks R */}
          <rect x="1200" y="108" width="55" height="44" rx="2" fill="rgba(233,30,140,0.09)" stroke="rgba(233,30,140,0.15)" strokeWidth="1"/>
          <rect x="1200" y="74" width="55" height="33" rx="2" fill="rgba(233,30,140,0.06)" stroke="rgba(233,30,140,0.1)" strokeWidth="1"/>
          <rect x="1258" y="120" width="48" height="32" rx="2" fill="rgba(255,140,0,0.09)" stroke="rgba(255,140,0,0.14)" strokeWidth="1"/>
        </svg>
      </div>

      {/* ── Container Truck (on the road) ── */}
      <motion.div
        className="absolute z-[4] pointer-events-none"
        style={{ bottom: "52px", left: 0, x: px }}
      >
        <ContainerTruck activeContainer={activeContainer} shippingLine={line} />
      </motion.div>

      {/* ── Floating Status Chips ── */}
      {STATUS_CHIPS.map((chip, i) => (
        <motion.div
          key={i}
          className="absolute z-[6] hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border border-white/10 backdrop-blur-xl"
          style={{
            background: "rgba(2,11,24,0.7)",
            top:  i < 2 ? `${25 + i * 18}%` : undefined,
            bottom: i >= 2 ? `${30 + (i-2) * 15}%` : undefined,
            right: i % 2 === 0 ? "3%" : undefined,
            left:  i % 2 === 1 ? "3%" : undefined,
          }}
          initial={{ opacity: 0, x: i % 2 === 0 ? 30 : -30 }}
          animate={{ opacity: 1, x: 0, y: [0, -4, 0] }}
          transition={{ delay: 1 + i * 0.2, duration: 0.6, y: { duration: 3 + i, repeat: Infinity, ease: "easeInOut" } }}
        >
          <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: chip.color + "22" }}>
            <chip.icon className="w-3 h-3" style={{ color: chip.color }} />
          </div>
          <div>
            <p className="text-white/90 text-[10px] font-semibold leading-none">{chip.label}</p>
            <p className="text-[9px] font-bold mt-0.5" style={{ color: chip.color }}>{chip.status}</p>
          </div>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: chip.color }} />
        </motion.div>
      ))}

      {/* ── GPS dots ── */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute z-[5] w-1.5 h-1.5 rounded-full bg-orange-400/60 hidden md:block"
          style={{ top: `${20 + i * 13}%`, left: `${10 + i * 18}%` }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
          transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }}
        />
      ))}

      {/* ── Main content ── */}
      <div className="relative z-[7] container mx-auto px-4 md:px-8 flex flex-col items-center text-center max-w-6xl">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: "backOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-8"
        >
          <motion.span
            className="w-2 h-2 rounded-full bg-orange-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Global Container Transportation
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6 font-outfit"
        >
          Powering{" "}
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              Global Container
            </span>
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-transparent"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1, duration: 1 }}
              style={{ transformOrigin: "left", width: "100%" }}
            />
          </span>
          <br />Transportation
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-white/60 max-w-2xl mx-auto font-light leading-relaxed mb-10"
        >
          Trusted container transport solutions connecting ports, warehouses, and businesses
          across India with speed, safety, and reliability.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14"
        >
          <MagneticButton>
            <a
              href="/tracking"
              className="group inline-flex items-center gap-2 h-13 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold text-sm uppercase tracking-wider shadow-xl shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-105 transition-all duration-300"
            >
              <Navigation className="w-4 h-4" />
              Track Shipment
              <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </a>
          </MagneticButton>
          <MagneticButton>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 h-13 px-8 py-3.5 rounded-2xl border border-white/20 text-white font-bold text-sm uppercase tracking-wider backdrop-blur-xl hover:bg-white/10 hover:border-white/40 hover:scale-105 hover:shadow-lg hover:shadow-white/10 transition-all duration-300"
            >
              Get Freight Quote
            </a>
          </MagneticButton>
        </motion.div>

        {/* Container carousel tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-wrap justify-center gap-2 mb-2"
        >
          {SHIPPING_LINES.map((sl, i) => (
            <button
              key={sl.name}
              onClick={() => setActiveContainer(i)}
              className="px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all duration-300 border"
              style={{
                background: activeContainer === i ? sl.color + "22" : "rgba(255,255,255,0.04)",
                borderColor: activeContainer === i ? sl.color + "60" : "rgba(255,255,255,0.08)",
                color: activeContainer === i ? sl.color : "rgba(255,255,255,0.4)",
                boxShadow: activeContainer === i ? `0 0 20px ${sl.color}30` : "none",
              }}
            >
              {sl.name}
            </button>
          ))}
        </motion.div>
      </div>

      {/* bottom spacer so content clears the road strip */}
      <div className="mb-[240px]" />


      {/* ── Scroll cue ── */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[9] flex flex-col items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <span className="text-[9px] font-bold text-white/25 uppercase tracking-[0.35em]">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown className="w-4 h-4 text-white/25" />
        </motion.div>
      </motion.div>
    </section>
  );
};
