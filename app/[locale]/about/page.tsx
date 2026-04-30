"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { motion } from "framer-motion";
import { CTA } from "@/components/sections/CTA";
import Image from "next/image";
import { Shield, Zap, Globe, Target } from "lucide-react";

export default function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const params = React.use(props.params);
  
  const values = [
    {
      title: "Precision",
      desc: "Delivering with accuracy and care in every shipment we handle.",
      icon: Target
    },
    {
      title: "Global Reach",
      desc: "A vast network connecting key international trade routes.",
      icon: Globe
    },
    {
      title: "Safety First",
      desc: "Industry-leading security protocols for your valuable cargo.",
      icon: Shield
    },
    {
      title: "Innovation",
      desc: "Modern technology driving efficient logistics solutions.",
      icon: Zap
    }
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-[#050505] transition-colors duration-500">
      <Header />
      
      {/* Simple & Clean Hero */}
      <section className="pt-40 pb-20 border-b border-gray-100 dark:border-white/5">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="text-blue-600 font-bold tracking-widest text-xs uppercase mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-bold font-outfit text-gray-900 dark:text-white mb-8 leading-tight">
              About Taksh Logistics
            </h1>
            <p className="text-xl text-gray-500 dark:text-gray-400 font-light leading-relaxed">
              We are a dedicated logistics partner, providing reliable container transport and 
              supply chain solutions globally. Since 2008, we have focused on precision, safety, and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Existing About Section - High quality overview */}
      <About />

      {/* Sober Values Grid */}
      <section className="py-24 bg-gray-50 dark:bg-white/[0.02]">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-outfit text-gray-900 dark:text-white mb-4">Core Values</h2>
            <div className="h-1 w-12 bg-blue-600 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, i) => (
              <div 
                key={i}
                className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm"
              >
                <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-600/10 flex items-center justify-center text-blue-600 mb-6">
                  <value.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold font-outfit text-gray-900 dark:text-white mb-3">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple Mission & Vision */}
      <section className="py-24">
        <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Our Mission
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-gray-100 dark:border-white/5 pl-6">
                To provide world-class logistics services that empower businesses to reach their full potential 
                through innovative technology, strategic planning, and unwavering commitment to safety.
              </p>
            </div>
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold font-outfit text-gray-900 dark:text-white flex items-center gap-3">
                <div className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                Our Vision
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed border-l-2 border-gray-100 dark:border-white/5 pl-6">
                To be the world&apos;s most reliable and sustainable logistics partner, setting new standards 
                for excellence in global trade and supply chain management.
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA />
      <Footer />
    </main>
  );
}

