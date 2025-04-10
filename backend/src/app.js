import express from "express";
import dotenv from "dotenv";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
const PORT = process.env.PORT || 4000;

app.use(express.json());

// Ruta de prueba para que Railway detecte que está corriendo
app.get("/", (req, res) => {
  res.send("¡La API está funcionando correctamente! 🚀");
});

app.use("/posts", postRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
