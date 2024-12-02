import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Avatar,
  Button,
  Paper,
  Divider,
  CircularProgress,TextField,
  Modal,
} from "@mui/material";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import { AdvancedImage } from "@cloudinary/react";
import { db } from "../../../firebase"; // Firestore config
import Navbar from "../../../components/app/navbar";
import colors from "../../../theme/colors";
import PublicationsListById from "../../../components/app/publicationListById";
import AnalysisComponent from "./components/AnalysisComponent";
import SuggestionsComponent from "./components/SuggestionsComponent";
import { UserContext } from "../../../context/user.provider";
import { doc, getDoc, updateDoc, setDoc, collection, addDoc, serverTimestamp,arrayUnion } from "firebase/firestore";

const ProfileXView = () => {
  const { id } = useParams();
  const { user, reloadUser } = useContext(UserContext); 
  const [contact, setContact] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnectingMessage, setIsConnectingMessage] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalMessageOpen, setIsModalMessageOpen] = useState(false);
  const [connectionSuccess, setConnectionSuccess] = useState(false); 
  const [connectionSuccessMessage, setConnectionSuccessMessage] = useState(false); 

  const sendMessage = async () => {
    if (!user || !id || message.trim() === "") {
      console.error("Datos incompletos para enviar el mensaje.");
      return;
    }
  
    try {
      setIsConnectingMessage(true);
      setConnectionSuccessMessage(false);
  
      const chatId = user.uid < id ? `${user.uid}_${id}` : `${id}_${user.uid}`; 
      const chatDocRef = doc(db, "mensaje", chatId); 
  
      const chatSnapshot = await getDoc(chatDocRef);
  
      if (!chatSnapshot.exists()) {
        await setDoc(chatDocRef, {
          creado: serverTimestamp(),
          ultimaActualizacion: serverTimestamp(),
          usuarios: [user.uid, id],
          ultimoMensaje: {
            texto: message,
            usuario: user.uid,
            fecha: serverTimestamp(),
          },
        });
      } else {
        await updateDoc(chatDocRef, {
          ultimaActualizacion: serverTimestamp(),
          ultimoMensaje: {
            texto: message,
            usuario: user.uid,
            fecha: serverTimestamp(),
          },
        });
      }
  
      const mensajesCollectionRef = collection(chatDocRef, "mensajes");
      await addDoc(mensajesCollectionRef, {
        emisor: user.uid,
        texto: message,
        fecha: serverTimestamp(),
      });
  
      setConnectionSuccessMessage(true);
      console.log("Mensaje enviado con éxito.");
      setMessage(""); 
    } catch (error) {
      console.error("Error al enviar el mensaje:", error.message);
    } finally {
      setIsConnectingMessage(false);
      if (connectionSuccessMessage) {
        setIsModalMessageOpen(false); // Cerrar el modal si el mensaje fue enviado exitosamente
      }
    }
  };
  


  
  useEffect(() => {
   
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    
      
    const fetchContact = async () => {
      try {
        const contactDoc = doc(db, "usuario", id);
        const contactSnapshot = await getDoc(contactDoc);

        if (contactSnapshot.exists()) {
          setContact(contactSnapshot.data());
        } else {
          console.error("El contacto no existe.");
        }
      } catch (error) {
        console.error("Error al obtener los datos del contacto:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContact();
  }, [id]);

  const cld = new Cloudinary({
    cloud: {
      cloudName: "diubghp1i",
    },
  });

  const banner = cld
    .image(`tu-chambita/profile/${contact?.bannerId || "default-banner"}`)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(1000).height(400));

  const profile = cld
    .image(`tu-chambita/profile/${contact?.profileId || "default-profile"}`)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500));

  // Agregar contacto
  const handleAddContact = async () => {
    if (!user || !id) return;

    try {
      setIsConnecting(true);
      setConnectionSuccess(false);

      const userDoc = doc(db, "usuario", user.uid);
      await updateDoc(userDoc, {
        contactos: arrayUnion(id),
      });

      await reloadUserFromFirestore();

      setConnectionSuccess(true); // Mostrar éxito
    } catch (error) {
      console.error("Error al agregar el contacto:", error.message);
    } finally {
      setIsConnecting(false);
    }
  };

  // Recargar estado del usuario en el contexto
  const reloadUserFromFirestore = async () => {
    try {
      const userDoc = doc(db, "usuario", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        reloadUser(userSnapshot.data()); // Actualizar el contexto del usuario
      }
    } catch (error) {
      console.error("Error al recargar el usuario:", error.message);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress sx={{ color: colors.primary.main }} />
        <Typography sx={{ marginLeft: 2, color: colors.primary.main }}>
          Cargando perfil...
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: colors.secondary.main,
      }}
    >
      <Navbar />

      <Paper
        elevation={3}
        sx={{
          padding: 2,
          borderRadius: 2,
          backgroundColor: "#fff",
          overflow: "hidden",
          marginTop: 6,
        }}
      >
        <Box
          sx={{
            width: "70vw",
            height: "25vh",
            backgroundColor: colors.accent.orange,
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <AdvancedImage
            cldImg={banner}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            marginTop: "1vh",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: 150,
              height: 150,
              backgroundColor: colors.accent.orange,
              borderRadius: "25vw",
              overflow: "hidden",
            }}
          >
            <AdvancedImage
              cldImg={profile}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "25vw",
              }}
            />
          </Box>

          <Box sx={{ marginLeft: 2, flex: 1 }}>
            <Typography
              variant="h5"
              fontSize={30}
              fontWeight="bold"
              color={colors.primary.main}
            >
              {contact?.nombre || "Usuario"}
            </Typography>
            <Typography variant="body2" color="#6e6e6e" fontSize={17}>
              {contact?.descripcion || "Sin descripción"}
            </Typography>
            <Typography
              variant="body2"
              color={colors.accent.orangeHover}
              fontSize={18}
            >
              {contact?.ubicacion
                ? `${contact.ubicacion._lat}, ${contact.ubicacion._long}`
                : "Ubicación desconocida"}
            </Typography>
          </Box>

          <Button
            variant="outlined"
            sx={{
              marginTop: "5vh",
              color: colors.accent.orange,
              borderColor: colors.accent.orange,
              textTransform: "none",
              "&:hover": {
                outline: "none",
                border: "none",
                backgroundColor: colors.accent.orange,
                color: "#fff",
              },
            }}
            onClick={() => setIsModalMessageOpen(true)}
          >
            Mensajear
          </Button>

          <Button
            variant="outlined"
            sx={{
              marginTop: "5vh",
              color: colors.accent.orange,
              borderColor: colors.accent.orange,
              marginLeft: "1vw",
              textTransform: "none",
              "&:hover": {
                outline: "none",
                border: "none",
                backgroundColor: colors.accent.orange,
                color: "#fff",
              },
            }}
            onClick={() => setIsModalOpen(true)}
          >
            Conectar
          </Button>
        </Box>
      </Paper>

      <Divider sx={{ marginY: 4 }} />

      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          width: "70vw",
        }}
      >
        <Box sx={{ flex: 1 }}>
          <AnalysisComponent />
          <PublicationsListById id={id} />
        </Box>
        <Box sx={{ flex: 0.4 }}>
          <SuggestionsComponent services={contact?.categorias || []} />
        </Box>
      </Box>

      {/* Modal de conexión */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
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
                Procesando conexión...
              </Typography>
            </Box>
          ) : connectionSuccess ? (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ¡Conexión exitosa! 🎉 Continúa explorando TuChambita.
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
                onClick={() => setIsModalOpen(false)}
              >
                Cerrar
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Confirmar conexión
              </Typography>
              <Typography sx={{ my: 2 }}>
                ¿Deseas agregar a {contact?.nombre || "este usuario"} a tus
                contactos?
              </Typography>
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.accent.orange,
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: colors.accent.orangeHover,
                    },
                  }}
                  onClick={handleAddContact}
                >
                  Sí, Conectar
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: colors.primary.main,
                    textTransform: "none",
                  }}
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
      <Modal
        open={isModalMessageOpen}
        onClose={() => setIsModalMessageOpen(false)}
      >
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
          {isConnectingMessage ? (
            <Box sx={{ textAlign: "center" }}>
              <CircularProgress color="primary" />
              <Typography sx={{ marginTop: 2 }}>
                Enviando Mensaje
              </Typography>
            </Box>
          ) : connectionSuccessMessage ? (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                ¡Exito! 🎉 Continúa la conversacion en la Mensajeria.
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
                onClick={() => setIsModalMessageOpen(false)}
              >
                Cerrar
              </Button>
            </Box>
          ) : (
            <Box>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                Comenzemos con las negociaciones
              </Typography>
              <Typography sx={{ my: 2 }}>
                Envia un mensaje a {contact?.nombre || "este usuario"} para
                iniciar una conversacion
              </Typography>
              <TextField
                fullWidth
                label="Mensaje de Invitacion"
                placeholder="Hola, me interesa el servicio de..."
                variant="outlined"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                sx={{
                  marginBottom: 3,
                  "& .MuiOutlinedInput-root": {
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
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: colors.accent.orange,
                    color: "#fff",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: colors.accent.orangeHover,
                    },
                  }}
                  onClick={sendMessage}
                >
                 Enviar
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    color: colors.primary.main,
                    textTransform: "none",
                  }}
                  onClick={() => setIsModalMessageOpen(false)}
                >
                  Cancelar
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default ProfileXView;
