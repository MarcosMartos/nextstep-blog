// src/pages/PagePosts.jsx
import {
  Box,
  Typography,
  Avatar,
  Container,
  Grid,
  CardMedia,
} from "@mui/material";

const posts = [
  {
    id: 1,
    title: "How to Deploy a Node.js Application on AWS",
    category: "AWS",
    image:
      "https://res.cloudinary.com/df4ghpsiz/image/upload/v1742663056/R_dzfmkc.png",
    author: { name: "Oluwatobi", avatar: "https://i.pravatar.cc/150?img=10" },
    time: "6 hours ago",
  },
  {
    id: 2,
    title: "Code a full stack Instagram Clone with...",
    category: "LARAVEL",
    image:
      "https://res.cloudinary.com/df4ghpsiz/image/upload/v1742663056/R_dzfmkc.png",
    author: { name: "Beau Carnes", avatar: "https://i.pravatar.cc/150?img=32" },
    time: "8 hours ago",
  },
  {
    id: 3,
    title: "Fetch API vs. Axios vs. Alova: Which HTTP...",
    category: "ALOVA",
    image:
      "https://res.cloudinary.com/df4ghpsiz/image/upload/v1742663056/R_dzfmkc.png",
    author: { name: "Abdullah", avatar: "https://i.pravatar.cc/150?img=12" },
    time: "8 hours ago",
  },
];

export default function PagePosts() {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {posts.map((post) => (
        <Grid
          key={post.id}
          container
          spacing={2}
          alignItems="center"
          sx={{ mb: 4, borderBottom: "1px solid #ccc", pb: 2 }}
        >
          {/* Imagen */}
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              image={post.image}
              alt={post.title}
              sx={{
                width: "100%",
                borderRadius: 1,
                maxHeight: 160,
                objectFit: "cover",
              }}
            />
          </Grid>

          {/* Info del post */}
          <Grid item xs={12} sm={8}>
            <Typography variant="caption" color="text.secondary">
              #{post.category.toUpperCase()}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {post.title}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Avatar
                src={post.author.avatar}
                alt={post.author.name}
                sx={{ width: 24, height: 24 }}
              />
              <Typography variant="body2">{post.author.name}</Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ ml: "auto" }}
              >
                {post.time}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      ))}
    </Container>
  );
}
