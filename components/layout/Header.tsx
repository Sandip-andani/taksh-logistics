"use client";

import React, { useEffect, useState } from "react";
import { Link, usePathname, useRouter } from "@/navigation";
import { useTranslations, useLocale } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Globe, Moon, Sun, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { localeNames, locales } from "@/navigation";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const t = useTranslations("Navigation");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: t("home"), href: "/" },
    { label: t("about"), href: "/about" },
    { label: t("services"), href: "/services" },
    { label: t("fleet"), href: "/fleet" },
    { label: t("tracking"), href: "/tracking" },
    { label: t("contact"), href: "/contact" },
  ];

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-0">
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-full max-w-7xl rounded-2xl border transition-all duration-300 flex items-center justify-between px-6 py-3 md:py-2.5 ${
          isScrolled
            ? "bg-white/80 dark:bg-black/70 backdrop-blur-xl border-black/5 dark:border-white/10 shadow-2xl shadow-blue-500/10"
            : "bg-white/95 dark:bg-gray-900/95 border-black/5 dark:border-white/10 shadow-lg"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <div className="h-10 w-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
            T
          </div>
          <span className="text-xl font-bold tracking-tight font-outfit hidden sm:block text-gray-900 dark:text-white">
            TAKSH
          </span>
        </Link>

        {/* Desktop Menu - Centered */}
        <nav className="hidden lg:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2 text-sm font-medium rounded-xl transition-all hover:bg-gray-100 dark:hover:bg-white/10 ${
                pathname === item.href || (item.href === "/" && pathname === "/")
                  ? "text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-400/10"
                  : "text-gray-600 dark:text-gray-400"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Language Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="hidden md:flex gap-2 rounded-full h-10">
                <Globe className="h-4 w-4" />
                <span className="uppercase text-xs font-bold">{locale}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-2xl p-2">
              {locales.map((loc) => (
                <DropdownMenuItem
                  key={loc}
                  onClick={() => handleLanguageChange(loc)}
                  className={`rounded-xl ${locale === loc ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 font-bold" : ""}`}
                >
                  {localeNames[loc]}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full h-10 w-10"
          >
            <AnimatePresence mode="wait">
              {theme === "dark" ? (
                <motion.div key="sun" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Sun className="h-4 w-4 text-yellow-400" />
                </motion.div>
              ) : (
                <motion.div key="moon" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                  <Moon className="h-4 w-4 text-blue-600" />
                </motion.div>
              )}
            </AnimatePresence>
          </Button>

          <div className="hidden md:flex items-center space-x-2 pl-2 border-l border-gray-100 dark:border-gray-800 ml-2">
            <Button variant="outline" className="rounded-xl h-10 px-6 border-gray-200 dark:border-gray-800 font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">
              Log in
            </Button>
            <Button className="rounded-xl h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg shadow-blue-600/20">
              Get Quote
            </Button>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="w-full rounded-b-[2rem] border-none shadow-2xl p-8 backdrop-blur-xl bg-white/90 dark:bg-black/90">
                <div className="flex flex-col space-y-4 pt-10">
                  {menuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-3xl font-bold font-outfit hover:text-blue-600 transition-colors dark:text-white"
                    >
                      {item.label}
                    </Link>
                  ))}
                  <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4 block">Select Language</span>
                    <div className="grid grid-cols-2 gap-2">
                      {locales.map((loc) => (
                        <Button
                          key={loc}
                          variant="outline"
                          onClick={() => handleLanguageChange(loc)}
                          className={`rounded-xl h-12 justify-start px-4 ${locale === loc ? "border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20" : "border-gray-100 dark:border-gray-800"}`}
                        >
                          <span className="text-sm font-medium">{localeNames[loc]}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="pt-8 grid grid-cols-2 gap-4">
                    <Button variant="outline" className="rounded-2xl h-14 text-lg border-gray-200">Log in</Button>
                    <Button className="rounded-2xl h-14 text-lg bg-blue-600">Get Quote</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.header>
    </div>
  );
};
