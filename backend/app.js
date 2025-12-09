import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js";
import artisanRoutes from "./routes/artisan.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test route (important pour Railway)
app.get("/", (req, res) => {
  res.json({ message: "API en ligne" });
});

// Routes API
app.use("/api/artisans", artisanRoutes);

// Connexion DB + lancement serveur
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connexion DB OK");


    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
      console.log("Server running on port " + PORT)
    );
  } catch (error) {
    console.error("Erreur DB :", error);
  }
}

startServer();


