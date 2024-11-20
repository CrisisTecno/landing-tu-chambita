import React from "react";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import colors from "../../theme/colors";

const NavbarButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/signin"); // Navega a la página de inicio de sesión
  };

  return (
    <Box sx={{ display: { xs: "none", md: "block" } }}>
      <Button
        variant="contained"
        onClick={handleNavigate} // Agregar navegación al hacer clic
        sx={{
          backgroundColor: colors.primary.main,
          textTransform: "none",
          borderRadius: "20px",
          fontWeight: "bold",
          "&:hover": { backgroundColor: colors.primary.dark },
        }}
      >
        Ingresar
      </Button>
    </Box>
  );
};

export default NavbarButton;
