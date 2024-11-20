import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  InputBase,
  Badge,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";

import PeopleIcon from "@mui/icons-material/People";
import ExploreIcon from '@mui/icons-material/Explore';
import ContactsIcon from '@mui/icons-material/Contacts';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


import WorkIcon from "@mui/icons-material/Work";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SidebarOption from "./slider";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
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
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ mt: 3 }}
    >
      <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#FFF",borderRadius:"12px" }}>
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center", mr: 2 ,}}>
          <img
            src="/assets/logo.png" // Reemplazar con el logo de TuChambita
            alt="Logo TuChambita"
            style={{ width: "40px", height: "40px",borderRadius:"50%" }}
          />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ marginLeft: 1, color: "#000", fontWeight: "bold" }}
          >
            TuChambita
          </Typography>
        </Box>

        {/* Barra de búsqueda */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Buscar…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Íconos de navegación */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>




        <SidebarOption icon={<HomeIcon />} label="Inicio" />
        <SidebarOption icon={<ExploreIcon />} label="Explorar" />
        <SidebarOption icon={<MessageIcon />} label="Mensajes" />
        <SidebarOption icon={<ContactsIcon />} label="Mis Contactos" />
 
        <SidebarOption icon={<NotificationsIcon />} label="Notificaciones" />


        </Box>

        {/* Ícono de perfil */}
        <Box sx={{ ml: "auto" }}>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
    
            onClick={handleProfileMenuOpen}
          >
            <AccountCircleIcon />
            <Typography sx={{ fontSize: "12px", color: "#000", ml: 0.5 }}>
              Yo
            </Typography>
          </IconButton>
        </Box>
      </Toolbar>

      {/* Menú de perfil */}
      {renderMenu}
    </AppBar>
  );
};

export default Navbar;
