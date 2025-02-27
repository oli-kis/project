'use client';

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { redirectToLogin, CalculatePrice, getUserFromServer } from "./actions"
import { User } from "@supabase/supabase-js";

interface FormData {
  carValue: string;
}

export default function ImportDutyCalculator() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<CalculationResult | null>(null);

  useEffect(() => {
    async function checkUser() {
      const result = await getUserFromServer();
      setUser(result);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculate = async () => {
    const calculationResult = await CalculatePrice(parseFloat(formData.carValue));
    setResult(calculationResult);
  };

  const formatStringNumber = (number: string) => {
    return new Intl.NumberFormat('de-CH').format(parseFloat(number));  // Using Swiss format
  };

  const formatNumber = (number: number) => {
    return new Intl.NumberFormat('de-CH').format(number);  // Using Swiss format
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  return (
    <div className="min-h-screen bg-background">
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-lg p-8 shadow-lg shadow-green-500/20 bg-[#0d1521] rounded-2xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">
            Autoimport berechnen
          </h2>
          <CardContent>
            <div className="space-y-6">
              <div>
                <Label className="text-gray-300">Fahrzeugwert (EUR)</Label>
                <Input
                  name="carValue"
                  type="number"
                  onChange={handleChange}
                  className="bg-gray-900 text-white border border-gray-600 focus:border-green-400 focus:ring focus:ring-green-500/30 rounded-lg px-4 py-2 w-full"
                />
              </div>
              <Button onClick={handleCalculate} className="w-full bg-green-600 hover:bg-green-500 transition-colors py-2 rounded-lg font-semibold">
                Berechnen
              </Button>
              {result && (
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold text-white mb-4">Offerte</h3>
                  <div className="bg-gray-800 p-6 rounded-xl space-y-4">
                    <div className="flex justify-between text-gray-300">
                      <span>Preis in Euro</span>
                      <span>€{formatNumber(result.carPriceEuro)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Deutsche MWST (19%)</span>
                      <span>€{formatNumber(result.mwstGermany)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Preis ohne Deutsche MWST</span>
                      <span>€{formatNumber(result.carPriceExcludingGermanMwst)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Umrechnungskurs</span>
                      <span>€{formatNumber(result.exchangeRate)}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Preis in CHF</span>
                      <span>CHF {formatStringNumber(result.carPriceChf.toFixed(2))}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Automobilsteuer (4%)</span>
                      <span>CHF {formatStringNumber(result.automobilTax.toFixed(2))}</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Schweizer MWST (8.1%)</span>
                      <span>CHF {formatStringNumber(result.mwstSwitzerland.toFixed(2))}</span>
                    </div>
                    <div className="border-t border-gray-700 pt-4 flex justify-between text-lg font-bold text-white">
                      <span>Total</span>
                      <span>CHF {formatStringNumber(result.endPrice)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}