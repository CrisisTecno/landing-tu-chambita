import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  InputBase,
  Avatar,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import ExploreIcon from "@mui/icons-material/Explore";
import ContactsIcon from "@mui/icons-material/Contacts";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SidebarOption from "./slider"; // Este es tu componente de SidebarOption
import { useNavigate, useLocation } from "react-router-dom";
import colors from "../../theme/colors";

const userList = [
  { id: 1, name: "Danny Tito Fernandez", profession: "Plomero" },
  { id: 2, name: "Dani Hiller", profession: "Electricista" },
  { id: 3, name: "David Garnica", profession: "Carpintero" },
  { id: 4, name: "Dilan S. Quiñonez", profession: "Albañil" },
  { id: 5, name: "Daniel Roca Martínez", profession: "Pintor" },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ruta actual
  const [activePath, setActivePath] = useState(location.pathname);

  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      const results = userList.filter((user) =>
        user.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredResults(results);
    } else {
      setFilteredResults([]);
    }
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  const [anchorEl, setAnchorEl] = useState(null);

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
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#FFF",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mr: 2,
            cursor: "pointer",
            "&:hover": {
              opacity: 0.8,
              transition: "opacity 0.3s ease",
            },
          }}
          onClick={goToDashboard}
        >
          <img
            src="/assets/logo.png" // Reemplazar con el logo de TuChambita
            alt="Logo TuChambita"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
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

        <Search>
          {filteredResults.length > 0 && (
            <Box
              sx={{
                position: "absolute",
                top: "60px",
                left: "100%",
                transform: "translateX(-50%)",
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                width: "20vw",
                maxWidth: "50vw",
                zIndex: 1000,
              }}
            >
              <List>
                {filteredResults.map((user) => (
                  <ListItem key={user.id}>
                    <ListItemAvatar>
                      <Avatar>{user.name.charAt(0)}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={user.name}
                      secondary={user.profession}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          )}
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Buscar…"
            style={{background:"#fff", fontWeight:"bold"}}
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* Íconos de navegación */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          <SidebarOption
            icon={<HomeIcon />}
            label="Inicio"
            activate={activePath == "/dashboard"} // Activo si la ruta es dashboard
            onclick={() => {
              navigate("/dashboard");
            }}
          />
          <SidebarOption
            icon={<ExploreIcon />}
            label="Explorar"
            activate={activePath == "/explore"}
            onclick={() => {
              navigate("/explore");
            }}
          />
          <SidebarOption
            icon={<MessageIcon />}
            label="Mensajes"
            activate={activePath == "/messages"} // Activo si la ruta es messages
            onclick={() => {
              navigate("/messages");
            }}
          />
          <SidebarOption
            icon={<ContactsIcon />}
            label="Mis Contactos"
            activate={activePath == "/contacts"} // Activo si la ruta es contacts
            onclick={() => {
              navigate("/contacts");
            }}
          />
          <SidebarOption
            icon={<NotificationsIcon />}
            label="Notificaciones"
            activate={activePath == "/notifications"} // Activo si la ruta es notifications
            onclick={() => {
              navigate("/notifications");
            }}
          />
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
