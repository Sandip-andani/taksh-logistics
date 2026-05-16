"use client";

import React, { useEffect, useRef } from "react";
import { motion, MotionValue } from "framer-motion";

interface Props {
  parallaxX?: MotionValue<number>;
  parallaxY?: MotionValue<number>;
}

/* Simplified world landmass paths (equirectangular projection, scaled 1440×720) */
const LAND_PATHS = [
  // North America
  "M 155 105 L 185 98 L 230 90 L 265 88 L 290 100 L 310 95 L 335 105 L 350 120 L 345 145 L 330 165 L 310 180 L 295 195 L 280 215 L 260 230 L 240 240 L 215 245 L 200 260 L 190 280 L 175 290 L 160 280 L 145 260 L 135 240 L 125 220 L 120 195 L 125 170 L 130 145 L 140 125 Z",
  // South America
  "M 220 290 L 245 285 L 268 295 L 278 315 L 275 340 L 265 365 L 255 390 L 248 420 L 240 440 L 230 455 L 218 445 L 208 425 L 200 400 L 195 375 L 198 350 L 205 325 L 215 305 Z",
  // Europe
  "M 620 80 L 650 75 L 675 78 L 695 88 L 705 100 L 698 115 L 680 120 L 660 125 L 640 118 L 625 105 Z",
  // Africa
  "M 620 135 L 655 128 L 685 130 L 705 145 L 715 165 L 718 190 L 712 215 L 700 240 L 685 260 L 665 280 L 648 295 L 630 290 L 615 275 L 605 255 L 600 230 L 598 205 L 600 180 L 605 158 Z",
  // Russia / Asia
  "M 720 68 L 780 58 L 860 52 L 940 55 L 1000 60 L 1060 65 L 1100 75 L 1120 90 L 1110 108 L 1080 115 L 1040 118 L 1000 115 L 960 118 L 930 125 L 900 120 L 860 115 L 820 110 L 780 105 L 745 98 L 725 88 Z",
  // Indian subcontinent
  "M 880 135 L 915 128 L 940 138 L 948 158 L 942 178 L 928 195 L 910 200 L 895 188 L 882 168 L 878 150 Z",
  // Southeast Asia
  "M 1000 140 L 1038 132 L 1068 138 L 1080 155 L 1075 172 L 1058 180 L 1038 175 L 1018 165 L 1005 152 Z",
  // Australia
  "M 1060 310 L 1110 298 L 1158 300 L 1190 315 L 1205 338 L 1200 362 L 1180 380 L 1155 390 L 1125 388 L 1098 375 L 1075 355 L 1060 335 Z",
  // Japan/Korea area
  "M 1120 98 L 1145 90 L 1168 92 L 1175 105 L 1162 118 L 1140 122 L 1122 112 Z",
  // UK/Ireland approx
  "M 590 82 L 608 78 L 618 86 L 614 98 L 598 102 L 585 95 Z",
];

/* Major shipping routes: [x1,y1, cx,cy, x2,y2] Bézier control points (1440×720 space) */
const ROUTES = [
  { d: "M 290 195 Q 450 160 620 150",      color: "#f97316", delay: 0,   dur: 5   },
  { d: "M 620 150 Q 750 138 880 155",       color: "#22d3ee", delay: 0.8, dur: 4.5 },
  { d: "M 880 155 Q 1010 148 1120 105",     color: "#a78bfa", delay: 1.5, dur: 5.5 },
  { d: "M 290 195 Q 370 300 620 280",       color: "#f97316", delay: 2,   dur: 6   },
  { d: "M 620 280 Q 750 300 1060 338",      color: "#4ade80", delay: 1,   dur: 5   },
  { d: "M 248 420 Q 500 380 620 280",       color: "#facc15", delay: 2.5, dur: 4.8 },
  { d: "M 1120 105 Q 1250 120 1350 150",    color: "#22d3ee", delay: 0.5, dur: 4   },
  { d: "M 620 150 Q 620 280 620 280",       color: "#e879f9", delay: 3,   dur: 3.5 },
];

/* Ports/hubs */
const HUBS = [
  { x: 290, y: 195, label: "New York",    color: "#f97316" },
  { x: 620, y: 150, label: "Rotterdam",   color: "#22d3ee" },
  { x: 880, y: 155, label: "Mumbai",      color: "#4ade80" },
  { x: 1120,y: 105, label: "Shanghai",    color: "#a78bfa" },
  { x: 1060,y: 338, label: "Sydney",      color: "#facc15" },
  { x: 248, y: 420, label: "Santos",      color: "#f97316" },
  { x: 620, y: 280, label: "Cape Town",   color: "#e879f9" },
  { x: 1350,y: 150, label: "Los Angeles", color: "#22d3ee" },
];

export const HeroWorldMap = ({ parallaxX, parallaxY }: Props) => {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <motion.div
      className="absolute inset-0"
      style={{
        x: parallaxX,
        y: parallaxY,
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1440 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Grid lines */}
        {[...Array(12)].map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 130} y1={0} x2={i * 130} y2={720}
            stroke="rgba(255,255,255,0.025)" strokeWidth="0.5"
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <line
            key={`h${i}`}
            x1={0} y1={i * 90} x2={1440} y2={i * 90}
            stroke="rgba(255,255,255,0.025)" strokeWidth="0.5"
          />
        ))}

        {/* Land masses */}
        {LAND_PATHS.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="rgba(255,255,255,0.045)"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.8"
          />
        ))}

        {/* Shipping routes – animated dash */}
        {ROUTES.map((r, i) => (
          <g key={i}>
            <path
              d={r.d}
              stroke={r.color}
              strokeWidth="1"
              strokeOpacity="0.15"
              fill="none"
            />
            <path
              d={r.d}
              stroke={r.color}
              strokeWidth="1.5"
              strokeOpacity="0.6"
              fill="none"
              strokeDasharray="6 14"
              style={{
                animation: `routeDash ${r.dur}s linear ${r.delay}s infinite`,
              }}
            />
          </g>
        ))}

        {/* Hub markers */}
        {HUBS.map((hub, i) => (
          <g key={i}>
            {/* Pulse ring */}
            <circle
              cx={hub.x} cy={hub.y} r="10"
              fill="none"
              stroke={hub.color}
              strokeOpacity="0.4"
              style={{ animation: `hubPulse 2.5s ease-out ${i * 0.3}s infinite` }}
            />
            <circle cx={hub.x} cy={hub.y} r="4" fill={hub.color} opacity="0.8" />
            <circle cx={hub.x} cy={hub.y} r="2" fill={hub.color} />
            {/* Label */}
            <text
              x={hub.x + 8} y={hub.y - 8}
              fill={hub.color}
              fontSize="8"
              fontWeight="600"
              opacity="0.7"
              fontFamily="monospace"
            >
              {hub.label}
            </text>
          </g>
        ))}

        {/* Animated ship dots travelling routes */}
        {ROUTES.slice(0, 5).map((r, i) => (
          <circle key={i} r="3" fill={r.color} opacity="0.9">
            <animateMotion
              dur={`${r.dur * 1.5}s`}
              begin={`${r.delay}s`}
              repeatCount="indefinite"
              path={r.d}
            />
          </circle>
        ))}

        <style>{`
          @keyframes routeDash {
            from { stroke-dashoffset: 0; }
            to   { stroke-dashoffset: -80; }
          }
          @keyframes hubPulse {
            0%   { r: 4; opacity: 0.8; }
            80%  { r: 16; opacity: 0; }
            100% { r: 4; opacity: 0; }
          }
        `}</style>
      </svg>
    </motion.div>
  );
};
