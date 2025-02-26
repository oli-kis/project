'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/ui/navbar";
import LoggedInNavbar from "@/components/ui/loggedInNavbar";
import {isUser, redirectToLogin, CalculatePrice} from "./actions"

interface FormData {
  carValue: string;
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
  });
  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculate = async () => {
    const price = await CalculatePrice(parseFloat(formData.carValue));
    setResult(price.toString());
  };  

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return (
    <div className="min-h-screen bg-background">
      { isUserAuthenticated ? <LoggedInNavbar /> : <Navbar />}
      <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg p-8 shadow-lg shadow-green-500/20 bg-[#0d1521] rounded-2xl border border-gray-700">
  <h2 className="text-3xl font-bold text-white mb-6 text-center">
    Car Import Duty Calculator
  </h2>
  <CardContent>
    <div className="space-y-6">
      <div>
        <Label className="text-gray-300">Car Value (EUR)</Label>
        <Input
          name="carValue"
          type="number"
          onChange={handleChange}
          className="bg-gray-900 text-white border border-gray-600 focus:border-green-400 focus:ring focus:ring-green-500/30 rounded-lg px-4 py-2 w-full"
        />
      </div>
      <Button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-500 transition-colors py-2 rounded-lg font-semibold">
        Calculate
      </Button>
      {result && (
        <p className="mt-4 text-lg font-semibold text-center">
          Import Duty: {result} CHF
        </p>
      )}
    </div>
  </CardContent>
</Card>

      </div>
    </div>
  );
}