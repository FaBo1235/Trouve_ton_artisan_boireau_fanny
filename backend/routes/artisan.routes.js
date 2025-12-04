import express from "express";
import { getAllArtisans, createArtisan, searchArtisans, getArtisanById } from "../controllers/artisan.controller.js";

const router = express.Router();

// Routes disponibles
router.get("/", getAllArtisans);   // Récupérer tous les artisans
router.post("/", createArtisan);   // Ajouter un artisan
router.get("/search", searchArtisans); // Rechercher des artisans par critère
router.get("/:id", getArtisanById); // Récupérer un artisan par ID

export default router;
