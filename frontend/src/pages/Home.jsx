import React from "react";
import ArtisanCard from "../components/ArtisanCard";

export default function Home() {
  const etape = [
    { number: 1, text: "Choisir une catégorie" },
    { number: 2, text: "Choisir un artisan" },
    { number: 3, text: "Le contacter via le formulaire" },
    { number: 4, text: "Réponse sous 48h" },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-16">
        Comment trouver son artisan ?
      </h1>

      <div className="flex justify-between mb-20">
        {etape.map((e) => (
          <div key={e.number} className="text-center w-1/4">
            <div className="bg-[#0074C7] text-white w-16 h-16 mx-auto rounded-full flex items-center justify-center text-xl font-bold">
              {e.number}
            </div>
            <p className="mt-3">{e.text}</p>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6">Artisan du mois</h2>

      <ArtisanCard />
    </div>
  );
}

