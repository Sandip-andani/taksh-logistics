import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FleetSlider } from "@/components/sections/FleetSlider";

export default async function FleetPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-20">
        <FleetSlider />
      </div>
      <Footer />
    </main>
  );
}
