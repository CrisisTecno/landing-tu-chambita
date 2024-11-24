import React, { useState } from "react";
import { Box, Typography, TextField, Button, Avatar, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import colors from "../../../../theme/colors";
const ChatPanel = () => {
  const [messages, setMessages] = useState([
    { text: "Hombre ahorrarás y te mudarás?", sender: "them", time: "5:03 pm" },
    { text: "Sí, a menos que note cambios", sender: "them", time: "5:03 pm" },
    { text: "Ajajaj toca esperar", sender: "me", time: "5:05 pm" },
  ]);

  const [inputMessage, setInputMessage] = useState("");

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      setMessages([...messages, { text: inputMessage, sender: "me", time: "Ahora" }]);
      setInputMessage("");
    }
  };

  return (
    <Box
      sx={{
        height: "91vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFF",
        color: "#fff",
      }}
    >
      {/* Mensajes */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          padding: 2,
        }}
      >
        {messages.map((msg, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
              marginBottom: "10px",
            }}
          >
            <Box
              sx={{
                maxWidth: "70%",
                padding: "10px",
                backgroundColor: msg.sender === "me" ? "#0084ff" : "#3a3b3c",
                borderRadius: "16px",
                color: "#fff",
              }}
            >
              <Typography>{msg.text}</Typography>
              <Typography variant="caption" sx={{ display: "block", textAlign: "right" }}>
                {msg.time}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {/* Campo de entrada */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Aaasddddddddddd"
          color="#fff"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          sx={{ flex: 1, marginRight: "10px", backgroundColor: "#fff", borderRadius: "8px" }}
         
        />
        <IconButton onClick={handleSendMessage} sx={{ color: colors.accent.orange }}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ChatPanel;
