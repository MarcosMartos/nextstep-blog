import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:4000", // o tu URL de producción
});

// export const getAllPosts = () => API.get("/posts");
export const getPostsPaginated = (page = 1, limit = 10) =>
  API.get(`/posts?page=${page}&limit=${limit}`);
export const getPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, post) => API.put(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
