import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import colors from "../../theme/colors"; // Asegúrate de usar tu paleta de colores personalizada.
import tuchambitaMascot from "../../../public/assets/imgs/img104.png"; // Reemplaza con la ruta de tu imagen
import { useNavigate } from "react-router-dom";

const WelcomeBanner = () => {
  const navigate =useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.accent.orange,
        paddingLeft:"200px",
        marginTop:"1vh",
        marginBottom:"1vh",
        borderRadius: "12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Texto principal */}
        <Grid item xs={12} md={7}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              color: "#fff",
              marginBottom: 2,
            }}
          >
            Bienvenido a{" "}
            <span style={{ color:  "#fff",}}>TuChambita</span>.
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              color:  "#fff",
              marginBottom: 3,
            }}
          >
            Encuentra a los mejores profesionales para tus necesidades.
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "#fff",
              marginBottom: 3,
              lineHeight: 1.6,
            }}
          >
            Explora nuestras categorías y servicios de plomería, electricidad,
            carpintería, limpieza y mucho más. ¡Tu solución está a un clic de
            distancia!
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: colors.primary.main,
              fontWeight: "bold",
              textTransform: "none",
              padding: "10px 20px",
              borderRadius: "20px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: colors.primary.light,
              },
            }}
            onClick={() => navigate(`/explore`)} 
          >
            Explorar Categorías
          </Button>
        </Grid>

        {/* Imagen de la mascota */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={tuchambitaMascot} // Reemplaza con la imagen adecuada
              alt="Mascota TuChambita"
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default WelcomeBanner;
