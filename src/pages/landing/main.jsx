import React from "react";
import Navbar from "../../components/landing/navbar";
import HeroSection from "./homeSection";
import ProfileCard from "../../components/landing/cardPerson";
import Footer from "../../components/landing/footer";
import FAQ from "../../components/landing/fag";
import Features from "../../components/landing/features";
import PromotionalBanner from "../../components/landing/promotionBanner";
import img69 from "../../../public/assets/imgs/img69.png";
import img89 from "../../../public/assets/imgs/img89.png";
import { Box, Typography, Button } from "@mui/material";
const LandingPage = () => {
  return (
    <>
      <Navbar />
      <div
        style={{
          marginTop: "3vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "5vh", // Ocupa todo el ancho
        }}
      >
        {/* Sección Home */}
        <section
          id="home"
          style={{
            position: "relative",
            background: "#f3f4f6",
          }}
        >
          <HeroSection />

          {/* ProfileCard sobrepuesta */}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "75%",
              transform: "translate(-50%, -50%)",
              zIndex: 10,
            }}
          >
            <ProfileCard />
          </div>
        </section>

        {/* Sección Services */}
        <section>
          <section
            id="services"
            style={{
              background: "#FFF",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "60vh",
              width: "100%",
              overflow: "hidden",
            }}
          >
            <Features />
          </section>
          <img
            src={img69}
            alt="TuChambita Hero"
            style={{
              position: "absolute",
              top: "50%",
              left: "0%",
              zIndex: 1,
              maxWidth: "40vw",
              opacity: 0.9,
              pointerEvents: "none",
            }}
          />
        </section>

        {/* Otras Secciones */}
        <section id="teams" style={{ background: "#fff", width: "100%" }}>
          <PromotionalBanner />
        
            <img
              src={img89} // Ruta de la imagen
              alt="Promoción TuChambita"
              style={{
                position: "absolute",
                top: "125%",
                left: "80%",
                width: "100%",
                marginRigth: "-10vw",
                marginLeft: "-10vw",
                maxWidth: "30vw",
                objectFit: "cover",
              }}
            />
        
        </section>
        <section id="contact" style={{ background: "#f3f4f6", width: "100%" }}>
          <h1>Contact Section</h1>
        </section>
        <section id="fag" style={{ background: "#f3f4f6", width: "100%" }}>
          <FAQ />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
