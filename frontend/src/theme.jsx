// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1B3585", // azul del logo
    },
    secondary: {
      main: "#B0B8D1", // gris claro para detalles
    },
    background: {
      default: "#0F172A", // un fondo oscuro profundo
      paper: "#1E293B", // para tarjetas, appbars, etc.
      azul: "#3B82F6", // azul más claro para detalles
    },
    text: {
      primary: "#FFFFFF", // texto principal
      secondary: "#B0B8D1", // texto más suave
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});

export default theme;
