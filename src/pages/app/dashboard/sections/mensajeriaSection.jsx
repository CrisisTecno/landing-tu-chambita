import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Divider,
  CircularProgress,
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";
import colors from "../../../../theme/colors";
import { useMessages } from "../../../../context/messages.provider"; // Consumir el MessagesProvider
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase"; // Configuración de Firestore
import { useNavigate } from "react-router-dom"; // Para la redirección

const MessagingSection = () => {
  const { chats, isLoadingChats, setSelectedChat } = useMessages(); // Obtener los chats desde el MessagesProvider
  const [contactDetails, setContactDetails] = useState({}); // Guardar los nombres y avatares de los contactos
  const [newMessage, setNewMessage] = useState(""); // Estado para el nuevo mensaje
  const navigate = useNavigate(); // Hook para redirigir

  // Fetch para obtener los detalles de los contactos
  useEffect(() => {
    const fetchContactDetails = async () => {
      const details = {};
      for (const chat of chats.slice(0, 2)) {
        const contactId = chat.usuarios.find(
          (uid) => uid !== chat.currentUserId
        );

        if (!details[contactId]) {
          try {
            const userDoc = await getDoc(doc(db, "usuario", contactId));
            if (userDoc.exists()) {
              details[contactId] = {
                nombre: userDoc.data().nombre || "Usuario desconocido",
                avatar: userDoc.data().profilePicture || null,
              };
            } else {
              details[contactId] = {
                nombre: "Usuario desconocido",
                avatar: null,
              };
            }
          } catch (error) {
            console.error(
              `Error al obtener detalles del usuario ${contactId}:`,
              error
            );
            details[contactId] = {
              nombre: "Error al cargar",
              avatar: null,
            };
          }
        }
      }
      setContactDetails(details);
    };

    if (chats.length > 0) {
      fetchContactDetails();
    }
  }, [chats]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    console.log("Mensaje enviado:", newMessage);
    setNewMessage(""); // Limpiar el campo de entrada después de enviar el mensaje
  };

  const handleOpenChat = (chat) => {
    setSelectedChat(chat); // Establece el chat seleccionado en el MessagesProvider
    navigate("/messages"); // Redirige a la página de mensajes
  };

  if (isLoadingChats) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress sx={{ color: colors.accent.orange }} />
      </Box>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Mensajes
      </Typography>

      {/* Lista de contactos */}
      <List>
        {chats.length > 0 ? (
          chats.slice(0, 2).map((chat) => {
            const contactId = chat.usuarios.find(
              (uid) => uid !== chat.currentUserId
            );
            const contact = contactDetails[contactId] || {
              nombre: "Cargando...",
              avatar: null,
            };

            return (
              <React.Fragment key={chat.id}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      src={contact.avatar || ""}
                      sx={{ backgroundColor: colors.neutral.mediumGray }}
                    >
                      {contact.nombre?.[0]?.toUpperCase() || "?"}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={contact.nombre}
                    secondary={chat.ultimoMensaje?.texto || "Sin mensajes"}
                  />
                  <IconButton
                    onClick={() => handleOpenChat(chat)} // Redirigir y establecer el chat seleccionado
                  >
                    <MessageIcon color="primary" />
                  </IconButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            );
          })
        ) : (
          <Typography
            sx={{ color: colors.neutral.darkGray, textAlign: "center", mt: 2 }}
          >
            No hay conversaciones recientes.
          </Typography>
        )}
      </List>

      {/* Campo de entrada de mensajes */}
      <Box sx={{ marginTop: 2 }}>
        <TextField
          placeholder="Escribe un mensaje..."
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          sx={{ marginBottom: 1 }}
        />
        <Button
          fullWidth
          variant="contained"
          endIcon={<SendIcon />}
          onClick={handleSendMessage}
          sx={{
            textTransform: "none",
            backgroundColor: colors.accent.orange,
            color: "#fff",
            borderRadius: "12px",
            marginTop: 1,
          }}
        >
          Enviar
        </Button>
      </Box>
    </Paper>
  );
};

export default MessagingSection;
