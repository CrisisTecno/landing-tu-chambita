import React, { useRef, useEffect } from "react";
import { Box, Typography, Avatar, Card, CardContent, Button } from "@mui/material";
import colors from "../../../../theme/colors";

const reviews = [
  {
    name: "Maria Korsgaard",
    date: "15/03/2023",
    avatar: "/path-to-avatar1.jpg",
    rating: 5,
    review: "El servicio fue excelente y los profesionales fueron amables. ¡Altamente recomendado!",
    job: "Plomera, Electricista",
  },
  {
    name: "Maren Calzoni",
    date: "12/03/2023",
    avatar: "/path-to-avatar2.jpg",
    rating: 4,
    review: "Muy buen trabajo. Podrían mejorar los tiempos de respuesta, pero en general todo estuvo bien.",
    job: "Carpintera",
  },
  {
    name: "Davis Dokidis",
    date: "08/03/2023",
    avatar: "/path-to-avatar3.jpg",
    rating: 5,
    review: "Excelente servicio y gran calidad. Lo recomiendo totalmente.",
    job: "Pintor, Albañil",
  },
  {
    name: "Lucas Rivera",
    date: "07/03/2023",
    avatar: "/path-to-avatar4.jpg",
    rating: 5,
    review: "Un excelente trabajo y rápido. Muy satisfecho.",
    job: "Fontanero",
  },
  {
    name: "Lucas Rivera",
    date: "07/03/2023",
    avatar: "/path-to-avatar4.jpg",
    rating: 5,
    review: "Un excelente trabajo y rápido. Muy satisfecho.",
    job: "Fontanero",
  },
];

const ReviewsCarousel = () => {
  const carouselRef = useRef(null);

  // Animación automática del carrusel
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const scrollAmount = carouselRef.current.scrollLeft + 300; // Desplazarse 300px hacia la derecha
        carouselRef.current.scrollTo({ left: scrollAmount, behavior: "smooth" });
      }
    }, 3000); // Cada 3 segundos

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: "#fff",
        borderRadius: "16px",
      }}
    >
      {/* Título */}
      <Typography variant="h5" sx={{ fontWeight: "bold", marginBottom: 2, color: colors.primary.main, textAlign: "left" }}>
        Opiniones de nuestros usuarios
      </Typography>

      {/* Rating general */}


      {/* Carrusel de reseñas */}
      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          overflowX: "auto", // Habilitar desplazamiento horizontal
          gap: 3,
          scrollBehavior: "smooth",
          paddingBottom: 4,
          paddingTop:4,
          "&::-webkit-scrollbar": {
            display: "none", // Ocultar scrollbar en navegadores compatibles
          },
        }}
      >
        {reviews.map((review, index) => (
          <Card
            key={index}
            sx={{
              flex: "0 0 auto",
              minWidth: "250px",
              maxWidth: "280px",
              padding: 2,
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            <CardContent>
              {/* Avatar */}
              <Box sx={{ display: "flex", justifyContent: "center", marginBottom: 2 }}>
                <Avatar
                  src={review.avatar}
                  alt={review.name}
                  sx={{ width: 64, height: 64 }}
                />
              </Box>

              {/* Nombre, especialidad y fecha */}
              <Typography variant="h6" sx={{ fontWeight: "bold", color: colors.primary.main, textAlign: "center" }}>
                {review.name}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.neutral.mediumGray, textAlign: "center" }}>
                {review.job}
              </Typography>
              <Typography variant="body2" sx={{ color: colors.neutral.mediumGray, textAlign: "center", marginBottom: 2 }}>
                {review.date}
              </Typography>

              {/* Reseña */}
              <Typography variant="body2" sx={{ color: colors.neutral.darkGray, marginBottom: 2, textAlign: "center" }}>
                {review.review}
              </Typography>

              {/* Estrellas */}
              <Typography variant="h6" sx={{ color: colors.accent.orange, textAlign: "center" }}>
                {"★".repeat(review.rating)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Botón para escribir una reseña */}
      <Box sx={{ textAlign: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          sx={{
            borderRadius:"2vw",
            textTransform: "none",
            color:"#fff",
            paddingLeft:5,
            paddingRight:5,
            fontWeight:"bold",
            backgroundColor: colors.accent.orange,
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: colors.accent.orange,
              transform:"scale(1.1,1.1)",
            },
          }}
        >
          Escribir una reseña
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewsCarousel;
