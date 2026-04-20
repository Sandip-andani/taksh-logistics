"use client";

import React from "react";
import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Footer = () => {
  const t = useTranslations("Navigation");

  return (
    <footer className="bg-gray-950 text-gray-400 py-20 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-bold tracking-tighter font-outfit text-white mb-6">
              TAKSH <span className="text-blue-600">LOGISTICS</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Pioneering the future of global logistics with cutting-edge technology and unparalleled service quality. Moving your world, one container at a time.
            </p>
            <div className="flex space-x-4">
              {[FaFacebook, FaTwitter, FaLinkedin, FaInstagram].map((Icon, i) => (
                <Link key={i} href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-blue-600 hover:border-blue-600 transition-all text-white">
                  <Icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 font-outfit uppercase tracking-widest text-sm">Navigation</h4>
            <ul className="space-y-4">
              {["home", "about", "services", "fleet", "tracking", "contact"].map((key) => (
                <li key={key}>
                  <Link href={`/${key === "home" ? "" : key}`} className="hover:text-blue-500 transition-colors text-sm capitalize">
                    {t(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-6 font-outfit uppercase tracking-widest text-sm">Get in Touch</h4>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3 text-sm">
                <MapPin className="h-5 w-5 text-blue-600" />
                <span>123 Logistics Plaza, Global Trade Zone, IN</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Phone className="h-5 w-5 text-blue-600" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-sm">
                <Mail className="h-5 w-5 text-blue-600" />
                <span>contact@takshlogistics.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-bold mb-6 font-outfit uppercase tracking-widest text-sm">Stay Updated</h4>
            <p className="text-xs mb-4">Subscribe to our newsletter for global logistics insights.</p>
            <div className="flex flex-col space-y-3">
              <Input placeholder="Your email address" className="bg-white/5 border-white/10 text-white h-12" />
              <Button className="w-full bg-blue-600 hover:bg-blue-700 h-12 font-bold uppercase tracking-widest text-xs">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center text-xs tracking-[0.2em] uppercase">
          <p>© 2024 TAKSH LOGISTICS. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
