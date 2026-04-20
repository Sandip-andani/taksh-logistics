import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FleetSlider } from "@/components/sections/FleetSlider";
import { About } from "@/components/sections/About";
import { Process } from "@/components/sections/Process";
import { GlobalNetwork } from "@/components/sections/GlobalNetwork";
import { CTA } from "@/components/sections/CTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Services />
      <Process />
      <FleetSlider />
      <GlobalNetwork />
      <CTA />
      <Footer />
    </main>
  );
}
