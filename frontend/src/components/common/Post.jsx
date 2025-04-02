// src/pages/Post.jsx
import { Box, Typography, Avatar, Container } from "@mui/material";

export default function Post() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Fecha y categoría */}
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Abril 2, 2025 / <strong>#Blog</strong>
      </Typography>

      {/* Título */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        Cómo crear un blog profesional con React y Material UI
      </Typography>

      {/* Autor */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Avatar
          alt="Marcos Martos"
          src="https://res.cloudinary.com/df4ghpsiz/image/upload/v1743633996/Dise%C3%B1o_sin_t%C3%ADtulo_khwizv.png"
        />
        <Typography variant="subtitle1" fontWeight={500}>
          Marcos Martos
        </Typography>
      </Box>

      {/* Imagen destacada */}
      <Box
        component="img"
        src="https://res.cloudinary.com/df4ghpsiz/image/upload/v1742663056/R_dzfmkc.png"
        alt="Post principal"
        sx={{
          width: "100%",
          borderRadius: 2,
          mb: 4,
        }}
      />

      {/* Contenido del post */}
      <Typography variant="h6" gutterBottom>
        React + MUI para crear interfaces modernas
      </Typography>
      <Typography variant="body1" paragraph>
        React es una de las librerías más populares para construir interfaces.
        Con la ayuda de Material UI, podemos crear componentes reutilizables con
        diseño profesional y accesible.
      </Typography>
      <Typography variant="body1" paragraph>
        En este artículo vamos a ver cómo construir un blog desde cero. Te
        mostraré cómo estructurar las rutas, crear vistas para los posts y usar
        componentes como AppBar, Cards y Typography.
      </Typography>
      <Typography variant="body1" paragraph>
        Además, aprenderás a mantener un diseño limpio y responsivo, ideal para
        una experiencia de lectura moderna tanto en escritorio como en
        dispositivos móviles.
      </Typography>
    </Container>
  );
}
