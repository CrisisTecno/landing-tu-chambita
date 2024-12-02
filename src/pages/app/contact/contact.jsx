import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Card,
  CardContent,
  Divider,
  Grid,
} from "@mui/material";
import Navbar from "../../../components/app/navbar"; // Tu componente existente
import colors from "../../../../src/theme/colors"; // Tus colores personalizados
import ContactsList from "./components/contact.list";

const ContactPage = () => {
  const [invitations, setInvitations] = useState([
    {
      id: 1,
      name: "Python La Paz",
      description: "Comunidad de Pythonistas 🐍✨",
      mutualConnections: 1,
      avatar: "/assets/python-avatar.jpg", // Reemplaza con una ruta válida
    },
    {
      id: 2,
      name: "Ali Aman Charolia",
      description: "Flutter Developer | Team Lead",
      mutualConnections: 3,
      avatar: "/assets/ali-avatar.jpg", // Reemplaza con una ruta válida
    },
  ]);

  const [suggestedPeople, setSuggestedPeople] = useState([
    {
      id: 1,
      name: "Franco Jofré",
      role: "Full Stack Developer | Tech Recruiter",
      avatar: "/assets/franco-avatar.jpg",
      mutualConnections: 10,
    },
    {
      id: 2,
      name: "Freddy Vega",
      role: "CEO and Founder at Platzi",
      avatar: "/assets/freddy-avatar.jpg",
      mutualConnections: 15,
    },
    {
      id: 3,
      name: "Jennifer Sofia Nuñez",
      role: "HR Recruiter | SSR Talent Acquisition",
      avatar: "/assets/jennifer-avatar.jpg",
      mutualConnections: 5,
    },
  ]);

  return (
    <Box
      sx={{
        padding: "24px",
        paddingTop: "10vh",
        paddingLeft: "5vw",
        paddingRight: "5vw",
        backgroundColor: "#fff",
        minHeight: "100vh",
      }}
    >
      <Navbar />

      {/* Sección de invitaciones */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: "16px",
          color: colors.primary.main,
        }}
      >
        Invitaciones
      </Typography>
      <Grid container spacing={2} sx={{ marginBottom: "32px" }}>
        {invitations.map((invite) => (
          <Grid item xs={12} sm={6} md={4} key={invite.id}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <Avatar
                src={invite.avatar}
                alt={invite.name}
                sx={{ width: 60, height: 60, marginRight: "16px" }}
              />
              <CardContent sx={{ padding: 0, flex: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: colors.primary.main }}>
                  {invite.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: colors.neutral.darkGray, marginBottom: "8px" }}
                >
                  {invite.description}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.accent.orange,
                    color: "#fff",
                    textTransform: "none",
                    fontSize: "14px",
                  }}
                >
                  Aceptar
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ marginY: "24px" }} />

      {/* Sección de personas sugeridas */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: 24,
          marginBottom: "16px",
          color: colors.primary.main,
        }}
      >
        Personas que quizás conozcas
      </Typography>
      <Grid container spacing={2}>
        {suggestedPeople.map((person) => (
          <Grid item xs={12} sm={6} md={4} key={person.id}>
            <Card
              sx={{
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "16px",
                textAlign: "center",
                backgroundColor: "#fff",
              }}
            >
              <Avatar
                src={person.avatar}
                alt={person.name}
                sx={{ width: 80, height: 80, margin: "0 auto", marginBottom: "16px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", color: colors.primary.main }}>
                {person.name}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.neutral.darkGray, marginBottom: 1 }}>
                {person.role}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: colors.neutral.mediumGray, marginBottom: "16px" }}
              >
                {person.mutualConnections} contactos en común
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.accent.orange,
                  color: "#fff",
                  textTransform: "none",
                  fontSize: "14px",
                }}
              >
                Seguir
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
         <Divider sx={{ marginY: "24px" }} />
      <ContactsList/>
    </Box>
  );
};

export default ContactPage;
