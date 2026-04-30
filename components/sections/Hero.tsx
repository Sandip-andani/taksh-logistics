"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Users, Headphones } from "lucide-react";

const Counter = ({ value, duration = 2 }: { value: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      const end = numericValue;
      const totalFrames = duration * 60;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        setCount(Math.floor(end * progress));
        if (frame === totalFrames) clearInterval(timer);
      }, 1000 / 60);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

export const Hero = () => {
  const t = useTranslations("Index.hero");
  const ts = useTranslations("Index.stats");
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slideCount = 3;

  const stats = [
    { label: ts("deliveries"), icon: Package, value: "10000+" },
    { label: ts("clients"), icon: Users, value: "500+" },
    { label: ts("support"), icon: Headphones, value: "24/7" },
  ];

  // Cycle text slides independently of the video
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  // Ensure video plays on mount (needed for some browsers)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-32 pb-20">

      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
        >
          {/* Primary: aerial container port with trucks */}
          <source
            src="https://cdn.pixabay.com/video/2019/05/12/23544-335833111_large.mp4"
            type="video/mp4"
          />
          {/* Fallback: bridge leading to container terminal */}
          <source
            src="https://cdn.pixabay.com/video/2019/05/01/23232-333604632_large.mp4"
            type="video/mp4"
          />
        </video>

        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Gradient: dark top → transparent middle → dark bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/80" />
        {/* Subtle blue cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/30 via-transparent to-blue-950/30" />
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <div className="max-w-[90vw] md:max-w-6xl mx-auto">

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-block px-4 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-8">
                Global Logistics Excellence
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight font-outfit mb-6 text-white leading-tight sm:whitespace-nowrap">
                {t(`slides.${currentSlide}.headline`)}
              </h1>
              <p className="text-base md:text-lg text-white/70 mb-20 max-w-2xl mx-auto font-light leading-relaxed">
                {t(`slides.${currentSlide}.subtext`)}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button
              size="lg"
              className="h-12 px-8 text-sm rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-600/30 font-bold uppercase tracking-wider"
            >
              {t("ctaQuote")}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-sm rounded-xl border-white/20 text-white backdrop-blur-xl hover:bg-white hover:text-black transition-all font-bold uppercase tracking-wider"
            >
              {t("ctaTrack")}
            </Button>
          </div>

          {/* Text slide dots */}
          <div className="flex justify-center gap-3 mb-12">
            {Array.from({ length: slideCount }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`transition-all duration-500 rounded-full ${
                  currentSlide === i
                    ? "w-8 h-2 bg-blue-500"
                    : "w-2 h-2 bg-white/25 hover:bg-white/50"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Premium Stats Box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-grid grid-cols-1 sm:grid-cols-3 gap-12 md:gap-20 p-8 md:p-12 rounded-[2.5rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl shadow-blue-500/5"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center text-center px-4"
              >
                <div className="text-4xl md:text-5xl font-bold text-white font-outfit mb-2 flex justify-center">
                  {stat.label === ts("support") ? stat.value : <Counter value={stat.value} />}
                </div>
                <div className="text-[10px] text-white/40 uppercase tracking-[0.2em] font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
