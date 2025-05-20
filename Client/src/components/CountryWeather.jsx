import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Card, 
  CardContent,
  Grid,
  Paper,
  Divider,
  useTheme
} from "@mui/material";
import { 
  WbSunny, 
  AcUnit, 
  Opacity, 
  Air, 
  Thermostat,
  Visibility
} from "@mui/icons-material";

// Mock API for demo purposes (replace with actual API call)
const fetchWeatherData = async (capital, latlng) => {
  // In a real app, fetch from OpenWeatherMap, AccuWeather or similar
  // Example: return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${API_KEY}`)
  
  // For now, return mock data after a fake delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // Generate somewhat realistic random weather data
      const tempC = Math.floor(Math.random() * 35) - 5;  // -5 to 30°C
      const humidity = Math.floor(Math.random() * 70) + 30; // 30-100%
      const windSpeed = Math.floor(Math.random() * 30) + 1; // 1-30 km/h
      const precipitation = Math.random() > 0.7 ? Math.floor(Math.random() * 20) : 0; // 70% chance of 0, otherwise 1-20 mm
      const visibility = Math.floor(Math.random() * 5) + 5; // 5-10 km
      
      // Select a weather condition based on temperature and precipitation
      let condition;
      if (precipitation > 10) {
        condition = "Heavy Rain";
      } else if (precipitation > 0) {
        condition = "Light Rain";
      } else if (tempC < 0) {
        condition = "Cold";
      } else if (tempC > 25) {
        condition = "Hot";
      } else {
        condition = "Clear";
      }
      
      resolve({
        temperatureC: tempC,
        temperatureF: (tempC * 9/5) + 32,
        condition: condition,
        humidity: humidity,
        windSpeed: windSpeed,
        precipitation: precipitation,
        visibility: visibility
      });
    }, 800);
  });
};

function CountryWeather({ countryName, capital, latlng }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  
  useEffect(() => {
    const getWeatherData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Use capital city if available, otherwise use country coordinates
        const locationParam = capital || (latlng ? `${latlng[0]},${latlng[1]}` : countryName);
        
        if (!locationParam) {
          throw new Error("Insufficient location data");
        }
        
        const data = await fetchWeatherData(locationParam, latlng);
        setWeatherData(data);
      } catch (err) {
        console.error("Error fetching weather data:", err);
        setError("Unable to load weather data");
      } finally {
        setLoading(false);
      }
    };
    
    if (countryName || capital || latlng) {
      getWeatherData();
    }
  }, [countryName, capital, latlng]);
  
  // Function to get weather icon based on condition
  const getWeatherIcon = (condition) => {
    if (!condition) return <WbSunny />;
    
    condition = condition.toLowerCase();
    
    if (condition.includes("rain") || condition.includes("shower")) {
      return <Opacity fontSize="large" sx={{ color: '#4dabf5' }} />;
    } else if (condition.includes("snow") || condition.includes("cold")) {
      return <AcUnit fontSize="large" sx={{ color: '#90caf9' }} />;
    } else if (condition.includes("wind")) {
      return <Air fontSize="large" sx={{ color: '#78909c' }} />;
    } else if (condition.includes("hot")) {
      return <Thermostat fontSize="large" sx={{ color: '#f44336' }} />;
    } else {
      return <WbSunny fontSize="large" sx={{ color: '#ffc107' }} />;
    }
  };
  
  // Helper function to get a color based on temperature
  const getTempColor = (temp) => {
    if (temp < 0) return '#2196f3'; // Cold blue
    if (temp < 10) return '#4dabf5'; // Cool blue
    if (temp < 20) return '#43a047'; // Moderate green
    if (temp < 30) return '#ff9800'; // Warm orange
    return '#f44336'; // Hot red
  };
  
  if (loading) {
    return (
      <Card sx={{ 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.shadows[3]
      }}>
        <Box sx={{
          background: 'linear-gradient(135deg, #1e88e5 0%, #64b5f6 100%)',
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <WbSunny fontSize="large" />
          <Box>
            <Typography variant="h6" fontWeight="bold">Current Weather</Typography>
            <Typography variant="body2">
              {capital ? `${capital}, ${countryName}` : countryName}
            </Typography>
          </Box>
        </Box>
        <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', py: 6 }}>
          <CircularProgress />
        </CardContent>
      </Card>
    );
  }
  
  if (error || !weatherData) {
    return (
      <Card sx={{ 
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.shadows[3]
      }}>
        <Box sx={{
          background: 'linear-gradient(135deg, #1e88e5 0%, #64b5f6 100%)',
          color: 'white',
          py: 2,
          px: 3,
          display: 'flex',
          alignItems: 'center',
          gap: 2
        }}>
          <WbSunny fontSize="large" />
          <Box>
            <Typography variant="h6" fontWeight="bold">Current Weather</Typography>
            <Typography variant="body2">
              {capital ? `${capital}, ${countryName}` : countryName}
            </Typography>
          </Box>
        </Box>
        <CardContent>
          <Typography variant="body1" color="text.secondary" align="center" py={3}>
            {error || "Weather data unavailable"}
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
  const {
    temperatureC,
    temperatureF,
    condition,
    humidity,
    windSpeed,
    precipitation,
    visibility
  } = weatherData;
  
  return (
    <Card sx={{ 
      borderRadius: 3,
      overflow: 'hidden',
      boxShadow: theme.shadows[3]
    }}>
      <Box sx={{
        background: 'linear-gradient(135deg, #1e88e5 0%, #64b5f6 100%)',
        color: 'white',
        py: 2,
        px: 3,
        display: 'flex',
        alignItems: 'center',
        gap: 2
      }}>
        <WbSunny fontSize="large" />
        <Box>
          <Typography variant="h6" fontWeight="bold">Current Weather</Typography>
          <Typography variant="body2">
            {capital ? `${capital}, ${countryName}` : countryName}
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Grid container spacing={3}>
          {/* Main weather info */}
          <Grid item xs={12} md={6}>
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              py: 3
            }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ transform: 'scale(1.8)' }}>
                  {getWeatherIcon(condition)}
                </Box>
                <Typography variant="h4" fontWeight="bold">
                  {condition}
                </Typography>
              </Box>
              
              <Typography 
                variant="h1" 
                fontWeight="bold"
                sx={{ 
                  color: getTempColor(temperatureC),
                  fontSize: { xs: '3rem', sm: '4rem' }
                }}
              >
                {/* {Math.round(temperatureC)}°C */}
              </Typography>
              
              <Typography variant="h6" color="text.secondary">
                {Math.round(temperatureF)}°F
              </Typography>
            </Box>
          </Grid>
          
          {/* Weather details */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pt: { xs: 0, md: 3 } }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                    <Opacity color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      {humidity}%
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Humidity
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                    <Air color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      {windSpeed} km/h
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Wind
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                    <Opacity color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      {precipitation} mm
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Precipitation
                    </Typography>
                  </Paper>
                </Grid>
                
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
                    <Visibility color="primary" />
                    <Typography variant="h6" fontWeight="bold">
                      {visibility} km
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Visibility
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 2 }} />
        
        <Typography variant="body2" color="text.secondary" align="center">
          {/* Note: This is simulated weather data for demonstration purposes. */}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default CountryWeather;