import React from "react";
import { Box, Typography, Avatar, Button } from "@mui/material";

const ChatDetails = () => {
  return (
    <Box
      sx={{
        height: "91vh",
        backgroundColor: "#fff",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Perfil del contacto */}
      <Box>
        <Box sx={{ textAlign: "center", marginBottom: 3,marginTop:"5vh" }}>
          <Avatar
            sx={{ width: 80, height: 80, margin: "auto", marginBottom: 1 }}
          />
          <Typography variant="h6" color="#000">Leonel St Castelo</Typography>
          <Typography variant="body2" sx={{ color: "#b0b3b8" }}>
            Activo hace 11 horas
          </Typography>
        </Box>

        {/* Opciones */}
        <Box paddingLeft={"4vh"} paddingRight={"4vh"}>
          <Button fullWidth variant="outlined" sx={{ color: "#000", borderColor: "#3a3b3c" }}>
            Silenciar
          </Button>
          <Button
            fullWidth
            variant="outlined"
            sx={{ color: "#000", borderColor: "#3a3b3c", marginTop: 1 }}
          >
            Buscar
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatDetails;
