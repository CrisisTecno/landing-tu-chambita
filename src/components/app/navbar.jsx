import React, { useEffect, useContext, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogActions,
  Button,
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
import { UserContext } from "../../../src/context/user.provider";

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
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation(); // Hook para obtener la ruta actual
  const [activePath, setActivePath] = useState(location.pathname);

  const [searchValue, setSearchValue] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

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

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = async () => {
    try {
      await logout(); // Llama a la función de cerrar sesión
      handleMenuClose(); // Cierra el menú
      setShowLogoutDialog(true); // Abre el cuadro de diálogo de despedida
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  const closeLogoutDialog = () => {
    setShowLogoutDialog(false);
    navigate("/"); // Redirige a la página de inicio
  };

  const isMenuOpen = Boolean(anchorEl);

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ mt: 3 }}
    >
      <MenuItem onClick={goToProfile}>Mi Perfil</MenuItem>
      <MenuItem
        onClick={handleLogout}
        sx={{
          color: "#ff0000",
          "&:hover": {
            backgroundColor: "#ffe6e6",
          },
        }}
      >
        Cerrar Sesión
      </MenuItem>
    </Menu>
  );

  return (
    <>
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
              style={{ background: "#fff", fontWeight: "bold" }}
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Íconos de navegación */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <SidebarOption
              icon={<HomeIcon />}
              label="Inicio"
              activate={activePath == "/dashboard"}
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
              activate={activePath == "/messages"}
              onclick={() => {
                navigate("/messages");
              }}
            />
            <SidebarOption
              icon={<ContactsIcon />}
              label="Mis Contactos"
              activate={activePath == "/contacts"}
              onclick={() => {
                navigate("/contacts");
              }}
            />
            <SidebarOption
              icon={<NotificationsIcon />}
              label="Notificaciones"
              activate={activePath == "/notifications"}
              onclick={() => {
                navigate("/notifications");
              }}
            />
          </Box>

          {/* Ícono de perfil */}
          <Box>
            <SidebarOption
              icon={<AccountCircleIcon />}
              label="Yo"
              activate={activePath == "/profile"}
              onclick={handleProfileMenuOpen}
            />
          </Box>
        </Toolbar>

        {/* Menú de perfil */}
        {renderMenu}
      </AppBar>

      {/* Cuadro de diálogo de despedida */}
      <Dialog
  open={showLogoutDialog}
  onClose={closeLogoutDialog}
  PaperProps={{
    sx: {
      padding: 3, // Padding interno para el contenido del diálogo
      display: "flex",
      flexDirection: "column",
      alignItems: "center", // Centra el contenido horizontalmente
      justifyContent: "center", // Centra el contenido verticalmente
      textAlign: "center", // Asegura que todo el texto esté centrado
    },
  }}
>
  <DialogContent>
    <Typography
      variant="h6"
      sx={{
        fontWeight: "bold",
        color: colors.accent.orange,
        marginBottom: 1, // Espaciado entre las líneas
      }}
    >
      ¡Gracias por usar TuChambita!
    </Typography>
    <Typography
      variant="body1"
      sx={{
        color: colors.neutral.darkGray,
        marginBottom: 1,
      }}
    >
      Esperamos verte pronto nuevamente.
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button
      onClick={closeLogoutDialog}
      sx={{
        backgroundColor: colors.accent.orange,
        color: "#fff",
        paddingLeft:"3vw",
        paddingRight:"3vw",
        borderRadius:"2vw",
        textTransform: "none",
        fontWeight: "bold",
        "&:hover": { backgroundColor: colors.accent.orangeHover },
      }}
    >
      Bye Bye
    </Button>
  </DialogActions>
</Dialog>

    </>
  );
};

export default Navbar;
