"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Zap, Box, TrendingUp, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import { ShimmerText } from "@/components/ui/AnimatedText";
import { MagneticButton } from "@/components/ui/InteractiveEffects";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

export const CTA = () => {
  const t = useTranslations("Index.cta");

  const floatingCards = [
    { icon: Box, label: "Active Containers", value: "12,402", color: "blue" },
    { icon: TrendingUp, label: "Success Rate", value: "99.9%", color: "indigo" },
    { icon: Users, label: "Global Clients", value: "2,500+", color: "emerald" },
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#030303] relative overflow-hidden transition-colors duration-500">

      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 dark:bg-blue-600/5 blur-[150px] rounded-full transition-colors duration-500" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[400px] h-[400px] bg-indigo-600/10 dark:bg-indigo-600/5 blur-[120px] rounded-full transition-colors duration-500" />
      </div>

      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px] relative z-10">

        <div className="relative overflow-hidden rounded-[3rem] md:rounded-[4rem] bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 dark:from-[#080808] dark:via-[#0c0c0c] dark:to-black border border-blue-500/20 dark:border-white/5 shadow-2xl transition-all duration-500">

          {/* Particle overlay inside CTA card */}
          <div className="absolute inset-0 z-0">
            <ParticleBackground count={25} />
          </div>

          {/* Mesh Background */}
          <div className="absolute inset-0 opacity-40 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-transparent" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-10" />

            {/* Animated Light Blobs */}
            <motion.div
              animate={{
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/4 w-80 h-80 bg-white/10 dark:bg-blue-500/10 blur-[100px] rounded-full"
            />
            <motion.div
              animate={{
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-1/4 w-60 h-60 bg-indigo-500/10 blur-[80px] rounded-full"
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 p-8 md:p-16 items-center">

            {/* Main Content */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-white/10 dark:bg-blue-600/10 border border-white/20 dark:border-blue-500/20 mb-8">
                  <Zap className="h-3.5 w-3.5 text-white dark:text-blue-500 animate-pulse" />
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/90 dark:text-blue-400">
                    {t("tag")}
                  </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold font-outfit tracking-tighter leading-[0.9] text-white mb-8">
                  <ShimmerText text={t("title").split("?")[0]} />
                  <span className="text-blue-200 dark:text-blue-600">?</span>
                </h2>

                <p className="text-blue-50/70 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-lg mb-10 border-l-2 border-white/20 dark:border-blue-600/30 pl-6">
                  {t("desc")}
                </p>

                <div className="flex flex-col sm:flex-row gap-6">
                  <MagneticButton>
                    <Button
                      size="lg"
                      className="h-14 px-8 text-base font-bold rounded-xl bg-white dark:bg-blue-600 text-blue-600 dark:text-white hover:bg-gray-100 dark:hover:bg-blue-700 shadow-xl shadow-black/10 dark:shadow-blue-600/20 transition-all hover:scale-105 active:scale-95 flex gap-3 group"
                    >
                      {t("button")}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.span>
                    </Button>
                  </MagneticButton>

                  <div className="flex items-center gap-6">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <motion.div
                          key={i}
                          whileHover={{ y: -4, zIndex: 10 }}
                          className="h-8 w-8 rounded-full border-2 border-blue-600 dark:border-[#080808] bg-gray-800 flex items-center justify-center overflow-hidden relative cursor-pointer"
                        >
                          <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" className="h-full w-full object-cover opacity-80" />
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-[9px] font-bold text-white/60 dark:text-gray-500 uppercase tracking-widest leading-tight">
                      Trusted by <br /> <span className="text-white">2,500+ Corporations</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Visual Elements: Floating Metrics */}
            <div className="lg:col-span-5 relative">
              <div className="grid gap-4">
                {floatingCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    whileHover={{ scale: 1.05, x: -5 }}
                    className="group p-5 rounded-[1.5rem] bg-white/10 dark:bg-white/[0.03] border border-white/20 dark:border-white/5 backdrop-blur-xl flex items-center gap-5 hover:bg-white/20 dark:hover:bg-white/[0.08] transition-all cursor-default"
                  >
                    <motion.div
                      whileHover={{ rotate: 15 }}
                      className={`h-11 w-11 rounded-xl bg-white/10 dark:bg-blue-600/10 flex items-center justify-center text-white dark:text-blue-500 group-hover:bg-white group-hover:text-blue-600 dark:group-hover:bg-blue-600 dark:group-hover:text-white transition-all duration-500 shadow-inner`}
                    >
                      <card.icon className="h-5 w-5" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="text-[9px] font-bold text-white/50 dark:text-gray-500 uppercase tracking-[0.2em] mb-0.5">{card.label}</div>
                      <div className="text-xl font-bold text-white font-outfit tracking-tight">{card.value}</div>
                      {/* Animated progress bar */}
                      <div className="mt-2 h-[2px] bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full"
                          initial={{ width: "0%" }}
                          whileInView={{ width: i === 0 ? "72%" : i === 1 ? "92%" : "65%" }}
                          transition={{ duration: 1.2, delay: i * 0.2, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Shield className="absolute -top-6 -right-6 h-48 w-48 text-white/5 dark:text-blue-600/5 -z-10 rotate-12" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
