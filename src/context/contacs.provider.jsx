import React, { createContext, useContext, useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore"; // Firestore para obtener documentos
import { db } from "../firebase"; // Configuración de Firestore
import { UserContext } from "./user.provider"; // Contexto de usuario

const ContactsContext = createContext();

export const useContacts = () => {
  return useContext(ContactsContext);
};

export const ContactsProvider = ({ children }) => {
  const { user } = useContext(UserContext); // Usuario logueado desde el contexto
  const [contacts, setContacts] = useState([]); // Lista de contactos
  const [isLoading, setIsLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Función para cargar los contactos desde Firestore
  const fetchContacts = async () => {
    if (!user || !user.contactos || user.contactos.length === 0) {
      console.warn("El usuario no tiene contactos o no está logueado.");
      setContacts([]); // Si no hay contactos
      setIsLoading(false);
      return;
    }

    setIsLoading(true); // Inicia la carga
    try {
      // Promesas para cargar todos los contactos del array de IDs
      const contactPromises = user.contactos.map(async (contactId) => {
        const contactDocRef = doc(db, "usuario", contactId); // Referencia del documento
        const contactSnapshot = await getDoc(contactDocRef);

        if (contactSnapshot.exists()) {
          return { id: contactSnapshot.id, ...contactSnapshot.data() }; // Devuelve los datos del contacto
        } else {
          console.warn(`Contacto con ID ${contactId} no encontrado.`);
          return null; // Ignora contactos no encontrados
        }
      });

      // Espera a que todas las promesas se resuelvan
      const resolvedContacts = await Promise.all(contactPromises);

      // Filtra contactos válidos y actualiza el estado
      setContacts(resolvedContacts.filter((contact) => contact !== null));
    } catch (err) {
      console.error("Error al obtener contactos:", err);
      setError("Hubo un problema al cargar los contactos.");
    } finally {
      setIsLoading(false); // Finaliza la carga
    }
  };

  // Ejecutar `fetchContacts` cuando el usuario cambie
  useEffect(() => {
    fetchContacts();
  }, [user]);

  return (
    <ContactsContext.Provider value={{ contacts, isLoading, error, fetchContacts }}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsProvider;
