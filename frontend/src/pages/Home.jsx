//import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ArtisanCard from '../components/ArtisanCard';

export default function Home() {
    const [artisans, setArtisans] = useState([]);

    useEffect(() => {
        fetch("https://localhost:400/api/artisans?top=true")
            .then((response) => response.json())
            .then((data) => setArtisans(data))
            .catch((error) => console.error(error));
    }, []);

    const etape = [
        { number: 1, text: "Choisir une catégorie" },
        { number: 2, text: "Choisir un artisan" },
        { number: 3, text: "Le contacter via le formulaire" },
        { number: 4, text: "Réponse sous 48h" },
    ];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-[#384050]">Comment trouver son artisan ? </h1>
            <div className="flex flex-col items-center my-24">
                    
                <div className="flex justify-center items-center w-full relative">
                    
                <div className="absolute top-1/2 left-0 w-full h-2px bg-[#0074c7] -z-10"></div>
                    {etape.map((etape, index) => (
                    <div key={index} className="flex flex-col items-center w-1/4 text-center">
                    <div className="flex items-center justify-center bg-[#0074c7] text-white rounded-full w-20 h-20 text-xl font-bold mb-3 shadow-md">
                    {etape.number}
                </div>
                <p className="text-gray-700 text-sm font-medium">{etape.text}</p>
                    </div>
                    ))}
                </div>
            </div>
            <div className=' flex flex-col  min-h-screen'>
                <div className='flex justify-start flex-col'>
                <h2 className='font-bold text-2xl text-[#384050] py-18 m-1'>Artisan du mois</h2>
                </div>
                <div>
                 <ArtisanCard artisans={artisans} />   
                </div>
            </div>
        </div>
    );
}