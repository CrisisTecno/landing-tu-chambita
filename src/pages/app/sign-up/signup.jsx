import React, { useEffect, useState, useContext } from "react";
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
  MenuItem,
  Select,
} from "@mui/material";
import colors from "../../../theme/colors";
import { auth, db } from "../../../firebase"; // Firebase config
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import img103 from "../../../../public/assets/imgs/img103.png";
import UploadImage from "./components/uploadImage";
import { configDocumentId } from "../../../config/config";
import {
  doc,
  getDoc,
  query,
  where,
  collection,
  getDocs,
} from "firebase/firestore";
import { UserContext } from "../../../context/user.provider";
const SignUp = () => {
  const { loginForCreation} = useContext(UserContext);
  // Estado para los pasos
  const [step, setStep] = useState(1);

  // Estado para el formulario inicial
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Estado para datos adicionales
  const [location, setLocation] = useState("");
  const [descripcion, setDescription] = useState("");
  const [availableServices, setAvailableServices] = useState([]); // Servicios disponibles
  const [selectedServices, setSelectedServices] = useState([]); // Servicios seleccionados

  // Estados de carga y modal
  const [isLoading, setIsLoading] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const docRef = doc(db, "config", configDocumentId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setAvailableServices(data.categorias || []);
          console.log(availableServices);
          console.error("El documento  existe en Firestore.");
        } else {
          console.error("El documento no existe en Firestore.");
        }
      } catch (e) {
        console.error(
          "Error al obtener categorías desde Firestore:",
          e.message
        );
      }
    };

    fetchCategories();
  }, []);

  const handleChipClick = (service) => {
    setSelectedServices(
      (prev) =>
        prev.includes(service)
          ? prev.filter((s) => s !== service) // Quita el servicio si ya está seleccionado
          : [...prev, service] // Agrega el servicio si no está seleccionado
    );
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setModalMessage("Las contraseñas no coinciden. Inténtalo de nuevo.");
      setIsLoading(false);
      setIsModalOpen(true);
      return;
    }
    if (password == "" || email == "" || nombre == "") {
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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user1 = userCredential.user;

      // Actualizar el perfil del usuario
      await updateProfile(user1, { displayName: nombre });

      // Guardar datos del usuario en Firestore
      await setDoc(doc(db, "usuario", user1.uid), {
        nombre,
        profileId: "esmlus9d3eorxji7lfzd",
        bannerId: "w5wocpae4tfumyk8qztc",
        descripcion,
        servicios: selectedServices,
        location,
        correo:email,
        uid: user1.uid,
        fechaDeCreacion: new Date(),
      });

      // Iniciar sesión automáticamente
      await loginForCreation(email);
      console.log("Inicio de sesión exitoso");
      setIsLoading(false);
      setIsModalOpen(true);
      setModalMessage("¡exitoso cuenta creada!");

      setTimeout(() => {
        setIsModalOpen(false);
        navigate("/dashboard"); // Redirigir al dashboard
      }, 3000);
    } catch (err) {
      setIsLoading(false);
      // Manejo de errores específicos de Firebase
      switch (err.code) {
        case "auth/email-already-in-use":
          setModalMessage(
            "El correo ya está en uso. Por favor, intenta con otro."
          );
          break;
        case "auth/weak-password":
          setModalMessage(
            "La contraseña es demasiado débil. Usa al menos 6 caracteres."
          );
          break;
        default:
          setModalMessage(
            "Hubo un problema al registrar la cuenta. Inténtalo más tarde."
          );
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
    // Aquí puedes guardar la URL en tu base de datos o usarla como necesites
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
        {/* Primera pantalla */}
        {step === 1 && (
          <>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                color: colors.secondary.secondary,
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Box sx={{ marginBottom: 4, textAlign: "center" }}>
                <img
                  src={img103}
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
                Encuentra a los mejores profesionales o conviértete en uno de
                ellos.
              </Typography>
            </Grid>

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

                    <Box component="form" onSubmit={handleSignUp}>
                      <TextField
                        fullWidth
                        type="nombre"
                        label="Nombres"
                        variant="outlined"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        sx={{ marginBottom: 3 }}
                      />
                      <TextField
                        fullWidth
                        type="email"
                        label="Correo Electrónico "
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
                        placeholder="Ejemplo: La Paz, Bolivia"
                        variant="outlined"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        sx={{ marginBottom: 3 }}
                      />
                      <TextField
                        fullWidth
                        label="Descripción"
                        placeholder="Escribe algo sobre ti..."
                        variant="outlined"
                        value={descripcion}
                        onChange={(e) => setDescription(e.target.value)}
                        sx={{ marginBottom: 3 }}
                      />

                      {/* <UploadImage onUploadSuccess={handleImageUpload} /> */}
                      <Typography
                        variant="body1"
                        sx={{ marginBottom: 1, fontWeight: "bold" }}
                      >
                        ¿Qué servicios buscas?
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          gap: 1,
                          flexWrap: "wrap",
                          marginBottom: 3,
                        }}
                      >
                        {availableServices.map((service) => (
                          <Box
                            key={service}
                            onClick={() => handleChipClick(service)}
                            sx={{
                              padding: "8px 16px",
                              borderRadius: "20px",
                              cursor: "pointer",
                              fontWeight: "bold",
                              textAlign: "center",
                              backgroundColor: selectedServices.includes(
                                service
                              )
                                ? colors.accent.orange
                                : colors.neutral.lightGray,
                              color: selectedServices.includes(service)
                                ? "#fff"
                                : colors.neutral.darkGray,
                              transition: "background-color 0.3s ease",
                              "&:hover": {
                                backgroundColor: selectedServices.includes(
                                  service
                                )
                                  ? colors.accent.orangeHover
                                  : colors.neutral.mediumGray,
                              },
                            }}
                          >
                            {service}
                          </Box>
                        ))}
                      </Box>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={isTermsAccepted} // Controlado por el estado
                            onChange={(e) =>
                              setIsTermsAccepted(e.target.checked)
                            }
                          />
                        }
                        label="Acepto los términos y condiciones"
                        sx={{ marginBottom: 3 }}
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
                        }}
                      >
                        Continuar
                      </Button>
                    </Box>
                  </>
                )}
              </Paper>
            </Grid>
          </>
        )}
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
