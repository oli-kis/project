import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calculator, Car } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="min-h-screen bg-background flex flex-col justify-center align-center">
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-extrabold text-secondary-400 mb-6 mt-6 drop-shadow-lg">
          Schweizer Autoimport Rechner
        </h1>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Berechnen Sie die Importkosten für Fahrzeuge aus Deutschland in die Schweiz, einschließlich Zollgebühren, Mehrwertsteuer, CO₂-Steuern und mehr.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
        <Card className="p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center text-center space-y-6">
            <Calculator className="w-14 h-14 text-secondary-400" />
            <h2 className="text-2xl font-semibold ">Schnell berechnen</h2>
            <p className="text-gray-400">
              Erhalten Sie eine schnelle Schätzung der Importkosten für ein Fahrzeug.
            </p>
            <Link href="/calculator">
              <Button className="bg-secondary-500 hover:bg-secondary-600 text-white">
                Berechnung starten
              </Button>
            </Link>
          </div>
        </Card>

        <Card className="p-8 bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105">
          <div className="flex flex-col items-center text-center space-y-6">
            <Car className="w-14 h-14 text-secondary-400" />
            <h2 className="text-2xl font-semibold">Anmelden</h2>
            <p className="text-gray-400">
              Greifen Sie auf Ihre gespeicherten Berechnungen zu und erhalten Sie eine detaillierte Importanalyse.
            </p>
            <Link href="/login">
              <Button className="bg-secondary-500 hover:bg-secondary-600 text-white">
                Anmelden
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      <div className="mt-20 text-center">
        <h2 className="text-3xl font-semibold mb-6">Warum unseren Rechner verwenden?</h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-medium text-secondary-400 mb-3">Genau Berechnungen</h3>
            <p className="text-gray-400">
              Aktuelle Steuersätze und Importgebühren für den Schweizer Zoll.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-medium text-secondary-400 mb-3">Echtzeit-Wechselkurse</h3>
            <p className="text-gray-400">
              Aktuelle EUR-zu-CHF Umrechnung für eine genaue Kostenschätzung.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl">
            <h3 className="text-xl font-medium text-secondary-400 mb-3">Benutzerfreundliche Oberfläche</h3>
            <p className="text-gray-400">
              Eine einfache, saubere und intuitive Oberfläche für schnelle Berechnungen.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
