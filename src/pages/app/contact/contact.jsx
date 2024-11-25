import React, { useContext } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
} from "@mui/material";
import { UserContext } from "../../../context/user.provider"; // Contexto del usuario
import colors from "../../../theme/colors"; // Estilos de TuChambita
import Navbar from "../../../components/app/navbar"; // Componente de navegación

const ContactPage = () => {
  const { user } = useContext(UserContext); // Datos del contexto del usuario
  const { contacts = [] } = user; // Lista de contactos desde el contexto

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "24px",
      }}
    >
      <Navbar />

      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: colors.primary.main,
          marginBottom: "24px",
        }}
      >
        Tus Contactos
      </Typography>

      {/* Contenedor principal */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "flex-start",
        }}
      >
        {contacts.map((contact, index) => (
          <Box
            key={index}
            sx={{
              width: "calc(20% - 16px)", // Cada tarjeta ocupa el 20% del ancho
              minWidth: "180px", // Mínimo ancho para evitar colapsos
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "16px",
              textAlign: "center",
            }}
          >
            {/* Avatar e información del contacto */}
            <Avatar
              src={contact.image || "/assets/default-avatar.png"} // Imagen del contacto o predeterminada
              alt={contact.name}
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                marginBottom: "8px",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: colors.primary.main,
              }}
            >
              {contact.name || "Sin nombre"}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: colors.neutral.mediumGray,
                marginBottom: "8px",
              }}
            >
              {contact.mutualConnections} contactos en común
            </Typography>

            {/* Botones de acción */}
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: colors.primary.main,
                color: "#fff",
                textTransform: "none",
                marginBottom: "8px",
                "&:hover": {
                  backgroundColor: colors.primary.light,
                },
              }}
              onClick={() => console.log(`Confirmar: ${contact.name}`)}
            >
              Confirmar
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{
                borderColor: colors.accent.orange,
                color: colors.accent.orange,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: colors.accent.orangeHover,
                  color: "#fff",
                },
              }}
              onClick={() => console.log(`Eliminar: ${contact.name}`)}
            >
              Eliminar
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ContactPage;
