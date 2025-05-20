import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { isFavorite, toggleFavorite } from "../utils/favorites";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Button,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  Divider,
  Container,
  IconButton,
  Snackbar,
  Alert,
  Tooltip,
  useTheme,
  useMediaQuery,
  Badge,
  Tabs,
  Tab,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import {
  Public,
  LocationCity,
  People,
  Language,
  AttachMoney,
  AccessTime,
  Straighten,
  ArrowBack,
  Favorite,
  FavoriteBorder,
  Home,
  Map,
  Schedule,
  Flag,
  Terrain,
  EmojiFlags,
  LocalAirport,
  Phone,
  WbSunny,
  NightsStay,
  DirectionsCar,
  ElectricBolt,
  Water,
  Restaurant,
  Star,
  CalendarToday,
  Translate,
  Info,
} from "@mui/icons-material";
import { fetchCountryByCode } from "../api/countryApi";
import { useAuth } from "@clerk/clerk-react";

import { GoogleMap, Marker } from "@react-google-maps/api";
import MapWrapper from "../components/MapWrapper";
import useGoogleMaps from "../components/useGoogleMaps";

import WorldClock from "../components/WorldClock";
import CountryWeather from "../components/CountryWeather";
import CountryNews from "../components/CountryNews";
import TravelTips from "../components/TravelTips";

function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [activeTab, setActiveTab] = useState(0);
  const [mapCenter, setMapCenter] = useState({ lat: 20, lng: 0 });
  const [mapLoaded, setMapLoaded] = useState(false);
  const { loaded: mapsLoaded, error: mapsError } = useGoogleMaps();

  useEffect(() => {
    const getCountryDetails = async () => {
      setLoading(true);
      try {
        const countryDetails = await fetchCountryByCode(code);
        setCountry(countryDetails);

        if (countryDetails.capitalInfo?.latlng) {
          setMapCenter({
            lat: countryDetails.capitalInfo.latlng[0],
            lng: countryDetails.capitalInfo.latlng[1],
          });
        } else if (countryDetails.latlng) {
          setMapCenter({
            lat: countryDetails.latlng[0],
            lng: countryDetails.latlng[1],
          });
        }

        setIsFav(isFavorite(userId, code));
      } catch (error) {
        console.error("Error fetching country:", error);
        setCountry(null);
      } finally {
        setLoading(false);
      }
    };

    getCountryDetails();
  }, [code, userId]);

  useEffect(() => {
    if (code && userId) {
      setIsFav(isFavorite(userId, code));
    } else {
      setIsFav(false);
    }
  }, [userId, code]);

  const handleFavoriteClick = () => {
    if (!userId) {
      setSnackbarMessage("Please log in to save favorites");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }

    const { favorites: updatedFavorites, isNowFavorite } = toggleFavorite(
      userId,
      code
    );
    setIsFav(isNowFavorite);

    setSnackbarMessage(
      isNowFavorite
        ? `${country?.name?.common} added to favorites!`
        : `${country?.name?.common} removed from favorites`
    );
    setSnackbarSeverity(isNowFavorite ? "success" : "info");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Box textAlign="center">
          <CircularProgress
            size={80}
            thickness={4}
            sx={{ color: theme.palette.primary.main }}
          />
          <Typography variant="h6" mt={2} color="text.secondary">
            Loading {code}...
          </Typography>
        </Box>
      </Box>
    );
  }

  if (mapsError) {
    return (
      <Alert severity="error">
        Failed to load Google Maps: {mapsError.message}
      </Alert>
    );
  }

  if (!country) {
    return (
      <Container
        maxWidth="md"
        sx={{
          textAlign: "center",
          py: 8,
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography variant="h3" color="error" gutterBottom>
          Country Not Found
        </Typography>
        <Typography variant="body1" mb={4}>
          We couldn't find details for country code: {code}
        </Typography>
        <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={() => navigate(-1)}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: theme.shadows[4],
            }}
          >
            Back to Countries
          </Button>
          <Button
            variant="outlined"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 2,
              borderWidth: 2,
              "&:hover": { borderWidth: 2 },
            }}
          >
            Go Home
          </Button>
        </Box>
      </Container>
    );
  }

  const {
    name,
    flags,
    coatOfArms,
    region,
    subregion,
    capital,
    population,
    languages,
    currencies,
    area,
    timezones,
    borders,
    maps,
    car,
    idd,
    postalCode,
    startOfWeek,
    drivingSide,
    capitalInfo,
    latlng,
    cca2,
    cca3,
    ccn3,
  } = country;

  const formattedPopulation = population?.toLocaleString() || "N/A";
  const formattedArea = area?.toLocaleString() || "N/A";
  const currencyItems = currencies
    ? Object.values(currencies).map((currency) => ({
        name: currency.name,
        symbol: currency.symbol,
      }))
    : [];
  const languageItems = languages ? Object.values(languages) : [];
  const drivingSideEmoji = drivingSide === "left" ? "🚦⬅️" : "🚦➡️";

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "12px",
    boxShadow: theme.shadows[4],
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
        pb: 6,
      }}
    >
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            boxShadow: theme.shadows[6],
            alignItems: "center",
          }}
          iconMapping={{
            success: <Star fontSize="inherit" />,
            info: <Favorite fontSize="inherit" />,
            warning: <FavoriteBorder fontSize="inherit" />,
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          position: "relative",
          height: { xs: "60vh", md: "70vh" },
          overflow: "hidden",
          mb: 6,
          mt: 8,
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${flags?.svg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(8px) brightness(0.7)",
            transform: "scale(1.1)",
            zIndex: 0,
            animation: "panImage 30s linear infinite alternate",
            "@keyframes panImage": {
              "0%": { backgroundPosition: "0% 0%" },
              "100%": { backgroundPosition: "100% 100%" },
            },
          }}
        />

        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.7) 100%)",
            zIndex: 1,
          }}
        />

        <Container
          maxWidth="lg"
          sx={{
            position: "relative",
            zIndex: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            color: "white",
            pt: 12,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 24,
              right: 24,
              display: "flex",
              gap: 1,
            }}
          >
            <Tooltip
              title={isFav ? "Remove from favorites" : "Add to favorites"}
            >
              <IconButton
                onClick={handleFavoriteClick}
                sx={{
                  color: isFav
                    ? theme.palette.error.main
                    : "rgba(255,255,255,0.8)",
                  backgroundColor: isFav
                    ? "rgba(244, 67, 54, 0.1)"
                    : "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${
                    isFav ? theme.palette.error.main : "rgba(255,255,255,0.2)"
                  }`,
                  "&:hover": {
                    backgroundColor: isFav
                      ? "rgba(244, 67, 54, 0.2)"
                      : "rgba(255,255,255,0.2)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {isFav ? (
                  <Favorite fontSize="large" />
                ) : (
                  <FavoriteBorder fontSize="large" />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title="Back to countries">
              <IconButton
                onClick={() => navigate(-1)}
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.2)",
                  },
                }}
              >
                <ArrowBack fontSize="large" />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              width: { xs: 120, sm: 160, md: 200 },
              height: { xs: 80, sm: 110, md: 140 },
              mb: 4,
              position: "relative",
              perspective: "1000px",
              "&:hover img": {
                transform: "rotateY(20deg) rotateX(10deg)",
              },
            }}
          >
            <Box
              component="img"
              src={flags?.svg}
              alt={`${name?.common} flag`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
                boxShadow: theme.shadows[10],
                border: "1px solid rgba(255,255,255,0.3)",
                transition: "transform 0.5s ease, box-shadow 0.5s ease",
                transformStyle: "preserve-3d",
                "&:hover": {
                  boxShadow: theme.shadows[16],
                },
              }}
            />
            {coatOfArms?.svg && (
              <Box
                component="img"
                src={coatOfArms.svg}
                alt={`${name?.common} coat of arms`}
                sx={{
                  position: "absolute",
                  bottom: -20,
                  right: -20,
                  width: 60,
                  height: 60,
                  objectFit: "contain",
                  filter: "drop-shadow(0 0 8px rgba(0,0,0,0.5))",
                  zIndex: 3,
                }}
              />
            )}
          </Box>

          <Typography
            variant="h2"
            fontWeight="bold"
            sx={{
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" },
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
              mb: 1,
              lineHeight: 1.2,
            }}
          >
            {name?.common}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              opacity: 0.9,
              mb: 3,
              fontStyle: "italic",
              textShadow: "0 1px 4px rgba(0,0,0,0.5)",
            }}
          >
            {name?.official}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 2,
              mt: 2,
              "& .MuiChip-root": {
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(255,255,255,0.1)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "white",
              },
            }}
          >
            <Chip icon={<Public />} label={region} />
            {subregion && <Chip icon={<LocationCity />} label={subregion} />}
            <Chip icon={<People />} label={`${formattedPopulation} people`} />
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            mb: 4,
            position: "sticky",
            top: 0,
            zIndex: 10,
            backgroundColor: "background.paper",
            borderRadius: "12px 12px 0 0",
            boxShadow: theme.shadows[2],
          }}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              "& .MuiTabs-indicator": {
                height: 4,
                borderRadius: "4px 4px 0 0",
              },
            }}
          >
            <Tab label="Overview" icon={<Public sx={{ mb: 0.5 }} />} />
            <Tab label="Map" icon={<Map sx={{ mb: 0.5 }} />} />
            <Tab label="Info" icon={<DirectionsCar sx={{ mb: 0.5 }} />} />
            <Tab label="More Details" icon={<Info sx={{ mb: 0.5 }} />} />
          </Tabs>
        </Box>

        <Box sx={{ pt: 2 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: theme.shadows[3],
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <Box
                    sx={{
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #616161 0%, #424242 100%)"
                          : "linear-gradient(135deg, #3a7bd5 0%, #00d2ff 100%)",
                      color: "white",
                      py: 2,
                      px: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <LocationCity fontSize="large" />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Capital City
                      </Typography>
                      <Typography variant="body2">
                        Administrative center
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent sx={{ py: 4 }}>
                    <Typography
                      variant="h4"
                      align="center"
                      fontWeight="bold"
                      color="text.primary"
                    >
                      {capital?.[0] || "N/A"}
                    </Typography>
                    {capitalInfo?.latlng && (
                      <Typography
                        variant="body2"
                        align="center"
                        color="text.secondary"
                        mt={1}
                        fontSize={20}
                      >
                        Coordinates: {capitalInfo.latlng[0].toFixed(2)}°N,{" "}
                        {capitalInfo.latlng[1].toFixed(2)}°E
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: theme.shadows[3],
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <Box
                    sx={{
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #614385 0%, #516395 100%)"
                          : "linear-gradient(135deg, #4776E6 0%, #8E54E9 100%)",
                      color: "white",
                      py: 2,
                      px: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Terrain fontSize="large" />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Geography
                      </Typography>
                      <Typography variant="body2">
                        Land and territory
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: "center", p: 2 }}>
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="text.primary"
                          >
                            {formattedArea}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Square Kilometers
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: "center", p: 2 }}>
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="text.primary"
                          >
                            {latlng?.[0].toFixed(2)}°N
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Latitude
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: "center", p: 2 }}>
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="text.primary"
                          >
                            {latlng?.[1].toFixed(2)}°E
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Longitude
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: "center", p: 2 }}>
                          <Typography
                            variant="h4"
                            fontWeight="bold"
                            color="text.primary"
                          >
                            {borders?.length || 0}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Bordering Countries
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: theme.shadows[3],
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <Box
                    sx={{
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #e53935 0%, #e35d5b 100%)"
                          : "linear-gradient(135deg, #FF416C 0%, #FF4B2B 100%)",
                      color: "white",
                      py: 2,
                      px: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Translate fontSize="large" />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Languages
                      </Typography>
                      <Typography variant="body2">
                        Official and spoken
                      </Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    {languageItems.length > 0 ? (
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1.5,
                          justifyContent: "center",
                          mt: 2,
                        }}
                      >
                        {languageItems.map((lang) => (
                          <Chip
                            key={lang}
                            label={lang}
                            sx={{
                              px: 2,
                              py: 1.5,
                              fontSize: "0.9rem",
                              backgroundColor:
                                theme.palette.mode === "dark"
                                  ? "rgba(255,255,255,0.1)"
                                  : "rgba(255,255,255,0.9)",
                              border: `1px solid ${theme.palette.divider}`,
                              boxShadow: theme.shadows[1],
                              "& .MuiChip-label": {
                                px: 1,
                              },
                            }}
                          />
                        ))}
                      </Box>
                    ) : (
                      <Typography align="center" color="text.secondary">
                        No language data available
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    overflow: "hidden",
                    boxShadow: theme.shadows[3],
                    transition: "transform 0.3s, box-shadow 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: theme.shadows[6],
                    },
                  }}
                >
                  <Box
                    sx={{
                      background:
                        theme.palette.mode === "dark"
                          ? "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)"
                          : "linear-gradient(135deg, #1D976C 0%, #93F9B9 100%)",
                      color: "white",
                      py: 2,
                      px: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <AttachMoney fontSize="large" />
                    <Box>
                      <Typography variant="h6" fontWeight="bold">
                        Currencies
                      </Typography>
                      <Typography variant="body2">Monetary system</Typography>
                    </Box>
                  </Box>
                  <CardContent>
                    {currencyItems.length > 0 ? (
                      <Grid container spacing={2} sx={{ mt: 1 }}>
                        {currencyItems.map((currency, index) => (
                          <Grid item xs={12} sm={6} key={index}>
                            <Paper
                              sx={{
                                p: 2,
                                borderRadius: 2,
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.05)"
                                    : "rgba(0,0,0,0.02)",
                                boxShadow: theme.shadows[1],
                              }}
                            >
                              <Typography variant="h6" fontWeight="bold">
                                {currency.name}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                Symbol: {currency.symbol || "N/A"}
                              </Typography>
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    ) : (
                      <Typography align="center" color="text.secondary">
                        No currency data available
                      </Typography>
                    )}
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <CountryWeather
                  countryName={name.common}
                  capital={capital?.[0]}
                  latlng={latlng}
                />
              </Grid>

              <Grid item xs={12}>
                <CountryNews countryCode={code} countryName={name.common} />
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                {name.common} on the Map
              </Typography>
              
              {!mapsLoaded ? (
                <Box sx={{ 
                  height: '400px',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <CircularProgress />
                  <Typography sx={{ ml: 2 }}>Loading map...</Typography>
                </Box>
              ) : (
                <Box sx={{ 
                  height: '400px', 
                  borderRadius: '12px',
                  overflow: 'hidden',
                  position: 'relative'
                }}>
                  <GoogleMap
                    mapContainerStyle={{
                      width: '100%',
                      height: '100%'
                    }}
                    center={mapCenter}
                    zoom={capital ? 6 : 5}
                    options={{
                      streetViewControl: true,
                      mapTypeControl: true,
                      fullscreenControl: false,
                      styles: [
                        {
                          featureType: "poi",
                          elementType: "labels",
                          stylers: [{ visibility: "off" }]
                        }
                      ]
                    }}
                    onLoad={handleMapLoad}
                  >
                    {capitalInfo?.latlng && (
                      <Marker
                        position={{
                          lat: capitalInfo.latlng[0],
                          lng: capitalInfo.latlng[1]
                        }}
                        label={{
                          text: capital?.[0] || 'Capital',
                          color: '#ffffff',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                        title={capital?.[0] || 'Capital'}
                        icon={{
                          url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                          scaledSize: new window.google.maps.Size(32, 32)
                        }}
                      />
                    )}
                  </GoogleMap>
                </Box>
              )}
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Travel Information
              </Typography>

              <TravelTips
                countryCode={code}
                countryName={name.common}
                drivingSide={drivingSide}
                timezones={timezones}
              />

              <Grid container spacing={3} sx={{ mt: 5 }}>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      boxShadow: theme.shadows[2],
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)"
                            : "linear-gradient(135deg, #00467F 0%, #A5CC82 100%)",
                        color: "white",
                        py: 2,
                        px: 3,
                        
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <DirectionsCar fontSize="large" />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Driving Information
                        </Typography>
                        <Typography variant="body2">
                          Road rules and regulations
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body1" color="text.secondary">
                              Driving Side
                            </Typography>
                            {/* <Typography variant="h4" fontWeight="bold">
                              {drivingSide || "N/A"}
                            </Typography> */}
                            <Typography variant="h3" mt={1}>
                              {drivingSideEmoji}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ textAlign: "center" }}>
                            <Typography variant="body1" color="text.secondary">
                              Road Signs
                            </Typography>
                            <Typography variant="h4" fontWeight="bold">
                              {car?.signs?.join(", ") || "N/A"}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Divider sx={{ my: 1 }} />
                          <Typography variant="body2" color="text.secondary">
                            Start of week: <strong>{startOfWeek}</strong>
                          </Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      boxShadow: theme.shadows[2],
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)"
                            : "linear-gradient(135deg, #1F1C2C 0%, #928DAB 100%)",
                        color: "white",
                        py: 2,
                        px: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Phone fontSize="large" />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Calling Codes
                        </Typography>
                        <Typography variant="body2">
                          International dialing
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent>
                      {idd?.root ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1.5,
                            justifyContent: "center",
                          }}
                        >
                          {idd.suffixes?.map((suffix, idx) => (
                            <Chip
                              key={idx}
                              label={`${idd.root}${suffix}`}
                              sx={{
                                px: 5,
                                py: 3.5,
                                fontSize: "2rem",
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(255,255,255,0.9)",
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.shadows[1],
                              }}
                            />
                          ))}
                        </Box>
                      ) : (
                        <Typography align="center" color="text.secondary">
                          No calling code data available
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}

          {activeTab === 3 && (
            <Box>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Additional Details
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card
                    sx={{
                      height: "100%",
                      borderRadius: 3,
                      boxShadow: theme.shadows[2],
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #0F2027 0%, #203A43 0%, #2C5364 100%)"
                            : "linear-gradient(135deg, #3E5151 0%, #DECBA4 100%)",
                        color: "white",
                        py: 2,
                        px: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <Flag fontSize="large" />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Country Codes
                        </Typography>
                        <Typography variant="body2">
                          International identifiers
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent>
                      <Stack direction="column" spacing={2}>
                        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            2-letter code (ISO 3166-1 alpha-2)
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {cca2 || "N/A"}
                          </Typography>
                        </Paper>
                        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            3-letter code (ISO 3166-1 alpha-3)
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {cca3 || "N/A"}
                          </Typography>
                        </Paper>
                        <Paper elevation={1} sx={{ p: 2, borderRadius: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            Numeric code (ISO 3166-1 numeric)
                          </Typography>
                          <Typography variant="h5" fontWeight="bold">
                            {ccn3 || "N/A"}
                          </Typography>
                        </Paper>
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid item xs={12}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: theme.shadows[2],
                    }}
                  >
                    <Box
                      sx={{
                        background:
                          theme.palette.mode === "dark"
                            ? "linear-gradient(135deg, #654ea3 0%, #eaafc8 100%)"
                            : "linear-gradient(135deg, #7F7FD5 0%, #86A8E7 50%, #91EAE4 100%)",
                        color: "white",
                        py: 2,
                        px: 3,
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <EmojiFlags fontSize="large" />
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          Bordering Countries
                        </Typography>
                        <Typography variant="body2">
                          Neighboring nations
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent>
                      {borders && borders.length > 0 ? (
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 2,
                            justifyContent: "center",
                            py: 2,
                          }}
                        >
                          {borders.map((border) => (
                            <Chip
                              key={border}
                              label={border}
                              onClick={() => navigate(`/country/${border}`)}
                              sx={{
                                cursor: "pointer",
                                px: 2,
                                py: 2.5,
                                fontSize: "1rem",
                                backgroundColor:
                                  theme.palette.mode === "dark"
                                    ? "rgba(255,255,255,0.1)"
                                    : "rgba(255,255,255,0.9)",
                                border: `1px solid ${theme.palette.divider}`,
                                boxShadow: theme.shadows[2],
                                transition: "all 0.2s",
                                "&:hover": {
                                  backgroundColor: theme.palette.primary.main,
                                  color: "white",
                                  transform: "scale(1.05)",
                                },
                              }}
                            />
                          ))}
                        </Box>
                      ) : (
                        <Box sx={{ py: 4, textAlign: "center" }}>
                          <Typography variant="body1" color="text.secondary">
                            {name.common} is an island nation or has no
                            bordering countries.
                          </Typography>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default CountryDetails;