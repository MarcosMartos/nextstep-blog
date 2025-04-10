import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getPostsPaginated = (page = 1, limit = 10, searchTerm = "") =>
  API.get(
    `/posts?page=${page}&limit=${limit}&search=${encodeURIComponent(
      searchTerm
    )}`
  );

export const getPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (post) => API.post("/posts", post);
export const updatePost = (id, post) => API.put(`/posts/${id}`, post);
export const deletePost = (id) => API.delete(`/posts/${id}`);
