// src/pages/PostDashboard.jsx
import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import { Delete, Edit, Add, Visibility } from "@mui/icons-material";
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
} from "../../api/api.jsx";

export default function PostDashboard() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    contenido: "",
    autor: "",
    imagenAutor: "",
    imagenPost: "",
    categoria: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const fetchPosts = async () => {
    const res = await getAllPosts();
    setPosts(res.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updatePost(editingId, form);
    } else {
      await createPost(form);
    }
    setForm({
      titulo: "",
      contenido: "",
      autor: "",
      imagenAutor: "",
      imagenPost: "",
      categoria: "",
    });
    setEditingId(null);
    setOpenDialog(false);
    fetchPosts();
  };

  const handleEdit = (post) => {
    setForm(post);
    setEditingId(post.id);
    setOpenDialog(true);
  };

  const handleDelete = async (id) => {
    await deletePost(id);
    fetchPosts();
  };

  const handleCreate = () => {
    setForm({
      titulo: "",
      contenido: "",
      autor: "",
      imagenAutor: "",
      imagenPost: "",
      categoria: "",
    });
    setEditingId(null);
    setOpenDialog(true);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>

      {/* Botón flotante para abrir formulario de creación */}
      <Fab
        color="success"
        aria-label="add"
        onClick={handleCreate}
        sx={{ position: "fixed", bottom: 32, right: 32 }}
      >
        <Add />
      </Fab>

      {/* Popup del formulario */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {editingId ? "Editar Post" : "Crear Nuevo Post"}
        </DialogTitle>
        <Box component="form" onSubmit={handleSubmit}>
          <DialogContent
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            {Object.entries(form).map(([field, value]) => (
              <TextField
                key={field}
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                name={field}
                value={value}
                onChange={handleChange}
                fullWidth
                multiline={field === "contenido"}
                minRows={field === "contenido" ? 4 : 1}
              />
            ))}
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => setOpenDialog(false)}>
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="success">
              {editingId ? "Actualizar" : "Crear"}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Tabla de posts */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#2c3e50" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>ID</TableCell>
              <TableCell sx={{ color: "#fff" }}>Título</TableCell>
              <TableCell sx={{ color: "#fff" }}>Fecha</TableCell>
              <TableCell sx={{ color: "#fff" }}>Autor</TableCell>
              <TableCell sx={{ color: "#fff" }}>Categoría</TableCell>
              <TableCell sx={{ color: "#fff" }}>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post, index) => (
              <TableRow key={post.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{post.titulo}</TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                </TableCell>
                <TableCell>{post.autor}</TableCell>
                <TableCell>
                  <Chip label={post.categoria} color="secondary" size="small" />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleEdit(post)} color="warning">
                    <Edit />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(post.id)}
                    color="error"
                  >
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
