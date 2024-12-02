import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Modal,
  Avatar,
  Button,
} from "@mui/material";
import PublicationCard from "./publishCard"; // Componente individual de publicación
import { PublicationsContext } from "../../../../context/publication.provider"; // Contexto de publicaciones
import colors from "../../../../theme/colors";
import { useNavigate } from "react-router-dom";

const PublicationsList = () => {
  const navigate= useNavigate();
  const { isLoading, fiveFirst } = useContext(PublicationsContext);
  const [selectedPublication, setSelectedPublication] = useState(null); // Publicación seleccionada para mostrar en el modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado del modal

  // Funciones para abrir y cerrar el modal
  const handleOpenModal = (publication) => {
    setSelectedPublication(publication);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPublication(null);
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: colors.primary.main,
          marginBottom: 4,
          textAlign: "start",
        }}
      >
        Publicaciones Recomendadas de TuChambita
      </Typography>

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <CircularProgress color="primary" />
        </Box>
      ) : (
        <Box>
          {fiveFirst.map((pub) => (
            <Box
              key={pub.id}
              sx={{
                marginBottom: 4,
              }}
              onClick={() => handleOpenModal(pub)} // Abrir modal con los detalles de la publicación
            >
              <PublicationCard
                imageUrl={pub.imageUrl || "https://via.placeholder.com/300x200"} // Imagen predeterminada
                categories={pub.categorias || "Sin Categoría"}
                serviceName={pub.autor?.nombre || "Usuario Desconocido"}
                fechaDeCreacion={pub.fechaDeCreacion || ""}
                description={pub.contenido || "Sin descripción"}
                location={pub.ubicacion || "Ubicación desconocida"}
                reviewData={{
                  avatar: pub.autor?.avatar,
                  name: pub.autor?.nombre,
                  rating: pub.autor?.calificacion,
                  totalReviews: pub.autor?.totalVistas,
                }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Modal para mostrar los detalles de la publicación */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {selectedPublication && (
            <Box
              sx={{
                     backgroundColor: "#6e6e6e",
                bgcolor: "background.paper",
                borderRadius: "16px",
                boxShadow: 24,
                padding: 4,
                width: { xs: "90%", md: "60%" },
                maxHeight: "90vh",
                maxWidth: "35vw",
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                overflowY: "auto",
              }}
            >
              {/* Header del Modal */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  src={
                    selectedPublication.autor?.avatar ||
                    "/assets/default-avatar.png"
                  }
                  alt={selectedPublication.autor?.nombre || "Sin Nombre"}
                  sx={{ width: 60, height: 60 }}  
             
                />
                <Box>
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: "bold", color: "#000" }}
                    onClick={() => navigate(`/profilex/${selectedPublication.autor?.uid}`)} 
                  >
                    {selectedPublication.autor?.nombre || "Usuario Desconocido"}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: colors.neutral.darkGray }}
                  >
                    {selectedPublication.autor?.rol || "Rol desconocido"}
                  </Typography>
                </Box>
              </Box>

              {/* Detalles de la publicación */}
              <Box sx={{ marginTop: 4 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: colors.accent.orange,
                  }}
                >
                  {selectedPublication.contenido || "Sin descripción"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: colors.neutral.darkGray, marginTop: 2 }}
                >
                  Categorías:{" "}
                  {selectedPublication.categorias
                    ? selectedPublication.categorias.join(", ")
                    : "Sin Categoría"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: colors.neutral.darkGray, marginTop: 1 }}
                >
                  Ubicación:{" "}
                  {selectedPublication.ubicacion || "No especificada"}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: colors.neutral.darkGray, marginTop: 1 }}
                >
                  Calificación: ⭐{" "}
                  {selectedPublication.autor?.calificacion || 0}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ color: colors.neutral.darkGray, marginTop: 1 }}
                >
                  Total de vistas: {selectedPublication.autor?.totalVistas || 0}
                </Typography>
              </Box>

              {/* Botón para cerrar */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 4,
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    borderRadius: "12px",
                    backgroundColor: colors.accent.orange,
                    textTransform: "none",
                    color:"#fff",
                    "&:hover": { backgroundColor: colors.accent.orangeHover },
                  }}
                  onClick={handleCloseModal}
                >
                  Cerrar
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default PublicationsList;
