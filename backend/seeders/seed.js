// seeders/seed.js
import { sequelize } from "../config/db.js";
import { Artisan } from "../models/artisan.model.js";
import { artisanData } from "./artisanData.js";

async function seed() {
  try {
    await sequelize.authenticate();
    console.log("Connexion DB OK");

    await Artisan.destroy({ where: {} });
    console.log("Table Artisan vidée");

    // Insère les artisans
    await Artisan.bulkCreate(artisanData);
    console.log("Artisans insérés avec succès");

    process.exit();
  } catch (error) {
    console.error("Erreur seed :", error);
    process.exit(1);
  }
}

seed();

