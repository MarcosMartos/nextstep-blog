import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // 👈 NUEVO
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
import { Delete, Edit, Add } from "@mui/icons-material";
import {
  getPostsPaginated,
  createPost,
  updatePost,
  deletePost,
} from "../../api/api.jsx";
import { useSearch } from "../../context/SearchContext.jsx";

export default function PostDashboard() {
  const location = useLocation(); // 👈
  const navigate = useNavigate(); // 👈

  // 🔒 Protección de acceso
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const key = query.get("key");
    if (key !== import.meta.env.VITE_DASHBOARD_KEY) {
      navigate("/pageposts"); // redirigir si no tiene acceso
    }
  }, [location, navigate]);

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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { searchTerm } = useSearch();

  const fetchPosts = async () => {
    try {
      const res = await getPostsPaginated(currentPage, 5, searchTerm);
      setPosts(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error("Error al obtener los posts paginados:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [currentPage, searchTerm]);

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
    <Container maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
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
              <TableCell align="center" sx={{ color: "#fff" }}>
                Título
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>
                Fecha
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>
                Autor
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>
                Categoría
              </TableCell>
              <TableCell align="center" sx={{ color: "#fff" }}>
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell align="center">{post.titulo}</TableCell>
                <TableCell align="center">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell align="center">{post.autor}</TableCell>
                <TableCell align="center">
                  <Chip label={post.categoria} color="secondary" size="small" />
                </TableCell>
                <TableCell align="center">
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

      {/* Paginación */}
      {totalPages > 1 && (
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
      )}
    </Container>
  );
}
