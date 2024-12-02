import React, { useContext, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Grid,
  Paper,
  CircularProgress,
} from "@mui/material";
import GestureButton from "./components/gestureDedector";
import GoogleIcon from "@mui/icons-material/Google";
import colors from "../../../theme/colors";
import { useNavigate } from "react-router-dom";
import img100 from "../../../../public/assets/imgs/img100.png";
import { UserContext } from "../../../context/user.provider";

const SignIn = () => {
  const { login, user } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Manejar errores
  const [isLoading, setIsLoading] = useState(false); // Indicador de carga
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.code === "auth/user-not-found"
          ? "La cuenta no existe. Por favor, regístrate primero."
          : "Credenciales incorrectas. Inténtalo de nuevo."
      );
      setIsLoading(false);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setError(null);
  };

  const handleGoogleSignIn = async () => {
    // Lógica para iniciar sesión con Google (si está habilitada)
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
    overflow:"hidden",
  }}
>
      {/* Modal de error */}
      {isModalOpen && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Oscurecer fondo
            zIndex: 10,
            display: "flex", // Centrar el contenido
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: { xs: "80%", sm: "50%", md: "30%" },
              backgroundColor: "#fff",
              padding: 4,
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333",
                marginBottom: 2,
              }}
            >
              Error de Inicio de Sesión
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "#666",
                marginBottom: 3,
              }}
            >
              {error}
            </Typography>
            <Button
              variant="contained"
              onClick={closeModal}
              sx={{
                backgroundColor: "rgba(255, 87, 34, 0.9)",
                color: "#fff",
                textTransform: "none",
                "&:hover": { backgroundColor: "rgba(255, 87, 34, 1)" },
              }}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      )}

      {/* Contenedor principal */}
      <Grid
        container
        spacing={4}
        sx={{
          maxWidth: "1200px",
          width: "100%", 
          marginX: "auto", 
          overflowX: "hidden", 
          position: "relative",
        }}
      >
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
              src={img100}
              alt="TuChambita Header"
              style={{
                maxWidth: "50vw",
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
            ¿Por qué elegir TuChambita?
          </Typography>

          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginBottom: 2,
                color: colors.secondary.secondary,
              }}
            >
              ⚙️ Rendimiento Adaptable
            </Typography>
            {/* <Typography
              sx={{
                marginLeft: 3,
                color: colors.secondary.secondary,
              }}
            >
              TuChambita se adapta a tus necesidades, mejorando tu experiencia
              y simplificando tus tareas.
            </Typography> */}
            
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                marginBottom: 2,
                color: colors.secondary.secondary,
              }}
            >
              🛠️ Construido para Durar
            </Typography>
            
          </Box>
          <Typography
                variant="body2"
                sx={{
                  color: colors.accent.orange,
                  marginTop: 2,
                  fontSize:18,
                  cursor: "pointer", // Hace que el mouse muestre el puntero de enlace
                  textAlign: "start",
                }}
                onClick={() => {
                  navigate("/signup"); // Navega al inicio de sesión
                }}
              >
                ¿No tienes una cuenta? Crea una y unete...
              </Typography>
        </Grid>
          
        <Grid item xs={12} md={6}>
          <div style={{marginTop:"10vh"}}>

          </div>
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
                  Iniciar Sesión
                </Typography>
                <Box component="form" onSubmit={handleSignIn}>
                  <TextField
                    fullWidth
                    type="email"
                    label="Correo Electrónico"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <TextField
                    fullWidth
                    type="password"
                    label="Contraseña"
                    variant="outlined"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 3,
                    }}
                  >
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Recuérdame"
                      sx={{ color: colors.neutral.darkGray }}
                    />
                    <GestureButton />
                  </Box>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: colors.accent.orange,
                      color: "#fff",
                      marginBottom: 3,
                    }}
                  >
                    Iniciar Sesión
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignIn;
