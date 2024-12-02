import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../../src/context/user.provider";
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  TextField,
  Avatar,
  Chip,
  Dialog,
  DialogContent, CircularProgress,
  DialogActions,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";
import colors from "../../theme/colors";
import { db } from "../../firebase"; // Firebase configuration
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { configDocumentId } from "../../config/config";
import { PublicationsContext } from "../../context/publication.provider";

const CreatePost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [location, setLocation] = useState("");

  // Estado para mostrar el mensaje de éxito o error
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const { reloadPublications } = useContext(PublicationsContext);

  const openDialog = (message) => {
    setDialogMessage(message);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogMessage("");
    setIsDialogOpen(false);
  };

  // Fetch categories from Firestore
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const docRef = doc(db, "config", configDocumentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAvailableCategories(data.categorias || []);
        } else {
          console.error(
            "El documento de configuración no existe en Firestore."
          );
        }
      } catch (e) {
        console.error(
          "Error al obtener categorías desde Firestore:",
          e.message
        );
      }
    };

    fetchCategories();
  }, []);

  const handleChipClick = (category) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(category)
          ? prev.filter((c) => c !== category) 
          : [...prev, category] 
    );
  };

  const handlePublish = async () => {
    if (!postContent.trim()) {
      openDialog("Por favor, escribe algo para publicar.");
      return;
    }

    if (selectedCategories.length === 0) {
      openDialog("Selecciona al menos una categoría.");
      return;
    }

    if (!location.trim()) {
      openDialog("La ubicación no puede estar vacía.");
      return;
    }

    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, "publicacion"), {
        contenido: postContent,
        categorias: selectedCategories,
        ubicacion: location,
        fechaDeCreacion: serverTimestamp(),
        autor: {
          avatar: user?.profileId,
          nombre: user?.nombre || "Usuario desconocido",
          calificacion: user?.calificacion || 0,
          totalVistas: user?.totalVistas || 0,
          rol: user?.rol || "usuario",
          uid: user?.uid || "UID desconocido",
        },
      });
await reloadPublications();
      console.log("Publicación creada con ID:", docRef.id);
      openDialog("¡Publicación creada exitosamente!");
      setPostContent(""); 
      setSelectedCategories([]); 
      setLocation(""); 
      handleCloseModal(); 
      setIsLoading(false);
    } catch (error) {
      console.error("Error al crear publicación:", error.message);
      openDialog("Error al crear publicación. Inténtalo más tarde.");
    }
  };

  return (
    <Box
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: "12px",
        boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Input para crear publicación */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          padding: "12px 20px",
          borderRadius: "24px",
          cursor: "pointer",
          border: `1px solid ${colors.neutral.lightGray}`,
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: colors.primary.light,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          },
        }}
        onClick={handleOpenModal}
      >
        <Avatar
          src="/path-to-avatar.jpg" // Cambia por la ruta del avatar del usuario
          sx={{ width: 40, height: 40 }}
        />
        <Typography className="label" sx={{ color: colors.neutral.darkGray }}>
          Crea una publicación, comparte tu trabajo
        </Typography>
      </Box>

      {/* Modal para crear publicación */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "60%", md: "40%" },
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            padding: 4,
          }}
        >
          {/* Header del modal */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Avatar
                src="/path-to-avatar.jpg" // Cambia por la ruta del avatar del usuario
                sx={{ width: 40, height: 40 }}
              />
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "#000" }}
                >
                  {user?.nombre || "Usuario desconocido"}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: colors.neutral.darkGray }}
                >
                  {user?.rol || "Rol desconocido"}
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="¿Sobre qué quieres hablar?"
            variant="outlined"
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
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
{/* Campo para escribir publicación */}
<TextField
            fullWidth
            label="Ubicación"
            placeholder="Ejemplo: La Paz, Bolivia"
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
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
          {/* Chips de categorías */}
          <Box
            sx={{ display: "flex", flexWrap: "wrap", gap: 1, marginBottom: 3 }}
          >
            {availableCategories.map((category) => (
              <Box
                key={category}
                onClick={() => handleChipClick(category)}
                sx={{
                  padding: "5px 10px",
                  borderRadius: "16px",
                  cursor: "pointer",
                  backgroundColor: selectedCategories.includes(category)
                    ? colors.accent.orange
                    : colors.neutral.lightGray,
                  color: selectedCategories.includes(category)
                    ? "#fff"
                    : colors.neutral.darkGray,
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: selectedCategories.includes(category)
                      ? colors.accent.orangeHover
                      : colors.neutral.mediumGray,
                  },
                }}
              >
                {category}
              </Box>
            ))}
          </Box>

          {/* Botón para publicar */}
          
          <Button
            fullWidth
            variant="contained"
            onClick={handlePublish}
            disabled={isLoading} 
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              color: "#fff",
              backgroundColor: colors.accent.orange,
              "&:hover": { backgroundColor: colors.accent.orangeHover },
            }}
          >
            {isLoading ? (
              <CircularProgress size={24} sx={{ color: "#fff" }} />
            ) : (
              "Publicar"
            )}
          </Button>
        </Box>
      </Modal>

      {/* Dialog para mensajes de éxito o error */}
      <Dialog
        open={isDialogOpen}
        onClose={closeDialog}
        sx={{
          "& .MuiPaper-root": {
            borderRadius: "16px",
            padding: "30px 20px", // Espaciado general para el diálogo
            textAlign: "center",
            maxWidth: "400px", // Ancho máximo
            margin: "0 auto", // Centrado
          },
        }}
      >
        <DialogContent>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color: dialogMessage.includes("exitosamente")
                ? colors.primary.main
                : colors.accent.orange,
              marginBottom: 3, // Más espacio debajo del título
            }}
          >
            {dialogMessage.includes("exitosamente") ? "¡Éxito!" : "¡Error!"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.neutral.darkGray,
              marginBottom: 3, // Espaciado debajo del mensaje
              lineHeight: 1.5, // Mejora la legibilidad
            }}
          >
            {dialogMessage}
          </Typography>
        </DialogContent>
        <DialogActions
          sx={{
            justifyContent: "center",
            marginTop: -2,
          }}
        >
          <Button
            onClick={closeDialog}
            sx={{
              backgroundColor: colors.accent.orange,
              color: "#fff",
              fontWeight: "bold",
              textTransform: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: colors.accent.orangeHover },
            }}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CreatePost;
