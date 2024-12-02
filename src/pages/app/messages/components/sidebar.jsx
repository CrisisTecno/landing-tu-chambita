import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  Divider,
  CircularProgress,
} from "@mui/material";
import { useMessages } from "../../../../context/messages.provider"; // Consumir el MessagesProvider
import { UserContext } from "../../../../context/user.provider";
import { db } from "../../../../firebase"; // Firebase configurado
import { doc, getDoc } from "firebase/firestore";
import colors from "../../../../theme/colors";

const Sidebar = () => {
  const { chats, isLoadingChats, setSelectedChat } = useMessages(); // Consumir el contexto de mensajes
  const { user } = useContext(UserContext); // Consumir el contexto del usuario actual
  const userId = user?.uid; // ID del usuario actual

  const [userDetails, setUserDetails] = useState({}); // Guardar detalles de los contactos

  // Obtener los nombres de los contactos
  useEffect(() => {
    const fetchUserDetails = async () => {
      const details = {};

      for (const chat of chats) {
        const contactId = chat.usuarios.find((uid) => uid !== userId); // Encontrar ID del contacto
        if (!details[contactId]) {
          try {
            const userDoc = await getDoc(doc(db, "usuario", contactId)); // Obtener documento del contacto
            if (userDoc.exists()) {
              details[contactId] = userDoc.data().nombre || "Contacto desconocido"; // Guardar nombre del contacto
            } else {
              details[contactId] = "Usuario desconocido";
            }
          } catch (error) {
            console.error(`Error al obtener datos del usuario ${contactId}:`, error);
            details[contactId] = "Error al cargar";
          }
        }
      }

      setUserDetails(details); // Actualizar los detalles de los contactos
    };

    if (chats.length > 0) {
      fetchUserDetails();
    }
  }, [chats, userId]);

  if (isLoadingChats) {
    return (
      <Box
        sx={{
          height: "95vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <CircularProgress sx={{ color: colors.accent.orange }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "95vh",
        overflowY: "auto",
        backgroundColor: "#fff",
        paddingX: 2,
        borderRadius: "8px",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: colors.accent.orange,
          fontWeight: "bold",
          marginBottom: "10px",
          paddingLeft: "1vw",
          marginTop: "2vh",
        }}
      >
        Bandeja de entrada
      </Typography>
      <List>
        {chats.length > 0 ? (
          chats.map((chat) => {
            const contactId = chat.usuarios.find((uid) => uid !== userId); // Obtener el ID del contacto
            const contactName = userDetails[contactId] || "Cargando..."; // Obtener el nombre del contacto

            return (
              <React.Fragment key={chat.id}>
                <ListItem
                  sx={{
                    cursor: "pointer",
                    borderRadius: "8px",
                    marginBottom: "8px",
                    backgroundColor: "#ffff", 
                    padding: 1.5,
                    "&:hover": { backgroundColor: colors.primary.light }, // Efecto hover
                  }}
                  onClick={() => {
                    setSelectedChat({
                      ...chat,
                      currentUserId: userId,
                    }); // Selecciona el chat al hacer clic y agrega `currentUserId`
                    console.log(`Chat seleccionado: ${chat.id}`);
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        backgroundColor: colors.neutral.mediumGray,
                        color: "#515151",
                      }}
                    >
                      {contactName[0]?.toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: colors.primary.main,
                        fontWeight: "bold",
                        marginBottom: "4px",
                      }}
                    >
                      {contactName}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "#ccc", fontSize: "14px" }}
                    >
                      {chat.ultimoMensaje?.usuario === userId
                        ? `Tú: ${chat.ultimoMensaje?.texto || "Sin mensajes"}`
                        : chat.ultimoMensaje?.texto || "Sin mensajes"}
                    </Typography>
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{ color: "#aaa", marginLeft: "auto" }}
                  >
                    {chat.ultimoMensaje?.fecha
                      ? new Date(chat.ultimoMensaje.fecha.seconds * 1000).toLocaleTimeString("es-ES", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })
                      : ""}
                  </Typography>
                </ListItem>
                <Divider sx={{ borderColor: "#6e6e6e" }} />
              </React.Fragment>
            );
          })
        ) : (
          <Typography
            variant="body1"
            sx={{ color: "#000", textAlign: "center", mt: 2 }}
          >
            No tienes chats disponibles
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default Sidebar;
