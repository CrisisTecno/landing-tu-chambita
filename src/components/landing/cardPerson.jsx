import React from "react";
import { Box, Typography, Grid, Divider } from "@mui/material";
import { Instagram, LinkedIn, Star } from "@mui/icons-material";
import colors from "../../theme/colors";

const ProfileCard = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        width: "40vw",
        height:"20vh",
        maxWidth: "800px",
        margin: "0 auto",
        padding: { xs: 2, sm: 4 },
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid container spacing={2} alignItems="center">
        {/* Columna izquierda: Información del perfil */}
        <Grid item xs={12} sm={4}>
          <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: colors.neutral.darkGray }}
            >
              Antonio 
            </Typography>
            <Typography
              variant="h5"
              sx={{ fontWeight: 700, color: colors.neutral.darkGray }}
            >
             Olivares
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontWeight: 400, marginTop:2,color: colors.neutral.mediumGray }}
            >
              PLOMERO
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: { xs: "center", sm: "flex-start" },
                marginTop: 1,
              }}
            >
              <Typography
                variant="body1"
                sx={{ fontWeight: 600, color: colors.primary.main, marginRight: 1 }}
              >
                4.9
              </Typography>
              {[...Array(5)].map((_, index) => (
                <Star key={index} sx={{ color: colors.accent.orange, fontSize: 20 }} />
              ))}
            </Box>
          </Box>
        </Grid>

        {/* Divisor vertical entre columnas */}
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            display: { xs: "none", sm: "block" },
            borderColor: colors.neutral.lightGray,
            marginX: 2,
          }}
        />

        {/* Columna derecha: Detalles del perfil */}
        <Grid item xs={12} sm={7}>
          <Grid container spacing={2}>
            {/* Fila 1: Especialidad y Ventas */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: colors.accent.orange, textTransform: "uppercase" }}
              >
                Categoria
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, color: colors.neutral.darkGray }}
              >
                Plomeria
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: colors.accent.orange, textTransform: "uppercase" }}
              >
                CLIENTES TOTALES
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, color: colors.neutral.darkGray }}
              >
               16
              </Typography>
            </Grid>

            {/* Divisor horizontal entre filas (en móviles) */}
            <Grid item xs={12}>
              <Divider sx={{ borderColor: colors.neutral.lightGray, display: { xs: "block", sm: "none" } }} />
            </Grid>

            {/* Fila 2: Redes Sociales y Experiencia */}
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color:colors.accent.orange, textTransform: "uppercase" }}
              >
                REDES SOCIALES
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  marginTop: 1,
                }}
              >
                <Instagram sx={{ color: "#E4405F", fontSize: 24 }} />
                <LinkedIn sx={{ color: "#0077B5", fontSize: 24 }} />
              </Box>
            </Grid>
    
            <Grid item xs={12} sm={6}>
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: colors.accent.orange, textTransform: "uppercase" }}
              >
               EXPERIENCIA
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontWeight: 700, color: colors.neutral.darkGray }}
              >
                2 Años
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfileCard;
