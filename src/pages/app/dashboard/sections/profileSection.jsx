import React, { useContext, useState } from "react";
import { Box, Typography, Paper, Divider, Button, CircularProgress } from "@mui/material";
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { auto } from "@cloudinary/url-gen/actions/resize";
import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
import colors from "../../../../theme/colors";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/user.provider"; // Importamos el contexto

const cld = new Cloudinary({ cloud: { cloudName: "diubghp1i" } }); // Configuración de Cloudinary

const ProfileSection = () => {
  const { user } = useContext(UserContext); // Obtenemos los datos del usuario desde el contexto
  const navigate = useNavigate();
  const [isImageLoading, setIsImageLoading] = useState(true); // Estado para controlar la carga de la imagen

  const profile = cld
    .image(`tu-chambita/profile/${user?.profileId || "default-profile"}`) // Ruta de la imagen en Cloudinary
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()).width(500).height(500));

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleImageLoad = () => {
    setIsImageLoading(false); // Se oculta el spinner cuando la imagen ha cargado
  };

  const handleImageError = () => {
    setIsImageLoading(false); // También oculta el spinner si la imagen no carga
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: "#fff",
        borderRadius: 4,
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Avatar y nombre del usuario */}
      <Box sx={{ textAlign: "center", marginBottom: 2, position: "relative" }}>
        {isImageLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress size={40} color="primary" />
          </Box>
        )}
        <AdvancedImage
          cldImg={profile}
          alt={user?.nombre || "Usuario"}
          style={{
            display: isImageLoading ? "none" : "block",
            width: 80,
            height: 80,
            borderRadius: "50%",
            margin: "0 auto",
            marginBottom: "1rem",
          }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
        <Typography variant="h6" fontWeight="bold">
          {user?.nombre || "Usuario Desconocido"}
        </Typography>
        <Typography variant="body2" color={colors.neutral.mediumGray}>
          {user?.rol || "Sin Rol Definido"}
        </Typography>
      </Box>

      <Divider sx={{ marginY: 2 }} />

      {/* Detalles del perfil */}
      <Box>
        <Typography variant="body2" fontWeight="bold" sx={{ marginBottom: 1 }}>
          Categorías:
        </Typography>
        <Typography variant="body2" color={colors.neutral.darkGray}>
          {user?.servicios?.join(", ") || "Sin Categorías Definidas"}
        </Typography>

        <Typography
          variant="body2"
          fontWeight="bold"
          sx={{ marginTop: 2, marginBottom: 1 }}
        >
          Calificación:
        </Typography>
        <Typography variant="body2" color={colors.accent.orange}>
          ⭐ {user?.calificacion || "N/A"} (120 reseñas) {/* Valor predeterminado */}
        </Typography>

        <Button
          fullWidth
          onClick={goToProfile}
          variant="contained"
          sx={{
            backgroundColor: colors.accent.orange,
            color: "#fff",
            borderRadius: "12px",
            textTransform: "none",
            marginTop: 3,
          }}
        >
          Editar Perfil
        </Button>
      </Box>
    </Paper>
  );
};

export default ProfileSection;
