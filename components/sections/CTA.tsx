"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

export const CTA = () => {
  const t = useTranslations("Index.cta");

  return (
    <section className="py-24 bg-white dark:bg-[#080808] relative overflow-hidden">
      {/* Boxed Layout Wrapper */}
      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px] relative z-10">
        
        <div className="relative overflow-hidden rounded-[4rem] p-12 md:p-24 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-800 shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
          
          {/* Animated Background Textures */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] bg-repeat opacity-30" />
            <motion.div 
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-white/20 to-transparent blur-[120px] rounded-full" 
            />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="text-white">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-white/20 p-2 rounded-lg backdrop-blur-md">
                    <Zap className="h-4 w-4 text-yellow-300" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-100">
                    {t("tag")}
                  </span>
                </div>
                
                <h2 className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-[0.9] mb-8">
                  {t("title")}
                </h2>
                
                <p className="text-blue-100 text-lg md:text-xl font-light leading-relaxed max-w-md">
                  {t("desc")}
                </p>
              </motion.div>

              <div className="flex flex-wrap gap-8 mt-12">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-200" />
                  <span className="text-sm font-semibold text-blue-100">{t("global")}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-blue-200" />
                  <span className="text-sm font-semibold text-blue-100">{t("secure")}</span>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex justify-center lg:justify-end"
            >
              <motion.div
                whileHover={{ scale: 1.05, rotate: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative group"
              >
                {/* Button Glow Effect */}
                <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-50 h-20 px-12 text-2xl font-bold rounded-[2rem] shadow-2xl relative z-10 transition-all flex gap-4 group"
                >
                  {t("button")}
                  <ArrowRight className="h-8 w-8 transition-transform duration-500 group-hover:translate-x-2" />
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Abstract Floating Icons */}
          <motion.div 
            animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-10 opacity-10 hidden md:block"
          >
            <Shield className="h-32 w-32 text-white" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
