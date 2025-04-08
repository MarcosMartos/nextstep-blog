// src/pages/PagePosts.jsx
import {
  Box,
  Typography,
  Avatar,
  Container,
  Grid,
  CardMedia,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPosts } from "../api/api.jsx"; // ajustá el path si cambia
import { Link } from "react-router-dom";

export default function PagePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getAllPosts();
        setPosts(res.data);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {posts.map((post) => (
        <Grid
          key={post.id}
          container
          spacing={2}
          alignItems="center"
          sx={{ mb: 4, borderBottom: "1px solid #ccc", pb: 2 }}
        >
          {/* Imagen */}
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              image={post.imagenPost}
              alt={post.titulo}
              sx={{
                width: "100%",
                borderRadius: 1,
                maxHeight: 160,
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* Info del post */}
          <Grid item xs={12} sm={8}>
            <Typography variant="caption" color="text.secondary">
              #{post.categoria.toUpperCase()}
            </Typography>
            <Link
              to={`/post/${post.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {post.titulo}
              </Typography>
            </Link>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Avatar
                src={post.imagenAutor}
                alt={post.autor}
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="body2">{post.autor}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: "auto" }}
              >
                {/* Formateo de la fecha */}
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
}
