"use client";

import React from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Phone, MapPin, ArrowUpRight } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  const t = useTranslations("Navigation");
  const tf = useTranslations("Index.footer");

  return (
    <footer className="bg-gray-50 dark:bg-[#050505] text-gray-600 dark:text-gray-400 py-24 border-t border-gray-200 dark:border-white/5 transition-colors duration-500">
      <div className="container mx-auto px-10 md:px-20 lg:px-32 max-w-[1600px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4">
            <div className="text-2xl font-bold tracking-tighter font-outfit text-gray-900 dark:text-white mb-8 uppercase">
              TAKSH <span className="text-blue-600">LOGISTICS</span>
            </div>
            <p className="text-sm leading-relaxed mb-8 max-w-sm font-light">
              {tf("desc")}
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="#" 
                  className="h-10 w-10 rounded-full border border-gray-200 dark:border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-all text-gray-500 dark:text-gray-400"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-gray-900 dark:text-white font-bold mb-8 font-outfit uppercase tracking-widest text-[10px]">
              {tf("nav")}
            </h4>
            <ul className="space-y-4">
              {["home", "about", "services", "fleet", "tracking", "contact"].map((key) => (
                <li key={key}>
                  <Link 
                    href={`/${key === "home" ? "" : key}`} 
                    className="hover:text-blue-600 transition-colors text-sm capitalize flex items-center group"
                  >
                    {t(key)}
                    <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 -translate-y-1 translate-x-1 transition-all ml-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Global HQ Info */}
          <div className="lg:col-span-3">
            <h4 className="text-gray-900 dark:text-white font-bold mb-8 font-outfit uppercase tracking-widest text-[10px]">
              {tf("touch")}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4">
                <div className="h-10 w-10 rounded-xl bg-blue-600/5 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                  <MapPin className="h-4 w-4" />
                </div>
                <span className="text-sm leading-relaxed">
                  123 Logistics Plaza, <br />
                  Global Trade Zone, IN
                </span>
              </li>
              <li className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-xl bg-blue-600/5 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">+91 98765 43210</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div className="lg:col-span-3">
            <h4 className="text-gray-900 dark:text-white font-bold mb-8 font-outfit uppercase tracking-widest text-[10px]">
              {tf("updated")}
            </h4>
            <div className="p-1 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5">
              <div className="flex flex-col space-y-3 p-2">
                <Input 
                  placeholder={tf("emailPlaceholder")} 
                  className="bg-transparent border-none text-gray-900 dark:text-white h-10 focus-visible:ring-0 placeholder:text-gray-400" 
                />
                <Button className="w-full bg-blue-600 hover:bg-blue-700 h-10 font-bold uppercase tracking-widest text-[9px] rounded-xl shadow-lg shadow-blue-600/20">
                  {tf("subscribe")}
                </Button>
              </div>
            </div>
            <p className="text-[10px] mt-4 text-gray-400 uppercase tracking-widest font-bold">
              {tf("secure")}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-gray-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-bold tracking-[0.3em] uppercase text-gray-400">
            © 2024 TAKSH LOGISTICS. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-8 text-[9px] font-bold tracking-[0.2em] uppercase">
            <Link href="#" className="hover:text-blue-600 transition-colors">{tf("privacy")}</Link>
            <Link href="#" className="hover:text-blue-600 transition-colors">{tf("terms")}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
