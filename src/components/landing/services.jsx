import React from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import PlumbingIcon from "@mui/icons-material/Plumbing";
import ElectricalServicesIcon from "@mui/icons-material/ElectricalServices";
import CleaningServicesIcon from "@mui/icons-material/CleaningServices";
import AddIcon from "@mui/icons-material/Add";
import colors from "../../theme/colors";

const services = [
  {
    title: "Plomería",
    description: "Reparaciones de fugas, instalaciones de griferías, mantenimiento y más.",
    icon: <PlumbingIcon sx={{ fontSize: 40, color: colors.accent.orange }} />,
  },
  {
    title: "Electricidad",
    description: "Soluciones rápidas para cortocircuitos, instalaciones y mantenimiento eléctrico.",
    icon: <ElectricalServicesIcon sx={{ fontSize: 40, color: colors.accent.orange }} />,
  },
  {
    title: "Limpieza",
    description: "Limpieza profunda, mantenimiento de hogares y oficinas.",
    icon: <CleaningServicesIcon sx={{ fontSize: 40, color: colors.accent.orange }} />,
  },
  {
    title: "Más Servicios",
    description: "Explora más servicios disponibles en nuestra plataforma.",
    icon: <AddIcon sx={{ fontSize: 40, color:colors.accent.orange }} />,
  },
];

const Services = () => {
  return (
    <Box
      component="section"
      sx={{
        padding: { xs: 4, sm: 8 },
        backgroundColor: "#fff",
        textAlign: "center",
      }}
    >
      {/* Título y descripción */}
      <Box sx={{ marginBottom: 6, textAlign: { xs: "center", md: "center" }, }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: colors.primary.main,
            marginBottom: 2,
          }}
        >
          Nuestros Servicios
        </Typography>
        <Typography
          variant="body1"
         
          sx={{
            maxWidth: "100vw",
            
            color: colors.neutral.darkGray,
            lineHeight: 1.6,
          }}
        >
          Con nuestros servicios, te conectamos con los mejores profesionales
          para ayudarte con tareas esenciales de tu hogar o negocio.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "center" },
            gap: 2,
            marginTop: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: colors.primary.main,
                borderRadius: "50%",
              }}
            ></span>
            <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
              Confianza
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span
              style={{
                width: "10px",
                height: "10px",
                backgroundColor: colors.primary.main,
                borderRadius: "50%",
              }}
            ></span>
            <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
              Calidad
            </Typography>
          </Box>
        </Box>
     
      </Box>

      {/* Cuadros de servicios */}
      <Grid container spacing={4}>
        {services.map((service, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                padding: 4,
                borderRadius: "16px",
                textAlign: "center",
                backgroundColor: "#fff",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              {/* Ícono */}
              <Box sx={{ marginBottom: 2 }}>{service.icon}</Box>
              {/* Título */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: colors.primary.main,
                  marginBottom: 1,
                }}
              >
                {service.title}
              </Typography>
              {/* Descripción */}
              <Typography
                variant="body2"
                sx={{
                  color: colors.neutral.darkGray,
                }}
              >
                {service.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Services;
