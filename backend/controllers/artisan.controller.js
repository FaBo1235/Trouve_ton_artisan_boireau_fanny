import { Artisan } from "../models/artisan.model.js";
import Fuse from "fuse.js";



// Récupérer tous les artisans
export const getAllArtisans = async (req, res) => {
  try {

    const { categorie, top } = req.query;
    const where = {};

    if (categorie) {
      where.categorie = categorie;
    }

    if (top === "true") {
      where.top = "Vrai";
    }

    const artisans = await Artisan.findAll();
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Créer un nouvel artisan
export const createArtisan = async (req, res) => {
  try {
    const newArtisan = await Artisan.create(req.body);
    res.status(201).json(newArtisan);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Rechercher des artisans par critère
export const searchArtisans = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === "") {
      return res.status(400).json({ message: "Veuillez entrer un mot-clé" });
    }

    const artisans = await Artisan.findAll(); // récupère tout pour filtrer ensuite
    const fuse = new Fuse(artisans, {
      keys: ["nom", "specialite, localoisation", "categorie"],
      threshold: 0.5, // tolérance aux fautes
      distance: 50, 
    });

    const results = fuse.search(q);
    if (results.length === 0) {
      return res.status(404).json({ message: "Aucun artisan trouvé" });
    }

    res.json(results.map((r) => r.item));
    } catch (error) {
    res.status(500).json({ message: error.message });
  }


};

// Récupérer un artisan par ID
export const getArtisanById = async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id);
    if (!artisan) {
      return res.status(404).json({ message: "Artisan non trouvé" });
    }
    res.json(artisan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


