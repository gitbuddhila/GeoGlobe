// pages/Countries.jsx
import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
  Chip,
  LinearProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { fetchAllCountries } from "../api/countryApi";
import { FixedSizeGrid as Grid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import CountryCard from "../components/CountryCard";

const CARD_WIDTH = 200;
const CARD_HEIGHT = 230;
const GUTTER_SIZE = 16;

const Countries = () => {
  const {
    data: countries,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchAllCountries,
    staleTime: 600000,
    cacheTime: 3600000,
  });

  const [filteredData, setFilteredData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [capitals, setCapitals] = useState([]);
  const [countryNames, setCountryNames] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    region: "",
    language: "",
    currency: "",
    capital: "",
    country: "",
  });

  useEffect(() => {
    if (countries) {
      setFilteredData(countries);
      extractFilterOptions(countries);
    }
  }, [countries]);

  const extractFilterOptions = (countries) => {
    const regionSet = new Set();
    const languageSet = new Set();
    const currencySet = new Set();
    const capitalSet = new Set();
    const countryNameSet = new Set();

    countries.forEach((country) => {
      if (country.region) regionSet.add(country.region);
      if (country.languages) {
        Object.values(country.languages).forEach((lang) =>
          languageSet.add(lang)
        );
      }
      if (country.currencies) {
        Object.values(country.currencies).forEach(
          (curr) => curr.name && currencySet.add(curr.name)
        );
      }
      if (country.capital?.length) {
        country.capital.forEach((cap) => capitalSet.add(cap));
      }
      if (country.name?.common) {
        countryNameSet.add(country.name.common);
      }
    });

    setRegions(Array.from(regionSet).sort());
    setLanguages(Array.from(languageSet).sort());
    setCurrencies(Array.from(currencySet).sort());
    setCapitals(Array.from(capitalSet).sort());
    setCountryNames(Array.from(countryNameSet).sort());
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    applyFilters(newFilters);
  };

  const applyFilters = (filters) => {
    if (!countries) return;
    let results = [...countries];
    if (filters.region)
      results = results.filter((c) => c.region === filters.region);
    if (filters.language) {
      results = results.filter(
        (c) =>
          c.languages && Object.values(c.languages).includes(filters.language)
      );
    }
    if (filters.currency) {
      results = results.filter(
        (c) =>
          c.currencies &&
          Object.values(c.currencies).some(
            (curr) => curr.name === filters.currency
          )
      );
    }
    if (filters.capital) {
      results = results.filter((c) => c.capital?.includes(filters.capital));
    }
    if (filters.country) {
      results = results.filter((c) => c.name?.common === filters.country);
    }
    setFilteredData(results);
  };

  const resetFilters = () => {
    setSelectedFilters({
      region: "",
      language: "",
      currency: "",
      capital: "",
      country: "",
    });
    if (countries) setFilteredData(countries);
  };

  const getActiveFilterCount = () =>
    Object.values(selectedFilters).filter((v) => v !== "").length;

  const renderCard = useCallback(
    ({ columnIndex, rowIndex, style }) => {
      const index =
        rowIndex * Math.floor(style.width / (CARD_WIDTH + GUTTER_SIZE)) +
        columnIndex;
      if (index >= filteredData.length) return null;
      return (
        <Box style={style} sx={{ p: 1 }}>
          <CountryCard country={filteredData[index]} />
        </Box>
      );
    },
    [filteredData]
  );

  if (isLoading) {
    return (
      <Container fixed>
        <div className="progress">
          <LinearProgress color="success" />
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container fixed>
        <Box sx={{ mt: 10, textAlign: "center" }}>
          <Typography color="error">
            Error loading countries: {error.message}
          </Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Retry
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container fixed sx={{ py: 4, mt: 10 }}>
      <Typography
        variant="h3"
        component="h1"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          mb: 6,
          color: (theme) => theme.palette.text.primary,
        }}
      >
        Explore World Countries
      </Typography>{" "}
      <Box sx={{ mt: 10, mb: 4 }}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 2 }}
        >
          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Region</InputLabel>
            <Select
              value={selectedFilters.region}
              label="Region"
              onChange={(e) => handleFilterChange("region", e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {regions.map((region) => (
                <MenuItem key={region} value={region}>
                  {region}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Language</InputLabel>
            <Select
              value={selectedFilters.language}
              label="Language"
              onChange={(e) => handleFilterChange("language", e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {languages.map((language) => (
                <MenuItem key={language} value={language}>
                  {language}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={selectedFilters.currency}
              label="Currency"
              onChange={(e) => handleFilterChange("currency", e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {currencies.map((currency) => (
                <MenuItem key={currency} value={currency}>
                  {currency}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Capital</InputLabel>
            <Select
              value={selectedFilters.capital}
              label="Capital"
              onChange={(e) => handleFilterChange("capital", e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {capitals.map((capital) => (
                <MenuItem key={capital} value={capital}>
                  {capital}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" sx={{ minWidth: 120 }}>
            <InputLabel>Country</InputLabel>
            <Select
              value={selectedFilters.country}
              label="Country"
              onChange={(e) => handleFilterChange("country", e.target.value)}
            >
              <MenuItem value="">
                <em>All</em>
              </MenuItem>
              {countryNames.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {getActiveFilterCount() > 0 && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={resetFilters}
            >
              Clear Filters
            </Button>
          )}
        </Stack>

        {getActiveFilterCount() > 0 && (
          <Box sx={{ mt: 1 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {Object.entries(selectedFilters).map(
                ([key, value]) =>
                  value && (
                    <Chip
                      key={key}
                      label={`${
                        key.charAt(0).toUpperCase() + key.slice(1)
                      }: ${value}`}
                      onDelete={() => handleFilterChange(key, "")}
                      color="primary"
                      size="small"
                      sx={{ mb: 1 }}
                    />
                  )
              )}
            </Stack>
          </Box>
        )}

        <Typography variant="body2" sx={{ mt: 2, color: "text.secondary" }}>
          Showing {filteredData.length} of {countries?.length || 0} countries
        </Typography>
      </Box>
      <Box sx={{ height: "65vh" }}>
       <AutoSizer>
  {({ height, width }) => {
    const columnCount = Math.floor(width / (CARD_WIDTH + GUTTER_SIZE));
    const rowCount = Math.ceil(filteredData.length / columnCount);

    const renderCard = ({ columnIndex, rowIndex, style }) => {
      const index = rowIndex * columnCount + columnIndex;
      if (index >= filteredData.length) return null;
      return (
        <Box style={style} sx={{ p: 1 }}>
          <CountryCard country={filteredData[index]} />
        </Box>
      );
    };

    return (
      <Grid
        columnCount={columnCount}
        rowCount={rowCount}
        columnWidth={CARD_WIDTH + GUTTER_SIZE}
        rowHeight={CARD_HEIGHT + GUTTER_SIZE}
        width={width}
        height={height}
      >
        {renderCard}
      </Grid>
    );
  }}
</AutoSizer>

      </Box>
    </Container>
  );
};

export default Countries;