import React, { useState, useEffect } from "react";
import "../App.css";
import axios from "axios";
import LinearProgress from "@mui/material/LinearProgress";
import { Button, Container, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import SearchBar from "../components/SearchBar";
import { fetchCountryByregion } from "../api/countryApi";

const Countries = ({ clearSelectedRegionHandler, selectedRegion }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getRegion = async () => {
      setLoading(true);
      try {
        const regions = await fetchCountryByregion(selectedRegion);
        setData(regions);
        setFilteredData(regions);
      } catch (error) {
        console.error("Error fetching Regions:", error);
      } finally {
        setLoading(false);
      }
    };

    getRegion();
  }, [selectedRegion]);

  const handleFilterChange = (results) => {
    setFilteredData(results);
  };

  return (
    <Container fixed>
      {loading ? (
        <div className="progress">
          <LinearProgress color="success" />
        </div>
      ) : (
        <>
          <Button
            sx={{
              position: "fixed",
              backgroundColor: "pink",
              color: "white",
              // marginTop: "px",
              marginBottom: "30px",
              zIndex: 10,
            }}
            onClick={() => clearSelectedRegionHandler()}
          >
            Pick Region
          </Button>

          <div className="countries_searchbar_wrapper">
            <SearchBar data={data} onFilterChange={handleFilterChange} />
          </div>

          <Grid container spacing={3} mt={5} justifyContent="center">
            {filteredData.map((country) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={country.name.common}
                id={country.name.common} // 👈 Enables scroll target
              >
                <Card
                  sx={{
                    maxWidth: 600,
                    height: "410px",
                    width: "368px",
                    mb: "50px",
                  }}
                >
                  <CardMedia
                    component="img"
                    image={country.flags.png}
                    title="Country Flag"
                    sx={{ height: "220px", width: "100%" }}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5">
                      {country.name.common}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`Population: ${country.population}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`Region: ${country.region}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`Capital: ${country.capital}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`Languages: ${Object.values(
                        country.languages || {}
                      ).join(" , ")}`}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {`Currency: ${Object.values(country.currencies || {})
                        .map((c) => `${c.name} (${c.symbol})`)
                        .join(" , ")}`}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Countries;
