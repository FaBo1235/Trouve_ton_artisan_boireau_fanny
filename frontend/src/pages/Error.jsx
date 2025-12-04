import React from "react";
import { Link } from "react-router-dom";
import error from "../assets/img/warning.png"

export default function Error() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl text-[#82B864] font-bold">Oopsie! Page non trouvée </h1>
      <img src={error} alt="erreur 404" className="w-64 h-64 my-6" />
      <button>
        <Link to="/" className="bg-[#82B864]- text-[#0074C7]/50 px-4 py-2 rounded-xl hover:bg-[#82B864]">
          Retour à l'accueil
        </Link>
      </button>
    </div>
  );
}