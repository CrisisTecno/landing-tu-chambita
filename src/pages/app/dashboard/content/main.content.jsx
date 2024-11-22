import React from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import colors from "../../../../theme/colors";
import CreatePost from "../../../../components/app/createPost";
import WelcomeBanner from "../../../../components/app/wellcomeBanner";
import ReviewsCarousel from "../components/carrusel";
import PublicationCard from "../components/publishcard";

const publications = [
  {
    imageUrl: "https://via.placeholder.com/400",
    category: "Plomería y Electricidad",
    serviceName: "Servicio de Reparación de Tuberías",
    description:
      "Encuentra a los mejores profesionales para reparar tus tuberías de manera eficiente y garantizada. Resolvemos emergencias en pocas horas.",
    location: "La Paz, Bolivia",
    reviewData: {
      avatar: "https://via.placeholder.com/48",
      name: "Inti Solutio",
      rating: 4.5,
      totalReviews: 32,
    },
  },
  {
    imageUrl: "https://via.placeholder.com/400",
    category: "Carpintería",
    serviceName: "Muebles a Medida",
    description:
      "Crea el mueble de tus sueños con nuestros carpinteros expertos. Materiales de calidad y diseño personalizado.",
    location: "Cochabamba, Bolivia",
    reviewData: {
      avatar: "https://via.placeholder.com/48",
      name: "Carpinteros Unidos",
      rating: 4.0,
      totalReviews: 18,
    },
  },
  {
    imageUrl: "https://via.placeholder.com/400",
    category: "Pintura y Decoración",
    serviceName: "Pintura Interior y Exterior",
    description:
      "Transforma tu hogar o negocio con colores vibrantes y acabados profesionales. Garantizamos calidad y satisfacción.",
    location: "Santa Cruz, Bolivia",
    reviewData: {
      avatar: "https://via.placeholder.com/48",
      name: "Pintura Pro",
      rating: 5.0,
      totalReviews: 45,
    },
  },
  {
    imageUrl: "https://via.placeholder.com/400",
    category: "Limpieza Doméstica",
    serviceName: "Limpieza Profesional",
    description:
      "Mantén tu hogar impecable con nuestro equipo de limpieza experto. Servicios rápidos y confiables.",
    location: "El Alto, Bolivia",
    reviewData: {
      avatar: "https://via.placeholder.com/48",
      name: "Limpieza Exprés",
      rating: 4.8,
      totalReviews: 28,
    },
  },
];

const MainContent = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          color: colors.primary.main,
          textAlign: "left",
        }}
      >
        Actividades Recientes
      </Typography>
      {/* Listado de actividades */}
      <CreatePost />
      <WelcomeBanner />
      <ReviewsCarousel />
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginBottom: 2,
          color: colors.primary.main,
          textAlign: "left",
        }}
      >
        Nuevas Publicaciones
      </Typography>
      <Box sx={{ padding: 4 }}>
          {publications.map((pub, index) => (
              <div style={{marginTop:"2vh",marginBottom:"2vh", }}>
              <PublicationCard {...pub} />
              </div>
          ))}
      </Box>

      <List>
        <ListItem>
          <ListItemText
            primary="Solicitaste un servicio de plomería."
            secondary="Hace 2 horas"
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Tu servicio de electricidad fue completado."
            secondary="Hace 1 día"
          />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText
            primary="Recibiste una reseña positiva por tu último trabajo."
            secondary="Hace 3 días"
          />
        </ListItem>
      </List>
    </Paper>
  );
};

export default MainContent;
