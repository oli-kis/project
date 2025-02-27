'use server'
import { redirect } from 'next/navigation';
import { getUser } from '../actions';

const automobilTaxPercent = 0.04;
const mwstGermanyPercent = 0.19;
const mwstSwitezrlandPercent = 0.081;

export async function getUserFromServer() {
    return getUser();
}
export async function redirectToLogin() {
    redirect('/login');
}

export async function CalculatePrice(price: number) {
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
        const carPriceEuro = price;
        const mwstGermany = price * mwstGermanyPercent;
        const carPriceExcludingGermanMwst = carPriceEuro - mwstGermany;
        const carPriceChf = carPriceExcludingGermanMwst * exchangeRate;
        const automobilTax = carPriceChf * automobilTaxPercent;
        const mwstSwitzerland = carPriceChf * mwstSwitezrlandPercent;
        const endPrice = carPriceChf + automobilTax + mwstSwitzerland;
        return {
            carPriceEuro,
            mwstGermany,
            carPriceExcludingGermanMwst,
            exchangeRate,
            carPriceChf,
            automobilTax,
            mwstSwitzerland,
            endPrice: endPrice.toFixed(2),
        };
    } catch (error) {
        console.error("Error fetching CHF exchange rate:", error);
        return null;
    }
}