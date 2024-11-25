import React from "react";
import { Box, Typography, Avatar, Rating } from "@mui/material";
import colors from "../../../../theme/colors";
const ReviewWidget = ({ avatar, name, rating, totalReviews }) => {
  console.log(avatar)
  console.log(name)
  console.log(rating)
  console.log(totalReviews)
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: "transparent",
        transition: "all 0.2s ease",
        
      }}
    >
      {/* Avatar */}
      <Avatar
        src={avatar}
        alt={name}
        sx={{
          width: 48,
          height: 48,
          backgroundColor: colors.primary.dark,
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        {name ? name[0] : "N"} {/* Letra inicial como fallback */}
      </Avatar>

      {/* Detalles */}
      <Box>
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: "bold", color: colors.neutral.darkGray }}
        >
          {name}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {/* Estrellas */}
          <Rating
            value={rating}
            precision={0.5}
            readOnly
            sx={{
              "& .MuiRating-iconFilled": {
                color: colors.primary.main,
              },
              "& .MuiRating-iconEmpty": {
                color: colors.neutral.mediumGray,
              },
            }}
          />
          {/* Total de reseñas */}
          <Typography
            variant="body2"
            sx={{ color: colors.neutral.mediumGray }}
          >
            ({totalReviews})
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ReviewWidget;
