import React from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider,
} from "@mui/material";
import colors from "../../../../theme/colors";

const Sidebar = () => {
  const chats = [
    {
      name: "Elmer N. Aguilar Endara",
      lastMessage: "Ajajajaj",
      time: "5 horas",
    },
    {
      name: "Leonel St Castelo",
      lastMessage: "Tu: Á ti como te fue...",
      time: "5 horas",
    },
    {
      name: "Castañeta Beymar",
      lastMessage: "Castañeta envió un sticker",
      time: "10 horas",
    },
    {
      name: "Chat general",
      lastMessage: "Aquapy: Descubre cómo...",
      time: "18 horas",
    },
  ];

  return (
    <Box
      sx={{
        height: "95vh",
        overflowY: "auto",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: colors.primary.main,
          fontWeight: "bold",
          marginBottom: "10px",
          paddingLeft: "1vw",
          marginTop: "2vh",
        }}
      >
        Bandeja de entrada
      </Typography>
      <List>
        {chats.map((chat, index) => (
          <>
            <ListItem
              key={index}
              sx={{
                cursor: "pointer",
                "&:hover": { backgroundColor: colors.primary.light },
              }}
            >
              <ListItemAvatar>
                <Avatar>{chat.name[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={chat.name}
                secondary={chat.lastMessage}
                sx={{ color: "#000", fontWeight: "bold" }}
              />
              <Typography
                variant="caption"
                sx={{ color: colors.neutral.darkGray }}
              >
                {chat.time}
              </Typography>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
