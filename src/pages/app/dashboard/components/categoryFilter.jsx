import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import colors from "../../../../theme/colors";
import { db } from "../../../../firebase"; // Configuración de Firebase
import { doc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // Generar IDs únicos para las categorías
import { configDocumentId } from "../../../../config/config";

const CategoryFilter = ({ onCategoryClick }) => {
  const [availableCategories, setAvailableCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

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
          console.error("El documento de configuración no existe en Firestore.");
        }
      } catch (e) {
        console.error("Error al obtener categorías desde Firestore:", e.message);
      }
    };

    fetchCategories();
  }, []);

  // Generar estilos de degradado para cada categoría de manera dinámica
  const generateGradient = (index) => {
    const gradients = [
      "linear-gradient(135deg, #6C63FF, #8A83FF)", // Morado
      "linear-gradient(135deg, #00C897, #57D6AC)", // Verde
      "linear-gradient(135deg, #FFA500, #FFC46E)", // Naranja
      "linear-gradient(135deg, #FF5C5C, #FF7E67)", // Rojo
      "linear-gradient(135deg, #FF7E67, #FF9F85)", // Coral 
    ];
    return gradients[index % gradients.length];
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (onCategoryClick) onCategoryClick(category); // Callback para comunicar al componente padre
  };

  return (
    <Box sx={{ padding: "16px", textAlign: "start" }}>
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          marginLeft:2,
          marginBottom: "24px",
          color: colors.primary.main,
        }}
      >
        Filtrar por Categoría
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {availableCategories.map((category, index) => (
          <Grid item xs={6} sm={3} key={uuidv4()}>
            <Box
              onClick={() => handleCategoryClick(category)}
              sx={{
                background: generateGradient(index), // Fondo con degradado dinámico
                borderRadius: "16px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "24px",
                cursor: "pointer",
                transition: "transform 0.3s ease",
                boxShadow:
                  selectedCategory === category
                    ? "0px 6px 12px rgba(0, 0, 0, 0.2)"
                    : "0px 4px 8px rgba(0, 0, 0, 0.1)",
                transform: selectedCategory === category ? "scale(1.1)" : "scale(1)",
                "&:hover": {
                  transform: "scale(1.1)",
                  boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              {/* Nombre del servicio */}
              <Typography
                variant="body1"
                sx={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
              >
                {category}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryFilter;
