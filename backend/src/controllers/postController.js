import { prisma } from "../prismaClient.js";

// Obtener todos los posts
// export const getAllPosts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     const posts = await prisma.post.findMany({
//       skip,
//       take: limit,
//       orderBy: { createdAt: "desc" },
//     });

//     const total = await prisma.post.count();

//     res.json({
//       data: posts,
//       currentPage: page,
//       totalPages: Math.ceil(total / limit),
//       totalPosts: total,
//     });
//   } catch (error) {
//     console.error("Error al obtener los posts paginados:", error);
//     res.status(500).json({ error: "Error al obtener los posts paginados" });
//   }
// };
// Obtener todos los posts con paginación y búsqueda
export const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const search = req.query.search || "";

    const where = search
      ? {
          OR: [
            { titulo: { contains: search, mode: "insensitive" } },
            { autor: { contains: search, mode: "insensitive" } },
            { categoria: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const posts = await prisma.post.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    const total = await prisma.post.count({ where });

    res.json({
      data: posts,
      currentPage: page,
      totalPages: Math.ceil(total / limit),
      totalPosts: total,
    });
  } catch (error) {
    console.error("Error al obtener los posts paginados:", error);
    res.status(500).json({ error: "Error al obtener los posts paginados" });
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
