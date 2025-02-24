'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/navbar";
import LoggedInNavbar from "@/components/ui/loggedInNavbar";
import {isUser, redirectToLogin} from "./actions"

interface FormData {
  carValue: string;
  co2Emissions: string;
  weight: string;
  fuelType: string;
}

export default function ImportDutyCalculator() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const result = await isUser();
      setIsUserAuthenticated(result); 
      if (!result) {
        await redirectToLogin();
      } else {
        setLoading(false);
      }
    }
    checkUser();
  }, []);

  const [formData, setFormData] = useState<FormData>({
    carValue: "",
    co2Emissions: "",
    weight: "",
    fuelType: "",
  });
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculate = () => {
    // Placeholder calculation logic
    const duty =
      parseFloat(formData.carValue || "0") * 0.1 +
      parseFloat(formData.co2Emissions || "0") * 2 +
      parseFloat(formData.weight || "0") * 0.05;
    setResult(duty.toFixed(2));
  };
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      { isUserAuthenticated ? <LoggedInNavbar /> : <Navbar />}
      <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg p-6 shadow-xl bg-black rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Car Import Duty Calculator</h2>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Car Value (EUR)</Label>
              <Input name="carValue" type="number" onChange={handleChange} />
            </div>
            <div>
              <Label>CO₂ Emissions (g/km)</Label>
              <Input name="co2Emissions" type="number" onChange={handleChange} />
            </div>
            <div>
              <Label>Weight (kg)</Label>
              <Input name="weight" type="number" onChange={handleChange} />
            </div>
            <Button onClick={handleCalculate}>Calculate</Button>
            {result && <p className="mt-4 text-lg font-semibold">Import Duty: €{result}</p>}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}