import React from "react";
import {
  Box,
  Grid,
  Typography,
  Avatar,
  Button,
  Paper,
  TextField,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";
import colors from "../../../theme/colors";
import Navbar from "../../../components/app/navbar";
import ProfileSection from "./sections/profileSection";
import MainContent from "./sections/mainSection";
import MessagingSection from "./sections/mensajeriaSection";
const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "100vw",
        
        backgroundColor: colors.secondary.main,
      }}
    >
      {/* Título del Dashboard */}
      <Box
        sx={{
            margin: 0.5,
          padding: 0.1,
          borderRadius:"12px" ,
          backgroundColor: "#fff",
          color: "#fff",
        }}
      >
        <Navbar/>
        {/* <Typography variant="h5" fontWeight="bold">
          Bienvenido a TuChambita
        </Typography>
        <Typography variant="body2">
          Encuentra profesionales, administra tus servicios y mantente conectado.
        </Typography> */}
      </Box>

      {/* Contenido principal del Dashboard */}
      <div style={{height:"5vh"}}></div>
      <Grid
    
      container
      spacing={2}
      sx={{ padding: 2}}
    >
      {/* Columna izquierda: Perfil */}
      <Grid item xs={12} md={2.5}>
        <ProfileSection />
        <div style={{height:"2vh"}}></div>
        <MessagingSection />
      </Grid>

      {/* Columna central: Contenido principal */}
      <Grid item xs={12} md={9.5}>
        <MainContent />
      </Grid>

    </Grid>
    </Box>
  );
};

export default Dashboard;
