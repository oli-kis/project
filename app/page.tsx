import Navbar from "@/components/ui/navbar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator, Car } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      <Navbar />
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Swiss Car Import Calculator
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Calculate import costs for vehicles from Germany to Switzerland including customs duties, VAT, CO₂ taxes, and other fees.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <Calculator className="w-12 h-12 text-primary" />
              <h2 className="text-2xl font-semibold">Quick Calculate</h2>
              <p className="text-muted-foreground">
                Get a quick estimate for importing a vehicle without creating an account.
              </p>
              <Link href="/calculator">
                <Button>
                  Start Calculating
                </Button>
              </Link>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col items-center text-center space-y-4">
              <Car className="w-12 h-12 text-primary" />
              <h2 className="text-2xl font-semibold">Sign In</h2>
              <p className="text-muted-foreground">
                Access your saved calculations and get detailed import analysis.
              </p>
              <Link href="/login">
                <Button>
                  Sign In
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-6">Why Use Our Calculator?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div>
              <h3 className="text-lg font-medium mb-2">Accurate Calculations</h3>
              <p className="text-muted-foreground">
                Up-to-date tax rates and import fees for Swiss customs.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Real-time Exchange Rates</h3>
              <p className="text-muted-foreground">
                Current EUR to CHF conversion for accurate cost estimation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-2">Save & Compare</h3>
              <p className="text-muted-foreground">
                Store calculations and compare different vehicles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}