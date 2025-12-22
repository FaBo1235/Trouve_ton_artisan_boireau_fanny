import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Artisan = sequelize.define(
  "Artisan",
  {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    specialite: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    localisation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    note: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    site_web: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    top: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "Artisans",
    timestamps: false,
  }
);

