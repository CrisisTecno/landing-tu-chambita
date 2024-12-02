import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Button,
  CircularProgress,
  Modal,
} from "@mui/material";
import { useMessages } from "../../../../context/messages.provider"; // Consumir el MessagesProvider
import { db } from "../../../../firebase"; // Firebase configurado
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import colors from "../../../../theme/colors";
import { useNavigate } from "react-router-dom";

const ChatDetails = () => {
  const { selectedChat } = useMessages(); // Consumir el contexto de mensajes
  const [contactDetails, setContactDetails] = useState(null); // Guardar detalles del contacto
  const [isLoading, setIsLoading] = useState(true);
  const [isContact, setIsContact] = useState(false); // Indicar si el usuario está en nuestra lista de contactos
  const [isConnecting, setIsConnecting] = useState(false); // Estado para mostrar loader
  const [connectionSuccess, setConnectionSuccess] = useState(false); // Estado para el éxito del modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Controlar el modal
  const navigate = useNavigate(); // Para navegación entre páginas
  const currentUserId = selectedChat?.currentUserId; // ID del usuario actual

  // Función para obtener los detalles del contacto
  const fetchContactDetails = async () => {
    if (!selectedChat) {
      setContactDetails(null);
      return;
    }

    const contactId = selectedChat.usuarios.find(
      (uid) => uid !== currentUserId
    );

    if (contactId) {
      try {
        const contactDoc = await getDoc(doc(db, "usuario", contactId));
        const userDoc = await getDoc(doc(db, "usuario", currentUserId)); // Datos del usuario actual

        if (contactDoc.exists()) {
          setContactDetails({ ...contactDoc.data(), uid: contactId });

          // Verificar si el usuario ya está en nuestra lista de contactos
          const userContacts = userDoc.data().contactos || [];
          setIsContact(userContacts.includes(contactId));
        } else {
          console.error("El contacto no existe en la base de datos.");
          setContactDetails(null);
        }
      } catch (error) {
        console.error("Error al obtener los datos del contacto:", error);
        setContactDetails(null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (selectedChat && currentUserId) {
      fetchContactDetails();
    }
  }, [selectedChat, currentUserId]);

  // Función para agregar el contacto
  const handleAddContact = async () => {
    if (!contactDetails || !currentUserId) return;

    setIsConnecting(true);
    setIsModalOpen(true); // Abrir el modal

    try {
      const userRef = doc(db, "usuario", currentUserId);

      // Agregar el contacto a la lista de contactos del usuario actual
      await updateDoc(userRef, {
        contactos: arrayUnion(contactDetails.uid),
      });

      // Ahora recargamos la información de los contactos
      setIsContact(true); // Actualizar el estado de contacto
      setConnectionSuccess(true); // Mostrar mensaje de éxito
      console.log("Contacto agregado con éxito");
    } catch (error) {
      console.error("Error al agregar el contacto:", error.message);
      setConnectionSuccess(false);
    } finally {
      setIsConnecting(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setConnectionSuccess(false); // Resetear el estado de éxito del modal
  };

  // Spinner de carga
  if (isLoading) {
    return (
      <Box
        sx={{
          height: "91vh",
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

  // Si no hay contacto o chat seleccionado
  if (!selectedChat || !contactDetails) {
    return (
      <Box
        sx={{
          height: "91vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Typography sx={{ color: colors.primary.main }}>
          Selecciona un chat para ver los detalles del contacto.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "91vh",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        paddingX: "4vh",
        paddingY: "2vh",
      }}
    >
      {/* Perfil del contacto */}
      <Box>
        <Box sx={{ textAlign: "center", marginBottom: 3, marginTop: "5vh" }}>
          <Avatar
            sx={{
              width: 80,
              height: 80,
              margin: "auto",
              marginBottom: 1,
            }}
            src={contactDetails.profilePicture || ""}
            alt={contactDetails.nombre || "Contacto"}
          />
          <Typography variant="h6" color={colors.primary.main}>
            {contactDetails.nombre || "Contacto Desconocido"}
          </Typography>
          <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
            {isContact ? "En tus contactos" : "Usuario no agregado"}
          </Typography>
        </Box>

        {/* Botones de acción */}
        <Box>
          {!isContact && (
            <Button
              fullWidth
              variant="contained"
              onClick={handleAddContact}
              sx={{
                backgroundColor: colors.accent.orange,
                color: "#fff",
                textTransform: "none",
                fontWeight: "bold",
                marginBottom: 1,
                "&:hover": {
                  scale: 1.05,
                },
              }}
            >
              Aceptar Conversación
            </Button>
          )}
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: colors.accent.orange,
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              marginBottom: 1,
              "&:hover": {
                scale: 1.05,
              },
            }}
            onClick={() => navigate(`/profilex/${contactDetails.uid}`)} // Navegar al perfil del contacto
          >
            Ir a su Perfil
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: colors.primary.main,
              color: "#fff",
              textTransform: "none",
              fontWeight: "bold",
              "&:hover": {
                scale: 1.05,
              },
            }}
            onClick={() => navigate("/")} // Navegar a TuChambita
          >
            TuChambita
          </Button>
        </Box>
      </Box>
      <Box>
        <Typography
          variant="subtitle1"
          sx={{
            color: colors.primary.main,
            fontWeight: "bold",
            marginBottom: 1,
          }}
        >
          Información de Contacto
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: colors.neutral.darkGray, marginBottom: 1 }}
        >
          Email: {contactDetails.correo || "No disponible"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: colors.neutral.darkGray, marginBottom: 1 }}
        >
          Rol: {contactDetails.rol || "No disponible"}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: colors.neutral.darkGray, marginBottom: 1 }}
        >
          Ubicación: {contactDetails.location || "No especificada"}
        </Typography>
      </Box>
      {/* Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
            width: { xs: "80%", sm: "50%", md: "30%" },
          }}
        >
          {isConnecting ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress color="primary" />
              <Typography sx={{ marginTop: 2 }}>
                Agregando a tus contactos...
              </Typography>
            </Box>
          ) : connectionSuccess ? (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ¡Felicidades! 🎉 Continúa con la conversación.
              </Typography>
              <Button
                variant="contained"
                sx={{
                  marginTop: 2,
                  backgroundColor: colors.accent.orange,
                  color: "#fff",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: colors.accent.orangeHover,
                  },
                }}
                onClick={closeModal}
              >
                Cerrar
              </Button>
            </Box>
          ) : (
            <Typography variant="body1" sx={{ color: colors.neutral.darkGray }}>
              Ocurrió un error. Intenta de nuevo.
            </Typography>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ChatDetails;


