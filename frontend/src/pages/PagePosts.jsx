// src/pages/PagePosts.jsx
import {
  Box,
  Typography,
  Avatar,
  Container,
  Grid,
  CardMedia,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllPosts } from "../api/api.jsx"; // ajustá el path si cambia
import { Link } from "react-router-dom";

export default function PagePosts() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

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

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {currentPosts.map((post) => (
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

      {/* Paginación */}
      <Box display="flex" justifyContent="center" mt={4} gap={1}>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
        >
          Anterior
        </Button>

        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "contained" : "outlined"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}

        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
        >
          Siguiente
        </Button>
      </Box>
    </Container>
  );
}
