import React from "react";
import { Box, Typography, Button } from "@mui/material";
import colors from "../../theme/colors";
import img89 from "../../../public/assets/imgs/img89.png"; // Reemplaza con la imagen adecuada

const PromotionalBanner = () => {
  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        backgroundColor: colors.accent.orange,
        padding: { xs: 30, md:10 },
        overflow: "hidden", 
        position: "relative",
      }}
    >
      {/* Contenido textual */}
      <Box
        sx={{
          maxWidth: "50%",
          zIndex: 2,
          color: "#fff", // Texto blanco
          textAlign: { xs: "center", md: "left" }, // Centrado en móviles
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            marginBottom: 2,
            lineHeight: 1.2,
          }}
        >
          Aprovecha un <span style={{ color: colors.primary.main }}>30% de descuento</span> en TuChambita.
        </Typography>
        <Typography
          variant="body1"
          sx={{
            marginBottom: 4,
            fontWeight: 400,
            lineHeight: 1.6,
          }}
        >
          Encuentra a los mejores profesionales para tus necesidades de plomería, electricidad, carpintería y mucho más. ¡Ofertas disponibles hasta Black Friday!
        </Typography>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: colors.accent.orange,
            textTransform: "none",
            fontWeight: "bold",
            borderRadius: "8px",
            paddingX: 3,
            "&:hover": {
              backgroundColor: colors.primary.main,
              color: "#fff",
            },
          }}
        >
          Comenzar
        </Button>
      </Box>

      {/* Imagen decorativa */}


      {/* Elementos decorativos */}
      <Box
        sx={{
          position: "absolute",
          top: "10%",
          left: "-10%",
          width: "200px",
          height: "200px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          opacity: 0.1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: "5%",
          right: "-5%",
          width: "300px",
          height: "300px",
          backgroundColor: "#fff",
          borderRadius: "50%",
          opacity: 0.1,
        }}
      />
    </Box>
  );
};

export default PromotionalBanner;
