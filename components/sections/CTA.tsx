"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-blue-600">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:row items-center justify-between gap-10">
          <div className="text-white max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold font-outfit mb-4 leading-tight">Ready to Move Your World?</h2>
            <p className="text-blue-100 text-lg">Partner with Taksh Logistics for scalable, high-end container transport solutions tailored to your business needs.</p>
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 h-16 px-10 text-xl font-bold rounded-2xl shadow-2xl">
              Get Started Now
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </motion.div>
        </div>
      </div>
      
      {/* Abstract background shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  );
};
