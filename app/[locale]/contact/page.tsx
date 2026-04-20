"use client";

import React from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin, Send, MessageSquare, Globe, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  const t = useTranslations("Index.contact");

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
      <Header />
      
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-600/5 blur-[80px] rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px]">
          
          {/* Header Section */}
          <div className="max-w-4xl mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-6"
            >
              <div className="h-[1px] w-12 bg-blue-600" />
              <span className="text-blue-600 font-bold tracking-[0.4em] uppercase text-[10px]">
                {t("tag")}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold font-outfit tracking-tighter leading-[0.8] text-gray-900 dark:text-white mb-6"
            >
              {t("title").split(" ")[0]} {t("title").split(" ")[1]} {t("title").split(" ")[2]} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                {t("title").split(" ").slice(3).join(" ")}
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-500 dark:text-gray-400 text-base md:text-lg font-light leading-relaxed max-w-lg border-l border-gray-200 dark:border-white/10 pl-6 italic"
            >
              {t("desc")}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Interactive Contact Cards - Scaled Down */}
            <div className="lg:col-span-5 space-y-4">
              {[
                { icon: MapPin, title: t("hq"), value: "Logistics Plaza, Mumbai, IN" },
                { icon: Phone, title: t("phone"), value: "+91 98765 43210" },
                { icon: Mail, title: t("email"), value: "contact@taksh.com" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 rounded-[2rem] bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-blue-500/20 transition-all flex items-center justify-between"
                >
                  <div className="flex items-center gap-5">
                    <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                      <item.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">{item.title}</div>
                      <div className="text-base font-bold text-gray-900 dark:text-white font-outfit">{item.value}</div>
                    </div>
                  </div>
                  <div className="h-8 w-8 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ArrowRight className="h-3 w-3 text-blue-600" />
                  </div>
                </motion.div>
              ))}

              {/* Status Badge - Scaled Down */}
              <div className="p-6 rounded-[2rem] bg-blue-600 text-white shadow-2xl shadow-blue-600/20 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-blue-100">{t("live")}</span>
                  </div>
                  <div className="text-xl font-bold font-outfit mb-1">{t("responseTime")}</div>
                  <div className="text-3xl font-bold opacity-80 font-outfit tracking-tight">{t("time")}</div>
                </div>
                <Globe className="absolute -bottom-6 -right-6 h-32 w-32 opacity-10" />
              </div>
            </div>
            
            {/* Right: Premium Form Container - Scaled Down */}
            <div className="lg:col-span-7">
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-8 md:p-12 rounded-[3rem] border border-gray-100 dark:border-white/10 shadow-2xl relative"
              >
                <div className="absolute top-8 right-8">
                  <MessageSquare className="h-8 w-8 text-blue-600/10" />
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-3">{t("firstName")}</label>
                      <Input 
                        placeholder="John" 
                        className="h-14 rounded-xl bg-white dark:bg-black/40 border-gray-100 dark:border-white/10 px-5 focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-3">{t("lastName")}</label>
                      <Input 
                        placeholder="Doe" 
                        className="h-14 rounded-xl bg-white dark:bg-black/40 border-gray-100 dark:border-white/10 px-5 focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-3">{t("emailLabel")}</label>
                    <Input 
                      placeholder="john@example.com" 
                      className="h-14 rounded-xl bg-white dark:bg-black/40 border-gray-100 dark:border-white/10 px-5 focus:ring-2 focus:ring-blue-600 transition-all text-sm" 
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-3">{t("message")}</label>
                    <textarea 
                      placeholder={t("placeholder")} 
                      className="w-full h-36 rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-black/40 p-6 focus:ring-2 focus:ring-blue-600 outline-none transition-all placeholder:text-gray-300 dark:placeholder:text-gray-700 text-sm"
                    />
                  </div>

                  <Button className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-base font-bold uppercase tracking-widest shadow-2xl shadow-blue-600/30 group">
                    {t("send")}
                    <Send className="h-5 w-5 ml-3 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
