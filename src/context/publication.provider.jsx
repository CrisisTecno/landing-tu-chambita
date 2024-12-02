import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase"; // Configuración de Firebase
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { UserContext } from "./user.provider"; // Importar el contexto del usuario

export const PublicationsContext = createContext({
  publications: [], // Todas las publicaciones
  fiveFirst: [], // Primeras 5 publicaciones recomendadas
  userPublications: [], // Publicaciones del usuario logueado
  contactPublications: [], // Publicaciones de un contacto
  selectedPublication: null,
  selectPublication: () => {},
  clearSelection: () => {},
  loadContactPublications: async () => {},
  isLoading: true,
});

const PublicationsProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [publications, setPublications] = useState([]); 
  const [fiveFirst, setFiveFirst] = useState([]);
  const [userPublications, setUserPublications] = useState([]); 
  const [contactPublications, setContactPublications] = useState([]); 
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setIsLoading(true); // Inicia la carga
        const publicationsRef = collection(db, "publicacion");
        const publicationsQuery = query(
          publicationsRef,
          orderBy("fechaDeCreacion", "desc") // Ordenar por fecha de creación
        );
  
        const snapshot = await getDocs(publicationsQuery);
  
        // Transformar los datos en un array
        const fetchedPublications = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        setPublications(fetchedPublications); // Guardar todas las publicaciones
  
        // Generar las 5 primeras recomendaciones basadas en categorías del usuario
        if (user?.servicios && Array.isArray(user.servicios)) {
          const recommended = fetchedPublications.filter((pub) =>
            pub.categorias?.some((servicio) => user.servicios.includes(servicio))
          );
          setFiveFirst(recommended.slice(0, 4)); // Tomar solo las primeras 5
        } else {
          setFiveFirst([]); // Si no hay categorías, el array queda vacío
        }
  
        // Publicaciones creadas por el usuario logueado
        if (user?.uid) {
          const userCreated = fetchedPublications.filter(
            (pub) => pub.autor?.uid === user.uid // Filtrar por `autor.uid`
          );
          setUserPublications(userCreated);
        } else {
          setUserPublications([]);
        }
      } catch (error) {
        console.error("Error al obtener publicaciones desde Firestore:", error.message);
        setPublications([]); // Reinicia publicaciones en caso de error
        setFiveFirst([]);
        setUserPublications([]);
      } finally {
        setIsLoading(false); // Finaliza la carga
      }
    };
  
    fetchPublications();
  }, [user]); // Dependencia: Reejecutar cuando cambie el usuario
  
  // Cargar publicaciones de un contacto por su ID
  const loadContactPublications = async (contactId) => {
    if (!contactId) return;

    try {
      setIsLoading(true);
      const publicationsRef = collection(db, "publicacion");
      const contactQuery = query(
        publicationsRef,
        where("autorId", "==", contactId),
        orderBy("fechaDeCreacion", "desc")
      );

      const snapshot = await getDocs(contactQuery);

      const fetchedContactPublications = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setContactPublications(fetchedContactPublications);
    } catch (error) {
      console.error(
        "Error al cargar publicaciones del contacto:",
        error.message
      );
      setContactPublications([]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectPublication = (id) => {
    const publication = publications.find((pub) => pub.id === id);
    setSelectedPublication(publication);
  };

  const clearSelection = () => {
    setSelectedPublication(null);
  };

  return (
    <PublicationsContext.Provider
      value={{
        publications,
        fiveFirst,
        userPublications,
        contactPublications,
        selectedPublication,
        selectPublication,
        clearSelection,
        loadContactPublications,
        isLoading,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};

export default PublicationsProvider;
