import React from "react";
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
} from "@mui/material";
import MessageIcon from "@mui/icons-material/Message";
import SendIcon from "@mui/icons-material/Send";
import colors from "../../../../theme/colors";


const MessagingSection = () => {
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
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/path-to-user1.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Antonio Olivares"
            secondary="¿Puedes venir mañana?"
          />
          <IconButton>
            <MessageIcon color="primary" />
          </IconButton>
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemAvatar>
            <Avatar src="/path-to-user2.jpg" />
          </ListItemAvatar>
          <ListItemText
            primary="Maria Torres"
            secondary="¡Gracias por el excelente servicio!"
          />
          <IconButton>
            <MessageIcon color="primary" />
          </IconButton>
        </ListItem>
      </List>

      {/* Campo de entrada de mensajes */}
      <Box sx={{ marginTop: 2 }}>
        <TextField
          placeholder="Escribe un mensaje..."
          fullWidth
          variant="outlined"
          sx={{ marginBottom: 1 }}
        />
        <Button
          fullWidth
          variant="contained"
          endIcon={<SendIcon />}
          sx={{
            textTransform: "none",
            backgroundColor: colors.accent.orange,
            color: "#fff",
            borderRadius:"12px",
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
