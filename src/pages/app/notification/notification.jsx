import React, { useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Notifications, NotificationsNone } from "@mui/icons-material";
import colors from "../../../../src/theme/colors";
import Navbar from "../../../components/app/navbar";

const notificationsData = [
  {
    id: 1,
    title: "Nueva solicitud de servicio",
    message: "Juan Pérez ha solicitado un servicio de Plomería.",
    avatar: "/assets/user1.jpg",
    time: "Hace 2 horas",
    isRead: false,
  },
  {
    id: 2,
    title: "Servicio completado",
    message: "¡Felicidades! Finalizaste un servicio de Electricidad.",
    avatar: "/assets/user2.jpg",
    time: "Hace 1 día",
    isRead: true,
  },
  {
    id: 3,
    title: "Nueva reseña recibida",
    message: "María Gómez calificó tu servicio con 5 estrellas.",
    avatar: "/assets/user3.jpg",
    time: "Hace 3 días",
    isRead: true,
  },
  {
    id: 4,
    title: "Promoción exclusiva",
    message: "Obtén un descuento del 20% en herramientas este mes.",
    avatar: "/assets/promo.jpg",
    time: "Hace 1 semana",
    isRead: false,
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(notificationsData);

  const handleMarkAllAsRead = () => {
    const updatedNotifications = notifications.map((notification) => ({
      ...notification,
      isRead: true,
    }));
    setNotifications(updatedNotifications);
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  return (
    <Box
      sx={{
        padding: "24px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <Navbar />

      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: colors.primary.main,
          }}
        >
          Notificaciones
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: colors.accent.orange,
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: colors.accent.orangeHover },
            }}
            onClick={handleMarkAllAsRead}
          >
            Marcar todo como leído
          </Button>
          <Button
            variant="outlined"
            sx={{
              borderColor: colors.accent.orange,
              color: colors.accent.orange,
              textTransform: "none",
              "&:hover": {
                borderColor: colors.accent.orangeHover,
                backgroundColor: colors.accent.orangeHover,
                color: "#fff",
              },
            }}
            onClick={handleClearNotifications}
          >
            Limpiar notificaciones
          </Button>
        </Box>
      </Box>

      {/* Notificaciones */}
      <Box
        sx={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          padding: 4,
        }}
      >
        {notifications.length > 0 ? (
          <List>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 2,
                    backgroundColor: notification.isRead
                      ? "#f9f9f9"
                      : colors.neutral.lightGray,
                    borderRadius: "8px",
                    padding: "16px",
                    marginBottom: "16px",
                    "&:hover": {
                      backgroundColor: colors.neutral.mediumGray,
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={notification.avatar}
                      alt={notification.title}
                      sx={{ width: 56, height: 56 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: "bold",
                          color: notification.isRead
                            ? colors.neutral.darkGray
                            : colors.primary.main,
                        }}
                      >
                        {notification.title}
                      </Typography>
                    }
                    secondary={
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            color: colors.neutral.mediumGray,
                            marginBottom: "8px",
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: colors.neutral.darkGray }}
                        >
                          {notification.time}
                        </Typography>
                      </Box>
                    }
                  />
                  {!notification.isRead ? (
                    <Notifications color="primary" />
                  ) : (
                    <NotificationsNone
                      sx={{ color: colors.neutral.darkGray }}
                    />
                  )}
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ textAlign: "center", padding: "48px 0" }}>
            <Typography
              variant="h6"
              sx={{ color: colors.neutral.darkGray, marginBottom: 2 }}
            >
              No tienes notificaciones en este momento.
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.neutral.mediumGray }}
            >
              Te avisaremos cuando haya nuevas actualizaciones o actividades.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default NotificationsPage;
