import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        py: 3,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Container maxWidth="md">
        <Typography variant="body2">
          © {new Date().getFullYear()} Next Step Blog — Todos los derechos
          reservados.
        </Typography>
      </Container>
    </Box>
  );
}
