// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import {
//   Box,
//   Typography,
//   Avatar,
//   Button,
//   Paper,
//   Divider,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Modal,
//   CircularProgress,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import { Cloudinary } from "@cloudinary/url-gen";
// import { auto } from "@cloudinary/url-gen/actions/resize";
// import { autoGravity } from "@cloudinary/url-gen/qualifiers/gravity";
// import { AdvancedImage } from "@cloudinary/react";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../../../firebase"; // Importa tu configuración de Firestore
// import Navbar from "../../../components/app/navbar";
// import colors from "../../../theme/colors";
// import PublicationsListById from "../../../components/app/publicationListById";

// const ProfileXView = () => {
//   const { id } = useParams();
//   const [contact, setContact] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [openModal, setOpenModal] = useState(false);

//   useEffect(() => {
//     const fetchContact = async () => {
//         console.log(id)
//       try {
//         const contactDoc = doc(db, "usuario", id);
//         const contactSnapshot = await getDoc(contactDoc);

//         if (contactSnapshot.exists()) {
//           setContact(contactSnapshot.data());
//         } else {
//           console.error("El contacto no existe.");
//           setError("El perfil solicitado no está disponible.");
//         }
//       } catch (error) {
//         console.error("Error al obtener los datos del contacto:", error);
//         setError("Ocurrió un problema al cargar los datos del perfil.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchContact();
//   }, [id]);

//   const cld = new Cloudinary({
//     cloud: {
//       cloudName: "diubghp1i", // Configuración de Cloudinary
//     },
//   });

//   const banner = cld
//     .image(`tu-chambita/profile/${contact?.bannerId || "default-banner"}`)
//     .format("auto")
//     .quality("auto")
//     .resize(auto().gravity(autoGravity()).width(1000).height(400));

//   const profile = cld
//     .image(`tu-chambita/profile/${contact?.profileId || "default-profile"}`)
//     .format("auto")
//     .quality("auto")
//     .resize(auto().gravity(autoGravity()).width(500).height(500));

//   if (isLoading) {
//     return (
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           minHeight: "100vh",
//         }}
//       >
//         <CircularProgress sx={{ color: colors.primary.main }} />
//         <Typography sx={{ marginLeft: 2, color: colors.primary.main }}>
//           Cargando perfil...
//         </Typography>
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Modal open={openModal} onClose={() => setOpenModal(false)}>
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: { xs: "90%", sm: "60%", md: "40%" },
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//             textAlign: "center",
//           }}
//         >
//           <Typography variant="h6" color="error" sx={{ fontWeight: "bold" }}>
//             {error}
//           </Typography>
//           <Button
//             variant="contained"
//             onClick={() => setOpenModal(false)}
//             sx={{
//               textTransform: "none",
//               fontWeight: "bold",
//               backgroundColor: colors.accent.orange,
//               color: "#fff",
//               "&:hover": { backgroundColor: colors.accent.orangeHover },
//             }}
//           >
//             Cerrar
//           </Button>
//         </Box>
//       </Modal>
//     );
//   }

//   return (
//     <Box
//       sx={{
//         alignItems: "center",
//         display: "flex",
//         flexDirection: "column",
//         minHeight: "100vh",
//         minWidth: "100vw",
//         backgroundColor: colors.secondary.main,
//       }}
//     >
//       {/* Navbar */}
//       <Box sx={{ marginBottom: "8vh" }}>
//         <Navbar />
//       </Box>

//       {/* Perfil y detalles principales */}
//       <Paper
//         elevation={3}
//         sx={{
//           padding: 2,
//           borderRadius: 2,
//           backgroundColor: "#fff",
//           overflow: "hidden",
//         }}
//       >
//         {/* Banner */}
//         <Box
//           sx={{
//             width: "70vw",
//             height: "25vh",
//             backgroundColor: colors.accent.orange,
//             borderRadius: "8px",
//             overflow: "hidden",
//           }}
//         >
//           <AdvancedImage
//             cldImg={banner}
//             style={{
//               width: "100%",
//               height: "100%",
//               objectFit: "cover",
//               borderRadius: "8px",
//             }}
//           />
//         </Box>

//         {/* Avatar y Detalles del Contacto */}
//         <Box
//           sx={{
//             display: "flex",
//             flexDirection: "row",
//             marginTop: "1vh",
//             alignItems: "center",
//           }}
//         >
//           <Box
//             sx={{
//               width: 150,
//               height: 150,
//               backgroundColor: colors.accent.orange,
//               borderRadius: "25vw",
//               overflow: "hidden",
//             }}
//           >
//             <AdvancedImage
//               cldImg={profile}
//               style={{
//                 width: "100%",
//                 height: "100%",
//                 objectFit: "cover",
//                 borderRadius: "25vw",
//               }}
//             />
//           </Box>

//           <Box sx={{ marginLeft: 2, flex: 1 }}>
//             <Typography
//               variant="h5"
//               fontSize={30}
//               fontWeight="bold"
//               color={colors.primary.main}
//             >
//               {contact?.nombre || "Usuario"}
//             </Typography>
//             <Typography variant="body2" color="#6e6e6e" fontSize={17}>
//               {contact?.descripcion || "Sin descripción"}
//             </Typography>
//             <Typography
//               variant="body2"
//               color={colors.accent.orangeHover}
//               fontSize={18}
//             >
//               {contact?.ubicacion
//                 ? `${contact.ubicacion._lat}, ${contact.ubicacion._long}`
//                 : "Ubicación desconocida"}
//             </Typography>
//           </Box>

//           {/* Botón para conectar */}
//           <Button
//             variant="outlined"
//             startIcon={<EditIcon />}
//             sx={{
//               marginTop: "5vh",
//               color: colors.accent.orange,
//               borderColor: colors.accent.orange,
//               textTransform: "none",
//               "&:hover": {
//                 outline: "none",
//                 border: "none",
//                 backgroundColor: colors.accent.orange,
//                 color: "#fff",
//               },
//               "&:focus": {
//                 outline: "none",
//               },
//             }}
//           >
//             Conectar
//           </Button>
//         </Box>
//       </Paper>
//       <Divider sx={{ marginY: 4 }} />

//       {/* Contenedor de Sugerencias y Usuarios */}
//       <Box
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           gap: 2,
//         }}
//       >
//         {/* Sección Izquierda */}
//         <Box sx={{ flex: 1 }}>
//           <Paper
//             elevation={3}
//             sx={{ padding: 2, borderRadius: 2, backgroundColor: "#fff" }}
//           >
//             <Typography variant="h6" fontWeight="bold">
//               Sugerencia para ti
//             </Typography>
//             <Divider sx={{ marginY: 2 }} />
//             <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//               <Box>
//                 <Typography variant="body1" fontWeight="bold">
//                   Mejora tu perfil con ayuda de la IA
//                 </Typography>
//                 <Typography variant="body2" color={colors.neutral.darkGray}>
//                   Destaca en casi el doble de oportunidades con un perfil más
//                   potente.
//                 </Typography>
//               </Box>
//               <Button
//                 variant="contained"
//                 sx={{
//                   backgroundColor: colors.accent.orange,
//                   color: "#fff",
//                   textTransform: "none",
//                   fontWeight: "bold",
//                   "&:hover": {
//                     backgroundColor: colors.accent.orangeHover,
//                   },
//                 }}
//               >
//                 Probar Premium por 0 USD
//               </Button>
//             </Box>
//           </Paper>

//           {/* Análisis */}
//           <Paper
//             elevation={3}
//             sx={{
//               padding: 2,
//               marginTop: 2,
//               borderRadius: 2,
//               backgroundColor: "#fff",
//             }}
//           >
//             <Typography variant="h6" fontWeight="bold">
//               Análisis
//             </Typography>
//             <Divider sx={{ marginY: 2 }} />
//             <Typography variant="body2" color={colors.neutral.darkGray}>
//               2 visualizaciones del perfil · 0 impresiones de tu publicación · 2
//               apariciones en búsquedas.
//             </Typography>
//           </Paper>
//           <PublicationsListById id={id} />
//         </Box>

//         {/* Sección Derecha */}
//         <Box sx={{ flex: 0.4 }}>
//           <Paper
//             elevation={3}
//             sx={{
//               padding: 2,
//               borderRadius: 2,
//               backgroundColor: "#fff",
//             }}
//           >
//             <Typography variant="h6" fontWeight="bold">
//               Usuarios que también vieron
//             </Typography>
//             <List>
//               {[1, 2, 3].map((_, index) => (
//                 <ListItem key={index}>
//                   <ListItemAvatar>
//                     <Avatar src={`https://via.placeholder.com/48`} />
//                   </ListItemAvatar>
//                   <ListItemText
//                     primary="Sebastian Silva"
//                     secondary="Full Stack Developer | JavaScript | Node.js"
//                   />
//                   <Button
//                     variant="outlined"
//                     sx={{
//                       borderColor: colors.primary.main,
//                       color: colors.primary.main,
//                       textTransform: "none",
//                       "&:hover": {
//                         backgroundColor: colors.primary.light,
//                       },
//                     }}
//                   >
//                     Conectar
//                   </Button>
//                 </ListItem>
//               ))}
//             </List>
//           </Paper>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default ProfileXView;

