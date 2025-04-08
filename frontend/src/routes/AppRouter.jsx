import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout.jsx";
import PagePosts from "../pages/PagePosts";
import Post from "../components/common/Post.jsx";
import PostDashboard from "../components/common/Dashboard.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<PostDashboard />} />
        <Route path="/pageposts" element={<PagePosts />} />
        <Route path="/post/:id" element={<Post />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
