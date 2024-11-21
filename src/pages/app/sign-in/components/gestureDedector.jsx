import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import colors from "../../../../theme/colors"; // Asegúrate de tener tu archivo de colores

const GestureButton = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/signup");
  };

  return (
    <Box
      onClick={handleNavigate} // Maneja la navegación
      sx={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        backgroundColor: "#fff",
        color: colors.primary.main,
        padding: "10px 20px",
        borderRadius: "20px", // Bordes redondeados
        fontWeight: "bold",
        textTransform: "none",
        transition: "transform 0.2s ease, background-color 0.3s ease",
     
        "&:active": {
          transform: "scale(0.95)", // Reduce ligeramente al hacer clic
        },
      }}
    >
      <Typography>Regístrate</Typography>
    </Box>
  );
};

export default GestureButton;
