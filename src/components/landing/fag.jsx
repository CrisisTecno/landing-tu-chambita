import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import colors from "../../theme/colors"; // Asegúrate de que tienes este archivo

const FAQ = () => {
  const faqData = [
    {
      question: "¿Qué servicios ofrece TuChambita?",
      answer:
        "Conectamos a clientes con profesionales calificados en plomería, electricidad, limpieza, carpintería, y más servicios a domicilio.",
    },
    {
      question: "¿Cómo puedo contratar a un profesional?",
      answer:
        "Selecciona el servicio que necesitas, revisa los perfiles y calificaciones de los profesionales, y agenda tu cita desde la plataforma.",
    },
    {
      question: "¿Es seguro pagar en TuChambita?",
      answer:
        "Sí, todos los pagos se procesan de manera segura y confiable para garantizar una experiencia sin complicaciones.",
    },
    {
      question: "¿Cómo puedo registrarme?",
      answer:
        "Solo necesitas proporcionar tu correo electrónico y seguir las instrucciones. Es rápido y fácil.",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: colors.secondary.main, // Fondo secundario de TuChambita
        padding: { xs: 4, sm: 8 }, // Espaciado interno
        textAlign: "center",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          color: colors.accent.orange,
          marginBottom: 4,
        }}
      >
        Preguntas Frecuentes
      </Typography>
      <Box
        sx={{
          maxWidth: "800px",
          margin: "0 auto", // Centra los acordeones
        }}
      >
        {faqData.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              backgroundColor: "#fff", // Fondo blanco de cada acordeón
              color: colors.neutral.darkGray,
              marginBottom: 2,
              borderRadius: "8px", // Bordes redondeados
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              overflow: "hidden", // Evita que el contenido sobresalga
            }}
          >
            <AccordionSummary
              expandIcon={
                <ExpandMoreIcon sx={{ color: colors.primary.main }} />
              }
              aria-controls={`panel${index}-content`}
              id={`panel${index}-header`}
            >
              <Typography
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  color: colors.primary.main,
                }}
              >
                {faq.question}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontSize: "0.95rem",
                  lineHeight: 1.6,
                  color: colors.secondary.secondary
                }}
              >
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Box>
  );
};

export default FAQ;
