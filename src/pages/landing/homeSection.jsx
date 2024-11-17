import React from "react";
import { Box, Typography, Button, TextField } from "@mui/material";
import colors from "../../theme/colors"; // Asegúrate de tener configurado tu archivo de colores
import ProfileCard from "../../components/landing/cardPerson";
const HeroSection = () => {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        marginTop: "3vh",
        padding: { xs: 3, sm: 6 },
        backgroundColor: colors.secondary.main,
        position: "relative",
      }}
    >
      {/* Contenido de texto */}
      <Box
        sx={{
          maxWidth: { xs: "100%", md: "50%" },
          zIndex: 2,
          paddingX: { xs: 2, sm: 4 }, // Padding horizontal en textos
          textAlign: { xs: "center", md: "left" }, // Centrado en pantallas pequeñas
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            color: colors.primary.main,
            marginBottom: 1,
          }}
        >
          TuChambita
        </Typography>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: colors.neutral.darkGray,
            marginBottom: 3,
          }}
        >
          La solución confiable para servicios a domicilio
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: 400,
            color: colors.neutral.darkGray,
            marginBottom: 4,
            lineHeight: 1.6,
          }}
        >
          Encuentra a los mejores profesionales calificados para ayudarte con
          tareas como plomería, electricidad, limpieza, carpintería, y más. Con
          TuChambita, resolver tus problemas cotidianos es más fácil y seguro
          que nunca.
        </Typography>

        {/* Formulario con campo de correo y botón */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: { xs: "center", md: "flex-start" }, // Centrado en pantallas pequeñas
          }}
        >
          <TextField
            placeholder="Tu correo electrónico"
            variant="outlined"
            sx={{
              flex: 1,
              maxWidth: "300px", // Tamaño máximo del input
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
              },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.primary.main,
              textTransform: "none",
              paddingX: 4,
              fontWeight: "bold",
              borderRadius: "50px",
              "&:hover": {
                backgroundColor: colors.primary.dark,
              },
            }}
          >
            Regístrate
          </Button>
        </Box>
      </Box>

      {/* Imagen de la derecha */}
      <Box
        sx={{

          display: "flex",
          flexDirection: "column", // Alinea los elementos verticalmente
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          paddingLeft:"3vw",
          marginTop: { xs: 4, md: 0 },
          // Espaciado entre la imagen y la tarjeta de perfil
        }}
      >
        {/* Imagen */}
        <img
          src="/assets/imgs/full20.png" 
          alt="TuChambita Hero"
          style={{
            maxWidth: "50vw", // Tamaño máximo de la imagen
            objectFit: "contain",
          }}
        />

        {/* Profile Card */}

      </Box>

      {/* Fondo decorativo */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `url('/assets/tuchambita-background.svg') no-repeat center/cover`,
          zIndex: 1,
          opacity: 0.1, // Ajusta la opacidad si es necesario
        }}
      />
    </Box>
  );
};

export default HeroSection;
