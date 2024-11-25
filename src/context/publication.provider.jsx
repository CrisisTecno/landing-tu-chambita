import React, { createContext, useState, useEffect, useContext } from "react";
import { db } from "../firebase"; // Configuración de Firebase
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { UserContext } from "./user.provider"; // Importar el contexto del usuario

export const PublicationsContext = createContext({
  publications: [], // Todas las publicaciones
  fiveFirst: [], // Primeras 5 publicaciones recomendadas
  selectedPublication: null,
  selectPublication: () => {},
  clearSelection: () => {},
  isLoading: true,
});

const PublicationsProvider = ({ children }) => {
  const { user } = useContext(UserContext); // Contexto del usuario
  const [publications, setPublications] = useState([]); // Todas las publicaciones
  const [fiveFirst, setFiveFirst] = useState([]); // Primeras 5 publicaciones recomendadas
  const [selectedPublication, setSelectedPublication] = useState(null); // Publicación seleccionada
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const fetchPublications = async () => {
      try {
        setIsLoading(true); // Activar estado de carga
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

        // Filtrar las 5 primeras basadas en las categorías del usuario
        if (user?.categorias && Array.isArray(user.categorias)) {
          const recommended = fetchedPublications.filter((pub) =>
            pub.categorias?.some((categoria) =>
              user.categorias.includes(categoria)
            )
          );
          setFiveFirst(recommended.slice(0, 5)); // Tomar las primeras 5
        } else {
          setFiveFirst([]); // No hay categorías del usuario
        }
      } catch (error) {
        console.error("Error al obtener publicaciones desde Firestore:", error.message);
        setPublications([]);
        setFiveFirst([]);
      } finally {
        setIsLoading(false); // Desactivar estado de carga
      }
    };

    fetchPublications(); // Ejecutar la consulta
  }, [user]); // Reejecutar si cambian los datos del usuario

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
        selectedPublication,
        selectPublication,
        clearSelection,
        isLoading,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};

export default PublicationsProvider;
