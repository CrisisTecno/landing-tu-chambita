import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  CircularProgress,
  Modal,
} from "@mui/material";
import colors from "../../../theme/colors";
import { auth } from "../../../firebase"; // Configuración de Firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import img103 from "../../../../public/assets/imgs/img103.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validación: Contraseñas iguales
    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden. Inténtalo de nuevo.");
      setIsLoading(false);
      setIsModalOpen(true);
      return;
    }

    try {
      // Intento de creación de cuenta
      await createUserWithEmailAndPassword(auth, email, password);
      setIsLoading(false);

      // Mostrar éxito y redirigir al dashboard
      setModalMessage("¡Registro exitoso! Bienvenido a TuChambita.");
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/dashboard");
      }, 3000); // Redirigir al dashboard después de 3 segundos

      // Resetear campos
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setIsLoading(false);

      // Manejo de errores de Firebase
      if (err.code === "auth/email-already-in-use") {
        setModalMessage("El correo ya está en uso. Por favor, intenta con otro.");
      } else if (err.code === "auth/weak-password") {
        setModalMessage("La contraseña es demasiado débil. Usa al menos 6 caracteres.");
      } else {
        setModalMessage("Error al registrar la cuenta. Inténtalo más tarde.");
      }
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        minHeight: "100vh",
        minWidth: "100vw",
        background: "#fff",
      }}
    >
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: "1200px",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Textos explicativos */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            color: colors.secondary.secondary,
            textAlign: { xs: "center", md: "left" },
          }}
        >
          <Box
            sx={{
              marginBottom: 4,
              textAlign: "center",
            }}
          >
            <img
              src={img103} // Reemplaza con la ruta de tu imagen PNG
              alt="TuChambita Header"
              style={{
                maxWidth: "60vw",
                marginLeft: "-6vw",
                marginTop: "2vh",
                objectFit: "contain",
              }}
            />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              marginBottom: 3,
              color: colors.accent.orange,
            }}
          >
            Únete a TuChambita
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: colors.secondary.secondary, marginBottom: 2 }}
          >
            Encuentra a los mejores profesionales o conviértete en uno de ellos.
            Regístrate y comienza a disfrutar de nuestros beneficios.
          </Typography>
        </Grid>

        {/* Formulario de registro */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={6}
            sx={{
              width: "100%",
              padding: 4,
              background: "#fff",
              borderRadius: 4,
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <CircularProgress size={50} color="primary" />
              </Box>
            ) : (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    marginBottom: 3,
                    color: colors.accent.orange,
                  }}
                >
                  Crear una cuenta
                </Typography>

                {/* Formulario */}
                <Box component="form" onSubmit={handleSignUp}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Correo Electrónico"
                    placeholder="ejemplo@correo.com"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Contraseña"
                    placeholder="••••••••"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirmar Contraseña"
                    placeholder="••••••••"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Acepto los términos y condiciones"
                    sx={{ color: colors.neutral.darkGray, marginBottom: 3 }}
                  />
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: colors.accent.orange,
                      textTransform: "none",
                      fontWeight: "bold",
                      color: "#fff",
                      marginBottom: 3,
                    }}
                  >
                    Registrarse
                  </Button>
                </Box>

                {/* Enlace a Iniciar Sesión */}
                <Box sx={{ textAlign: "center", marginTop: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.neutral.darkGray,
                    }}
                  >
                    ¿Ya tienes una cuenta?{" "}
                    <Link
                      href="/signin"
                      underline="hover"
                      sx={{
                        color: colors.primary.main,
                        fontWeight: "bold",
                      }}
                    >
                      Inicia Sesión
                    </Link>
                  </Typography>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Modal para errores y éxito */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: modalMessage.includes("exitoso")
                ? colors.primary.main
                : colors.accent.orange,
              fontWeight: "bold",
              marginBottom: 2,
            }}
          >
            {modalMessage.includes("exitoso") ? "Éxito" : "Error"}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: colors.neutral.darkGray,
              marginBottom: 3,
            }}
          >
            {modalMessage}
          </Typography>
          <Button
            variant="contained"
            onClick={closeModal}
            sx={{
              backgroundColor: colors.accent.orange,
              color: "#fff",
              textTransform: "none",
              "&:hover": { backgroundColor: colors.accent.orangeHover },
            }}
          >
            Cerrar
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default SignUp;
