'use server'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';

const automobilTaxPercent = 0.04;
const mwstGermanyPercent = 0.19;
const mwstSwitezrlandPercent = 0.081;
const customsFee = 20;

export async function isUser() {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.getUser();
  
    return !!data?.user && !error;
  }

  export async function redirectToLogin() {
    redirect('/login');
  }

export async function CalculatePrice(price: number){
const automobilTax = price * automobilTaxPercent;
const mwstGermany = price * mwstGermanyPercent;
const mwstSwitzerland = price * mwstSwitezrlandPercent;

console.log(price);
console.log(automobilTax);
console.log(mwstGermany);
console.log(mwstSwitzerland);

const finalPrice = price + automobilTax - mwstGermany + mwstSwitzerland;

try {
    const response = await fetch('https://api.frankfurter.dev/v1/latest?symbols=CHF');
    if (!response.ok) {
        throw new Error("Failed to fetch CHF exchange rate");
    }
    const data = await response.json();
    const exchangeRate = data.rates.CHF;

    if (!exchangeRate) {
        throw new Error("CHF exchange rate not found in response");
    }

    const priceInCHF = finalPrice * exchangeRate + customsFee;
    console.log(`Price in CHF: ${priceInCHF}`);
    return priceInCHF.toFixed(2);
} catch (error) {
    console.error("Error fetching CHF exchange rate:", error);
    return finalPrice.toFixed(2);
}
}