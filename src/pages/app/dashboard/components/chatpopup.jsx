import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MinimizeIcon from "@mui/icons-material/Minimize";
import ChatIcon from "@mui/icons-material/Chat";
import SendIcon from "@mui/icons-material/Send";
import colors from "../../../../theme/colors"; // Tus colores personalizados

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false); // Controla si el chat está abierto o cerrado
  const [isMinimized, setIsMinimized] = useState(false); // Controla si el chat está minimizado

  const toggleChat = () => setIsOpen(!isOpen);
  const toggleMinimize = () => setIsMinimized(!isMinimized);

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      {!isOpen && (
        <Box
        sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            backgroundColor: colors.accent.orange,
            color: "#fff",
            borderRadius: "50%",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            width: "60px",
            height: "60px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: colors.accent.orange,
              transform: "scale(1.1)",
              boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.3)", 
            },
          }}
          onClick={toggleChat}
        >
          <ChatIcon sx={{ fontSize: "28px" }} />
        </Box>
      )}

      {/* Contenedor del chat */}
      {isOpen && (
        <Paper
          elevation={5}
          sx={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: isMinimized ? "300px" : "400px",
            height: isMinimized ? "50px" : "500px",
            transition: "all 0.3s ease",
            borderRadius: "12px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            zIndex: 1000, // Asegura que esté encima de otros componentes
          }}
        >
          {/* Header del chat */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              backgroundColor: colors.accent.orange,
              color: "#fff",
              padding: "10px 16px",
            }}
          >
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>
              Chat de TuChambita
            </Typography>
            <Box>
              {/* Botón de minimizar */}
              <IconButton
                onClick={toggleMinimize}
                sx={{
                  color: "#fff",
                  "&:hover": { backgroundColor: colors.accent.orange },
                }}
              >
                <MinimizeIcon />
              </IconButton>
              {/* Botón de cerrar */}
              <IconButton
                onClick={toggleChat}
                sx={{
                  color: "#fff",
                  "&:hover": { backgroundColor: colors.accent.orange },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
          </Box>

          {/* Contenido del chat */}
          {!isMinimized && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              {/* Mensajes */}
              <Box
                sx={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "16px",
                  backgroundColor: colors.neutral.lightGray,
                }}
              >
                <Typography
                  sx={{
                    fontSize: "14px",
                    marginBottom: "10px",
                    color: colors.neutral.darkGray,
                  }}
                >
                  Bienvenido al chat de TuChambita. ¿En qué podemos ayudarte?
                </Typography>
              </Box>

              {/* Entrada de mensajes */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px 16px",
                  backgroundColor: "#fff",
                  borderTop: `1px solid ${colors.neutral.lightGray}`,
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Escribe un mensaje..."
                  variant="outlined"
                  size="small"
                  sx={{
                    marginRight: "10px",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "24px",
                      "& fieldset": {
                        borderColor: colors.neutral.lightGray,
                      },
                      "&:hover fieldset": {
                        borderColor: colors.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: colors.primary.main,
                      },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#6e6e6e",
                    borderRadius: "24px",
                    padding: "6px 16px",
                    "&:hover": {
                      backgroundColor: colors.accent.orange,
                    },
                  }}
                  endIcon={<SendIcon color="#fff" style={
                    {color:"#fff"}
                  } />}
                >
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      )}
    </>
  );
};

export default ChatPopup;
