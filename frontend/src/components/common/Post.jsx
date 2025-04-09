// src/pages/Post.jsx
import { Box, Typography, Avatar, Container } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../../api/api.jsx";
import ReactMarkdown from "react-markdown";

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
      <Typography
        variant="caption"
        sx={{
          display: "block",
          fontSize: "0.85rem",
          letterSpacing: 0.5,
          textTransform: "uppercase",
          color: "text.secondary",
          mb: 1,
        }}
      >
        {new Date(post.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}{" "}
        / <strong style={{ color: "#3f51b5" }}>#{post.categoria}</strong>
      </Typography>

      <Typography
        variant="h3"
        component="h1"
        sx={{
          fontWeight: 800,
          lineHeight: 1.2,
          mb: 3,
          color: "primary",
        }}
      >
        {post.titulo}
      </Typography>

      <Box display="flex" alignItems="center" gap={2} mb={4}>
        <Avatar
          alt={post.autor}
          src={post.imagenAutor}
          sx={{ width: 64, height: 64 }}
        />
        <Typography variant="h6" fontWeight={600}>
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
      <ReactMarkdown
        children={post.contenido}
        components={{
          p: ({ node, ...props }) => (
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.4rem",
                lineHeight: 2,
                color: "text.primary",
                my: 1.5, // margen superior e inferior controlado
              }}
              {...props}
            />
          ),

          a: ({ node, ...props }) => (
            <a
              style={{
                color: "#0070f3",
                textDecoration: "underline",
                fontWeight: 500,
              }}
              {...props}
            />
          ),
          code: ({ inline, ...props }) => {
            return inline ? (
              <code
                style={{
                  backgroundColor: "#2d2d2d", // fondo oscuro
                  color: "#f8f8f2", // texto claro
                  padding: "2px 6px",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                  fontSize: "0.95rem",
                }}
                {...props}
              />
            ) : (
              <pre
                style={{
                  backgroundColor: "#2d2d2d",
                  color: "#f8f8f2",
                  padding: "16px",
                  borderRadius: "6px",
                  overflowX: "auto",
                  fontFamily: "monospace",
                  fontSize: "0.95rem",
                  marginTop: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <code {...props} />
              </pre>
            );
          },
          li: ({ node, ...props }) => (
            <li
              style={{
                fontSize: "1.2rem",
                lineHeight: 1.8,
                marginBottom: "0.5rem",
                marginLeft: "1.5rem",
              }}
              {...props}
            />
          ),
        }}
      />
    </Container>
  );
}
