import React from "react";
import {
  Box,
} from "@mui/material";
import colors from "../../../theme/colors";
import Navbar from "../../../components/app/navbar";
import ProfileSection from "./sections/profileSection";
import MainContent from "./components/main.content";
import MessagingSection from "./sections/mensajeriaSection";
import ChatPopup from "./components/chatpopup";

const Dashboard = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: colors.secondary.main,
      }}
    >
      <Box
        sx={{
          margin: 0.5,
          padding: 0.1,
          borderRadius: "12px",
          backgroundColor: "#fff",
        }}
      >
        <Navbar />
      </Box>

      <div style={{ height: "7vh" }}></div>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        {/* Sidebar: Perfil y Mensajería */}
        <Box
          sx={{
            flex: "0 0 20%", 
            margin: "1vw",
            position: "sticky", // Sticky behavior
            top: "8vh",
            height: "82vh", // Altura total menos el navbar
            overflowY: "auto", // Permite scroll si el contenido es grande
            backgroundColor: "#fff",
            borderRadius: "12px",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Sombra para resaltar
            padding: "1rem", // Espaciado interno
          }}
        >
          <ProfileSection />
          <div style={{ height: "2vh" }}></div>
          <MessagingSection />
        </Box>

        {/* Contenido principal */}
        <Box
          sx={{
            width:"75vw",
            flex: "0 0 0%", 
            color: "#fff",
          }}
        >
          <MainContent />
          <ChatPopup />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
