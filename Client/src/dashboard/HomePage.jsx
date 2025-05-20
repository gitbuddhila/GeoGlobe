import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  TextField,
  InputAdornment,
  Tabs,
  Tab,
  Paper,
  Chip,
  Button,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PublicIcon from "@mui/icons-material/Public";
import ExploreIcon from "@mui/icons-material/Explore";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LanguageIcon from "@mui/icons-material/Language";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PeopleIcon from "@mui/icons-material/People";
import Footer from "../components/Footer";
import worldmap from "../assets/world.jpg"; // Ensure this path is correct
import { fetchCountryByName, fetchPopularCountries } from "../api/countryApi";

import ArrowForwardIos from "@mui/icons-material/ArrowForwardIos";
import LandscapeIcon from "@mui/icons-material/Landscape";
import TerrainIcon from "@mui/icons-material/Terrain";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { darken } from "@mui/material/styles";

// World stats for the stats section
const worldStats = [
  { label: "Countries", value: "195+", icon: <PublicIcon /> },
  { label: "Languages", value: "7,000+", icon: <LanguageIcon /> },
  { label: "World Population", value: "8 billion+", icon: <PeopleIcon /> },
  { label: "Cities", value: "10,000+", icon: <LocationCityIcon /> },
];

const regionData = [
  {
    name: "Africa",
    color: "#FF5722",
    icon: <PublicIcon fontSize="large" />,
    count: "54 countries"
  },
  {
    name: "Americas",
    color: "#4CAF50",
    icon: <LandscapeIcon fontSize="large" />,
    count: "35 countries"
  },
  {
    name: "Asia",
    color: "#2196F3",
    icon: <TerrainIcon fontSize="large" />,
    count: "48 countries"
  },
  {
    name: "Europe",
    color: "#9C27B0",
    icon: <LocationCityIcon fontSize="large" />,
    count: "44 countries"
  },
  {
    name: "Oceania",
    color: "#FFC107",
    icon: <BeachAccessIcon fontSize="large" />,
    count: "14 countries"
  },
];

const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [featuredCountries, setFeaturedCountries] = useState([]);
  
  const regionRef = useRef(null);
  const featuredRef = useRef(null);
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);

    if (newValue === 1 && regionRef.current) {
      regionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    if (newValue === 2 && featuredRef.current) {
      featuredRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  useEffect(() => {
    const loadPopularCountries = async () => {
      try {
        const data = await fetchPopularCountries();
        setFeaturedCountries(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    loadPopularCountries();
  }, []);

  // Handle the debounced search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  // Fetch country data based on debounced search
  useEffect(() => {
    const getCountry = async () => {
      if (!debouncedSearch) {
        setCountries([]); // Clear results if no search
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const countries = await fetchCountryByName(debouncedSearch);
        setCountries(countries);
      } catch (err) {
        setError("Failed to fetch country");
      } finally {
        setLoading(false);
      }
    };

    getCountry();
  }, [debouncedSearch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: "#f5f5f7",
        marginTop: { xs: "56px", sm: "62px" }, // Adjusted for mobile
      }}
    >
      {/* HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: 280, sm: 350, md: 500 }, // Reduced height for mobile
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${worldmap})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::after": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.4)",
            },
          }}
        />

        <Container
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            position: "relative",
            zIndex: 1,
            px: { xs: 2, sm: 3 }, // Adjusted padding for mobile
          }}
        >
          <Typography
            variant="h2"
            fontWeight="bold"
            color="white"
            sx={{
              textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              fontSize: { xs: "1.8rem", sm: "2.5rem", md: "4rem" }, // Smaller font on mobile
              mt: { xs: 2, sm: 4, md: "80px" }, // Less top margin on mobile
            }}
          >
            Explore Our World
          </Typography>

          <Typography
            variant="h5"
            color="white"
            sx={{
              mb: { xs: 2, sm: 4 }, // Less margin on mobile
              textShadow: "1px 1px 2px rgba(0,0,0,0.5)",
              maxWidth: "700px",
              fontSize: { xs: "1rem", sm: "1.25rem", md: "1.5rem" }, // Smaller font on mobile
            }}
          >
            Discover detailed information about countries, cultures, and
            civilizations from around the globe
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: { xs: 0.5, sm: 0.5 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" }, // Stack on mobile
              maxWidth: 600,
              width: "100%",
              borderRadius: 2,
            }}
          >
            <TextField
              placeholder="Search for any country..."
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: search && (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => setSearch("")}
                      sx={{
                        minWidth: 0,
                        p: 0.5,
                        color: "gray",
                        "&:hover": { color: "black" },
                      }}
                    >
                      ×
                    </Button>
                  </InputAdornment>
                ),
                sx: { borderRadius: 2, bgcolor: "white" },
              }}
              sx={{ "& fieldset": { border: "none" } }}
            />

            <Button
              variant="contained"
              color="primary"
              sx={{
                borderRadius: { xs: 1, sm: 1 },
                ml: { xs: 0, sm: 1 },
                mt: { xs: 1, sm: 0 }, // Add top margin on mobile
                px: 3,
                width: { xs: "100%", sm: "auto" }, // Full width on mobile
                bgcolor: "#1976d2",
                "&:hover": {
                  bgcolor: "#1565c0",
                },
              }}
            >
              <SearchIcon sx={{ mr: 1 }} /> Search
            </Button>
          </Paper>
        </Container>
      </Box>

      {/* SEARCH RESULTS SECTION */}
      {(loading || error || countries.length > 0 || debouncedSearch) && (
        <Container>
          <Paper 
            elevation={1} 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              my: { xs: 2, sm: 5 },
              borderRadius: 2 
            }}
          >
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
              Search Results
            </Typography>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", my: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" align="center">
                {error}
              </Typography>
            ) : countries.length > 0 ? (
              <Grid container spacing={2} justifyContent="center">
                {countries.map((country) => (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
                    <Card
                      sx={{
                        height: { xs: "auto", sm: 360 },
                        width: { xs: "100%", sm: 300 },
                        maxWidth: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 2,
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        transition: "transform 0.3s, box-shadow 0.3s",
                        "&:hover": {
                          transform: "translateY(-5px)",
                          boxShadow: 6,
                        },
                      }}
                    >
                      <CardMedia
                        component="img"
                        height={isMobile ? 120 : 160}
                        image={country.flags?.png}
                        alt={`${country.name.common} flag`}
                        sx={{ objectFit: "cover" }}
                      />
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          width: "100%",
                          p: { xs: 2, sm: 2 },
                        }}
                      >
                        <Typography variant="h6" fontWeight="bold">
                          {country.name.common}
                        </Typography>
                        <Divider sx={{ my: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          <strong>Region:</strong> {country.region}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Capital:</strong>{" "}
                          {country.capital?.[0] || "N/A"}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Population:</strong>{" "}
                          {country.population.toLocaleString()}
                        </Typography>

                        {/* Push button to bottom */}
                        <Box sx={{ mt: "auto", pt: 2 }}>
                          <Button
                            variant="outlined"
                            size="small"
                            fullWidth
                            sx={{ borderRadius: 4 }}
                            onClick={() => navigate(`/country/${country.cca3}`)}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : debouncedSearch ? (
              <Typography align="center" sx={{ my: 4 }}>
                No countries found for "{debouncedSearch}"
              </Typography>
            ) : null}
          </Paper>
        </Container>
      )}

      <Container sx={{ flex: "1 0 auto", px: { xs: 2, sm: 3 } }}>
        {/* NAVIGATION TABS */}
        <Paper
          elevation={1}
          sx={{ 
            mb: { xs: 3, sm: 5 },
            borderRadius: 2, 
            overflow: "hidden" 
          }}
        >
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant={isMobile ? "scrollable" : "fullWidth"}
            scrollButtons={isMobile ? "auto" : false}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              "& .MuiTab-root": {
                py: { xs: 1.5, sm: 2 },
                px: { xs: 2, sm: 3 },
                fontWeight: "500",
                fontSize: { xs: "0.8rem", sm: "1rem" },
              },
            }}
          >
            <Tab icon={<ExploreIcon />} label="Explorer" />
            <Tab icon={<TravelExploreIcon />} label="By Region" />
            <Tab icon={<LanguageIcon />} label="Featured" />
          </Tabs>
        </Paper>

        {/* WORLD STATS */}
        <Box sx={{ mb: { xs: 3, sm: 5 }, mt: { xs: 5, sm: 10 } }}>
          <Typography 
            variant="h5" 
            fontWeight="bold" 
            sx={{ mb: 2, textAlign: { xs: "center", sm: "left" } }}
          >
            World at a Glance
          </Typography>
          
          <Grid container spacing={2}>
            {worldStats.map((stat, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper
                  elevation={1}
                  sx={{
                    p: { xs: 2, sm: 3 },
                    textAlign: "center",
                    height: "100%",
                    borderRadius: 2,
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 4,
                    },
                  }}
                >
                  <Box sx={{ color: "primary.main", mb: 1, fontSize: { xs: 30, sm: 40 } }}>
                    {stat.icon}
                  </Box>
                  <Typography 
                    variant="h4" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography 
                    variant="subtitle1" 
                    color="text.secondary"
                    sx={{ fontSize: { xs: "0.8rem", sm: "1rem" } }}
                  >
                    {stat.label}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FEATURED CATEGORIES SECTION */}
        <Box sx={{ mb: { xs: 3, sm: 5 }, mt: { xs: 8, sm: 15 } }} ref={regionRef}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 3,
            }}
          >
            <Typography 
              variant="h5" 
              fontWeight="bold"
              sx={{ mb: { xs: 1, sm: 0 }, textAlign: { xs: "center", sm: "left" }, width: { xs: "100%", sm: "auto" } }}
            >
              Explore by Region
            </Typography>
            <Button
              color="primary"
              onClick={() => navigate("/region")}
              endIcon={<ArrowForwardIos />}
              sx={{ 
                textTransform: "none",
                alignSelf: { xs: "center", sm: "auto" },
                mb: { xs: 2, sm: 0 }
              }}
            >
              View All Regions
            </Button>
          </Box>

          <Grid container spacing={2}>
            {regionData.map((region, index) => (
              <Grid item xs={6} sm={6} md={4} lg={2.4} key={index}>
                <Card
                  onClick={() =>
                    navigate(`/region/${region.name.toLowerCase()}`)
                  }
                  sx={{
                    height: { xs: 140, sm: 160, md: 180 },
                    borderRadius: 4,
                    background: `linear-gradient(135deg, ${
                      region.color
                    } 0%, ${darken(region.color, 0.3)} 100%)`,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    cursor: "pointer",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: 6,
                      "&::before": {
                        opacity: 0.2,
                      },
                    },
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      background:
                        "radial-gradient(circle at center, white 0%, transparent 70%)",
                      opacity: 0,
                      transition: "opacity 0.3s",
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 80, sm: 120, md: 200 },
                      height: { xs: 40, sm: 50, md: 60 },
                      borderRadius: "50%",
                      bgcolor: "rgba(255,255,255,0.2)",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      mb: { xs: 1, sm: 2 },
                    }}
                  >
                    {React.cloneElement(region.icon, {
                      sx: { color: "white", fontSize: { xs: 24, sm: 28, md: 32 } },
                    })}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                      textAlign: "center",
                      textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    {region.name}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: "rgba(255,255,255,0.8)",
                      mt: 0.5,
                      display: "block",
                      textAlign: "center",
                      fontSize: { xs: "0.7rem", sm: "0.8rem" },
                    }}
                  >
                    {region.count}
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* FEATURED COUNTRIES SECTION */}
        <Box sx={{ mb: { xs: 5, sm: 5 }, mt: { xs: 8, sm: 10 } }} ref={featuredRef}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 3,
            }}
          >
            <Typography 
              variant="h5" 
              fontWeight="bold"
              sx={{ mb: { xs: 1, sm: 0 }, textAlign: { xs: "center", sm: "left" }, width: { xs: "100%", sm: "auto" } }}
            >
              Featured Countries
            </Typography>
            <Button 
              color="primary" 
              onClick={() => navigate("/all")}
              endIcon={<ArrowForwardIos />}
              sx={{ 
                textTransform: "none",
                alignSelf: { xs: "center", sm: "auto" },
                mb: { xs: 2, sm: 0 }
              }}
            >
              View All Countries
            </Button>
          </Box>

          <Grid container spacing={2}>
            {featuredCountries.map((country, index) => (
              <Grid item xs={6} sm={3} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: { xs: 1.5, sm: 2 },
                    borderRadius: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: 4,
                    },
                    height: "100%", // Make all cards the same height
                  }}
                >
                  <Box
                    sx={{
                      width: { xs: 60, sm: 80 },
                      height: { xs: 40, sm: 50 },
                      backgroundImage: `url(${country.flag})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      mb: { xs: 1, sm: 2 },
                      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      border: "1px solid #e0e0e0",
                    }}
                  />
                  <Typography 
                    variant="subtitle1" 
                    fontWeight="bold"
                    sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
                  >
                    {country.name}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ 
                      mt: { xs: 0.5, sm: 1 }, 
                      borderRadius: 4, 
                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                      p: { xs: 0.5, sm: 1 }
                    }}
                    onClick={() => navigate(`/country/${country.cca3}`)}
                    disabled={true}
                  >
                    Explore
                  </Button>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
};

export default HomePage;