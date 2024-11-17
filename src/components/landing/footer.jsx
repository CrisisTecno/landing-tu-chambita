import React from "react";
import PropTypes from "prop-types";
import { Box, Typography, IconButton, Grid, Link, Divider } from "@mui/material";
import colors from "../../theme/colors";

const year = new Date().getFullYear();

const Footer = ({
  title = "TuChambita",
  description = "Conectamos clientes con los mejores profesionales para servicios a domicilio. Con TuChambita, tus tareas del hogar o negocio son resueltas con confianza y profesionalismo.",
  socials = [
    { name: "instagram", path: "https://instagram.com/tuchambita" },
    { name: "linkedin", path: "https://linkedin.com/company/tuchambita" },
    { name: "facebook", path: "https://facebook.com/tuchambita" },
  ],
  menus = [
    {
      name: "Nuestra Empresa",
      items: [
        { name: "Sobre Nosotros", path: "#about" },
        { name: "Equipo", path: "#team" },
        { name: "Servicios", path: "#services" },
        { name: "Proyectos", path: "#projects" },
      ],
    },
    {
      name: "Recursos",
      items: [
        { name: "Blog", path: "#blog" },
        { name: "Preguntas Frecuentes", path: "#faq" },
        { name: "Soporte", path: "#support" },
        { name: "Contáctanos", path: "#contact" },
      ],
    },
  ],
  contact = {
    developer: "Desarrollado por Nextvel",
    website: "https://nextvel.com",
    email: "contacto@nextvel.com",
  },
  copyright,
}) => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.secondary.main,
        color: colors.secondary.secondary,
        padding: { xs: 4, md: 6 },
      }}
    >
      {/* Contenido Principal */}
      <Grid container spacing={4}>
        {/* Título y Descripción */}
        <Grid item xs={12} md={4}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, color: colors.accent.orange, marginBottom: 2 }}
          >
            {title}
          </Typography>
          <Typography variant="body2" sx={{ lineHeight: 1.6, color: colors.secondary.secondary}}>
            {description}
          </Typography>
          {/* Redes Sociales */}
          <Box sx={{ display: "flex", gap: 1, marginTop: 2 }}>
            {socials.map(({ name, path }) => (
              <IconButton
                key={name}
                href={path}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: colors.primary.main,
                  "&:hover": { color: colors.primary.dark },
                }}
              >
                <i className={`fa-brands fa-${name}`} />
              </IconButton>
            ))}
          </Box>
        </Grid>

        {/* Menús de Enlaces */}
        <Grid item xs={12} md={6} container spacing={4}>
          {menus.map(({ name, items }) => (
            <Grid item xs={6} key={name}>
              <Typography
                variant="body1"
                sx={{
                  fontWeight: 700,
                  color: colors.accent.orange,
                  marginBottom: 2,
                  textTransform: "uppercase",
                }}
              >
                {name}
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", padding: 0, margin: 0 }}>
                {items.map((item) => (
                  <Box
                    component="li"
                    key={item.name}
                    sx={{ marginBottom: 1 }}
                  >
                    <Link
                      href={item.path}
                      underline="none"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .querySelector(item.path)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      sx={{
                        color: colors.secondary.secondary,
                        "&:hover": { color: colors.primary.main },
                        fontSize: "0.9rem",
                      }}
                    >
                      {item.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Contacto con Nextvel */}
        <Grid item xs={12} md={2}>
          <Typography
            variant="body1"
            sx={{
              fontWeight: 700,
              color: colors.accent.orange,
              marginBottom: 2,
              textTransform: "uppercase",
            }}
          >
            {contact.developer}
          </Typography>
          <Box>
            <Link
              href={contact.website}
              target="_blank"
              rel="noopener noreferrer"
              underline="none"
              sx={{
                color: colors.secondary.secondary,
                "&:hover": { color: colors.primary.main },
                display: "block",
                marginBottom: 1,
              }}
            >
              Sitio web
            </Link>
            <Link
              href={`mailto:${contact.email}`}
              underline="none"
              sx={{
                color: colors.secondary.secondary,
                "&:hover": { color: colors.primary.main },
                display: "block",
              }}
            >
              {contact.email}
            </Link>
          </Box>
        </Grid>
      </Grid>

      {/* Divider */}
      <Divider sx={{ backgroundColor: colors.neutral.mediumGray, marginY: 4 }} />

      {/* Footer Inferior */}
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="body2" sx={{ color: colors.secondary.secondary }}>
          {copyright ||
            `Copyright © ${year} TuChambita fue Desarrollado por Nextvel.`}
        </Typography>
      </Box>
    </Box>
  );
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  contact: PropTypes.shape({
    developer: PropTypes.string,
    website: PropTypes.string,
    email: PropTypes.string,
  }),
  copyright: PropTypes.node,
};

export default Footer;
