import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Modal,
  CircularProgress,
  Paper,
} from "@mui/material";
import colors from "../../../theme/colors";
import { auth, db } from "../../../firebase"; // Firebase config
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import img103 from "../../../../public/assets/imgs/img103.png";
import { UserContext } from "../../../context/user.provider";
import { doc, getDoc } from "firebase/firestore";
import UploadImage from "./components/uploadImage"; // Componente para cargar imágenes

const SignUpWorker = () => {
  const { loginForCreation } = useContext(UserContext);
  const navigate = useNavigate();

  // Estados para la información básica
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Datos adicionales del trabajador
  const [location, setLocation] = useState("");
  const [descripcion, setDescription] = useState("");
  const [tarifa, setTarifa] = useState("");
  const [certificaciones, setCertificaciones] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [añosExperiencia, setAñosExperiencia] = useState("");
  const [disponibilidad, setDisponibilidad] = useState({
    lunes: { inicio: "", fin: "" },
    martes: { inicio: "", fin: "" },
    miércoles: { inicio: "", fin: "" },
    jueves: { inicio: "", fin: "" },
    viernes: { inicio: "", fin: "" },
  });

  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Aquí puedes cargar las categorías de servicio si es necesario
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validaciones básicas
    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden. Inténtalo de nuevo.");
      setIsLoading(false);
      setIsModalOpen(true);
      return;
    }

    if (password === "" || email === "" || nombre === "") {
      setModalMessage("Por favor llena todos los campos.");
      setIsLoading(false);
      setIsModalOpen(true);
      return;
    }

    if (!isTermsAccepted) {
      setModalMessage("Por favor, acepta los términos y condiciones.");
      setIsLoading(false);
      setIsModalOpen(true);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Actualizar perfil
      await updateProfile(user, { displayName: nombre });

      // Guardar datos del trabajador en Firestore
      await setDoc(doc(db, "usuarios", user.uid), {
        nombre,
        correo: email,
        tarifa: parseFloat(tarifa), // Asegúrate de almacenar como número
        ubicacion: location,
        descripcion,
        certificaciones,
        habilidades,
        añosExperiencia: parseInt(añosExperiencia, 10),
        disponibilidad,
        rol: "trabajador",
        fechaDeCreacion: new Date(),
        verificado: false,
        puntosReputacion: 0,
        verificacionIdentidad: false,
        historialContrataciones: [],
      });

      // Iniciar sesión automáticamente
      await loginForCreation(email);

      setIsLoading(false);
      setModalMessage("¡Cuenta creada exitosamente!");
      setIsModalOpen(true);

      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/dashboard"); // Redirige al dashboard del trabajador
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      // Manejo de errores específicos de Firebase
      switch (err.code) {
        case "auth/email-already-in-use":
          setModalMessage("El correo ya está en uso. Por favor, intenta con otro.");
          break;
        case "auth/weak-password":
          setModalMessage("La contraseña es demasiado débil. Usa al menos 6 caracteres.");
          break;
        default:
          setModalMessage("Hubo un problema al registrar la cuenta. Inténtalo más tarde.");
      }
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const handleImageUpload = (url) => {
    console.log("URL de la imagen subida:", url);
    // Aquí puedes guardar la URL de la imagen en Firestore si es necesario
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
        overflow: "hidden",
      }}
    >
      <Grid container spacing={4} sx={{ maxWidth: "1200px", justifyContent: "center" }}>
        {/* Información de la cuenta */}
        <Grid item xs={12} md={6} sx={{ textAlign: "center" }}>
          <Box sx={{ marginBottom: 4 }}>
            <img
              src={img103}
              alt="TuChambita Header"
              style={{ maxWidth: "60vw", objectFit: "contain" }}
            />
          </Box>
          <Typography variant="h4" sx={{ color: colors.accent.orange, marginBottom: 3 }}>
            Regístrate como Trabajador
          </Typography>
        </Grid>

        {/* Formulario de Registro */}
        <Grid item xs={12} md={6}>
          <Paper elevation={6} sx={{ padding: 4, borderRadius: 4 }}>
            {isLoading ? (
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress size={50} />
              </Box>
            ) : (
              <>
                <Typography variant="h5" sx={{ color: colors.accent.orange, marginBottom: 3 }}>
                  Completa tu registro
                </Typography>
                <Box component="form" onSubmit={handleSignUp}>
                  <TextField
                    fullWidth
                    label="Nombre Completo"
                    variant="outlined"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <TextField
                    fullWidth
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
                  <TextField
                    fullWidth
                    type="password"
                    label="Confirmar Contraseña"
                    variant="outlined"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Ubicación"
                    variant="outlined"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Descripción"
                    variant="outlined"
                    value={descripcion}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Tarifa por Hora"
                    variant="outlined"
                    value={tarifa}
                    onChange={(e) => setTarifa(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />
                  <TextField
                    fullWidth
                    label="Años de Experiencia"
                    variant="outlined"
                    value={añosExperiencia}
                    onChange={(e) => setAñosExperiencia(e.target.value)}
                    sx={{ marginBottom: 3 }}
                  />

                  {/* Disponibilidad */}
                  <Typography variant="body1" sx={{ marginBottom: 1 }}>
                    Disponibilidad Semanal
                  </Typography>
                  {["lunes", "martes", "miércoles", "jueves", "viernes"].map((dia) => (
                    <Box key={dia} sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
                      <TextField
                        label={`${dia.charAt(0).toUpperCase() + dia.slice(1)} Inicio`}
                        variant="outlined"
                        value={disponibilidad[dia].inicio}
                        onChange={(e) =>
                          setDisponibilidad({
                            ...disponibilidad,
                            [dia]: { ...disponibilidad[dia], inicio: e.target.value },
                          })
                        }
                      />
                      <TextField
                        label={`${dia.charAt(0).toUpperCase() + dia.slice(1)} Fin`}
                        variant="outlined"
                        value={disponibilidad[dia].fin}
                        onChange={(e) =>
                          setDisponibilidad({
                            ...disponibilidad,
                            [dia]: { ...disponibilidad[dia], fin: e.target.value },
                          })
                        }
                      />
                    </Box>
                  ))}

                  <Box sx={{ marginTop: 3 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isTermsAccepted}
                          onChange={(e) => setIsTermsAccepted(e.target.checked)}
                        />
                      }
                      label="Acepto los Términos y Condiciones"
                    />
                  </Box>

                  <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    sx={{
                      backgroundColor: colors.accent.orange,
                      color: "white",
                      padding: "12px 0",
                      marginTop: 3,
                    }}
                  >
                    Registrarme
                  </Button>
                </Box>
              </>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Modal */}
      <Modal open={isModalOpen} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            boxShadow: 3,
            textAlign: "center",
          }}
        >
          <Typography variant="h6">{modalMessage}</Typography>
          <Button onClick={closeModal} sx={{ marginTop: 2 }}>
            Cerrar
          </Button>
        </Box>
      </Modal>

      {/* Subir imagen de perfil */}
      <UploadImage onUploadComplete={handleImageUpload} />
    </Box>
  );
};

export default SignUpWorker;
