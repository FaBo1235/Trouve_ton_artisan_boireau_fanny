import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/img/Logo.png";
import favicon from "../assets/img/favicon.png";
import { Search } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const resultsRef = useRef(null);

  // Fermer le menu mobile quand on change de page
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Fermer les suggestions quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (resultsRef.current && !resultsRef.current.contains(e.target)) {
        setResults([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Recherche dynamique dès qu'on écrit
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`https://trouvetonartisanboireaufanny-production.up.railway.app/api/artisans/search?q=${query}`)
        const data = await response.json();

        if (!response.ok || data.length === 0) {
          navigate("/error");
          return;
        }

        setResults(data);
      } catch (err) {
        console.error(err);
        setError("Erreur réseau");
      }
    };

    const timer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleSelect = (id) => {
    setResults([]);
    setQuery("");
    navigate(`/artisan/${id}`);
  };

  return (
    <nav className="relative bg-[#0074c7] text-white px-4 py-2 shadow-md z-50">
      <div className="flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img
            src={logo}
            alt="Logo"
            className="h-18 hidden md:block"
          />
          <img
            src={favicon}
            alt="icon"
            className="h-8 md:hidden"
          />
        </Link>

        {/* SEARCH BAR */}
        <div className="relative w-[200px] md:w-[260px]">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center bg-white rounded-full px-3 py-1"
          >
            <input
              type="text"
              placeholder="Rechercher un artisan..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="bg-transparent text-black w-full focus:outline-none text-sm"
            />
            <Search size={18} className="text-[#00497c]" />
          </form>

          {/* Suggestions */}
          {results.length > 0 && (
            <div
              ref={resultsRef}
              className="absolute left-0 right-0 bg-white text-black shadow-lg rounded-lg mt-2 max-h-60 overflow-y-auto z-50"
            >
              {results.map((artisan) => (
                <div
                  key={artisan.id}
                  onClick={() => handleSelect(artisan.id)}
                  className="cursor-pointer px-4 py-2 hover:bg-[#f1f8fc] border-b last:border-none"
                >
                  <p className="font-semibold text-[#00497c]">
                    {artisan.nom}
                  </p>
                  <p className="text-sm text-gray-500">
                    {artisan.specialite} — {artisan.localisation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BURGER */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* MENU */}
      <ul
        className={`${
          isOpen ? "flex" : "hidden"
        } md:flex flex-col md:flex-row items-center justify-end gap-4 uppercase mt-4 md:mt-0`}
      >
        {["/", "/Alimentation", "/Batiment", "/Fabrication", "/Services"].map(
          (path, index) => {
            const labels = [
              "Accueil",
              "Alimentation",
              "Bâtiment",
              "Fabrication",
              "Services",
            ];

            return (
              <li key={index}>
                <Link
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className="block px-4 py-2 hover:bg-[#005fa3] rounded-md"
                >
                  {labels[index]}
                </Link>
              </li>
            );
          }
        )}
      </ul>

      {/* ERREUR */}
      {error && (
        <p className="text-center text-red-300 mt-1">{error}</p>
      )}
    </nav>
  );
}
