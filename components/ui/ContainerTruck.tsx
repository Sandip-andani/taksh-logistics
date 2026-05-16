"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShippingLine {
  name: string;
  color: string;
  bg: string;
  accent: string;
}

interface Props {
  activeContainer: number;
  shippingLine: ShippingLine;
}

/* Container body with branded shipping line livery */
const ContainerBox = ({ line }: { line: ShippingLine }) => (
  <g>
    {/* Main container body */}
    <rect x="30" y="8" width="280" height="110" rx="4" fill={line.bg} stroke={line.color} strokeWidth="1.5" />
    {/* Side panels (ribbed effect) */}
    {[60, 100, 140, 180, 220, 260].map(x => (
      <line key={x} x1={x} y1="10" x2={x} y2="116" stroke={line.color} strokeWidth="0.5" strokeOpacity="0.3" />
    ))}
    {/* Top rail */}
    <rect x="30" y="8" width="280" height="8" rx="2" fill={line.color} opacity="0.4" />
    {/* Bottom rail */}
    <rect x="30" y="110" width="280" height="8" rx="2" fill={line.color} opacity="0.4" />
    {/* Door lines on right */}
    <line x1="250" y1="10" x2="250" y2="116" stroke={line.color} strokeWidth="1.2" strokeOpacity="0.5" />
    <line x1="280" y1="10" x2="280" y2="116" stroke={line.color} strokeWidth="1.2" strokeOpacity="0.5" />
    {/* Door handles */}
    <rect x="258" y="55" width="6" height="18" rx="3" fill={line.color} opacity="0.6" />
    <rect x="270" y="55" width="6" height="18" rx="3" fill={line.color} opacity="0.6" />
    {/* Logo text */}
    <text x="130" y="68" fill={line.color} fontSize="24" fontWeight="900" fontFamily="Arial Black, sans-serif" textAnchor="middle" letterSpacing="3">
      {line.name}
    </text>
    {/* Glow overlay */}
    <rect x="30" y="8" width="280" height="110" rx="4" fill={line.color} opacity="0.03" />
    {/* Corner castings */}
    {[[30,8],[308,8],[30,110],[308,110]].map(([cx,cy],i) => (
      <rect key={i} x={cx-4} y={cy-4} width="10" height="10" rx="1" fill={line.accent} opacity="0.7" />
    ))}
  </g>
);

export const ContainerTruck = ({ activeContainer, shippingLine }: Props) => {
  return (
    <motion.div
      className="relative w-full overflow-visible"
      animate={{ x: ["-10%", "110%"] }}
      transition={{ duration: 45, ease: "linear", repeat: Infinity, repeatDelay: 2 }}
    >
      <svg
        width="460"
        height="180"
        viewBox="0 0 460 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-2xl"
        style={{ filter: "drop-shadow(0 8px 32px rgba(249,115,22,0.18))" }}
      >
        {/* ── Container ── */}
        <AnimatePresence mode="wait">
          <motion.g
            key={activeContainer}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.5 }}
          >
            <ContainerBox line={shippingLine} />
          </motion.g>
        </AnimatePresence>

        {/* ── Chassis / flatbed ── */}
        <rect x="10" y="118" width="400" height="14" rx="3" fill="#1a2035" stroke="#2a3555" strokeWidth="1" />
        {/* Chassis cross-beams */}
        {[50,120,200,280,360].map(x => (
          <rect key={x} x={x} y="118" width="8" height="14" fill="#243050" />
        ))}

        {/* ── Truck cab ── */}
        <g>
          {/* Cab body */}
          <rect x="340" y="68" width="105" height="64" rx="8" fill="#1a2540" stroke="#2d3f6a" strokeWidth="1.5" />
          {/* Windshield */}
          <rect x="348" y="74" width="58" height="36" rx="5" fill="#0d1f3c" stroke="#3b82f6" strokeWidth="1" opacity="0.9" />
          {/* Windshield glare */}
          <line x1="352" y1="76" x2="368" y2="108" stroke="rgba(255,255,255,0.1)" strokeWidth="8" strokeLinecap="round" />
          {/* Cab roof */}
          <rect x="355" y="55" width="85" height="16" rx="4" fill="#243050" stroke="#2d3f6a" strokeWidth="1" />
          {/* Roof exhaust stack */}
          <rect x="430" y="35" width="7" height="22" rx="3" fill="#1a2540" stroke="#2d3f6a" strokeWidth="1" />
          <ellipse cx="433" cy="35" rx="5" ry="3" fill="#374151" />
          {/* Exhaust smoke animation hint */}
          <circle cx="433" cy="28" r="3" fill="#4b5563" opacity="0.5" />
          {/* Side steps */}
          <rect x="390" y="130" width="28" height="6" rx="2" fill="#243050" />
          {/* Side mirror */}
          <rect x="440" y="80" width="14" height="8" rx="2" fill="#1a2540" stroke="#2d3f6a" strokeWidth="1" />
          {/* Cab door line */}
          <line x1="400" y1="74" x2="400" y2="130" stroke="#2d3f6a" strokeWidth="1" strokeOpacity="0.6" />
          {/* Door handle */}
          <rect x="402" y="102" width="12" height="4" rx="2" fill="#3b82f6" opacity="0.6" />
          {/* Headlights */}
          <rect x="440" y="95" width="12" height="8" rx="2" fill="#facc15" opacity="0.9" />
          <rect x="440" y="108" width="12" height="5" rx="1" fill="#f97316" opacity="0.8" />
          {/* Grille */}
          <rect x="440" y="75" width="14" height="18" rx="2" fill="#111827" stroke="#374151" strokeWidth="1" />
          {[78,82,86,90].map(y => (
            <line key={y} x1="441" y1={y} x2="453" y2={y} stroke="#374151" strokeWidth="0.8" />
          ))}
          {/* Bumper */}
          <rect x="438" y="124" width="18" height="8" rx="2" fill="#1f2d4a" stroke="#2d3f6a" strokeWidth="1" />
          {/* Brand badge */}
          <text x="375" y="146" fill="#f97316" fontSize="6" fontWeight="700" fontFamily="monospace" textAnchor="middle">ASHOK LEYLAND</text>
        </g>

        {/* ── Wheels ── */}
        {/* Rear dual wheels */}
        <g>
          {/* Rear axle group */}
          <circle cx="80"  cy="146" r="22" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <circle cx="80"  cy="146" r="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <circle cx="80"  cy="146" r="6"  fill="#0f172a" stroke="#475569" strokeWidth="1" />
          {/* Spokes */}
          {[0,60,120,180,240,300].map(a => (
            <line key={a} x1={80} y1={146}
              x2={+(80 + 13 * Math.cos(a * Math.PI/180)).toFixed(4)}
              y2={+(146 + 13 * Math.sin(a * Math.PI/180)).toFixed(4)}
              stroke="#475569" strokeWidth="1.2" />
          ))}

          <circle cx="130" cy="146" r="22" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <circle cx="130" cy="146" r="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <circle cx="130" cy="146" r="6"  fill="#0f172a" stroke="#475569" strokeWidth="1" />
          {[0,60,120,180,240,300].map(a => (
            <line key={a} x1={130} y1={146}
              x2={+(130 + 13 * Math.cos(a * Math.PI/180)).toFixed(4)}
              y2={+(146 + 13 * Math.sin(a * Math.PI/180)).toFixed(4)}
              stroke="#475569" strokeWidth="1.2" />
          ))}
        </g>

        {/* Cab front wheel */}
        <g>
          <circle cx="390" cy="146" r="22" fill="#0f172a" stroke="#1e293b" strokeWidth="2" />
          <circle cx="390" cy="146" r="14" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
          <circle cx="390" cy="146" r="6"  fill="#0f172a" stroke="#475569" strokeWidth="1" />
          {[0,60,120,180,240,300].map(a => (
            <line key={a} x1={390} y1={146}
              x2={+(390 + 13 * Math.cos(a * Math.PI/180)).toFixed(4)}
              y2={+(146 + 13 * Math.sin(a * Math.PI/180)).toFixed(4)}
              stroke="#475569" strokeWidth="1.2" />
          ))}
        </g>

        {/* Ground shadow */}
        <ellipse cx="230" cy="172" rx="220" ry="8" fill="rgba(0,0,0,0.25)" />

        {/* Motion blur streaks under chassis */}
        {[1,2,3,4,5].map(i => (
          <line key={i}
            x1={0} y1={160 + i * 2}
            x2={30 + i * 8} y2={160 + i * 2}
            stroke="rgba(249,115,22,0.06)" strokeWidth="1.5" />
        ))}
      </svg>
    </motion.div>
  );
};
