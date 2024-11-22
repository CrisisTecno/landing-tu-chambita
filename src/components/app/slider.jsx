import React from "react";
import { Box, Typography } from "@mui/material";
import colors from "../../theme/colors"; // Importa tus colores personalizados

const SidebarOption = ({ icon, label, onclick, activate }) => {

  return (
    <Box
      onClick={onclick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "12px 20px",
        borderRadius: "24px", // Botón redondeado
        cursor: "pointer",
        transition: "all 0.3s ease", // Animación suave
        backgroundColor: activate ? colors.primary.light : "transparent", // Fondo cuando está activo
        "&:hover": {
          backgroundColor: colors.primary.light, // Fondo del botón al hover
        },
        "&:hover .icon": {
          backgroundColor: "#fff", // Fondo del ícono al hover
          color: colors.accent.orange,
        },
        "&:hover .label": {
          color: colors.accent.orange, // Cambiar color del texto al hover
        },
      }}
    >
      {/* Ícono */}
      <Box
        className="icon" // Clase específica para aplicar estilos de hover
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: activate ? "#fff" : colors.accent.blue, // Fondo del ícono cuando está activo
          color: activate ? colors.accent.orange : "#3c3c3c", // Color del ícono cuando está activo
          width: "36px",
          height: "36px",
          borderRadius: "50%", // Ícono circular
          transition: "all 0.3s ease", // Animación suave
        }}
      >
        {icon}
      </Box>

      {/* Etiqueta */}
      <Typography
        className="label" // Clase específica para aplicar estilos de hover
        sx={{
          fontSize: "16px",
          fontWeight: "bold",
          color: activate ? colors.accent.orange : "#3c3c3c", // Color del texto cuando está activo
          transition: "color 0.3s ease", // Animación de color
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default SidebarOption;
