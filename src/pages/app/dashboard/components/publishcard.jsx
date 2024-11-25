import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import colors from "../../../../theme/colors";
import ReviewWidget from "./cardprofile"; // Componente del widget de reseña

const PublicationCard = ({
  imageUrl,
  categories, // Array de categorías
  serviceName,
  description,
  location,
  reviewData,
  fechaDeCreacion, // Timestamp de Firestore
}) => {
  // **Preparación de las categorías**
  const formattedCategories =
    Array.isArray(categories) && categories.length > 0
      ? categories.join(" #")
      : "Sin categorías";

  // **Formateo de la fecha de creación**
  const formatDate = (timestamp) => {
    if (!timestamp) return "Sin fecha";

    // Convertimos el timestamp de Firestore a un objeto `Date`
    const date = timestamp.toDate(); // Método Firestore
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        border: `1px solid ${colors.neutral.lightGray}`,
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#fff",
        maxWidth: "100%",
        margin: "auto",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      {/* Imagen */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          height: "250px",
          background: `url(${imageUrl}) center/cover no-repeat`,
        }}
      />

      {/* Detalles */}
      <Box
        sx={{
          width: { xs: "100%", md: "60%" },
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Categorías */}
        <Chip
          label={`#${formattedCategories}`} // Categorías formateadas
          sx={{
            backgroundColor: colors.primary.main,
            color: "#fff",
            fontWeight: "bold",
            fontSize: "14px",
            marginBottom: 2,
          }}
        />

        {/* Título y descripción */}
        <Box>
          <ReviewWidget {...reviewData} />
          <Typography
            variant="body2"
            sx={{
              color: colors.neutral.darkGray,
              marginBottom: 2,
              fontSize: 18,
              marginRight: 2,
              marginLeft: 2,
            }}
          >
            {description}
          </Typography>
        </Box>

        {/* Fecha de creación y ubicación */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between", // Separar elementos
            alignItems: "center",
            textAlign: "center",
            marginBottom: 2,
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ color: colors.neutral.darkGray , marginRight: 2,
              marginLeft: 2,}}>
            {fechaDeCreacion ? formatDate(fechaDeCreacion) : "Sin fecha"} {/* Formatear la fecha */}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LocationOnIcon sx={{ color: colors.accent.orange, fontSize: "20px" }} />
            <Typography variant="body2" sx={{ color: colors.neutral.darkGray , marginRight: 2,
              marginLeft: 2,}}>
              {location || "Ubicación no disponible"}
            </Typography>
          </Box>
        </Box>

        {/* Botón CTA */}
        <Box>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: colors.accent.orange,
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              borderRadius: "8px",
            }}
          >
            Solicitar Servicio
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default PublicationCard;
