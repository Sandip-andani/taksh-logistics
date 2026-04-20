import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Phone, MapPin } from "lucide-react";

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = await props.params;
  
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            <div>
              <h1 className="text-6xl font-bold font-outfit mb-8 dark:text-white">Get in Touch</h1>
              <p className="text-xl text-gray-500 mb-12">
                Have a question or need a custom quote? Our logistics experts are here to help you 24/7.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <MapPin className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="font-bold text-lg dark:text-white">Global Headquarters</div>
                    <div className="text-gray-500">123 Logistics Plaza, Mumbai, India</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <Phone className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="font-bold text-lg dark:text-white">Call Us</div>
                    <div className="text-gray-500">+91 98765 43210</div>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                    <Mail className="h-7 w-7" />
                  </div>
                  <div>
                    <div className="font-bold text-lg dark:text-white">Email Us</div>
                    <div className="text-gray-500">contact@takshlogistics.com</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-900 p-10 rounded-[2.5rem] shadow-2xl">
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <Input placeholder="First Name" className="h-14 rounded-xl border-gray-200" />
                  <Input placeholder="Last Name" className="h-14 rounded-xl border-gray-200" />
                </div>
                <Input placeholder="Email Address" className="h-14 rounded-xl border-gray-200" />
                <textarea 
                  placeholder="Your Message" 
                  className="w-full h-40 rounded-xl border border-gray-200 bg-white dark:bg-black p-4 focus:ring-2 focus:ring-blue-600 outline-none"
                />
                <Button className="w-full h-14 rounded-xl bg-blue-600 hover:bg-blue-700 text-lg font-bold">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
