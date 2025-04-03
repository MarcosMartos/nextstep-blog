// src/pages/CreatePost.jsx
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function CreatePost() {
  const [postData, setPostData] = useState({
    date: "",
    category: "",
    title: "",
    author: "",
    authorImage: "",
    image: "",
    subtitle: "",
    content: "",
  });

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Post creado:", postData);
    // Aquí podrías enviar `postData` a un backend o almacenarlo en localStorage
  };

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>
        Crear nuevo post
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={3}>
          <TextField
            label="Fecha"
            name="date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={postData.date}
            onChange={handleChange}
          />
          <TextField
            label="Categoría (ej: Blog)"
            name="category"
            fullWidth
            value={postData.category}
            onChange={handleChange}
          />
          <TextField
            label="Título"
            name="title"
            fullWidth
            value={postData.title}
            onChange={handleChange}
          />
          <TextField
            label="Subtítulo"
            name="subtitle"
            fullWidth
            value={postData.subtitle}
            onChange={handleChange}
          />
          <TextField
            label="Autor"
            name="author"
            fullWidth
            value={postData.author}
            onChange={handleChange}
          />
          <TextField
            label="URL de imagen del autor"
            name="authorImage"
            fullWidth
            value={postData.authorImage}
            onChange={handleChange}
          />
          <TextField
            label="URL de imagen destacada del post"
            name="image"
            fullWidth
            value={postData.image}
            onChange={handleChange}
          />
          <TextField
            label="Contenido del post"
            name="content"
            multiline
            rows={6}
            fullWidth
            value={postData.content}
            onChange={handleChange}
          />

          <Button type="submit" variant="contained" color="primary">
            Crear Post
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
