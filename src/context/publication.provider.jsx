import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase"; // Configuración de Firebase
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import { UserContext } from "./user.provider"; // Importar el contexto del usuario

export const PublicationsContext = createContext({
  publications: [],
  favPublications:[],
  fiveFirst: [],
  userPublications: [],
  contactPublications: [],
  selectedPublication: null,
  selectPublication: () => {},
  clearSelection: () => {},
  loadContactPublications: async () => {},
  reloadPublications: async () => {}, 
  isLoading: true,
});

const PublicationsProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [publications, setPublications] = useState([]);
  const [favPublications, setFavPublications] = useState([]);

  const [fiveFirst, setFiveFirst] = useState([]);
  const [userPublications, setUserPublications] = useState([]);
  const [contactPublications, setContactPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPublicationsFromFirestore = async () => {
    const publicationsRef = collection(db, "publicacion");
    const publicationsQuery = query(
      publicationsRef,
      orderBy("fechaDeCreacion", "desc")
    );
    const snapshot = await getDocs(publicationsQuery);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  };

  // Cargar publicaciones desde Firestore al montar el componente
  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setIsLoading(true);
        const fetchedPublications = await fetchPublicationsFromFirestore();

        setPublications(fetchedPublications);

        // Actualizar `fiveFirst` basado en los servicios del usuario
        if (user?.servicios && Array.isArray(user.servicios)) {
          const recommended = fetchedPublications.filter((pub) =>
            pub.categorias?.some((servicio) => user.servicios.includes(servicio))
          );
          setFavPublications(recommended),
          setFiveFirst(recommended.slice(0, 2)); // Tomar solo las primeras 5
        } else {
          setFiveFirst([]);
        }

        // Publicaciones creadas por el usuario logueado
        if (user?.uid) {
          const userCreated = fetchedPublications.filter(
            (pub) => pub.autor?.uid === user.uid
          );
          setUserPublications(userCreated);
        } else {
          setUserPublications([]);
        }
      } catch (error) {
        console.error("Error al obtener publicaciones desde Firestore:", error.message);
        setPublications([]);
        setFiveFirst([]);
        setUserPublications([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublications();
  }, [user]);

  // Recargar publicaciones desde Firestore
  const reloadPublications = async () => {
    try {
      setIsLoading(true);
      const fetchedPublications = await fetchPublicationsFromFirestore();

      setPublications(fetchedPublications);

      // Actualizar `fiveFirst` basado en los servicios del usuario
      if (user?.servicios && Array.isArray(user.servicios)) {
        const recommended = fetchedPublications.filter((pub) =>
          pub.categorias?.some((servicio) => user.servicios.includes(servicio))
        );
        setFiveFirst(recommended.slice(0, 4));
      }

      // Publicaciones creadas por el usuario logueado
      if (user?.uid) {
        const userCreated = fetchedPublications.filter(
          (pub) => pub.autor?.uid === user.uid
        );
        setUserPublications(userCreated);
      }
    } catch (error) {
      console.error("Error al recargar publicaciones desde Firestore:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

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
        favPublications,
        fiveFirst,
        userPublications,
        contactPublications,
        selectedPublication,
        selectPublication,
        clearSelection,
        loadContactPublications,
        reloadPublications, // Incluir la función en el contexto
        isLoading,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};

export default PublicationsProvider;
