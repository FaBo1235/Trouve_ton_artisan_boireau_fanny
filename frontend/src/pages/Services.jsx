import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utilisateur from "../assets/img/utilisateur.png";
import StarRating from "../components/StarRating";

export default function Services() {
  const [artisans, setArtisans] = useState([]);
  const API_URL = "https://trouvetonartisanboireaufanny-production.up.railway.app";

  useEffect(() => {
    fetch(`${API_URL}/api/artisans`)
      .then((res) => res.json())
      .then((data) => {
        // filtrage uniquement sur la catégorie “Services”
        const serv = data.filter((a) => a.categorie === "Services");
        setArtisans(serv);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center p-10">
      {artisans.map((artisan) => (
        <Link key={artisan.id} to={`/artisan/${artisan.id}`}>
          <div className="min-w-[250px] p-6 rounded-3xl-[#0074C7]">
            <div className="w-30 h-30 rounded-full border mx-auto mb-4 overflow-hidden">
              <img src={utilisateur} alt="photo utilisateur" />
            </div>
            <h3 className="text-[#00497C]">{artisan.nom}</h3>

            <div>
              <StarRating rating={artisan.note} />
            </div>

            <p className="text-[#384050] text-sm">{artisan.specialite}, {artisan.localisation}</p>

            <button className=" flex justify-center mt-3 bg-[#0074c7] text-white px-4 py-2 rounded hover:bg-[#005fa3]">
            Voir le profil
            </button>

          </div>
        </Link>
      ))}
    </div>
  );
}