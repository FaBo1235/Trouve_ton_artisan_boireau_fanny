import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import utilisateur from "../assets/img/utilisateur.png";
import StarRating from "./StarRating";

const API_URL =
  "https://trouvetonartisanboireaufanny-production.up.railway.app";

export default function ArtisanCard() {
  const [artisans, setArtisans] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/api/artisans`)
      .then((res) => res.json())
      .then((data) => {
        const topArtisans = data.filter(
          (a) =>
            a.top &&
            (a.top.toLowerCase() === "vrai" ||
              a.top.toLowerCase() === "true")
        );
        setArtisans(topArtisans);
      })
      .catch((err) =>
        console.error("Erreur chargement artisans :", err)
      );
  }, []);

  if (artisans.length === 0) {
    return <p>Aucun artisan du mois</p>;
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto py-6"
      >
        {artisans.map((artisan) => (
          <Link key={artisan.id} to={`/artisan/${artisan.id}`}>
            <div className="min-w-[260px] bg-[#f1f8fc] rounded-xl shadow p-6 text-center">
              <img
                src={utilisateur}
                alt={artisan.nom}
                className="w-20 h-20 mx-auto rounded-full mb-4"
              />

              <h3 className="font-semibold text-[#00497C]">{artisan.nom}</h3>
              <p className="text-sm text-[#384050]">
                {artisan.specialite}, {artisan.localisation}
              </p>

              <StarRating rating={artisan.note} />

              <button className="mt-4 bg-[#0074C7] text-[#f1f8fc] px-4 py-2 rounded">
                Voir le profil
              </button>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
