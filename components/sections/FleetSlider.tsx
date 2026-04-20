"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export const FleetSlider = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-60%"]);

  const fleetItems = [
    { title: "Heavy Duty Transporters", img: "/fleet_bg.png" },
    { title: "Smart Warehousing", img: "/hero_bg.png" }, // Reusing for demo
    { title: "Global Shipping Lines", img: "/fleet_bg.png" },
    { title: "Last Mile Delivery", img: "/hero_bg.png" },
  ];

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-black">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute top-20 left-20 z-20">
          <h2 className="text-6xl md:text-8xl font-bold font-outfit text-white/10 uppercase tracking-tighter">
            Our Elite Fleet
          </h2>
        </div>

        <motion.div style={{ x }} className="flex gap-12 px-20">
          {fleetItems.map((item, i) => (
            <div
              key={i}
              className="group relative h-[60vh] w-[80vw] md:w-[40vw] overflow-hidden rounded-3xl bg-gray-900"
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-10 left-10 text-white">
                <span className="text-blue-500 font-bold mb-2 block tracking-widest uppercase text-xs">
                  0{i + 1} / Logistics Excellence
                </span>
                <h3 className="text-3xl font-bold font-outfit">{item.title}</h3>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
