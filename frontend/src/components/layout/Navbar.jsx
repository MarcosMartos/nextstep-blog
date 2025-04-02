import { AppBar, Toolbar, Typography, InputBase, Box } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: "auto",
  width: "100%",
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
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* Imagen o Logo a la izquierda */}
        <Box display="flex" alignItems="center">
          <img
            src="https://res.cloudinary.com/df4ghpsiz/image/upload/v1742661142/Group_2_ixliul.png"
            alt="logo"
            height={40}
          />
        </Box>

        {/* Barra de búsqueda a la derecha */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar…"
            inputProps={{ "aria-label": "buscar" }}
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
