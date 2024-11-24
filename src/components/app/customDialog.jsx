import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import colors from "../../theme/colors";

const CustomDialog = ({ isOpen, onClose, message, isSuccess }) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 4,
          padding: 3,
          maxWidth: "400px",
          textAlign: "center", // Centra el contenido del diálogo
        },
      }}
    >
      <DialogContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: isSuccess ? colors.primary.main : colors.accent.orange,
            marginBottom: 2,
          }}
        >
          {isSuccess ? "Éxito" : "Error"}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: colors.neutral.darkGray,
            marginBottom: 3,
          }}
        >
          {message}
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: 2,
        }}
      >
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: colors.accent.orange,
            color: "#fff",
            paddingX: 3,
            textTransform: "none",
            "&:hover": { backgroundColor: colors.accent.orangeHover },
          }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
