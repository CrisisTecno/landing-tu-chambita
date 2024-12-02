import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import colors from "../../theme/colors";

const Features = () => {
  const features = [
    {
      icon: (
        <HeadsetMicIcon sx={{ fontSize: 40, color: colors.accent.orange }} />
      ),
      title: "Soporte 24/7",
      description:
        "Nuestro equipo de soporte está disponible las 24 horas para ayudarte en cualquier momento.",
    },
    {
      icon: (
        <CreditCardIcon sx={{ fontSize: 40, color: colors.accent.orange }} />
      ),
      title: "Pagos protegidos siempre",
      description:
        "Nuestro personal ha sido previamente calificado, y TuChambita garantiza la seguridad en los pagos.",
    },
    {
      icon: (
        <ThumbUpIcon sx={{ fontSize: 40, color: colors.accent.orange }} />
      ),
      title: "Trabajo de calidad garantizada",
      description:
        "Encuentra profesionales previamente seleccionados para comenzar tu proyecto con rapidez y excelencia.",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: "#FFF",
        padding: { xs: 4, sm: 8 },
        textAlign: "center",
      }}
    >
      {/* Título */}
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: colors.primary.main,
          marginBottom: 3,
        }}
      >
        ¿Qué ofrece TuChambita?
      </Typography>
      <Typography
        variant="body1"
        sx={{
          maxWidth: "600px",
          margin: "0 auto",
          marginBottom: 5,
          color: colors.neutral.darkGray,
          lineHeight: 1.6,
        }}
      >
        En TuChambita nos enfocamos en ofrecer servicios confiables y de alta
        calidad. Aquí tienes tres razones por las que somos tu mejor elección.
      </Typography>

      {/* Tarjetas de características */}
      <Grid container spacing={3} justifyContent="center">
        {features.map((feature, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
            sx={{
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)", // Efecto de hover
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                borderRadius: "16px", // Mejora la apariencia de las tarjetas
                backgroundColor: "#fff",
                textAlign: "center",
                
              }}
            >
              {/* Ícono */}
              <Box sx={{ marginBottom: 2 }}>{feature.icon}</Box>
              {/* Título */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  marginBottom: 1,
                }}
              >
                {feature.title}
              </Typography>
              {/* Descripción */}
              <Typography
                variant="body2"
                sx={{
                  color: colors.neutral.darkGray,
               
                }}
              >
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Features;
