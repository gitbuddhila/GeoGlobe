// components/CountryCard.jsx
import React from "react";
import { Box, Button, Paper, Typography, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CountryCard = React.memo(({ country }) => {
  const navigate = useNavigate();

  return (
    <Tooltip
      title={`Capital: ${country.capital?.[0] || "N/A"}\nRegion: ${country.region}`}
      arrow
    >
      <Paper
        elevation={2}
        sx={{
          width: 180,
          height: 200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: "center",
          borderRadius: 2,
          overflow: "hidden",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 4,
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: 100,
            backgroundImage: `url(${country.flags?.png})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Typography
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            px: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            width: "100%",
          }}
        >
          {country.name?.common}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          sx={{ mb: 1, borderRadius: 4, fontSize: "0.75rem" }}
          onClick={() => navigate(`/country/${country.cca3}`)}
        >
          Explore
        </Button>
      </Paper>
    </Tooltip>
  );
});

export default CountryCard;
