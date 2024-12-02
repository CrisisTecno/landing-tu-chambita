import React, { createContext, useState, useEffect, useContext } from "react";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { UserContext } from "./user.provider";

export const MessagesContext = createContext();

export const MessagesProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [chats, setChats] = useState([]); // Lista de chats
  const [selectedChat, setSelectedChat] = useState(null); // Chat seleccionado
  const [messages, setMessages] = useState([]); // Mensajes del chat seleccionado
  const [contactInfo, setContactInfo] = useState(null); // Información del contacto
  const [isLoadingChats, setIsLoadingChats] = useState(true); // Estado de carga de chats
  const [isLoadingMessages, setIsLoadingMessages] = useState(false); // Estado de carga de mensajes

  const userId = user?.uid;

  // Obtener todos los chats relacionados con el usuario
  useEffect(() => {
    if (!userId) return;

    const chatsRef = collection(db, "mensaje");
    const chatsQuery = query(chatsRef, where("usuarios", "array-contains", userId));

    const unsubscribe = onSnapshot(
      chatsQuery,
      (snapshot) => {
        const fetchedChats = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setChats(fetchedChats);
        setIsLoadingChats(false);
      },
      (error) => {
        console.error("Error al obtener los chats:", error);
        setIsLoadingChats(false);
      }
    );

    return () => unsubscribe();
  }, [userId]);

  // Sincronizar mensajes del chat seleccionado
  useEffect(() => {
    if (!selectedChat) {
      setMessages([]); // Limpiar mensajes si no hay chat seleccionado
      setContactInfo(null); // Limpiar la información del contacto
      return;
    }

    // Obtener los mensajes del chat seleccionado
    const messagesRef = collection(db, "mensaje", selectedChat.id, "mensajes");
    const messagesQuery = query(messagesRef, orderBy("fecha", "asc"));

    setIsLoadingMessages(true);

    const unsubscribeMessages = onSnapshot(
      messagesQuery,
      (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(fetchedMessages);
        setIsLoadingMessages(false);
      },
      (error) => {
        console.error("Error al obtener los mensajes:", error);
        setIsLoadingMessages(false);
      }
    );

    // Identificar al contacto del chat (el que no es el usuario actual)
    const contactId = selectedChat.usuarios.find((uid) => uid !== userId);

    console.log(contactId)
    console.log(user)
    if (contactId) {
      const contactRef = doc(db, "usuario", contactId);

      getDoc(contactRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            setContactInfo({ id: contactId, ...docSnap.data() });
          } else {
            console.error("El contacto no existe en la base de datos.");
            setContactInfo(null);
          }
        })
        .catch((error) => {
          console.error("Error al obtener la información del contacto:", error);
          setContactInfo(null);
        });
    }

    return () => unsubscribeMessages();
  }, [selectedChat, userId]);

  // Crear un nuevo mensaje en un chat
  const sendMessage = async (chatId, text) => {
    if (!userId || !chatId || text.trim() === "") return;

    try {
      const chatRef = doc(db, "mensaje", chatId);

      // Agregar el nuevo mensaje a la subcolección "mensajes"
      const messageRef = collection(chatRef, "mensajes");
      await addDoc(messageRef, {
        emisor: userId,
        texto: text,
        fecha: serverTimestamp(),
      });

      // Actualizar el último mensaje en el documento del chat
      await updateDoc(chatRef, {
        ultimoMensaje: {
          texto: text,
          usuario: userId,
          fecha: serverTimestamp(),
        },
        ultimaActualizacion: serverTimestamp(),
      });
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  // Crear un nuevo chat si no existe
  const createOrGetChat = async (otherUserId) => {
    if (!userId || !otherUserId) return;

    const chatId =
      userId < otherUserId ? `${userId}_${otherUserId}` : `${otherUserId}_${userId}`;
    const chatRef = doc(db, "mensaje", chatId);

    try {
      const chatSnapshot = await getDoc(chatRef);

      if (!chatSnapshot.exists()) {
        await setDoc(chatRef, {
          creado: serverTimestamp(),
          ultimaActualizacion: serverTimestamp(),
          usuarios: [userId, otherUserId],
          ultimoMensaje: {
            texto: "",
            usuario: "",
            fecha: null,
          },
        });
        setSelectedChat({ id: chatId, usuarios: [userId, otherUserId] });
      } else {
        setSelectedChat({ id: chatId, ...chatSnapshot.data() });
      }
    } catch (error) {
      console.error("Error al crear o obtener el chat:", error);
    }
  };

  return (
    <MessagesContext.Provider
      value={{
        chats,
        selectedChat,
        setSelectedChat,
        messages,
        sendMessage,
        createOrGetChat,
        isLoadingChats,
        isLoadingMessages,
        contactInfo, // Información del contacto actual
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

// Hook para consumir el contexto de mensajes
export const useMessages = () => useContext(MessagesContext);
