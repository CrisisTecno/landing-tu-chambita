import React, { createContext, useState, useEffect } from "react";

// Simulación de publicaciones iniciales
const initialPublications = [
  {
    id: 1,
    title: "Servicio de Plomería",
    description: "Reparamos fugas, desagües y más.",
    category: "Plomería",
    image: "https://via.placeholder.com/300x200",
    author: "Juan Pérez",
  },
  {
    id: 2,
    title: "Reparación de Tuberías",
    description: "Servicio rápido y garantizado.",
    category: "Plomería",
    image: "https://via.placeholder.com/300x200",
    author: "María Gómez",
  },
  {
    id: 3,
    title: "Electricidad Residencial",
    description: "Instalación y mantenimiento eléctrico.",
    category: "Electricidad",
    image: "https://via.placeholder.com/300x200",
    author: "Luis Ramírez",
  },
];

export const PublicationsContext = createContext({
  publications: [],
  selectedPublication: null,
  selectPublication: () => {},
  clearSelection: () => {},
});

const PublicationsProvider = ({ children }) => {
  const [publications, setPublications] = useState([]);
  const [selectedPublication, setSelectedPublication] = useState(null);

  useEffect(() => {
    // Simulación de cargar publicaciones desde una API o BD
    setPublications(initialPublications);
  }, []);

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
        selectedPublication,
        selectPublication,
        clearSelection,
      }}
    >
      {children}
    </PublicationsContext.Provider>
  );
};

export default PublicationsProvider;
