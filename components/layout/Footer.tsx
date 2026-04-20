"use client";

import React from "react";
import { motion } from "framer-motion";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Phone, MapPin, Mail, ArrowUpRight, Globe, Shield } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  const t = useTranslations("Navigation");
  const tf = useTranslations("Index.footer");

  const contactItems = [
    { icon: MapPin, label: "HQ Location", value: "123 Logistics Plaza, Global Trade Zone, IN" },
    { icon: Phone, label: "Direct Line", value: "+91 98765 43210" },
    { icon: Mail, label: "Official Email", value: "ops@takshlogistics.com" },
  ];

  return (
    <footer className="bg-white dark:bg-[#050505] text-gray-900 dark:text-white pt-20 pb-10 relative overflow-hidden border-t border-gray-100 dark:border-white/5 transition-colors duration-500">
      
      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-20">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/20 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-[15vw] font-black text-gray-900/[0.05] dark:text-white/[0.02] whitespace-nowrap select-none font-outfit uppercase">
          TAKSH LOGISTICS
        </div>
      </div>

      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px] relative z-10">
        
        {/* Top Section: Brand & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
          
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mb-10"
            >
              <div className="text-3xl font-bold tracking-tighter font-outfit mb-6 flex items-center gap-3">
                <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-600/30">
                  TL
                </div>
                <span className="text-gray-900 dark:text-white uppercase">TAKSH <span className="text-blue-600">LOGISTICS</span></span>
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-md font-light">
                {tf("desc")}
              </p>
            </motion.div>

            <div className="flex gap-3">
              {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="h-11 w-11 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all cursor-pointer text-gray-400 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </motion.div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="p-8 md:p-12 rounded-[2.5rem] bg-gray-50 dark:bg-white/5 backdrop-blur-3xl border border-gray-200 dark:border-white/10 shadow-xl dark:shadow-2xl relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 blur-3xl rounded-full" />
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                <div>
                  <h3 className="text-2xl font-bold font-outfit mb-3 text-gray-900 dark:text-white">{tf("updated")}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm font-light leading-relaxed">Join our elite network for weekly logistics intelligence and global trade updates.</p>
                </div>
                <div className="space-y-4">
                  <div className="relative">
                    <Input 
                      placeholder={tf("emailPlaceholder")} 
                      className="h-12 bg-white dark:bg-black/40 border-gray-200 dark:border-white/10 rounded-xl px-5 focus-visible:ring-blue-600 text-gray-900 dark:text-white placeholder:text-gray-400" 
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Mail className="h-4 w-4" />
                    </div>
                  </div>
                  <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02]">
                    {tf("subscribe")}
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Middle Section: Navigation & Global Reach */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6">{tf("nav")}</h4>
            <ul className="grid grid-cols-2 gap-y-3 gap-x-6">
              {["home", "about", "services", "fleet", "tracking", "contact"].map((key) => (
                <li key={key}>
                  <Link 
                    href={`/${key === "home" ? "" : key}`} 
                    className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-white transition-colors text-sm font-light flex items-center group"
                  >
                    {t(key)}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-all ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-6">Global Infrastructure</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {contactItems.map((item, i) => (
                <div key={i} className="group cursor-default">
                  <div className="h-10 w-10 rounded-xl bg-blue-600/5 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <div className="text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section: Legal & Compliance */}
        <div className="pt-10 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <p className="text-[9px] font-bold tracking-[0.2em] text-gray-400 dark:text-gray-500 uppercase">
              © 2024 TAKSH LOGISTICS. BEYOND BOUNDARIES.
            </p>
            <div className="hidden md:flex items-center gap-6">
              <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                <Globe className="h-3 w-3" />
                <span>Global Ops</span>
              </div>
              <div className="flex items-center gap-2 text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                <Shield className="h-3 w-3" />
                <span>Secure Transit</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-6">
            <Link href="#" className="text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-blue-600 transition-colors">{tf("privacy")}</Link>
            <Link href="#" className="text-[9px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-blue-600 transition-colors">{tf("terms")}</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

