import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "../components/sidebar";
import ChatPanel from "../components/chatpanel";
import ChatDetails from "../components/chatdetails";
import Navbar from "../../../../components/app/navbar";

const ChatApp = () => {
  useEffect(() => {
    // Bloquea el scroll al montar el componente
    document.body.style.overflow = "hidden";

    // Restablece el scroll al desmontar el componente
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#fff",
        marginTop: "7vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Contenedor del chat */}
      <Grid container sx={{ flex: 1 }}>
        {/* Sidebar - Lista de chats */}
        <Grid item xs={3}>
          <Sidebar />
        </Grid>

        {/* ChatPanel - Mensajes */}
        <Grid item xs={6}>
          <ChatPanel />
        </Grid>

        {/* ChatDetails - Detalles del chat */}
        <Grid item xs={3}>
          <ChatDetails />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatApp;
