import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { 
  Typography,
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from "@mui/material";
import {
  Public as AfricaIcon,
  Landscape as AmericasIcon,
  Terrain as AsiaIcon,
  LocationCity as EuropeIcon,
  BeachAccess as OceaniaIcon
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const regions = [
  {
    name: "Africa",
    icon: <AfricaIcon fontSize="large" />,
    color: "#FF5722",
    description: "54 countries with rich cultural heritage",
    key: "africa"
  },
  {
    name: "Americas",
    icon: <AmericasIcon fontSize="large" />,
    color: "#4CAF50",
    description: "35 nations frm North to South America",
    key: "americas"
  },
  {
    name: "Asia",
    icon: <AsiaIcon fontSize="large" />,
    color: "#2196F3",
    description: "48 countries with ancient civilizations",
    key: "asia"
  },
  {
    name: "Europe",
    icon: <EuropeIcon fontSize="large" />,
    color: "#9C27B0",
    description: "44 nations with divrse history & culture",
    key: "europe"
  },
  {
    name: "Oceania",
    icon: <OceaniaIcon fontSize="large" />,
    color: "#FFC107",
    description: "14 island nations in the Pacific ocean",
    key: "oceania"
  }
];

function darkenColor(color, percent) {
  let r = parseInt(color.slice(1, 3), 16);
  let g = parseInt(color.slice(3, 5), 16);
  let b = parseInt(color.slice(5, 7), 16);
  
  r = Math.floor(r * (1 - percent / 100));
  g = Math.floor(g * (1 - percent / 100));
  b = Math.floor(b * (1 - percent / 100));
  
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

const RegionPicker = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4, mt: 10 }}>
        <Typography variant="h3" component="h1" align="center" gutterBottom sx={{ fontWeight: 700, mb: 6 }}>
          Explore World Regions
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {regions.map((region) => (
            <Grid item xs={12} sm={6} md={4} key={region.key} sx={{ display: "flex", justifyContent: "center" }}>
              <Card
                onClick={() => navigate(`/region/${region.key}`)}
                sx={{
                  width: "100%",
                  maxWidth: 350,
                  height: 200,
                  borderRadius: 4,
                  background: `linear-gradient(135deg, ${region.color} 0%, ${darkenColor(region.color, 20)} 100%)`,
                  boxShadow: 4,
                  cursor: "pointer",
                  transition: "transform 0.3s",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 6
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center"
                }}
              >
                <CardContent sx={{ 
                  textAlign: "center", 
                  color: "white",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 3
                }}>
                  <Box sx={{
                    width: 60,
                    height: 60,
                    borderRadius: "50%",
                    bgcolor: "rgba(255,255,255,0.2)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                  }}>
                    {React.cloneElement(region.icon, { sx: { fontSize: 32, color: "white" } })}
                  </Box>
                  
                  <Box sx={{ 
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center"
                  }}>
                    <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
                      {region.name}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      opacity: 0.9,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}>
                      {region.description}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default RegionPicker;