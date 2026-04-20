import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function SectionPage({ params }: { params: { locale: string } }) {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold font-outfit mb-6">Page Under Construction</h1>
          <p className="text-xl text-gray-500">We are moving our world to bring you this section soon.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
