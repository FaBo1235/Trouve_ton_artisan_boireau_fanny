import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import utilisateur from "../assets/img/utilisateur.png";
import StarRating from "../components/StarRating";



export default function ArtisanDetail() {
  const { id } = useParams(); // récupère l'id dans l’URL
  const [artisan, setArtisan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nom: "", prenom: "", email: "", objet: "", message: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/artisans/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Erreur lors du chargement de l'artisan");
        return res.json();
      })
      .then((data) => {
        setArtisan(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Message envoyé :", form);
    setSuccess(true);
    setForm({ nom: "", prenom: "", email: "", objet: "", message: "" });

    setTimeout(() => {
      setSuccess(false);
    }, 3000);
  };

  if (loading) return <p className="text-center py-10">Chargement...</p>;
  if (error) return <p className="text-center py-10 text-red-600">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex flex-col md:flex-row gap-10">


        <div className="md:w-1/2 flex flex-col gap-10">

        {/* Fiche artisan */}
        <div className="flex items-start gap-6">
          <div className="w-32 h-32 rounded-lg border-2 overflow-hidden">
            <img
              src={utilisateur}
              alt={artisan.nom}
              className="w-full h-full object-cover"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-[#00497C] mb-2">
              {artisan.nom}
            </h1>

            <StarRating rating={artisan.note} />

            <p className="text-gray-600 mb-4">
              {artisan.specialite}, {artisan.localisation}
            </p>

            {artisan.site_web && (
              <a
                href={artisan.site_web}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 underline"
              >
                {artisan.site_web}
              </a>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3 text-[#00497c]">
            À propos
          </h3>

          <p className="text-gray-700 leading-relaxed">
            {artisan.description}
          </p>
        </div>

      </div>
      
        
        {/*Partie formulaire*/}

        <div className="md:w-1/2 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-3">Formulaire de contact</h2>

          {success && (
            <p className="bg-green-100 text-green-800 p-3 rounded mb-4">
              Message envoyé avec succès !
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nom"
              className="border p-2 rounded-md"
              value={form.nom}
              onChange={(e) => setForm({ ...form, nom: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Prénom"
              className="border p-3 rounded-md"
              value={form.prenom}
              onChange={(e) => setForm({ ...form, prenom: e.target.value })}
              required
            />


            <input
              type="email"
              placeholder="Adresse mail"
              className="border p-2 rounded-md"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Objet"
              className="border p-3 rounded-md"
              value={form.objet}
              onChange={(e) => setForm({ ...form, objet: e.target.value })}
              required
            />

            <textarea
              placeholder="Message"
              className="border p-2 rounded-md"
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            ></textarea>

            <button
              type="submit"
              className="bg-[#0074C7] text-white py-2 rounded hover:bg-[#00497C]"
            >
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
