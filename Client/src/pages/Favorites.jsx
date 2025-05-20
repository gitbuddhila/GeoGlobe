import React, { useEffect, useState } from 'react';
import { useQueries } from '@tanstack/react-query';
import { 
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  CircularProgress,
  Button,
  Chip,
  IconButton,
  Divider,
  Container,
  Snackbar,
  Alert
} from '@mui/material';
import { 
  ArrowBack,
  Favorite,
  Public,
  LocationCity,
  People,
  Language,
  Home
} from '@mui/icons-material';
import { getFavorites, toggleFavorite } from '../utils/favorites';
import { fetchCountryByCode } from '../api/countryApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

const Favorites = () => {
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [favoriteCodes, setFavoriteCodes] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");

  useEffect(() => {
    if (!userId) {
      setFavoriteCodes([]);
      return;
    }
    
    const updateFavorites = () => {
      const userFavorites = getFavorites(userId);
      console.log('User favorites updated:', userFavorites);
      setFavoriteCodes(userFavorites);
    };

    // Initial load
    updateFavorites();

    // Listen for changes from other components
    window.addEventListener('favoritesUpdated', updateFavorites);

    return () => {
      window.removeEventListener('favoritesUpdated', updateFavorites);
    };
  }, [refreshTrigger, userId]);

  const results = useQueries({
    queries: favoriteCodes.map((code) => ({
      queryKey: ['favorite', code, refreshTrigger],
      queryFn: () => fetchCountryByCode(code),
      staleTime: 1000 * 60 * 5, // 5 minutes
    })),
  });

  const handleRemoveFavorite = (countryCode, countryName) => {
    // Check for userId to prevent errors
    if (!userId) {
      console.error('No userId available for toggling favorite');
      return;
    }
    
    // Toggle favorite and get back both the updated list and whether it's now a favorite
    const { favorites: updatedFavorites, isNowFavorite } = toggleFavorite(userId, countryCode);
    
    // Update state with new favorites
    setFavoriteCodes(updatedFavorites);
    
    // Show appropriate notification based on what happened
    setSnackbarMessage(isNowFavorite 
      ? `${countryName} added to favorites` 
      : `${countryName} removed from favorites`);
    setSnackbarSeverity(isNowFavorite ? "success" : "info");
    setSnackbarOpen(true);
    
    // Force refresh of this component
    setRefreshTrigger(prev => prev + 1);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleCountryClick = (countryCode) => {
    navigate(`/country/${countryCode}`);
  };

  if (favoriteCodes.length === 0) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 8, mt: 7 }}>
        <Typography variant="h4" color="text.secondary" gutterBottom>
          No Favorite Countries Yet
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          You haven't added any countries to your favorites list.
        </Typography>
        {/* <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mr: 2 }}
        >
          Go Back
        </Button> */}
        <Button
          variant="contained"
          startIcon={<Home />}
          onClick={() => navigate('/')}
        >
          Browse Countries
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4, mt: 7 }}>
      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <Typography variant="h3" component="h1" sx={{ mb: 2,justifyContent: 'center', display: 'flex' }}>
        Your Favorite Countries
      </Typography>

      <Divider sx={{ mb: 4 }} />

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
          {results.map((result, index) => {
            const countryCode = favoriteCodes[index];
            
            if (result.isLoading) {
              return (
                <Grid item key={`loading-${countryCode}`} sx={{ width: '250px' }}>
                  <Card sx={{ 
                    height: '100%', 
                    width: '250px',
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: 300,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                  }}>
                    <CircularProgress />
                  </Card>
                </Grid>
              );
            }

            if (result.error) {
              return (
                <Grid item key={`error-${countryCode}`} sx={{ width: '250px' }}>
                  <Card sx={{ 
                    width: '250px',
                    p: 3, 
                    textAlign: 'center', 
                    color: 'error.main',
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                  }}>
                    <Typography>Failed to load country {countryCode}</Typography>
                    <Button 
                      variant="outlined" 
                      color="error"
                      size="small"
                      onClick={() => handleRemoveFavorite(countryCode, "Unknown country")}
                      sx={{ mt: 2 }}
                    >
                      Remove from favorites
                    </Button>
                  </Card>
                </Grid>
              );
            }

            const country = result.data;
            if (!country) return null;

            return (
              <Grid item key={country.cca3} sx={{ width: '250px' }}>
                <Card sx={{ 
                  height: '100%', 
                  width: '250px',
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  borderRadius: 2,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.1)'
                  }
                }}>
                  <CardActionArea 
                    onClick={() => handleCountryClick(country.cca3)} 
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={country.flags?.png || ''}
                      alt={`${country.name?.common} flag`}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                          {country.name?.common}
                        </Typography>
                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveFavorite(country.cca3, country.name?.common);
                          }}
                          sx={{ 
                            color: 'error.main',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            p: 1,
                            '&:hover': {
                              backgroundColor: 'rgba(244, 67, 54, 0.2)',
                            }
                          }}
                        >
                          <Favorite fontSize="small" />
                        </IconButton>
                      </Box>
                      
                      <Divider sx={{ my: 1.5 }} />
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <LocationCity fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                          Capital: {country.capital?.[0] || 'N/A'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                        <Public fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                          Region: {country.region || 'N/A'}
                        </Typography>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <People fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
                        <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 'medium' }}>
                          Population: {country.population?.toLocaleString() || 'N/A'}
                        </Typography>
                      </Box>
                      
                      {country.languages && Object.keys(country.languages).length > 0 && (
                        <>
                          <Divider sx={{ my: 1.5 }} />
                          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                            <Language fontSize="small" sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
                            <Box>
                              <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                                Languages:
                              </Typography>
                              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {Object.values(country.languages).slice(0, 3).map((lang, i) => (
                                  <Chip 
                                    key={i} 
                                    label={lang} 
                                    size="small"
                                    sx={{ 
                                      backgroundColor: '#e3f2fd',
                                      color: '#1976d2',
                                      fontSize: '0.7rem'
                                    }}
                                  />
                                ))}
                                {Object.values(country.languages).length > 3 && (
                                  <Chip 
                                    label={`+${Object.values(country.languages).length - 3} more`} 
                                    size="small"
                                    sx={{ 
                                      backgroundColor: '#f5f5f5',
                                      color: 'text.secondary',
                                      fontSize: '0.7rem'
                                    }}
                                  />
                                )}
                              </Box>
                            </Box>
                          </Box>
                        </>
                      )}
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Container>
  );
};

export default Favorites;