import React, { createContext, useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Asegúrate de importar correctamente
import { 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword 
} from "firebase/auth";
import { doc, getDoc, query, where, collection, getDocs } from "firebase/firestore";

const initialUser = null;

export const UserContext = createContext({
  user: initialUser,
  loading: true,
  login: async (email, password) => {},
  logout: async () => {},
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserFromFirestore = async (email) => {
    try {
      const userRef = collection(db, "usuario");
      const q = query(userRef, where("correo", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs[0].data();
      } else {
        console.error("No se encontró información del usuario en Firestore.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener usuario desde Firestore:", error.message);
      return null;
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserFromFirestore(firebaseUser.email);

      if (userData) {
        setUser({
          ...userData,
          uid: firebaseUser.uid,
        });
      } else {
        console.error("No se pudo cargar la información del usuario.");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw new Error("Credenciales incorrectas o cuenta no encontrada.");
    } finally {
      setLoading(false);
    }
  };
  const loginForCreation = async (email) => {
    setLoading(true);
    try {
      // Busca al usuario directamente en Firestore por correo electrónico
      const userRef = collection(db, "usuario");
      const q = query(userRef, where("correo", "==", email));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Obtén los datos del usuario del primer documento encontrado
        const userData = querySnapshot.docs[0].data();
        console.log("Usuario encontrado en Firestore:", userData);
  
        // Actualiza el estado del usuario en el contexto
        setUser({
          ...userData,
        });
      } else {
        console.error("No se encontró información del usuario en Firestore.");
      }
    } catch (error) {
      console.error("Error al obtener usuario desde Firestore:", error.message);
    } finally {
      setLoading(false);
    }
  };
  

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  // Check for authenticated user on mount
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (currentUser) {
        const userData = await fetchUserFromFirestore(currentUser.email);
        if (userData) {
          setUser({
            ...userData,
            email: currentUser.email,
            uid: currentUser.uid,
          });
        } else {
          console.error("No se pudo cargar la información del usuario.");
          setUser(null);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading,loginForCreation, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
