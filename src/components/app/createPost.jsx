import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Modal,
  IconButton,
  TextField,
  Avatar,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ArticleIcon from "@mui/icons-material/Article";
import CloseIcon from "@mui/icons-material/Close";
import colors from "../../theme/colors"; // Asegúrate de usar tu paleta de colores personalizada.

const CreatePost = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
          borderRadius: "24px", // Botón redondeado
          cursor: "pointer",
          border: `1px solid ${colors.neutral.lightGray}`,
          transition: "all 0.3s ease", // Animación suave
          "&:hover": {
            backgroundColor: colors.primary.light, // Fondo del botón al hover
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", // Agregar sombra al hover
          },
          "&:hover .icon": {
            backgroundColor: "#fff", // Fondo del ícono al hover
            color: colors.accent.orange, // Cambiar color del ícono al hover
          },
          "&:hover .label": {
            color: colors.accent.orange, // Cambiar color del texto al hover
          },
        }}
        onClick={handleOpenModal} // Abre el modal al hacer clic
      >
        <Avatar
          src="/path-to-avatar.jpg" // Cambia por la ruta del avatar del usuario
          sx={{ width: 40, height: 40 }}
        />
        <Typography className="label" sx={{ color: colors.neutral.darkGray }}>
          Crea una publicación, comparte tu trabajo
        </Typography>
      </Box>

      {/* Opciones debajo del input */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 2,
          paddingLeft: "10vw",
          paddingRight: "10vw",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            borderRadius: "24px",
            padding: "10px 15px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary.light,
              "& .icon": {
                color: colors.accent.orange,
              },
              "& .label": {
                color: colors.accent.orange,
              },
            },
          }}
          onClick={handleOpenModal}
        >
          <AddPhotoAlternateIcon className="icon" sx={{ color:  colors.accent.orange}} />
          <Typography className="label" sx={{ color: colors.accent.orange }}>
            Contenido multimedia
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            cursor: "pointer",
            borderRadius: "24px",
            padding: "10px 15px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: colors.primary.light,
              "& .icon": {
                color: colors.accent.orange,
              },
              "& .label": {
                color: colors.accent.orange,
              },
            },
          }}
          onClick={handleOpenModal}
        >
          <ArticleIcon className="icon" sx={{ color: colors.accent.orange}} />
          <Typography className="label" sx={{ color:  colors.accent.orange }}>
            Escribir artículo
          </Typography>
        </Box>
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
              color:"#fff",
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
                <Typography variant="h6" sx={{ fontWeight: "bold",color:"#000" }}>
                  Cristian Lucio Quispe Nina
                </Typography>
                <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
                Cliente tu Chambita
                </Typography>
              </Box>
            </Box>
            <IconButton onClick={handleCloseModal}>
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Campo para escribir publicación */}
          <TextField
            fullWidth
            multiline
            rows={4}
            placeholder="¿Sobre qué quieres hablar?"
            variant="outlined"
            sx={{
              marginBottom: 3,
              borderRadius:"15px",
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

          {/* Opciones de multimedia */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: 2,justifyContent:"center" }}>
            <IconButton sx={{ color: colors.accent.orange }}>
              <AddPhotoAlternateIcon />
            </IconButton>
            <IconButton sx={{ color: colors.accent.orange }}>
              <ArticleIcon />
            </IconButton>
          </Box>

          {/* Botón para publicar */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              textTransform: "none",
              fontWeight: "bold",
              backgroundColor: colors.accent.orange,
              borderRadius:"2vw",
              color: "#fff",
              
            }}
          >
            Publicar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default CreatePost;
