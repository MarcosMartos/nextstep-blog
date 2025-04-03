import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Layout from "../components/Layout.jsx";
import PagePosts from "../pages/PagePosts";
import Post from "../components/common/Post.jsx";
import CreatePost from "../components/common/CreatePost.jsx";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<Layout />}>
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/pageposts" element={<PagePosts />} />
        <Route path="/post" element={<Post />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
