import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
  Skeleton
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchCountryByregion } from "../api/countryApi";
import SearchBar from "../components/SearchBar";

const RegionCountries = () => {
  const { regionName } = useParams();
  const navigate = useNavigate();
  const [filteredData, setFilteredData] = React.useState([]);

  // Using React Query for data fetching
  const { data: countries, isLoading, isError, error } = useQuery({
    queryKey: ['regionCountries', regionName],
    queryFn: () => fetchCountryByregion(regionName),
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    onSuccess: (data) => {
      setFilteredData(data); // Initialize filtered data with all countries
    }
  });

  const handleFilterChange = (results) => {
    setFilteredData(results);
  };

  // Optimized version of your component
  return (
    <Container fixed sx={{ py: 4 }}>

      <Typography variant="h3" marginTop={7} justifySelf={"center"} gutterBottom>
        {regionName.charAt(0).toUpperCase() + regionName.slice(1)} Countries
      </Typography>

      {isError ? (
        <Box sx={{ p: 3, textAlign: 'center', color: 'error.main' }}>
          <Typography>Error loading countries: {error.message}</Typography>
          <Button 
            variant="outlined" 
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Box>
      ) : (
        <>
          <SearchBar 
            data={countries || []} 
            onFilterChange={handleFilterChange} 
            sx={{ mb: 4 }} 
          />
          
          <Grid container spacing={3} marginTop={10} justifyContent="center">
            {isLoading ? (
              // Skeleton loading states
              Array.from({ length: 8 }).map((_, index) => (
                <Grid item key={index} sx={{ width: '252px' }}>
                  <Card sx={{ height: '100%', width: '252px' }}>
                    <Skeleton variant="rectangular" height={160} />
                    <CardContent>
                      <Skeleton variant="text" width="80%" height={32} />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="text" width="60%" />
                      <Skeleton variant="rectangular" width="100px" height={30} sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              // Actual country cards
              filteredData.map((country) => (
                <Grid item key={country.name.common} sx={{ width: '252px' }}>
                  <Card
                    sx={{ 
                      height: '100%',
                      width: '252px', 
                      // cursor: 'pointer',
                      transition: 'transform 0.2s',
                      '&:hover': {
                        transform: 'translateY(-4px)'
                      }
                    }}
                   
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={country.flags.png}
                      alt={`${country.name.common} flag`}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" noWrap>
                        {country.name.common}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Capital: {country.capital?.[0] || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Population: {country.population.toLocaleString()}
                      </Typography>
                      <Button 
                        justifyContent="center" display="flex"
                        variant="outlined"
                        size="small"
                        sx={{ mt: 2, borderRadius: 4, fontSize: "0.75rem" }}
                        onClick={() => navigate(`/country/${country.cca3}`)}
                      >
                        Explore
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default RegionCountries;