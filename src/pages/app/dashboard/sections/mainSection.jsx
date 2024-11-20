import React from "react";
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider } from "@mui/material";
import colors from "../../../../theme/colors";
import CreatePost from "../../../../components/app/createPost";
import WelcomeBanner from "../../../../components/app/wellcomeBanner";
import ReviewsCarousel from "../../../../components/app/carrusel";
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
     
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, color: colors.primary.main, textAlign: "left" }}>
      Actividades Recientes
      </Typography>
      {/* Listado de actividades */}
      <CreatePost />
      <WelcomeBanner />
      <ReviewsCarousel />
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
