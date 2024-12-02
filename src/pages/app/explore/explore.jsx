import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  CardContent,
  Button,
  Avatar,
  Divider,
  Modal,
} from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../src/firebase";
import colors from "../../../../src/theme/colors";
import { configDocumentId } from "../../../config/config";
import Navbar from "../../../components/app/navbar";
import { PublicationsContext } from "../../../context/publication.provider";

const Explore = () => {
  const [availableCategories, setAvailableCategories] = useState([]);
  const [recommendedServices, setRecommendedServices] = useState([]);
  const { publications, isLoading, fiveFirst } =
    useContext(PublicationsContext);
  const [serviceProviders, setServiceProviders] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null); // Estado para el modal
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado de apertura del modal

  const formatDate = (timestamp) => {
    if (!timestamp) return "Sin fecha";

    const date = timestamp.toDate(); // Método Firestore
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Obtener categorías desde Firestore
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

  // Servicios y proveedores mockeados
  useEffect(() => {
    setRecommendedServices([
      {
        id: 1,
        name: "Albañilería Básica",
        description: "Servicios de reparación y construcción de muros.",
        category: "Albañilería",
      },
      {
        id: 2,
        name: "Plomería Rápida",
        description: "Reparación de fugas y desagües.",
        category: "Plomería",
      },
    ]);

    setServiceProviders([
      {
        id: 1,
        name: "Dylan Correa",
        role: "Albañil Profesional",
        image: "/assets/profile1.jpg",
        connections: 31,
      },
      {
        id: 2,
        name: "Jesús Espinoza",
        role: "Plomero Certificado",
        image: "/assets/profile2.jpg",
        connections: 13,
      },
    ]);
  }, []);

  // Generar degradado aleatorio para las categorías
  const generateRandomGradient = () => {
    const colorsList = [
      "linear-gradient(45deg, #FF7E67, #FFB199)",
      "linear-gradient(45deg, #6C63FF, #896EFF)",
      "linear-gradient(45deg, #00C897, #76F2E2)",
      "linear-gradient(45deg, #FFA500, #FFD580)",
      "linear-gradient(45deg, #FF5C5C, #FF8888)",
    ];
    const randomIndex = Math.floor(Math.random() * colorsList.length);
    return colorsList[randomIndex];
  };

  const handleOpenModal = (publication) => {
    setSelectedPublication(publication);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPublication(null);
    setIsModalOpen(false);
  };

  return (
    <Box
      sx={{
        padding: "24px",
        paddingTop: "10vh",
        paddingLeft: "5vw",
        paddingRight: "2vw",
        backgroundColor: "#fff",
        minHeight: "100vh",
        minWidth: "90vw",
      }}
    >
      <Navbar />
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          fontSize: 24,
          color: colors.primary.main,
          marginBottom: "24px",
        }}
      >
        Explora nuestras categorías
      </Typography>

      {/* Sección de categorías */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1vw",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        {availableCategories.map((category, index) => (
          <Box
            key={index}
            onClick={() => console.log(`Navegar a categoría: ${category}`)} // Aquí implementaremos la redirección en el futuro
            sx={{
              background: generateRandomGradient(),
              borderRadius: "12px",
              padding: "16px",
              color: "#fff",
              textAlign: "center",
              fontWeight: "bold",
              flex: "1 1 calc(25% - 16px)", // Ancho responsivo
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              minWidth: "150px",
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {category}
          </Box>
        ))}
      </Box>

      <Divider sx={{ marginY: "24px" }} />

      {/* Servicios recomendados */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: colors.primary.main,
          marginBottom: "16px",
        }}
      >
        Publicaciones recomendadas
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "space-between",
        }}
      >
        {publications.map((service) => (
          <Box
            key={service.id}
            sx={{
              borderRadius: "12px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              flex: "1 1 calc(50% - 16px)",
              backgroundColor: "#fff",
            }}
          >
            <CardContent>
              <Box
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: colors.accent.orange }}
                >
                  {service.categorias[0]}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: colors.primary.main,
                    marginRight: 2,
                    marginLeft: 2,
                  }}
                >
                  {service.fechaDeCreacion
                    ? formatDate(service.fechaDeCreacion)
                    : "Sin fecha"}{" "}
                </Typography>
              </Box>

              <Typography
                variant="body2"
                sx={{ color: colors.neutral.darkGray }}
              >
                {service.contenido}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#6e6e6e", marginTop: "8px" }}
              >
                {service.autor.nombre}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: colors.accent.orange,
                  color: "#fff",
                  marginTop: "16px",
                  textTransform: "none",
                }}
                onClick={() => handleOpenModal(service)}
              >
                Ver más
              </Button>
            </CardContent>
          </Box>
        ))}
      </Box>

      {/* Modal para mostrar los detalles de la publicación */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "#fff",
            borderRadius: "16px",
            boxShadow: 24,
            padding: 4,
            width: { xs: "90%", md: "60%" },
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {selectedPublication && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                }}
              >
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
                    sx={{ fontWeight: "bold", color: colors.primary.main }}
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

              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: colors.accent.orange,
                  marginTop: 2,
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
                Ubicación: {selectedPublication.ubicacion || "No especificada"}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 4,
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    color:"#fff",
                    borderRadius: "12px",
                    width:"80%",
                    backgroundColor: colors.accent.orange,
                    textTransform: "none",
                    "&:hover": { backgroundColor: colors.accent.orangeHover },
                  }}
                  onClick={handleCloseModal}
                >
                  Cerrar
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>

      <Divider sx={{ marginY: "24px" }} />

      {/* Proveedores de servicios */}
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          color: colors.primary.main,
          marginBottom: "16px",
        }}
      >
        Personas que ofrecen servicios
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          justifyContent: "space-between",
        }}
      >
        {serviceProviders.map((provider) => (
          <Box
            key={provider.id}
            sx={{
              borderRadius: "12px",
              textAlign: "center",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "16px",
              flex: "1 1 calc(33% - 16px)",
              backgroundColor: "#fff",
            }}
          >
            <Avatar
              src={provider.image}
              sx={{
                width: 80,
                height: 80,
                margin: "0 auto",
                marginBottom: "12px",
              }}
            />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: colors.primary.main }}
            >
              {provider.name}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
              {provider.role}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: colors.neutral.mediumGray, marginTop: "8px" }}
            >
              {provider.connections} contactos en común
            </Typography>
            <Button
              variant="contained"
              sx={{
                backgroundColor: colors.accent.orange,
                color: "#fff",
                marginTop: "16px",
                textTransform: "none",
              }}
            >
              Conectar
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Explore;
