import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import utilisateur from "../assets/img/utilisateur.png";
import StarRating from "./StarRating";




export default function ArtisanCard() {

  const [artisans, setArtisans] = useState([]);
  const scrollRef = useRef(null);

    useEffect(() => {
    fetch("https://trouvetonartisanboireaufanny-production.up.railway.app/api/artisans")
    .then(res => res.json())
      .then(data => {
      console.log("Données artisans chargées :", data);
      const topArtisans = data.filter(a =>
        a.top && (a.top.toLowerCase() === "vrai" || a.top.toLowerCase() === "true")
      )
      setArtisans(topArtisans)
    })
    .catch(err => console.error("Erreur chargement artisans :", err))
    }, [])


    
    const scrollLeft = () => {
        scrollRef.current.scrollBy({ left: -250, behavior: 'smooth' });
    }

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 250, behavior: 'smooth' });
    }



    return (
    <div className="relative my-10">
      {/* Bouton gauche */}
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-[#0074c7] text-white rounded-full p-2 shadow-lg z-10 hover:bg-[#005fa3] lg:hidden"
      >
        ◀
      </button>

      {/* Conteneur scrollable */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 px-10 scroll-smooth scrollbar-hide lg:overflow-x-visible"
      >
        {artisans.map((artisan) => (
          <Link key={artisan.id} to={`/artisan/${artisan.id}`}>
            <div className="min-w-[250px] bg-[#f6efef] p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-300 cursor-pointer">
              {/* Photo ronde */}
              <div className="mx-auto w-20 h-20 border border-gray-400 rounded-full mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={utilisateur}
                  alt={artisan.nom}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Nom */}
              <h3 className="text-[#00497c] font-semibold text-lg mb-1">
                {artisan.nom}
              </h3>

              {/* Spécialité + ville */}
              <p className="text-gray-600 text-sm mb-2">{artisan.specialite}, {artisan.localisation}</p>


              <div>
                <StarRating rating={artisan.note} size={14}/>
              </div>

              <button className="mt-3 bg-[#0074c7] text-white px-4 py-2 rounded hover:bg-[#005fa3]">
                Voir le profil
              </button>

            </div>
            </Link>
        ))}
      </div>

      {/* Bouton droit */}
      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-[#0074c7] text-white rounded-full p-2 shadow-lg z-10 hover:bg-[#005fa3] lg:hidden"
      >
        ▶
      </button>
    </div>
  );
}