import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator, Car } from "lucide-react";
import Link from "next/link";
import { createClient } from '@/utils/supabase/server'
import LoggedInNavbar from "@/components/ui/loggedInNavbar";

export default async function Home() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
    
    let isUser = true;
    if (error || !data?.user) {
      isUser = false;
    }

    return (
      <div className="min-h-screen bg-background">
        {isUser ? <LoggedInNavbar /> : <Navbar />}
    
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl font-extrabold text-green-400 mb-6 mt-6 drop-shadow-lg">
            Swiss Car Import Calculator
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Calculate import costs for vehicles from Germany to Switzerland, including customs duties, VAT, CO₂ taxes, and more.
          </p>
        </div>
    
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <Card className="p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex flex-col items-center text-center space-y-6">
              <Calculator className="w-14 h-14 text-green-400" />
              <h2 className="text-2xl font-semibold ">Quick Calculate</h2>
              <p className="text-gray-400">
                Get a quick estimate for importing a vehicle without creating an account.
              </p>
              <Link href="/calculator">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Start Calculating
                </Button>
              </Link>
            </div>
          </Card>
    
          <Card className="p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
            <div className="flex flex-col items-center text-center space-y-6">
              <Car className="w-14 h-14 text-green-400" />
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-gray-400">
                Access your saved calculations and get detailed import analysis.
              </p>
              <Link href="/login">
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Sign In
                </Button>
              </Link>
            </div>
          </Card>
        </div>
    
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold mb-6">Why Use Our Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl">
              <h3 className="text-xl font-medium text-green-400 mb-3">Accurate Calculations</h3>
              <p className="text-gray-400">
                Up-to-date tax rates and import fees for Swiss customs.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl">
              <h3 className="text-xl font-medium text-green-400 mb-3">Real-time Exchange Rates</h3>
              <p className="text-gray-400">
                Current EUR to CHF conversion for accurate cost estimation.
              </p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl">
              <h3 className="text-xl font-medium text-green-400 mb-3">User-friendly Interface</h3>
              <p className="text-gray-400">
                A simple, clean, and intuitive interface for quick calculations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}
