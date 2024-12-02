import React, { useState, useEffect, useRef } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import colors from "../../../../theme/colors";
import { useMessages } from "../../../../context/messages.provider"; // Consumir el MessagesProvider

const ChatPanel = () => {
  const { selectedChat, messages, isLoadingMessages, sendMessage } = useMessages(); // Consumir el contexto de mensajes
  const [inputMessage, setInputMessage] = useState("");
  const messagesEndRef = useRef(null); // Referencia para el scroll automático

  // Efecto para posicionar el scroll en el último mensaje automáticamente
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  

  // Manejar el envío de un mensaje
  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      sendMessage(selectedChat?.id, inputMessage); // Enviar el mensaje a Firestore
      setInputMessage(""); // Limpiar el campo de entrada
    }
  };

  // Limpiar el estado al cerrar el chat
  useEffect(() => {
    if (!selectedChat) {
      setInputMessage("");
    }
  }, [selectedChat]);

  // Renderizar mientras se cargan los mensajes
  if (isLoadingMessages) {
    return (
      <Box
        sx={{
          height: "91vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Typography sx={{ color: colors.accent.orange }}>Cargando mensajes...</Typography>
      </Box>
    );
  }

  if (!selectedChat) {
    return (
      <Box
        sx={{
          height: "91vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#FFF",
        }}
      >
        <Typography sx={{ color: colors.neutral.darkGray }}>
          Selecciona un chat para comenzar.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "91vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF",
      }}
    >
      {/* Mensajes */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
          backgroundColor: "#f9f9f9", // Fondo claro para los mensajes
        }}
      >
        {messages.map((msg, index) => {
          const isCurrentUser = msg.emisor === selectedChat.currentUserId; // Verificar si el mensaje es del usuario actual
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: isCurrentUser ? "flex-end" : "flex-start", // Mensajes del usuario a la derecha
                marginBottom: "10px",
              }}
            >
              <Box
                sx={{
                  maxWidth: "70%",
                  padding: "10px",
                  backgroundColor: isCurrentUser ? colors.primary.main : "#b5b5b5", // Color diferenciado
                  borderRadius: "16px",
                  borderBottomRightRadius: isCurrentUser ? 0 : "16px",
                  borderBottomLeftRadius: isCurrentUser ? "16px" : 0,
                  color: "#fff",
                }}
              >
                <Typography>{msg.texto}</Typography>
                <Typography
                  variant="caption"
                  sx={{ display: "block", textAlign: isCurrentUser ? "right" : "left", marginTop: "5px" }}
                >
                  {msg.fecha
                    ? new Date(msg.fecha.seconds * 1000).toLocaleTimeString("es-ES", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })
                    : "Ahora"}
                </Typography>
              </Box>
            </Box>
          );
        })}
        {/* Referencia para el scroll automático */}
        <div ref={messagesEndRef} />
      </Box>

      {/* Campo de entrada */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: 2,
          backgroundColor: "#fff",
          borderTop: `1px solid ${colors.neutral.lightGray}`,
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Escribe un mensaje..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          sx={{
            flex: 1,
            marginRight: "10px",
            backgroundColor: "#f1f1f1",
            borderRadius: "8px",
          }}
        />
        <IconButton onClick={handleSendMessage} sx={{ color: colors.accent.orange }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatPanel;

