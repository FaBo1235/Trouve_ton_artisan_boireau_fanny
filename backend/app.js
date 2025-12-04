import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import artisanRoutes from "./routes/artisan.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));
app.use(express.json());

// Routes
app.use("/api/artisans", artisanRoutes);

// Synchronisation de la base
sequelize.sync({ alter: true })
  .then(() => console.log("Base de données synchronisée"))
  .catch(err => console.error("Erreur de connexion à la base :", err));

// Lancement du serveur
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Serveur backend lancé sur le port ${PORT}`));
