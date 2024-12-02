import React from "react";
import { Box, Paper, Typography, Divider } from "@mui/material";
import colors from "../../../../theme/colors";

const AnalysisComponent = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
        marginBottom: 2,
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Análisis
      </Typography>
      <Divider sx={{ marginY: 2 }} />
      <Typography variant="body2" color={colors.neutral.darkGray}>
        2 visualizaciones del perfil · 0 impresiones de tu publicación · 2
        apariciones en búsquedas.
      </Typography>
    </Paper>
  );
};

export default AnalysisComponent;
