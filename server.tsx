import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import fetch from "node-fetch"; // Para hacer peticiones HTTP

dotenv.config();
const app = express();
const PORT: number = Number(process.env.PORT) || 5000;
const API_BASE_URL: string = process.env.API_BASE_URL || "";

app.use(express.json());
app.use(cors());

// 🔹 Registro de usuario (redirige a Koyeb)
app.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// 🔹 Login de usuario (redirige a Koyeb)
app.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Iniciar servidor
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`));
