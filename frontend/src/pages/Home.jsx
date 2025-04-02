// src/pages/Home.jsx
import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#0F172A", textAlign: "center", px: 2 }}
    >
      {/* Logo */}
      <Box mb={6}>
        <img
          src="https://res.cloudinary.com/df4ghpsiz/image/upload/v1742661142/Group_2_ixliul.png"
          alt="Next Step Logo"
          style={{ width: "100%", maxWidth: "400px" }}
        />
      </Box>

      {/* Botones centrados y responsivos */}
      <Box
        display="flex"
        flexWrap="wrap"
        gap={2}
        justifyContent="center" // ✅ centrado horizontal
        width="100%"
      >
        <Button
          component={Link}
          to="https://marcosmartos-desarrollador-fullstack.netlify.app/"
          variant="contained"
          sx={{
            backgroundColor: "#1B3585",
            color: "#fff",
            borderRadius: "30px",
            px: 4,
            textTransform: "none",
            fontSize: "1.1rem",
            width: "200px",
          }}
        >
          Marcos Martos
        </Button>

        <Button
          component={Link}
          to="/pageposts"
          variant="outlined"
          sx={{
            color: "#f500b5",
            borderColor: "#f500b5",
            borderRadius: "30px",
            px: 4,
            textTransform: "none",
            fontSize: "1.1rem",
            width: "200px",
            "&:hover": {
              backgroundColor: "rgba(245, 0, 181, 0.1)",
              borderColor: "#f500b5",
            },
          }}
        >
          Iniciar
        </Button>
      </Box>
    </Box>
  );
}
