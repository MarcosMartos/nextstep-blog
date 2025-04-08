import { prisma } from "../prismaClient.js";

// Obtener todos los posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los posts" });
  }
};

// Obtener un post por ID
export const getPostById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ error: "Post no encontrado" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el post" });
  }
};

// Crear un post
export const createPost = async (req, res) => {
  const { titulo, contenido, autor, imagenAutor, imagenPost, categoria } =
    req.body;
  try {
    const nuevoPost = await prisma.post.create({
      data: {
        titulo,
        contenido,
        autor,
        imagenAutor,
        imagenPost,
        categoria,
      },
    });
    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error("❌ Error al crear post:", error);
    res.status(500).json({ error: "Error al crear el post" });
  }
};

// Actualizar un post
export const updatePost = async (req, res) => {
  const id = parseInt(req.params.id);
  const data = req.body;
  try {
    const postActualizado = await prisma.post.update({ where: { id }, data });
    res.json(postActualizado);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el post" });
  }
};

// Eliminar un post
export const deletePost = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await prisma.post.delete({ where: { id } });
    res.json({ message: "Post eliminado" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};
