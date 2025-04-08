import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // o tu URL de producción
});

export const getAllPosts = () => API.get("/posts");
export const getPostById = (id) => API.get(`/posts/${id}`);

// Para implementar la creación, actualización y eliminación de publicaciones, puedes descomentar las siguientes líneas y ajustar según tus necesidades:
// export const createPost = (post) => API.post("/posts", post);
// export const updatePost = (id, post) => API.put(`/posts/${id}`, post);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
