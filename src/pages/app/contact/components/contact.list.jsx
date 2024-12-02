import React, { useContext, useEffect } from "react";
import { Box, Typography, Avatar, Grid, CircularProgress } from "@mui/material";
import { useContacts } from "../../../../context/contacs.provider";
import colors from "../../../../theme/colors";
import { UserContext } from "../../../../context/user.provider";
import { useLocation, useNavigate } from "react-router-dom"; // Importar useLocation

const ContactsList = () => {
  const navigate=useNavigate();
  const { user } = useContext(UserContext);
  const { contacts, isLoading, error, fetchContacts } = useContacts(); // Agregamos fetchContacts desde el contexto
  const location = useLocation();

  // Recargar contactos al navegar a /contacts
  useEffect(() => {
    if (location.pathname === "/contacts") {
      fetchContacts();
    }
  }, [location]);

  const handleSendMessage = () => {
    // Implementar lógica para enviar mensaje
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <CircularProgress sx={{ color: colors.primary.main }} />
        <Typography
          variant="body1"
          sx={{ marginTop: 2, color: colors.primary.main }}
        >
          Cargando contactos...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography
        variant="body1"
        color="error"
        sx={{ textAlign: "center", marginTop: 4 }}
      >
        {error}
      </Typography>
    );
  }

  if (contacts.length === 0) {
    return (
      <Box
        sx={{
          marginLeft: "-5vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h6" sx={{ color: colors.primary.main }}>
          No se encontraron contactos.
        </Typography>
        <Typography
          variant="body2"
          sx={{ marginTop: 1, color: colors.secondary.secondary }}
        >
          Intenta agregar contactos a tu red.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "24px",
        minHeight: "20vh",
        marginLeft: "-1vw",
        backgroundColor: "#fff",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: colors.primary.main,
          marginBottom: 3,
          textAlign: "start",
          marginLeft: 1,
        }}
      >
        Lista de Contactos
      </Typography>
      <Grid container spacing={3}>
        {contacts.map((contact) => (
          <Grid item xs={12} sm={6} md={4} key={contact.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: 2,
                backgroundColor: "#fff",
                borderRadius: "12px",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  src={contact.avatar || "/assets/default-avatar.png"}
                  alt={contact.name}
                  sx={{ width: 60, height: 60, marginRight: 2 }}
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      color: colors.primary.main,
                      cursor: "pointer",
                    }}
                    onClick={() => navigate(`/profilex/${contact.id}`)} 
                  >
                    {contact.nombre || "Usuario desconocido"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: colors.secondary.secondary }}
                  >
                    {contact.correo || "Sin correo"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: colors.primary.main, marginTop: 1 }}
                  >
                    {contact.categorias && contact.categorias.length > 0 ? (
                      <>Categorías: {contact.categorias.join(", ")}</>
                    ) : (
                      "Usuario"
                    )}
                  </Typography>
                </Box>
              </Box>

              <Box>
                <button
                  onClick={() => handleSendMessage(contact.id)}
                  style={{
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    padding: "8px 16px",
                    cursor: "pointer",
                    fontSize: "13px",
                    backgroundColor: colors.accent.orange,
                    fontWeight: "bold",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  Enviar <br /> Mensaje
                </button>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ContactsList;
