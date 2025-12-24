import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import utilisateur from "../assets/img/utilisateur.png";
import StarRating from "../components/StarRating";

export default function Alimentation() {
  const [artisans, setArtisans] = useState([]);
  const API_URL = "https://trouvetonartisanboireaufanny-production.up.railway.app";

  useEffect(() => {
    fetch(`${API_URL}/api/artisans`)
      .then((res) => res.json())
      .then((data) => {
        // filtrage uniquement sur la catégorie “Alimentaire”
        const food = data.filter((a) => a.categorie === "Alimentaire");
        setArtisans(food);
      });
  }, []);

  return (
    <div className="flex flex-wrap gap-6 justify-center p-10">
      {artisans.map((artisan) => (
        <Link key={artisan.id} to={`/artisan/${artisan.id}`}>
          <div className="min-w-[260px] bg-[#f1f8fc] rounded-xl shadow p-6 text-center">
            <div className="w-20 h-20 rounded-full border mx-auto mb-4 overflow-hidden">
              <img src={utilisateur} alt="photo utilisateur" className="w-20 h-20 mx-auto rounded-full mb-4"/>
              
            </div>
            <h3 className="text-[#00497C]">{artisan.nom}</h3>

            <p className="text-[#384050] text-sm">{artisan.specialite}, {artisan.localisation}</p>

            <div>
              <StarRating rating={artisan.note} />
            </div>

            

            <button className=" flex justify-center mt-3 bg-[#0074c7] text-[#f1f8fc] px-4 py-2 rounded hover:bg-[#005fa3]">
            Voir le profil
            </button>

          </div>
        </Link>
      ))}
    </div>
  );
}
