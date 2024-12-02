import React from "react";
import Navbar from "../../components/landing/navbar";
import HeroSection from "./homeSection";
import ProfileCard from "../../components/landing/cardPerson";
import Footer from "../../components/landing/footer";
import FAQ from "../../components/landing/fag";
import Services from "../../components/landing/services";
import Features from "../../components/landing/features";
import PromotionalBanner from "../../components/landing/promotionBanner";
import img69 from "../../../public/assets/imgs/img69.png";
import img89 from "../../../public/assets/imgs/img89.png";
import { Box } from "@mui/material";

const LandingPage = () => {
  return (
    <Box
      sx={{
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Navbar */}
      <Navbar />

      {/* Contenido principal */}
      <Box
        sx={{
          marginTop: "3vh",
          width: "100%", // Asegura que ocupe el ancho completo
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5vh", // Espaciado entre secciones
        }}
      >
        {/* Sección Home */}
        <Box
          id="inicio"
          sx={{
            position: "relative",
            backgroundColor: "#f3f4f6",
            width: "100%", // Ancho completo
            overflow: "hidden",
          }}
        >
          <HeroSection />

          {/* Tarjeta de perfil sobrepuesta */}
          <Box
            sx={{
              position: "absolute",
              top: "85%",
              left: "72%",
              transform: "translate(-50%, -50%)",
              zIndex: 100,
            }}
          >
            
            <ProfileCard />
          </Box>
        </Box>

        {/* Sección Características */}
        <Box
          id="caracteristicas"
          sx={{
            backgroundColor: "#fff",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            width: "100%",
          }}
        >
          <Features />

          {/* Imagen decorativa */}
          <img
            src={img69}
            alt="TuChambita Hero"
            style={{
              position: "absolute",
              top: "-20%",
              left: "0%",
              zIndex: 1,
              maxWidth: "40vw",
              opacity: 0.9,
              pointerEvents: "none",
            }}
          />
        </Box>

        {/* Sección Promocional */}
        <Box
          id="teams"
          sx={{
            backgroundColor: "#fff",
            width: "100%",
            position: "relative",
          }}
        >
          <PromotionalBanner />

          {/* Imagen decorativa */}
          <img
            src={img89}
            alt="Promoción TuChambita"
            style={{
              position: "absolute",
              top: "-28%", // Ajusta según la posición deseada
              right: "0%", // Controla la posición horizontal
              maxWidth: "30vw",
              objectFit: "cover",
            }}
          />
        </Box>

        {/* Sección Servicios */}
        <Box
          id="servicios"
          sx={{
            backgroundColor: "#f3f4f6",
            width: "100%",
          }}
        >
          <Services />
        </Box>

        {/* Sección FAQ */}
        <Box
          id="preguntas"
          sx={{
            backgroundColor: "#f3f4f6",
            width: "100%",
          }}
        >
          <FAQ />
        </Box>

        {/* Footer */}
        <Footer />
      </Box>
    </Box>
  );
};

export default LandingPage;
