import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function Footer() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="bg-[#0074C7] text-white py-4">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:justify-end align-bottom gap-4 text-sm">
        {/* Desktop layout */}
        <div className="hidden md:grid md:grid-cols-4 gap-8">
            <div>
                <h3 className="font-semibold text-lg mb-2">À propos</h3>
                <p className="text-sm text-[#384050]">
                Qui sommes-nous ?<br/>
                </p>
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-2">Mentions légales</h3>
                <p className="text-sm text-[#384050]">
                CGU          
                </p>
            </div>

            <div>
                <h3 className="font-semibold text-lg mb-2">Données personnelles</h3>
                <p className="text-sm text-[#384050]">
                Que faisons-nuos de vos données ?      
                </p>
            </div>
          
            <div>
                <h3 className="font-semibold text-lg mb-2">Contact</h3>
                <p>
                    101 cours Charlemagnes<br/>
                    CS 20033<br/>
                    69269 LYON CEDEX 02<br/>
                    France<br/>
                    Tél : 04 26 72 40 00<br/>
                </p>     
            </div>
          
        </div>


        {/* Mobile layout */}
        <div className="md:hidden">
          {[
            {
              title: "À propos",
              content:
                "Qui sommes-nous ?",
            },
            {
              title: "Mentions légales",
              content: (
               "CGU"
              ),
            },
            {
              title: "Données personnelles",
              content: (
                "Que faisons-nous de vos données ?"
              ),
            },
            {
              title: "Contact",
              content: "101 cours Charlemagnes\nCS 20033\n69269 LYON CEDEX 02\nFrance\nTél : 04 26 72 40 00",
            },
          ].map((section) => (
            <div key={section.title} className="border-b border-gray-700 py-2">
              <button
                onClick={() => toggleSection(section.title)}
                className="w-full flex justify-between items-center text-left text-white font-semibold"
              >
                {section.title}
                <span className="text-xl">
                  {openSection === section.title ? "−" : "+"}
                </span>
              </button>

              {openSection === section.title && (
                <div className="mt-2 text-gray-400 text-sm">
                  {section.content}
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
          
        <div className="flex justify-center">
            <p className="text-sm text-gray-400">© 2025 Trouve ton artisan. Tous droits réservés.</p>
        </div>
    </footer>
  );
}