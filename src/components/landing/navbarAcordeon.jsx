import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Link,
  IconButton,
  Drawer,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import colors from "../../theme/colors";

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#home");

  // Estado para controlar qué acordeón está abierto
  const [expanded, setExpanded] = useState(false);

  const handleAccordionToggle = (panel) => {
    setExpanded(expanded === panel ? false : panel);
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "#services" },
    { label: "Teams", href: "#teams" },
    { label: "Contact US", href: "#contact" },
  ];

  const handleLinkClick = (id) => {
    setActiveLink(id);
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsDrawerOpen(false); // Cierra el menú en dispositivos pequeños
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
              src="/assets/banner.png" // Reemplaza con la ruta de tu logo
              alt="Everes Logo"
              style={{ height: 50, width: 100, marginRight: 20 }}
            />
          </Box>

          {/* Links de navegación para pantallas grandes */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 4 }}>
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
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer con Acordeón Directo */}
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        PaperProps={{
          sx: { width: "100%", maxWidth: 300, backgroundColor: colors.secondary.main },
        }}
      >
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: colors.primary.main, mb: 2 }}>
            Menu
          </Typography>

          {/* Acordeón de Navegación */}
          <Accordion
            expanded={expanded === "panel1"}
            onChange={() => handleAccordionToggle("panel1")}
            sx={{
              backgroundColor: colors.secondary.main,
              boxShadow: "none",
              borderBottom: `1px solid ${colors.neutral.lightGray}`,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon sx={{ color: colors.primary.main }} />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={{ fontWeight: 600, color: colors.neutral.darkGray }}>
                Navigation
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {navLinks.map((link) => (
                  <ListItem
                    button
                    key={link.href}
                    onClick={() => handleLinkClick(link.href)}s
                    sx={{
                      color:
                        activeLink === link.href
                          ? colors.primary.main
                          : colors.neutral.darkGray,
                      "&:hover": { color: colors.primary.main },
                    }}
                  >
                    <ListItemText primary={link.label} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
