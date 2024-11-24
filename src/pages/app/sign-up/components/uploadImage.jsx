import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography, Alert } from "@mui/material";
import colors from "../../../../theme/colors";

const UploadImage = ({ onUploadSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0]; // Seleccionar el archivo
    if (!file) {
      setErrorMessage("No se seleccionó ningún archivo.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null); // Reiniciar el mensaje de error

    // Crear el formData para enviar el archivo a Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default"); // Nombre del preset configurado en Cloudinary

    try {
      // Llamada al endpoint de Cloudinary
      const response = await fetch("https://api.cloudinary.com/v1_1/diubghp1i/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setUploadedImageUrl(data.secure_url); // Guardar la URL de la imagen subida
        if (onUploadSuccess) onUploadSuccess(data.secure_url); // Devolver la URL al padre si se proporciona la función
      } else {
        setErrorMessage(data.error?.message || "Error desconocido al subir la imagen.");
        console.error("Error al subir la imagen:", data.error?.message);
      }
    } catch (error) {
      setErrorMessage("Ocurrió un error inesperado al subir la imagen.");
      console.error("Error al subir la imagen:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ textAlign: "center", marginTop: 2 }}>
      <Button
        variant="contained"
        component="label"
        sx={{
          backgroundColor: colors.accent.orange,
          color: "#fff",
          textTransform: "none",
          fontWeight: "bold",
          "&:hover": {
            backgroundColor: colors.accent.orangeHover,
          },
        }}
      >
        {isLoading ? "Cargando..." : "Subir Imagen"}
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleImageUpload}
          disabled={isLoading}
        />
      </Button>

      {isLoading && (
        <CircularProgress
          size={24}
          sx={{ color: colors.accent.orange, marginLeft: 2 }}
        />
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ marginTop: 2 }}>
          {errorMessage}
        </Alert>
      )}

      {uploadedImageUrl && (
        <Box mt={2}>
          <Typography variant="body1" color={colors.primary.main}>
            Imagen subida exitosamente:
          </Typography>
          <img
            src={uploadedImageUrl}
            alt="Imagen subida"
            style={{ maxWidth: "100%", marginTop: 10, borderRadius: 8 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default UploadImage;
