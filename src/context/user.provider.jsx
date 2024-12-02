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
  reloadUser: async () => {}, // Añadimos la función al contexto
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const [loading, setLoading] = useState(true);

  // Fetch user data from Firestore
  const fetchUserFromFirestore = async (uid) => {
    try {
      const userDoc = doc(db, "usuario", uid);
      const userSnapshot = await getDoc(userDoc);

      if (userSnapshot.exists()) {
        return userSnapshot.data();
      } else {
        console.error("No se encontró información del usuario en Firestore.");
        return null;
      }
    } catch (error) {
      console.error("Error al obtener usuario desde Firestore:", error.message);
      return null;
    }
  };

  // Reload user function
  const reloadUser = async () => {
    if (!user?.uid) {
      console.error("No hay un usuario autenticado para recargar.");
      return;
    }

    try {
      setLoading(true);
      const updatedUserData = await fetchUserFromFirestore(user.uid);
      if (updatedUserData) {
        setUser({
          ...updatedUserData,
          uid: user.uid,
          email: user.email, // Preservamos el email del usuario
        });
      } else {
        console.error("Error al recargar el usuario.");
      }
    } catch (error) {
      console.error("Error al recargar el usuario:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Login function
  const login = async (email, password) => {
    setLoading(true);
    try {
      const { user: firebaseUser } = await signInWithEmailAndPassword(auth, email, password);
      const userData = await fetchUserFromFirestore(firebaseUser.uid);

      if (userData) {
        setUser({
          ...userData,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
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

  // Login for creation function
  const loginForCreation = async (email) => {
    setLoading(true);
    try {
      const userRef = collection(db, "usuario");
      const q = query(userRef, where("correo", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
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
        const userData = await fetchUserFromFirestore(currentUser.uid);
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
    <UserContext.Provider value={{ user, loading, loginForCreation, login, logout, reloadUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
