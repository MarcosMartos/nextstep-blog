import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import { useSearch } from "../../context/SearchContext.jsx";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  flexGrow: 1,
  maxWidth: 300,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  paddingLeft: `calc(1em + ${theme.spacing(4)})`,
}));

export default function Navbar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="static" color="primary">
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          px: 2,
        }}
      >
        {/* Imagen o Logo a la izquierda */}
        <Box
          component={Link}
          to="/pageposts"
          display="flex"
          alignItems="center"
          sx={{ flexShrink: 0 }}
        >
          <img
            src="https://res.cloudinary.com/df4ghpsiz/image/upload/v1742661142/Group_2_ixliul.png"
            alt="logo"
            height={40}
          />
        </Box>

        {/* Barra de búsqueda */}
        <Box
          sx={{ ml: isMobile ? 2 : "auto", width: isMobile ? "100%" : "auto" }}
        >
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ "aria-label": "buscar" }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Search>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
