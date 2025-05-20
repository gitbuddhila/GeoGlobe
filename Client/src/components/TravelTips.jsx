import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  Divider,
  Button,
  LinearProgress,
} from "@mui/material";
import {
  ExpandMore,
  FlightTakeoff,
  HealthAndSafety,
  LocalPolice,
  RestaurantMenu,
  Wallet,
  Power,
  WbSunny,
  Wifi,
  Translate,
  DirectionsCar,
  Bolt,
  Warning,
  ThumbUp,
  Public,
  AccessTime,
  LocalAtm,
  Info,
} from "@mui/icons-material";

// Simple mock travel advisory service
const getTravelAdvisory = (countryName) => {
  // Mock data - in a real app, this would come from an API
  const advisories = {
    // Safe countries
    Sweden: {
      level: 1,
      description: "Exercise normal precautions when traveling to Sweden.",
    },
    Japan: {
      level: 1,
      description: "Exercise normal precautions when traveling to Japan.",
    },
    Canada: {
      level: 1,
      description: "Exercise normal precautions when traveling to Canada.",
    },
    Switzerland: {
      level: 1,
      description: "Exercise normal precautions when traveling to Switzerland.",
    },
    "New Zealand": {
      level: 1,
      description: "Exercise normal precautions when traveling to New Zealand.",
    },
    Norway: {
      level: 1,
      description: "Exercise normal precautions when traveling to Norway.",
    },
    Singapore: {
      level: 1,
      description: "Exercise normal precautions when traveling to Singapore.",
    },
    Portugal: {
      level: 1,
      description: "Exercise normal precautions when traveling to Portugal.",
    },
    Austria: {
      level: 1,
      description: "Exercise normal precautions when traveling to Austria.",
    },
    Australia: {
      level: 1,
      description: "Exercise normal precautions when traveling to Australia.",
    },

    // Some caution countries
    Mexico: {
      level: 2,
      description:
        "Exercise increased caution when traveling to Mexico due to crime and kidnapping.",
    },
    Brazil: {
      level: 2,
      description:
        "Exercise increased caution when traveling to Brazil due to crime.",
    },
    India: {
      level: 2,
      description:
        "Exercise increased caution when traveling to India due to crime and terrorism.",
    },
    Turkey: {
      level: 2,
      description:
        "Exercise increased caution when traveling to Turkey due to terrorism and arbitrary detentions.",
    },
    Egypt: {
      level: 3,
      description:
        "Reconsider travel to Egypt due to terrorism and health concerns.",
    },

    // High risk countries
    Afghanistan: {
      level: 4,
      description:
        "Do not travel to Afghanistan due to civil unrest, armed conflict, crime, terrorism, and kidnapping.",
    },
    "North Korea": {
      level: 4,
      description:
        "Do not travel to North Korea due to serious risk of arrest and long-term detention of foreign nationals.",
    },
    Syria: {
      level: 4,
      description:
        "Do not travel to Syria due to terrorism, civil unrest, kidnapping, armed conflict, and risk of unjust detention.",
    },
  };

  // Return default medium level advisory if country not in our mock database
  return (
    advisories[countryName] || {
      level: 2,
      description: `Exercise increased caution when traveling to ${countryName}. Check local travel advisories before your trip.`,
    }
  );
};

// Function to determine visa requirements (mock data)
const getVisaRequirements = (countryCode) => {
  // This would normally come from an API
  const noVisaCountries = [
    "USA",
    "CAN",
    "JPN",
    "AUS",
    "NZL",
    "GBR",
    "DEU",
    "FRA",
    "ITA",
    "ESP",
  ];
  const visaOnArrivalCountries = [
    "THA",
    "IDN",
    "MYS",
    "NPL",
    "KHM",
    "LAO",
    "MDV",
  ];
  const eVisaCountries = ["IND", "TUR", "VNM", "LKA", "KEN", "ETH", "AZE"];

  if (noVisaCountries.includes(countryCode)) {
    return {
      requirement: "Visa-free",
      description: "No visa required for tourist stays of up to 90 days",
      iconColor: "success",
    };
  } else if (visaOnArrivalCountries.includes(countryCode)) {
    return {
      requirement: "Visa on arrival",
      description: "Available at major entry points for stays up to 30 days",
      iconColor: "info",
    };
  } else if (eVisaCountries.includes(countryCode)) {
    return {
      requirement: "e-Visa available",
      description: "Apply online before travel",
      iconColor: "info",
    };
  } else {
    return {
      requirement: "Visa required",
      description: "Apply at embassy or consulate before travel",
      iconColor: "warning",
    };
  }
};

// Function to determine electrical outlet type
const getElectricalInfo = (countryCode) => {
  // This is simplified mock data - in a real app, this would come from an API
  const typeA = ["USA", "CAN", "MEX", "JPN"];
  const typeC = ["DEU", "FRA", "ITA", "ESP", "NLD", "BEL", "AUT", "CHE"];
  const typeG = ["GBR", "IRL", "HKG", "SGP", "ARE"];
  const typeI = ["AUS", "NZL", "CHN", "ARG"];

  let plugType = "Varies";
  let voltage = "220-240V";
  let frequency = "50Hz";

  if (typeA.includes(countryCode)) {
    plugType = "Type A/B";
    voltage = "120V";
    frequency = "60Hz";
  } else if (typeC.includes(countryCode)) {
    plugType = "Type C/F";
  } else if (typeG.includes(countryCode)) {
    plugType = "Type G";
  } else if (typeI.includes(countryCode)) {
    plugType = "Type I";
  }

  return {
    plugType,
    voltage,
    frequency,
  };
};

// Function to generate emergency numbers (mock data)
const getEmergencyNumbers = (countryCode) => {
  // Default emergency numbers
  const emergencyNumbers = {
    police: "112",
    ambulance: "112",
    fire: "112",
  };

  // Country-specific overrides
  const countryNumbers = {
    USA: { police: "911", ambulance: "911", fire: "911" },
    GBR: { police: "999", ambulance: "999", fire: "999" },
    AUS: { police: "000", ambulance: "000", fire: "000" },
    JPN: { police: "110", ambulance: "119", fire: "119" },
    IND: { police: "100", ambulance: "102", fire: "101" },
  };

  return countryNumbers[countryCode] || emergencyNumbers;
};

// Main component
const TravelTips = ({ countryCode, countryName, drivingSide, timezones }) => {
  const [loading, setLoading] = useState(true);
  const [visaInfo, setVisaInfo] = useState(null);
  const [advisory, setAdvisory] = useState(null);
  const [electricalInfo, setElectricalInfo] = useState(null);
  const [emergencyNumbers, setEmergencyNumbers] = useState(null);

  useEffect(() => {
    // Simulate API request delay
    const loadData = async () => {
      // In a real app, these would be actual API calls
      setLoading(true);

      // Short timeout to simulate API calls
      setTimeout(() => {
        setVisaInfo(getVisaRequirements(countryCode));
        setAdvisory(getTravelAdvisory(countryName));
        setElectricalInfo(getElectricalInfo(countryCode));
        setEmergencyNumbers(getEmergencyNumbers(countryCode));
        setLoading(false);
      }, 800);
    };

    loadData();
  }, [countryCode, countryName]);

  if (loading) {
    return (
      <Box sx={{ py: 4 }}>
        <LinearProgress sx={{ mb: 2 }} />
        <Typography align="center" color="text.secondary">
          Loading travel information...
        </Typography>
      </Box>
    );
  }

  // Function to get advisory chip color based on level
  const getAdvisoryColor = (level) => {
    switch (level) {
      case 1:
        return "success";
      case 2:
        return "info";
      case 3:
        return "warning";
      case 4:
        return "error";
      default:
        return "default";
    }
  };

  // Function to get advisory text based on level
  const getAdvisoryText = (level) => {
    switch (level) {
      case 1:
        return "Exercise Normal Precautions";
      case 2:
        return "Exercise Increased Caution";
      case 3:
        return "Reconsider Travel";
      case 4:
        return "Do Not Travel";
      default:
        return "Check Travel Advisories";
    }
  };

  // Get current season based on the first timezone
  const getCurrentSeason = () => {
    // Simple function to guess the season based on hemisphere
    // This is a simplified approach and would need a more sophisticated algorithm in a real app
    const now = new Date();
    const month = now.getMonth(); // 0-11

    // Southern hemisphere seasons are reversed
    const isNorthernHemisphere = true; // Simplification - would need to determine based on latitude

    if (isNorthernHemisphere) {
      if (month >= 2 && month <= 4)
        return {
          name: "Spring",
          icon: <WbSunny fontSize="small" />,
          temp: "Mild",
        };
      if (month >= 5 && month <= 7)
        return {
          name: "Summer",
          icon: <WbSunny fontSize="small" />,
          temp: "Hot",
        };
      if (month >= 8 && month <= 10)
        return {
          name: "Fall",
          icon: <WbSunny fontSize="small" />,
          temp: "Mild to Cool",
        };
      return {
        name: "Winter",
        icon: <WbSunny fontSize="small" />,
        temp: "Cold",
      };
    } else {
      if (month >= 2 && month <= 4)
        return {
          name: "Fall",
          icon: <WbSunny fontSize="small" />,
          temp: "Mild to Cool",
        };
      if (month >= 5 && month <= 7)
        return {
          name: "Winter",
          icon: <WbSunny fontSize="small" />,
          temp: "Cold",
        };
      if (month >= 8 && month <= 10)
        return {
          name: "Spring",
          icon: <WbSunny fontSize="small" />,
          temp: "Mild",
        };
      return {
        name: "Summer",
        icon: <WbSunny fontSize="small" />,
        temp: "Hot",
      };
    }
  };

  const currentSeason = getCurrentSeason();

  return (
    <Box>
      {/* Travel Advisory Alert */}
      <Alert
        severity={getAdvisoryColor(advisory.level)}
        icon={advisory.level >= 3 ? <Warning /> : <Info />}
        sx={{
          mb: 3,
          borderRadius: 2,
          boxShadow: 1,
          "& .MuiAlert-message": { width: "100%" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold">
            Travel Advisory: {getAdvisoryText(advisory.level)}
          </Typography>
          <Chip
            label={`Level ${advisory.level}`}
            size="small"
            color={getAdvisoryColor(advisory.level)}
            sx={{ fontWeight: "bold" }}
          />
        </Box>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {advisory.description}
        </Typography>
      </Alert>

      <Paper sx={{ p: 2, mb: 3, borderRadius: 2, boxShadow: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 2,
          }}
        >
          <AccessTime fontSize="large" sx={{ mr: 1 }} />
          <Typography variant="subtitle1" fontWeight="bold" fontSize={30}>
            Time Zone
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" mb={1}>
          {countryName} {timezones?.length > 1 ? "spans" : "uses"}{" "}
          {timezones?.length || 0} time zone{timezones?.length !== 1 ? "s" : ""}
          .
          {timezones?.length > 1 &&
            " Be aware of time changes when traveling across the country."}
        </Typography>

        {timezones && timezones.length > 0 && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mt: 1,
            }}
          >          <WbSunny sx={{ color: 'orange',marginRight:'5px', fontSize: '40px'   }} />

            {timezones.map((timezone, index) => (
              <Chip
                key={index}
                label={timezone}
                sx={{
                  borderRadius: "4px",
                  fontSize: "1rem", // increase text size
                  height: "48px", // increase chip height
                  padding: "0 16px", // increase horizontal padding
                }}
              />
            ))}
          </Box>
        )}
      </Paper>

      {/* Detailed Travel Information */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
          Essential Travel Information
        </Typography>

        {/* Accordion Group */}
        <Box>
          {/* Health & Safety */}
          <Accordion
            sx={{ mb: 1, borderRadius: "8px !important", overflow: "hidden" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HealthAndSafety sx={{ mr: 1.5, color: "error.main" }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Health & Safety
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                <ListItem sx={{ px: 1 }}>
                  <ListItemText
                    primary="Travel Insurance"
                    secondary="Comprehensive travel insurance with medical coverage is strongly recommended"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 1 }}>
                  <ListItemText
                    primary="Vaccinations"
                    secondary="Check with your doctor about recommended vaccinations at least 6-8 weeks before travel"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 1 }}>
                  <ListItemText
                    primary="Tap Water"
                    secondary="Research local drinking water safety. When in doubt, opt for bottled water"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Emergency Services */}
          {/* <Accordion
            sx={{ mb: 1, borderRadius: "8px !important", overflow: "hidden" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalPolice sx={{ mr: 1.5, color: "info.main" }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Emergency Services
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Police
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {emergencyNumbers.police}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Ambulance
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {emergencyNumbers.ambulance}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2,
                      bgcolor: "background.default",
                      borderRadius: 2,
                    }}
                  >
                    <Typography variant="subtitle2" color="text.secondary">
                      Fire Department
                    </Typography>
                    <Typography variant="h5" fontWeight="bold">
                      {emergencyNumbers.fire}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Save these emergency numbers in your phone before traveling to{" "}
                {countryName}.
              </Typography>
            </AccordionDetails>
          </Accordion> */}

          {/* Money & Costs */}
          <Accordion
            sx={{ mb: 1, borderRadius: "8px !important", overflow: "hidden" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocalAtm sx={{ mr: 1.5, color: "success.main" }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Money & Costs
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                <ListItem sx={{ px: 1 }}>
                  <ListItemText
                    primary="Credit Cards"
                    secondary="Major credit cards are generally accepted in urban areas, but carry cash for rural regions"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 1 }}>
                  <ListItemText
                    primary="ATMs"
                    secondary="Available in cities and major towns, but may be limited in rural areas"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 1 }}>
                  <ListItemText
                    primary="Tipping"
                    secondary="Research local tipping customs before your trip as practices vary significantly"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Local Customs */}
          <Accordion
            sx={{ mb: 1, borderRadius: "8px !important", overflow: "hidden" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Public sx={{ mr: 1.5, color: "secondary.main" }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Local Customs
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" paragraph>
                Researching and respecting local customs is an essential part of
                responsible travel. Consider the following general advice, but
                research specifics for {countryName}:
              </Typography>
              <List disablePadding>
                <ListItem sx={{ px: 1 }}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <RestaurantMenu fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dining Etiquette"
                    secondary="Table manners and dining customs can vary significantly between cultures"
                  />
                </ListItem>
                <Divider component="li" variant="inset" />
                <ListItem sx={{ px: 1 }}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <Translate fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Language"
                    secondary="Learning a few basic phrases in the local language is often appreciated"
                  />
                </ListItem>
                <Divider component="li" variant="inset" />
                <ListItem sx={{ px: 1 }}>
                  <ListItemIcon sx={{ minWidth: "36px" }}>
                    <Wallet fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Dress Code"
                    secondary="Some locations may have specific dress requirements, especially at religious sites"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          {/* Internet & Communications */}
          <Accordion
            sx={{ borderRadius: "8px !important", overflow: "hidden" }}
          >
            <AccordionSummary expandIcon={<ExpandMore />}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Wifi sx={{ mr: 1.5, color: "primary.main" }} />
                <Typography variant="subtitle1" fontWeight="bold">
                  Internet & Communications
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                <ListItem sx={{ px: 1 }}>
                  <ListItemText
                    primary="Mobile Service"
                    secondary="Check with your provider about international roaming or consider purchasing a local SIM card"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 1 }}>
                  <ListItemText
                    primary="Wi-Fi Availability"
                    secondary="Most hotels, cafes, and restaurants in urban areas offer Wi-Fi, but coverage may be limited in rural areas"
                  />
                </ListItem>
                <Divider component="li" />
                <ListItem sx={{ px: 1 }}>
                  <ListItemText
                    primary="VPN Services"
                    secondary="Consider using a VPN for secure internet connections and to access content from your home country"
                  />
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Box>

      {/* Call to Action for More Resources */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography variant="body2" color="text.secondary" mb={2}>
          This information is for general guidance only. For the most up-to-date
          and detailed travel information, consult official sources.
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Public />}
            sx={{ borderRadius: 2 }}
            href={`https://travel.state.gov/content/travel/en/international-travel/International-Travel-Country-Information-Pages/${countryName.replace(
              /\s+/g,
              "-"
            )}.html`}
            target="_blank"
          >
            Official Travel Advisory
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<LocalPolice />}
            sx={{ borderRadius: 2 }}
            href={`https://www.gov.uk/foreign-travel-advice/${countryName
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
            target="_blank"
          >
            UK Gov Travel Advice
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default TravelTips;
