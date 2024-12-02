import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Button,
} from "@mui/material";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../../firebase";
import colors from "../../../../theme/colors";

const SuggestionsComponent = ({ services }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!services || services.length === 0) {
        setSuggestions([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const usersRef = collection(db, "usuario");
        const suggestionsQuery = query(
          usersRef,
          where("categorias", "array-contains-any", services)
        );
        const snapshot = await getDocs(suggestionsQuery);

        const fetchedSuggestions = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setSuggestions(fetchedSuggestions.slice(0, 4)); // Limitar a 4 sugerencias
      } catch (error) {
        console.error("Error al obtener sugerencias:", error.message);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [services]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        borderRadius: 2,
        backgroundColor: "#fff",
      }}
    >
      <Typography variant="h6" fontWeight="bold">
        Usuarios que también vieron
      </Typography>
      <List>
        {isLoading ? (
          <Typography
            variant="body2"
            color={colors.neutral.darkGray}
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            Cargando sugerencias...
          </Typography>
        ) : suggestions.length > 0 ? (
          suggestions.map((user) => (
            <ListItem key={user.id}>
              <ListItemAvatar>
                <Avatar src={user.avatar || "/assets/default-avatar.png"} />
              </ListItemAvatar>
              <ListItemText
                primary={user.nombre || "Usuario Desconocido"}
                secondary={user.categorias?.join(", ") || "Sin Categorías"}
              />
              <Button
                variant="outlined"
                sx={{
                  borderColor: colors.primary.main,
                  color: colors.primary.main,
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: colors.primary.light,
                  },
                }}
              >
                Conectar
              </Button>
            </ListItem>
          ))
        ) : (
          <Typography
            variant="body2"
            color={colors.neutral.darkGray}
            sx={{ textAlign: "center", marginTop: 2 }}
          >
            No hay sugerencias disponibles.
          </Typography>
        )}
      </List>
    </Paper>
  );
};

export default SuggestionsComponent;
