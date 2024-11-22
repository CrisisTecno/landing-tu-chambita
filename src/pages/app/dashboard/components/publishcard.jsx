import React from "react";
import { Box, Typography, Button, Chip } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import colors from "../../../../theme/colors";
import ReviewWidget from "./cardprofile"; // Componente del widget de reseña

const PublicationCard = ({
  imageUrl,
  category,
  serviceName,
  description,
  location,
  reviewData,
}) => {
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
      {/* Imagen - 40% del ancho */}
      <Box
        sx={{
          width: { xs: "100%", md: "40%" },
          height: "250px",
          background: `url(${imageUrl}) center/cover no-repeat`,
        }}
      />

      {/* Detalles - 60% del ancho */}
      <Box
        sx={{
          width: { xs: "100%", md: "60%" },
          padding: 3,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Categoría */}
        <Chip
          label={`#${category}`}
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
            variant="h6"
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              color: colors.accent.orange,
              marginBottom: 1,
            }}
          >
            {serviceName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: colors.neutral.darkGray, marginBottom: 2 }}
          >
            {description}
          </Typography>
        </Box>

        {/* Ubicación */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            marginBottom: 2,
            gap: 1,
          }}
        >
          <LocationOnIcon sx={{ color: colors.accent.orange, fontSize: "20px" }} />
          <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
            {location}
          </Typography>
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
