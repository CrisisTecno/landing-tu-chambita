import React from "react";
import Navbar from "../../components/landing/navbar";
import HeroSection from "./homeSection";
import ProfileCard from "../../components/landing/cardPerson";
import Footer from "../../components/landing/footer";
import FAQ from "../../components/landing/fag";

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
            position: "relative", // Configuración necesaria para sobreponer elementos hijos
            background: "#f3f4f6",
          }}
        >
          <HeroSection />

          {/* ProfileCard sobrepuesta */}
          <div
            style={{
              position: "absolute", // Sobrepone la tarjeta respecto a la sección
              top: "100%", // Cambia esta propiedad para ajustar la posición vertical
              left: "75%", // Cambia esta propiedad para ajustar la posición horizontal
              transform: "translate(-50%, -50%)", // Centra la tarjeta
              zIndex: 10, // Asegura que esté encima del contenido
            }}
          >
            <ProfileCard />
          </div>
        </section>

        {/* Sección Services */}
        <section
          id="services"
          style={{
            background: "#e5e5e5",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            width: "100%",
          }}
        >
          <ProfileCard />
        </section>

        {/* Otras Secciones */}
        <section id="teams" style={{ background: "#fff", width: "100%" }}>
          <h1>Teams Section</h1>
        </section>
        <section id="contact" style={{ background: "#f3f4f6", width: "100%" }}>
          <h1>Contact Section</h1>
        </section>
        <section id="fag" style={{ background: "#f3f4f6", width: "100%" }}>
          <FAQ/>
        </section>
        <Footer/>
      </div>
    </>
  );
};

export default LandingPage;
