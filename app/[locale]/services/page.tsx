import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Services as ServicesSection } from "@/components/sections/Services";

export default async function ServicesPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="pt-20">
        <ServicesSection />
      </div>
      <Footer />
    </main>
  );
}
