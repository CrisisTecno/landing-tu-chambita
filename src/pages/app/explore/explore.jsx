import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, CardContent, Button, Avatar, Divider } from "@mui/material";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../../firebase";
import { configDocumentId } from "../../../../config/config";
import colors from "../../../../src/theme/colors";

const Explore = () => {
  const [availableCategories, setAvailableCategories] = useState([]);
  const [recommendedServices, setRecommendedServices] = useState([]); // Mocked services
  const [serviceProviders, setServiceProviders] = useState([]); // Mocked service providers

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
          console.error("El documento de configuración no existe en Firestore.");
        }
      } catch (e) {
        console.error("Error al obtener categorías desde Firestore:", e.message);
      }
    };

    fetchCategories();
  }, []);

  // Mocked recommended services
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

  return (
    <Box sx={{ padding: "24px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      {/* Header */}
      <Typography
        variant="h4"
        sx={{ fontWeight: "bold", color: colors.primary.main, marginBottom: "24px" }}
      >
        Explora nuestras categorías
      </Typography>

      {/* Categories Section */}
      <Grid container spacing={2}>
        {availableCategories.map((category, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box
              sx={{
                backgroundColor: colors.primary.main,
                borderRadius: "12px",
                padding: "16px",
                color: "#fff",
                textAlign: "center",
                fontWeight: "bold",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              }}
            >
              {category}
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ marginY: "24px" }} />

      {/* Recommended Services */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: colors.primary.main, marginBottom: "16px" }}
      >
        Publicaciones recomendadas
      </Typography>
      <Grid container spacing={2}>
        {recommendedServices.map((service) => (
          <Grid item xs={12} sm={6} key={service.id}>
            <Card sx={{ borderRadius: "12px", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: colors.accent.orange }}>
                  {service.name}
                </Typography>
                <Typography variant="body2" sx={{ color: colors.neutral.darkGray }}>
                  {service.description}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: colors.neutral.mediumGray, marginTop: "8px" }}
                >
                  Categoría: {service.category}
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
                  Ver más
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ marginY: "24px" }} />

      {/* Service Providers Section */}
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", color: colors.primary.main, marginBottom: "16px" }}
      >
        Personas que ofrecen servicios
      </Typography>
      <Grid container spacing={2}>
        {serviceProviders.map((provider) => (
          <Grid item xs={12} sm={6} md={4} key={provider.id}>
            <Card
              sx={{
                borderRadius: "12px",
                textAlign: "center",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
                padding: "16px",
              }}
            >
              <Avatar
                src={provider.image}
                sx={{ width: 80, height: 80, margin: "0 auto", marginBottom: "12px" }}
              />
              <Typography variant="h6" sx={{ fontWeight: "bold", color: colors.primary.main }}>
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
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Explore;
