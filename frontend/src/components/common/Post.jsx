// src/pages/Post.jsx
import { Box, Typography, Avatar, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../../api/api.jsx";

export default function Post() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const res = await getPostById(id);
        setPost(res.data);
      } catch (err) {
        console.error("Error al cargar post", err);
      }
    };

    loadPost();
  }, [id]);

  if (!post) return <Typography p={4}>No existe este post</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      {/* Fecha y categoría */}
      <Typography variant="body2" color="text.secondary" gutterBottom>
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        / <strong>#{post.categoria}</strong>
      </Typography>

      {/* Título */}
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{ fontWeight: 700 }}
      >
        {post.titulo}
      </Typography>

      {/* Autor */}
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Avatar alt={post.autor} src={post.imagenAutor} />
        <Typography variant="subtitle1" fontWeight={500}>
          {post.autor}
        </Typography>
      </Box>

      {/* Imagen destacada */}
      <Box
        component="img"
        src={post.imagenPost}
        alt="Post principal"
        sx={{
          width: "100%",
          borderRadius: 2,
          mb: 4,
        }}
      />

      {/* Contenido */}
      <Typography variant="body1" paragraph>
        {post.contenido}
      </Typography>
    </Container>
  );
}
