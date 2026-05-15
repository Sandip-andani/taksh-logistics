"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings2, Type, Palette, Zap, LayoutDashboard, BookOpen, RotateCcw, X, Check,
} from "lucide-react";

/* ── Types ────────────────────────────────────────────────── */
type FontSize = "normal" | "large" | "xlarge";

interface AccentColor {
  id: string;
  label: string;
  swatch: string; // for display only
  /* Full shade palette — overrides --color-blue-* vars */
  shades: Record<string, string>;
}

/* ── Color Palettes ───────────────────────────────────────── */
const ACCENT_COLORS: AccentColor[] = [
  {
    id: "blue", label: "Ocean Blue", swatch: "#2563eb",
    shades: {
      "50": "#eff6ff", "100": "#dbeafe", "200": "#bfdbfe", "300": "#93c5fd",
      "400": "#60a5fa", "500": "#3b82f6", "600": "#2563eb", "700": "#1d4ed8",
      "800": "#1e40af", "900": "#1e3a8a", "950": "#172554",
    },
  },
  {
    id: "indigo", label: "Deep Indigo", swatch: "#4f46e5",
    shades: {
      "50": "#eef2ff", "100": "#e0e7ff", "200": "#c7d2fe", "300": "#a5b4fc",
      "400": "#818cf8", "500": "#6366f1", "600": "#4f46e5", "700": "#4338ca",
      "800": "#3730a3", "900": "#312e81", "950": "#1e1b4b",
    },
  },
  {
    id: "violet", label: "Royal Violet", swatch: "#7c3aed",
    shades: {
      "50": "#f5f3ff", "100": "#ede9fe", "200": "#ddd6fe", "300": "#c4b5fd",
      "400": "#a78bfa", "500": "#8b5cf6", "600": "#7c3aed", "700": "#6d28d9",
      "800": "#5b21b6", "900": "#4c1d95", "950": "#2e1065",
    },
  },
  {
    id: "rose", label: "Premium Rose", swatch: "#e11d48",
    shades: {
      "50": "#fff1f2", "100": "#ffe4e6", "200": "#fecdd3", "300": "#fda4af",
      "400": "#fb7185", "500": "#f43f5e", "600": "#e11d48", "700": "#be123c",
      "800": "#9f1239", "900": "#881337", "950": "#4c0519",
    },
  },
  {
    id: "amber", label: "Golden Amber", swatch: "#d97706",
    shades: {
      "50": "#fffbeb", "100": "#fef3c7", "200": "#fde68a", "300": "#fcd34d",
      "400": "#fbbf24", "500": "#f59e0b", "600": "#d97706", "700": "#b45309",
      "800": "#92400e", "900": "#78350f", "950": "#451a03",
    },
  },
  {
    id: "emerald", label: "Forest Green", swatch: "#059669",
    shades: {
      "50": "#ecfdf5", "100": "#d1fae5", "200": "#a7f3d0", "300": "#6ee7b7",
      "400": "#34d399", "500": "#10b981", "600": "#059669", "700": "#047857",
      "800": "#065f46", "900": "#064e3b", "950": "#022c22",
    },
  },
  {
    id: "cyan", label: "Arctic Cyan", swatch: "#0891b2",
    shades: {
      "50": "#ecfeff", "100": "#cffafe", "200": "#a5f3fc", "300": "#67e8f9",
      "400": "#22d3ee", "500": "#06b6d4", "600": "#0891b2", "700": "#0e7490",
      "800": "#155e75", "900": "#164e63", "950": "#083344",
    },
  },
  {
    id: "slate", label: "Slate Steel", swatch: "#475569",
    shades: {
      "50": "#f8fafc", "100": "#f1f5f9", "200": "#e2e8f0", "300": "#cbd5e1",
      "400": "#94a3b8", "500": "#64748b", "600": "#475569", "700": "#334155",
      "800": "#1e293b", "900": "#0f172a", "950": "#020617",
    },
  },
];

const FONT_SIZES: { key: FontSize; label: string; scale: string }[] = [
  { key: "normal", label: "A",   scale: "100%" },
  { key: "large",  label: "A+",  scale: "112%" },
  { key: "xlarge", label: "A++", scale: "125%" },
];

/* ── Apply helpers ────────────────────────────────────────── */
function applyAccent(color: AccentColor) {
  const root = document.documentElement;
  /* Override every --color-blue-* so ALL Tailwind blue-* classes change */
  Object.entries(color.shades).forEach(([shade, hex]) => {
    root.style.setProperty(`--color-blue-${shade}`, hex);
  });
  /* Also patch the semantic --primary var */
  root.style.setProperty("--primary", color.shades["600"]);
  root.style.setProperty("--ring",    color.shades["600"]);
  root.setAttribute("data-accent", color.id);
}

function applyFontSize(size: FontSize) {
  const scale = FONT_SIZES.find(f => f.key === size)?.scale ?? "100%";
  document.documentElement.style.fontSize = scale;
  document.documentElement.setAttribute("data-font-size", size);
}

function resetAccent() {
  const root = document.documentElement;
  const shades = ["50","100","200","300","400","500","600","700","800","900","950"];
  shades.forEach(s => root.style.removeProperty(`--color-blue-${s}`));
  root.style.removeProperty("--primary");
  root.style.removeProperty("--ring");
  root.removeAttribute("data-accent");
}

/* ── Component ────────────────────────────────────────────── */
export const AccessibilityPanel = () => {
  const [open, setOpen]         = useState(false);
  const [fontSize, setFontSize]  = useState<FontSize>("normal");
  const [accent, setAccent]      = useState("blue");
  const [noMotion, setNoMotion]  = useState(false);
  const [compact, setCompact]    = useState(false);
  const [dyslexia, setDyslexia]  = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  /* Load persisted prefs on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tl-prefs");
      if (!raw) return;
      const p = JSON.parse(raw);
      if (p.fontSize)  { setFontSize(p.fontSize);  applyFontSize(p.fontSize); }
      if (p.accent) {
        setAccent(p.accent);
        const c = ACCENT_COLORS.find(x => x.id === p.accent);
        if (c) applyAccent(c);
      }
      if (p.noMotion)  { setNoMotion(true);  document.documentElement.setAttribute("data-no-motion","true"); }
      if (p.compact)   { setCompact(true);   document.documentElement.setAttribute("data-compact","true"); }
      if (p.dyslexia)  { setDyslexia(true);  document.documentElement.setAttribute("data-dyslexia","true"); }
    } catch {}
  }, []);

  function save(patch: Partial<{ fontSize: FontSize; accent: string; noMotion: boolean; compact: boolean; dyslexia: boolean }>) {
    const next = { fontSize, accent, noMotion, compact, dyslexia, ...patch };
    localStorage.setItem("tl-prefs", JSON.stringify(next));
  }

  /* Close on outside click */
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleFontSize = (s: FontSize) => { setFontSize(s); applyFontSize(s); save({ fontSize: s }); };
  const handleAccent   = (id: string)  => {
    setAccent(id);
    const c = ACCENT_COLORS.find(x => x.id === id)!;
    applyAccent(c);
    save({ accent: id });
  };
  const handleNoMotion = () => {
    const next = !noMotion;
    setNoMotion(next);
    document.documentElement.setAttribute("data-no-motion", next ? "true" : "");
    save({ noMotion: next });
  };
  const handleCompact = () => {
    const next = !compact;
    setCompact(next);
    document.documentElement.setAttribute("data-compact", next ? "true" : "");
    save({ compact: next });
  };
  const handleDyslexia = () => {
    const next = !dyslexia;
    setDyslexia(next);
    document.documentElement.setAttribute("data-dyslexia", next ? "true" : "");
    save({ dyslexia: next });
  };
  const handleReset = () => {
    setFontSize("normal"); setAccent("blue"); setNoMotion(false); setCompact(false); setDyslexia(false);
    document.documentElement.style.fontSize = "";
    document.documentElement.removeAttribute("data-font-size");
    document.documentElement.removeAttribute("data-no-motion");
    document.documentElement.removeAttribute("data-compact");
    document.documentElement.removeAttribute("data-dyslexia");
    resetAccent();
    localStorage.removeItem("tl-prefs");
  };

  const activeColor = ACCENT_COLORS.find(c => c.id === accent) ?? ACCENT_COLORS[0];
  const isChanged   = fontSize !== "normal" || accent !== "blue" || noMotion || compact || dyslexia;

  return (
    /* Outer wrapper — right edge, vertically centred, z-top */
    <div
      ref={panelRef}
      className="fixed right-0 top-1/2 -translate-y-1/2 z-[999] flex items-center select-none"
    >

      {/* ── Trigger Tab ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ x: -4 }}
        whileTap={{ scale: 0.95 }}
        style={{ background: activeColor.swatch }}
        className="relative flex flex-col items-center justify-center gap-1 text-white w-8 sm:w-9 rounded-l-2xl py-4 sm:py-5 shadow-2xl transition-colors duration-300"
        aria-label="Open accessibility panel"
      >
        <Settings2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        <span className="hidden sm:block text-[7px] font-black tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 mt-1 opacity-80">
          A11Y
        </span>
        {isChanged && (
          <motion.span
            initial={{ scale: 0 }} animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-amber-400 rounded-full border-2 border-white"
          />
        )}
      </motion.button>

      {/* ── Slide-out Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "110%", opacity: 0 }}
            animate={{ x: 0,      opacity: 1 }}
            exit={{ x: "110%",   opacity: 0 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="
              absolute right-8 sm:right-9
              /* Vertical positioning: keep within viewport */
              top-1/2 -translate-y-1/2
              /* Width: fluid on xs, fixed on sm+ */
              w-[calc(100vw-4rem)] max-w-[300px] sm:w-[288px]
              /* Max height + flex column so content scrolls */
              max-h-[85vh]
              flex flex-col
              rounded-2xl overflow-hidden
              shadow-2xl shadow-black/25
              border border-gray-100 dark:border-white/10
              bg-white dark:bg-[#0d1117]
            "
          >
            {/* Panel header — fixed, never scrolls */}
            <div
              className="flex-shrink-0 px-4 sm:px-5 py-3.5 flex items-center justify-between transition-colors duration-300"
              style={{ background: activeColor.swatch }}
            >
              <div>
                <p className="text-white font-bold text-sm font-outfit tracking-tight">Accessibility</p>
                <p className="text-white/70 text-[9px] tracking-[0.25em] uppercase">Customization Panel</p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/35 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-3.5 h-3.5 text-white" />
              </button>
            </div>

            {/* Scrollable content area */}
            <div
              className="flex-1 overflow-y-auto p-4 space-y-4 [scrollbar-width:thin] [scrollbar-color:rgba(156,163,175,0.3)_transparent] [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300/50 dark:[&::-webkit-scrollbar-thumb]:bg-white/10"
            >

              {/* TEXT SIZE */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Type className="w-3 h-3 text-gray-400" />
                  <span className="text-[9px] font-bold tracking-[0.25em] text-gray-400 dark:text-gray-500 uppercase">Text Size</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {FONT_SIZES.map(f => {
                    const active = fontSize === f.key;
                    return (
                      <button
                        key={f.key}
                        onClick={() => handleFontSize(f.key)}
                        style={active ? { background: activeColor.swatch, borderColor: activeColor.swatch } : {}}
                        className={`relative flex flex-col items-center justify-center py-3 rounded-xl border-2 transition-all duration-200 font-outfit font-black ${
                          active
                            ? "text-white shadow-lg"
                            : "border-gray-100 dark:border-white/10 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/3 hover:border-gray-300 dark:hover:border-white/20"
                        }`}
                      >
                        <span className={`leading-none ${f.key === "normal" ? "text-lg" : f.key === "large" ? "text-xl" : "text-2xl"}`}>
                          {f.label}
                        </span>
                        <span className="text-[8px] font-semibold opacity-60 mt-0.5">{f.scale}</span>
                        {active && <Check className="absolute top-1.5 right-1.5 w-2.5 h-2.5 text-white/80" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ACCENT COLOR */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Palette className="w-3 h-3 text-gray-400" />
                  <span className="text-[9px] font-bold tracking-[0.25em] text-gray-400 dark:text-gray-500 uppercase">Accent Color</span>
                </div>
                <div className="grid grid-cols-4 gap-2.5">
                  {ACCENT_COLORS.map(c => {
                    const active = accent === c.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => handleAccent(c.id)}
                        title={c.label}
                        className="flex flex-col items-center gap-1 group"
                      >
                        <div
                          style={{ background: c.swatch }}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-md transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg ${
                            active ? "ring-2 ring-offset-2 ring-gray-800 dark:ring-white scale-110" : ""
                          }`}
                        >
                          {active && <Check className="w-4 h-4 text-white drop-shadow" />}
                        </div>
                        <span className="text-[8px] text-gray-400 dark:text-gray-500 font-medium text-center leading-tight">
                          {c.label.split(" ")[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* DISPLAY OPTIONS */}
              <div>
                <div className="flex items-center gap-1.5 mb-2.5">
                  <Zap className="w-3 h-3 text-gray-400" />
                  <span className="text-[9px] font-bold tracking-[0.25em] text-gray-400 dark:text-gray-500 uppercase">Display Options</span>
                </div>
                <div className="space-y-2">
                  {[
                    {
                      on: noMotion, toggle: handleNoMotion, icon: Zap,
                      title: "Pause Animations",
                      sub: "Freeze all motion effects",
                      badge: "Motion",
                    },
                    {
                      on: compact, toggle: handleCompact, icon: LayoutDashboard,
                      title: "Compact Mode",
                      sub: "Denser, tighter layout",
                      badge: "Layout",
                    },
                    {
                      on: dyslexia, toggle: handleDyslexia, icon: BookOpen,
                      title: "Dyslexia Font",
                      sub: "High-readability typeface",
                      badge: "Font",
                    },
                  ].map(({ on, toggle, icon: Icon, title, sub, badge }) => (
                    <button
                      key={title}
                      onClick={toggle}
                      style={on ? { background: activeColor.swatch, borderColor: activeColor.swatch } : {}}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border-2 transition-all duration-200 ${
                        on
                          ? "text-white shadow-md"
                          : "border-gray-100 dark:border-white/10 bg-gray-50 dark:bg-white/3 text-gray-600 dark:text-gray-400 hover:border-gray-300 dark:hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                          on ? "bg-white/20" : "bg-gray-100 dark:bg-white/5"
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="text-left">
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold">{title}</span>
                            <span className={`text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full ${
                              on ? "bg-white/20 text-white" : "bg-gray-200 dark:bg-white/10 text-gray-400"
                            }`}>{badge}</span>
                          </div>
                          <div className="text-[9px] opacity-60 mt-0.5">{sub}</div>
                        </div>
                      </div>
                      {/* Pill toggle */}
                      <div className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors duration-300 shrink-0 ${
                        on ? "bg-white/25" : "bg-gray-200 dark:bg-white/10"
                      }`}>
                        <motion.div
                          animate={{ x: on ? 16 : 0 }}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                          className={`w-4 h-4 rounded-full shadow ${on ? "bg-white" : "bg-gray-400 dark:bg-white/40"}`}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* RESET */}
              <button
                onClick={handleReset}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-100 dark:border-white/10 text-gray-400 dark:text-gray-500 hover:text-red-500 hover:border-red-200 dark:hover:border-red-500/30 text-[10px] font-bold uppercase tracking-widest transition-all duration-200 hover:bg-red-50 dark:hover:bg-red-500/5"
              >
                <RotateCcw className="w-3 h-3" />
                Reset All
              </button>
            </div>{/* end scrollable content */}

            {/* Footer — fixed, never scrolls */}
            <div className="flex-shrink-0 px-5 py-3 border-t border-gray-100 dark:border-white/5 text-center bg-white dark:bg-[#0d1117]">
              <p className="text-[9px] text-gray-300 dark:text-gray-600">Preferences saved to your browser</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
