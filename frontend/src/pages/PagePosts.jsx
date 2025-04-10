// src/pages/PagePosts.jsx
import {
  Box,
  Typography,
  Avatar,
  Container,
  Grid,
  CardMedia,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getPostsPaginated } from "../api/api.jsx";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext.jsx";

export default function PagePosts() {
  const [posts, setPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const { searchTerm } = useSearch();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const currentPage = parseInt(searchParams.get("page")) || 1;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await getPostsPaginated(currentPage, 10, searchTerm);
        setPosts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error al obtener los posts paginados:", error);
      }
    };

    fetchPosts();
  }, [currentPage, searchTerm]);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {posts.map((post) => (
        <Grid
          key={post.id}
          container
          spacing={2}
          direction={isMobile ? "column" : "row"}
          alignItems={isMobile ? "stretch" : "center"}
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
                height: isMobile ? 200 : 160,
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
            <Box
              display="flex"
              flexDirection={isMobile ? "column" : "row"}
              alignItems={isMobile ? "flex-start" : "center"}
              gap={1}
              mt={1}
            >
              <Avatar
                src={post.imagenAutor}
                alt={post.autor}
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="body2">{post.autor}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: isMobile ? 0 : "auto" }}
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
      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4} gap={1}>
          <Button
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setSearchParams({ page: currentPage - 1 })}
          >
            Anterior
          </Button>

          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "contained" : "outlined"}
              onClick={() => setSearchParams({ page: i + 1 })}
            >
              {i + 1}
            </Button>
          ))}

          <Button
            variant="outlined"
            disabled={currentPage === totalPages}
            onClick={() => setSearchParams({ page: currentPage + 1 })}
          >
            Siguiente
          </Button>
        </Box>
      )}
    </Container>
  );
}
