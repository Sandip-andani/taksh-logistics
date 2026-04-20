import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default async function TrackingPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <h1 className="text-5xl font-bold font-outfit mb-8 dark:text-white">Track Your Shipment</h1>
          <div className="relative group">
            <Input 
              placeholder="Enter Container or Bill of Lading Number" 
              className="h-16 pl-6 pr-32 text-lg rounded-2xl bg-white dark:bg-gray-900 shadow-xl border-none"
            />
            <Button className="absolute right-2 top-2 h-12 px-6 rounded-xl bg-blue-600 hover:bg-blue-700">
              <Search className="mr-2 h-5 w-5" />
              Track
            </Button>
          </div>
          <p className="mt-6 text-gray-500">Real-time GPS tracking for all global shipments.</p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
