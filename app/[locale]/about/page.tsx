import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default async function AboutPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center pt-32 pb-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-6xl font-bold font-outfit mb-6 dark:text-white">About Taksh Logistics</h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            We are a global leader in container transport, dedicated to providing seamless, 
            efficient, and sustainable logistics solutions for the modern world.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
