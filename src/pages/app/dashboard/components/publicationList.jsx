import React, { useContext } from "react";
import { Box, Typography, CircularProgress } from "@mui/material";
import PublicationCard from "./publishCard"; // El componente individual de publicación
import { PublicationsContext } from "../../../../context/publication.provider"; // Contexto de publicaciones
import colors from "../../../../theme/colors";

const PublicationsList = () => {
    
  const { publications, isLoading ,fiveFirst} = useContext(PublicationsContext);

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
          {fiveFirst.map((pub, index) => (
            <Box
              key={pub.id}
              sx={{
                marginBottom: 4,
              }}
            >
              <PublicationCard
                imageUrl={pub.imageUrl || "https://via.placeholder.com/300x200"} // Imagen predeterminada
                categories={pub.categorias || "Sin Categoría"}
                serviceName={pub.autor?.nombre || "Usuario Desconocido"}
                fechaDeCreacion={pub.fechaDeCreacion || ""}
                description={pub.contenido || "Sin descripción"}
                location={pub.ubicacion || "Ubicación desconocida"}
                reviewData={{
                  avatar: pub.autor?.nombre,
                  name: pub.autor?.nombre,
                  rating: pub.autor?.calificacion,
                  totalReviews: pub.autor?.totalVistas,
                  reviewCount: pub.reseñas || 0,
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PublicationsList;
