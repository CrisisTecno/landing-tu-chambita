import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Divider,
  Grid,
  Link,
  Paper,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import colors from "../../../theme/colors";
import { useNavigate } from "react-router-dom";
import img100 from "../../../../public/assets/imgs/img100.png";
import { auth } from "../../../firebase"; // Asegúrate de configurar correctamente tu archivo de Firebase
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Para manejar errores
  const [isLoading, setIsLoading] = useState(false); // Indicador de carga
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(email);
      console.log(password);
      // Intento de inicio de sesión
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Inicio de sesión exitoso");
      setIsLoading(false);

      // Redirigir al dashboard
      navigate("/dashboard");
    } catch (err) {
      console.error("Error de inicio de sesión:", err.message);

      // Mostrar error en el modal
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
    // const provider = new GoogleAuthProvider();
    // setIsLoading(true); // Mostrar el indicador de carga
    // try {
    //   await signInWithPopup(auth, provider);
    //   console.log("Inicio de sesión con Google exitoso");
    //   setIsLoading(false);
    // } catch (err) {
    //   setError("Hubo un problema al iniciar sesión con Google.");
    //   setIsLoading(false); // Ocultar el indicador de carga
    // }
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
            display: "flex", // Para centrar el contenido
            alignItems: "center", // Centrar verticalmente
            justifyContent: "center", // Centrar horizontalmente
          }}
        >
          <Box
            sx={{
              width: { xs: "80%", sm: "50%", md: "30%" }, // Responsivo
              backgroundColor: "#fff", // Fondo blanco
              padding: 4, // Espaciado interno
              borderRadius: "12px", // Bordes redondeados
              boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)", // Sombra
              textAlign: "center", // Centrar texto
            }}
          >
            {/* Título */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                color: "#333", // Texto oscuro
                marginBottom: 2,
              }}
            >
              Error de Inicio de Sesión
            </Typography>

            {/* Mensaje */}
            <Typography
              variant="body1"
              sx={{
                color: "#666", 
                marginBottom: 3,
              }}
            >
              Las credenciales son incorrectas o la cuenta no existe.
            </Typography>

            <Button
              variant="contained"
              onClick={closeModal} 
              sx={{
                backgroundColor: "rgba(255, 87, 34, 0.9)",
                color: "#fff",
                textTransform: "none",
                "&:hover": { backgroundColor: "rgba(255, 87, 34, 1)" }, // Naranja oscuro al pasar el mouse
              }}
            >
              Aceptar
            </Button>
          </Box>
        </Box>
      )}
      {/* Contenedor general centrado */}
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
              src={img100} // Reemplaza con la ruta de tu imagen PNG
              alt="TuChambita Header"
              style={{
                maxWidth: "50vw",
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
              <span style={{ fontSize: 16, color: colors.secondary.secondary }}>
                ⚙️
              </span>
              Rendimiento Adaptable
            </Typography>
            <Typography
              sx={{
                marginLeft: 3,
                color: colors.secondary.secondary,
              }}
            >
              TuChambita se adapta a tus necesidades, mejorando tu experiencia y
              simplificando tus tareas.
            </Typography>
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
              <span style={{ fontSize: 16, color: colors.accent.orange }}>
                🛠️
              </span>
              Construido para Durar
            </Typography>
            <Typography
              sx={{
                marginLeft: 3,
                color: colors.secondary.secondary,
              }}
            >
              Encuentra profesionales calificados y servicios garantizados.
            </Typography>
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant="body1"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: colors.secondary.secondary,
                marginBottom: 2,
              }}
            >
              <span style={{ fontSize: 16, color: colors.accent.orange }}>
                👍
              </span>
              Excelente Experiencia de Usuario
            </Typography>
            <Typography
              sx={{
                marginLeft: 3,
                color: colors.secondary.secondary,
              }}
            >
              Navegación intuitiva y servicios de alta calidad para todos tus
              proyectos.
            </Typography>
          </Box>
        </Grid>

        {/* Formulario de inicio de sesión */}
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
                  Iniciar Sesión
                </Typography>

                {/* Formulario */}
                <Box component="form" onSubmit={handleSignIn}>
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
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ color: colors.primary.main, fontSize: "14px" }}
                    >
                      ¿Olvidaste tu contraseña?
                    </Link>
                  </Box>
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
                    Iniciar Sesión
                  </Button>
                </Box>

                {/* Divisor */}
                <Divider sx={{ marginBottom: 3 }}>O</Divider>

                {/* Botones de redes sociales */}
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Button
                      fullWidth
                      variant="outlined"
                      startIcon={<GoogleIcon />}
                      onClick={handleGoogleSignIn}
                      sx={{
                        textTransform: "none",
                        color: colors.neutral.darkGray,
                        borderColor: colors.neutral.lightGray,
                        "&:hover": {
                          backgroundColor: colors.neutral.lightGray,
                        },
                      }}
                    >
                      Inicia sesión con Google
                    </Button>
                  </Grid>
                </Grid>

                {/* Registro */}
                <Box sx={{ textAlign: "center", marginTop: 3 }}>
                  <Typography
                    variant="body2"
                    sx={{
                      color: colors.neutral.darkGray,
                    }}
                  >
                    ¿No tienes una cuenta?{" "}
                    <Link
                      href="/signup"
                      underline="hover"
                      sx={{
                        color: colors.primary.main,
                        fontWeight: "bold",
                      }}
                    >
                      Regístrate
                    </Link>
                  </Typography>
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
