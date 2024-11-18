import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Link,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import colors from "../../theme/colors";
import logo1 from "../../../public/assets/banner.png";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navLinks = [
    { label: "Inicio", href: "#incio" },
    { label: "Caracteristicas ", href: "#caracteristicas" },
    { label: "Nuestros Servicios", href: "#servicios" },
    { label: "Preguntas", href: "#preguntas" },

  ];

  const [activeLink, setActiveLink] = useState("#home");

  const handleLinkClick = (id) => {
    setActiveLink(id);
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsDrawerOpen(false); // Cierra el menú al hacer clic en un enlace
  };

  return (
    <>
      {/* Navbar principal */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: colors.secondary.main,
          borderBottom: `1px solid ${colors.primary.dark}`,
          width: "100%",
          top: 0,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", paddingX: { xs: 2, sm: 3 } }}>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
                   src={logo1}// Reemplaza con la ruta de tu logo
              alt="Everes Logo"
              style={{ height: 50, width: 100, marginRight: 20 }}
            />
          </Box>

          {/* Links de navegación para pantallas grandes */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 20 }}>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                underline="none"
                sx={{
                  color:
                    activeLink === link.href
                      ? colors.primary.main
                      : colors.neutral.darkGray,
                  fontWeight: 600,
                  position: "relative",
                  "&:hover": {
                    color: colors.primary.main,
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -5,
                    height: 2,
                    width: activeLink === link.href ? "100%" : 0,
                    backgroundColor: colors.accent.orange,
                    transition: "width 0.3s",
                  },
                }}
              >
                {link.label}
              </Link>
            ))}
          </Box>

          {/* Botón Log In */}
          <Box sx={{ display: { xs: "none", md: "block" } }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.primary.main,
                textTransform: "none",
                borderRadius: "20px",
                fontWeight: "bold",
                "&:hover": { backgroundColor: colors.primary.dark },
              }}
            >
              Log in
            </Button>
          </Box>

          {/* Icono del menú hamburguesa para pantallas pequeñas */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: colors.neutral.darkGray }}
            onClick={() => setIsDrawerOpen(!isDrawerOpen)} // Alterna el estado del menú
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer para el menú hamburguesa */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)} // Cierra el menú si se hace clic fuera
        PaperProps={{
          sx: { width: "250px", backgroundColor: colors.secondary.main },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary.main }}>
            Menu
          </Typography>
        </Box>
        <List>
          {navLinks.map((link) => (
            <ListItem
              button
              key={link.href}
              onClick={() => handleLinkClick(link.href)}
              sx={{
                color: activeLink === link.href ? colors.primary.main : colors.neutral.darkGray,
                "&:hover": { color: colors.primary.main },
              }}
            >
              <ListItemText primary={link.label} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;
