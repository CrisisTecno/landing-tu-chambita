import React from "react";
import { Box, Typography, Paper, Avatar, Divider, Button } from "@mui/material";
import colors from "../../../../theme/colors";

const ProfileSection = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Avatar y nombre del usuario */}
      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        <Avatar
          src="/path-to-profile-image.jpg" // Cambiar por la imagen del usuario
          sx={{ width: 80, height: 80, margin: "0 auto", marginBottom: 1 }}
        />
        <Typography variant="h6" fontWeight="bold">
          Cristian Lucio
        </Typography>
        <Typography variant="body2" color={colors.neutral.mediumGray}>
          Frontend Developer
        </Typography>
      </Box>

      <Divider sx={{ marginY: 2 }} />

      {/* Detalles del perfil */}
      <Box>
        <Typography variant="body2" fontWeight="bold" sx={{ marginBottom: 1 }}>
          Categoría:
        </Typography>
        <Typography variant="body2" color={colors.neutral.darkGray}>
          Plomería, Electricidad
        </Typography>

        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ marginTop: 2, marginBottom: 1 }}
        >
          Calificación:
        </Typography>
        <Typography variant="body2" color={colors.accent.orange}>
          ⭐ 4.9 (120 reseñas)
        </Typography>

        <Button
          fullWidth
          variant="contained"
          sx={{
            backgroundColor: colors.accent.orange,
            color: "#fff",
            borderRadius:"12px",
            textTransform: "none",
            marginTop: 3,
          
          }}
        >
          Editar Perfil
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfileSection;
